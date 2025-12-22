from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
import models, schemas, database, auth

from dotenv import load_dotenv
import os
import secrets

load_dotenv()

# Create DB Tables
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

# CORS config allowing frontend to communicate
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")

@app.get("/")
def read_root():
    return {"message": "Welcome to the Google SSO Boilerplate API"}

@app.post("/register", response_model=schemas.UserResponse)
def register(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = auth.get_password_hash(user.password)
    verification_token = secrets.token_urlsafe(32)
    new_user = models.User(email=user.email, hashed_password=hashed_password, name=user.name, verification_token=verification_token, is_verified=False)
    db.add(new_user)
    
    # Mock Email Sending
    print(f"--- EMAIL VERIFICATION ---")
    print(f"To: {user.email}")
    print(f"Link: http://localhost:5173/verify-email?token={verification_token}")
    print(f"--------------------------")
    db.commit()
    db.refresh(new_user)
    return new_user

@app.post("/login", response_model=schemas.Token)
def login(user_credentials: schemas.UserLogin, db: Session = Depends(database.get_db)):
    user = db.query(models.User).filter(models.User.email == user_credentials.email).first()
    if not user or not user.hashed_password:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    
    if not auth.verify_password(user_credentials.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid credentials")
        
    access_token = auth.create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer", "username": user.name or user.email}

@app.post("/google-login", response_model=schemas.Token)
def google_login(login_data: schemas.GoogleLogin, db: Session = Depends(database.get_db)):
    try:
        # Verify the token with Google
        id_info = id_token.verify_oauth2_token(login_data.token, google_requests.Request(), GOOGLE_CLIENT_ID)
        
        email = id_info.get("email")
        name = id_info.get("name")
        picture = id_info.get("picture")
        
        if not email:
             raise HTTPException(status_code=400, detail="Invalid Google Token: No email found")

        # Check if user exists
        user = db.query(models.User).filter(models.User.email == email).first()
        
        if not user:
            # Create new user for Google SSO
            # Google users are auto-verified
            user = models.User(email=email, name=name, picture=picture, is_google_user=True, is_verified=True)
            db.add(user)
            db.commit()
            db.refresh(user)
        else:
            # Update info if needed (optional)
            if not user.is_google_user:
                 # Link account or just allow login? For now, let's allow login but maybe mark as also google?
                 # If user registered with password, they can also login with Google if email matches.
                 pass
        
        access_token = auth.create_access_token(data={"sub": user.email})
        return {"access_token": access_token, "token_type": "bearer", "username": user.name or user.email}
        
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid Google Token")

@app.get("/users/me", response_model=schemas.UserResponse)
def read_users_me(current_user: models.User = Depends(auth.get_current_user)):
    return current_user

@app.put("/users/me", response_model=schemas.UserResponse)
def update_user_me(user_update: schemas.UserUpdate, current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(database.get_db)):
    if user_update.name is not None:
        current_user.name = user_update.name
    if user_update.phone_number is not None:
        current_user.phone_number = user_update.phone_number
    if user_update.address is not None:
        current_user.address = user_update.address
    
    db.commit()
    db.refresh(current_user)
    return current_user

@app.post("/verify-email/{token}")
def verify_email(token: str, db: Session = Depends(database.get_db)):
    user = db.query(models.User).filter(models.User.verification_token == token).first()
    if not user:
        raise HTTPException(status_code=400, detail="Invalid verification token")
    
    if user.is_verified:
        return {"message": "Email already verified"}
    
    user.is_verified = True
    user.verification_token = None # Invalidate token after use
    db.commit()
    
    return {"message": "Email verified successfully"}
