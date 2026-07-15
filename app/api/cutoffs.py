from flask import request, jsonify
from . import cutoffs_bp
from app.models.cutoff import YearlyCutoff
from app.models.college import College
from app.models.branch import CollegeBranch, Branch

@cutoffs_bp.route('/', methods=['GET'])
def get_cutoffs():
    college_code = request.args.get('college_code')
    branch_code = request.args.get('branch_code')
    year = request.args.get('year', type=int)
    category = request.args.get('category')
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 50, type=int)
    
    query = YearlyCutoff.query.join(CollegeBranch).join(College).join(Branch)
    
    if college_code:
        query = query.filter(College.tnea_code == college_code)
    if branch_code:
        query = query.filter(Branch.code == branch_code)
    if year:
        query = query.filter(YearlyCutoff.year == year)
    if category:
        query = query.filter(YearlyCutoff.category == category)
        
    pagination = query.order_by(College.tnea_code, Branch.name, YearlyCutoff.year.desc()).paginate(page=page, per_page=per_page, error_out=False)
    
    results = []
    for cutoff in pagination.items:
        results.append({
            "college_code": cutoff.college_branch.college.tnea_code,
            "college_name": cutoff.college_branch.college.name,
            "branch_code": cutoff.college_branch.branch.code,
            "branch_name": cutoff.college_branch.branch.name,
            "year": cutoff.year,
            "category": cutoff.category,
            "cutoff_mark": cutoff.cutoff_mark,
            "community_rank": cutoff.community_rank,
            "general_rank": cutoff.general_rank
        })
        
    return jsonify({
        "data": results,
        "total": pagination.total,
        "pages": pagination.pages,
        "current_page": page
    })
