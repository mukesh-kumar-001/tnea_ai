from flask import request, jsonify
from . import colleges_bp
from app.models.college import College
from app.models.fee_placement import FeeStructure, PlacementStatistic

def serialize_college(c):
    # Fees
    fees = FeeStructure.query.filter_by(college_id=c.id).all()
    fees_data = [{"year": f.year, "tuition_fee": f.tuition_fee, "other_fees": (f.admission_fee or 0) + (f.establishment_fee or 0)} for f in fees]
    # Placements (Latest)
    placements = PlacementStatistic.query.filter_by(college_id=c.id).order_by(PlacementStatistic.year.desc()).first()
    placement_data = {}
    if placements:
        placement_data = {
            "placement_percentage": placements.placement_percentage,
            "highest_package": placements.highest_package,
            "average_package": placements.average_package
        }
        
    # Facilities
    facilities_data = {}
    if c.facilities:
        facilities_data = {
            "has_library": c.facilities.has_library,
            "has_sports": c.facilities.has_sports,
            "has_transport": c.facilities.has_transport
        }
        
    # Hostel
    hostel_data = {}
    if c.hostel:
        hostel_data = {
            "boys_hostel_available": c.hostel.boys_hostel_available,
            "girls_hostel_available": c.hostel.girls_hostel_available,
            "annual_fee": c.hostel.annual_fee
        }
        
    # Branches
    branches_data = [{"code": cb.branch.code, "name": cb.branch.name} for cb in c.branches.all()]
    
    return {
        "id": c.id,
        "tnea_code": c.tnea_code,
        "name": c.name,
        "district": c.district,
        "type": c.type,
        "autonomous": c.autonomous,
        "established_year": c.established_year,
        "fees": fees_data,
        "placements": placement_data,
        "facilities": facilities_data,
        "hostel": hostel_data,
        "branches": branches_data
    }

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
    
    colleges = [serialize_college(c) for c in pagination.items]
        
    return jsonify({
        "colleges": colleges,
        "total": pagination.total,
        "pages": pagination.pages,
        "current_page": page
    })

@colleges_bp.route('/<int:id>', methods=['GET'])
def get_college(id):
    c = College.query.get_or_404(id)
    return jsonify(serialize_college(c))
