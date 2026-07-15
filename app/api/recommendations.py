from flask import request, jsonify
from . import recommendations_bp
from app.services.ai_engine import AIEngine
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.user import User

@recommendations_bp.route('/', methods=['POST'])
@jwt_required(optional=True)
def get_recommendations():
    data = request.get_json()
    
    user_profile = data.get('user_profile', {})
    preferences = data.get('preferences', {})
    
    current_user_id = get_jwt_identity()
    if current_user_id and not user_profile:
        user = User.query.get(current_user_id)
        user_profile = {
            "community": user.community,
            "general_rank": user.general_rank,
            "community_rank": user.community_rank
        }
        
    result = AIEngine.generate_recommendations(user_profile, preferences)
    
    if "error" in result:
        return jsonify(result), 400
        
    return jsonify(result), 200
