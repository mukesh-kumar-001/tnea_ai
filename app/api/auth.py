from flask import request, jsonify
from . import auth_bp
from app.services.auth_service import AuthService
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.user import User

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    response, status_code = AuthService.register_user(data)
    return jsonify(response), status_code

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    response, status_code = AuthService.login_user(data)
    return jsonify(response), status_code

@auth_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
        
    return jsonify({
        "id": user.id,
        "email": user.email,
        "name": user.name,
        "community": user.community,
        "general_rank": user.general_rank,
        "community_rank": user.community_rank
    }), 200
