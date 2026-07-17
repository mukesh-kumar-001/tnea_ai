from flask import request, jsonify
from . import colleges_bp
from app.models.college import College
from app.models.fee_placement import FeeStructure, PlacementStatistic
from app.models.branch import CollegeBranch
from app.extensions import db
from sqlalchemy.orm import joinedload, selectinload

def serialize_college_light(c):
    """Lightweight serializer using pre-loaded relationships (no extra queries)."""
    # Fees - already loaded via joinedload
    fees_data = []
    if c.fees:
        fees_data = [{"year": f.year, "tuition_fee": f.tuition_fee, "other_fees": (f.admission_fee or 0) + (f.establishment_fee or 0)} for f in c.fees]

    # Placements - already loaded
    placement_data = {}
    if c.placements:
        p = sorted(c.placements, key=lambda x: x.year, reverse=True)
        if p:
            placement_data = {
                "placement_percentage": p[0].placement_percentage,
                "highest_package": p[0].highest_package,
                "average_package": p[0].average_package
            }

    # Facilities - already loaded
    facilities_data = {}
    if c.facilities:
        facilities_data = {
            "has_library": c.facilities.has_library,
            "has_sports": c.facilities.has_sports,
            "has_transport": c.facilities.has_transport
        }

    # Hostel - already loaded
    hostel_data = {}
    if c.hostel:
        hostel_data = {
            "boys_hostel_available": c.hostel.boys_hostel_available,
            "girls_hostel_available": c.hostel.girls_hostel_available,
            "annual_fee": c.hostel.annual_fee
        }

    # Branches
    branches_data = []
    if c.branches:
        branches_data = [{"code": cb.branch.code, "name": cb.branch.name} for cb in c.branches]

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
        "branches": branches_data,
    }

@colleges_bp.route('/', methods=['GET'])
def list_colleges():
    # Pagination
    page = request.args.get('page', 1, type=int)
    per_page = min(request.args.get('per_page', 1000, type=int), 2000)

    # Filtering
    district = request.args.get('district')
    college_type = request.args.get('type')

    # Use joinedload to load all relationships in a single query (no N+1)
    query = College.query.options(
        selectinload(College.fees),
        selectinload(College.placements),
        selectinload(College.facilities),
        selectinload(College.hostel),
        selectinload(College.branches).joinedload(CollegeBranch.branch)
    )

    if district:
        query = query.filter(College.district.ilike(f"%{district}%"))
    if college_type:
        query = query.filter(College.type == college_type)

    pagination = query.paginate(page=page, per_page=per_page, error_out=False)

    colleges = [serialize_college_light(c) for c in pagination.items]

    return jsonify({
        "colleges": colleges,
        "total": pagination.total,
        "pages": pagination.pages,
        "current_page": page
    })

@colleges_bp.route('/<int:id>', methods=['GET'])
def get_college(id):
    c = College.query.options(
        selectinload(College.fees),
        selectinload(College.placements),
        selectinload(College.facilities),
        selectinload(College.hostel),
        selectinload(College.branches).joinedload(CollegeBranch.branch)
    ).get_or_404(id)
    return jsonify(serialize_college_light(c))
