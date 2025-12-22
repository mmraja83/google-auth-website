from pydantic import BaseModel, EmailStr
from typing import Optional

class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str
    name: Optional[str] = None

class UserLogin(UserBase):
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    username: str

class TokenData(BaseModel):
    email: Optional[str] = None

class UserResponse(UserBase):
    id: int
    name: Optional[str] = None
    picture: Optional[str] = None
    phone_number: Optional[str] = None
    address: Optional[str] = None
    is_active: bool
    is_google_user: bool
    is_verified: bool

    class Config:
        from_attributes = True

class UserUpdate(BaseModel):
    name: Optional[str] = None
    phone_number: Optional[str] = None
    address: Optional[str] = None

class GoogleLogin(BaseModel):
    token: str
