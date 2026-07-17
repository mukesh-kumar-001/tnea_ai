import os
from app import create_app
from app.models.college import College
from app.extensions import db
from sqlalchemy.orm import joinedload, selectinload
from app.models.branch import CollegeBranch

app = create_app('prod')
with app.app_context():
    # Let's count colleges using the same query as the API
    query = College.query.options(
        selectinload(College.fees),
        selectinload(College.placements),
        joinedload(College.facilities),
        joinedload(College.hostel),
        selectinload(College.branches).joinedload(CollegeBranch.branch)
    )
    
    # Let's check pagination total
    pagination = query.paginate(page=1, per_page=1000, error_out=False)
    print("Pagination Total:", pagination.total)
    print("Pagination Items Count:", len(pagination.items))
    
    # Check if there's any NameError or other issues
