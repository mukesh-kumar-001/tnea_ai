from flask import request, jsonify
from . import admin_bp
from app.services.import_pipeline import ImportPipeline
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.user import User
from functools import wraps

def admin_required():
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            current_user_id = get_jwt_identity()
            user = User.query.get(current_user_id)
            if not user or user.role != 'admin':
                return jsonify({"error": "Admin access required"}), 403
            return fn(*args, **kwargs)
        return decorator
    return wrapper

@admin_bp.route('/import/colleges', methods=['POST'])
@jwt_required()
@admin_required()
def import_colleges():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
        
    import os
    import tempfile
    
    # Save to a secure temp folder using tempfile
    temp_dir = tempfile.gettempdir()
    temp_path = os.path.join(temp_dir, file.filename)
    file.save(temp_path)
    
    success, message = ImportPipeline.import_colleges(temp_path)
    
    # Clean up temp file
    if os.path.exists(temp_path):
        os.remove(temp_path)
        
    if success:
        return jsonify({"message": message}), 200
    else:
        return jsonify({"error": message}), 500
