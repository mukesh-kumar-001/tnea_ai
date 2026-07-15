from app.models.user import User
from app.extensions import db, bcrypt
from flask_jwt_extended import create_access_token, create_refresh_token

class AuthService:
    @staticmethod
    def register_user(data):
        email = data.get('email')
        password = data.get('password')
        
        if User.query.filter_by(email=email).first():
            return {"error": "User already exists"}, 400
            
        password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
        new_user = User(email=email, password_hash=password_hash, role='user')
        
        db.session.add(new_user)
        db.session.commit()
        
        return {"message": "User successfully registered."}, 201

    @staticmethod
    def login_user(data):
        email = data.get('email')
        password = data.get('password')
        
        user = User.query.filter_by(email=email).first()
        if user and bcrypt.check_password_hash(user.password_hash, password):
            access_token = create_access_token(identity=user.id)
            refresh_token = create_refresh_token(identity=user.id)
            
            return {
                "access_token": access_token,
                "refresh_token": refresh_token,
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "role": user.role
                }
            }, 200
            
        return {"error": "Invalid credentials"}, 401
