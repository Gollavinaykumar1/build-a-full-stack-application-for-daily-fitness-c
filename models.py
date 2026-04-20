# models.py — SQLAlchemy models
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from database import Base

class Item(Base):
    __tablename__ = "items"
    id          = Column(Integer, primary_key=True, index=True)
    title       = Column(String, index=True)
    description = Column(String, nullable=True)
    status      = Column(String, default="active")
    created_at  = Column(DateTime(timezone=True), server_default=func.now())
