from flask import request, jsonify
from . import colleges_bp
from app.models.college import College

@colleges_bp.route('/', methods=['GET'])
def list_colleges():
    # Pagination
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 20, type=int)
    
    # Filtering
    district = request.args.get('district')
    college_type = request.args.get('type')
    
    query = College.query
    if district:
        query = query.filter(College.district == district)
    if college_type:
        query = query.filter(College.type == college_type)
        
    pagination = query.paginate(page=page, per_page=per_page, error_out=False)
    
    colleges = []
    for c in pagination.items:
        colleges.append({
            "id": c.id,
            "tnea_code": c.tnea_code,
            "name": c.name,
            "district": c.district,
            "type": c.type,
            "autonomous": c.autonomous
        })
        
    return jsonify({
        "colleges": colleges,
        "total": pagination.total,
        "pages": pagination.pages,
        "current_page": page
    })

@colleges_bp.route('/<int:id>', methods=['GET'])
def get_college(id):
    c = College.query.get_or_404(id)
    return jsonify({
        "id": c.id,
        "tnea_code": c.tnea_code,
        "name": c.name,
        "district": c.district,
        "type": c.type,
        "autonomous": c.autonomous,
        "established_year": c.established_year
    })
