from flask import jsonify
from . import branches_bp
from app.models.branch import Branch

@branches_bp.route('/', methods=['GET'])
def get_branches():
    branches = Branch.query.order_by(Branch.name).all()
    result = [{"code": b.code, "name": b.name} for b in branches]
    return jsonify({"branches": result})
