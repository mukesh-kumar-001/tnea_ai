from app.extensions import db
from datetime import datetime

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(20), default='user') # admin, user
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Profile information
    name = db.Column(db.String(100), nullable=True)
    community = db.Column(db.String(20), nullable=True) # BC, MBC, SC, etc.
    general_rank = db.Column(db.Integer, nullable=True)
    community_rank = db.Column(db.Integer, nullable=True)
    
    saved_colleges = db.relationship('UserSavedCollege', backref='user', lazy='dynamic')
    choice_lists = db.relationship('ChoiceList', backref='user', lazy='dynamic')

class UserSavedCollege(db.Model):
    __tablename__ = 'user_saved_colleges'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    college_id = db.Column(db.Integer, db.ForeignKey('colleges.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
