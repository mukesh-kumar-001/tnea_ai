import os
from app import create_app
from app.extensions import db
from app.models.college import College, Facility, HostelInformation

# Initialize the app with the development environment context
app = create_app(os.getenv('FLASK_ENV', 'dev'))

with app.app_context():
    print("🚀 Starting database seeding...")
    
    # Core top TNEA sample dataset
    sample_colleges = [
        {
            "tnea_code": "0001",
            "name": "College of Engineering Guindy (CEG)",
            "district": "Chennai",
            "type": "Government",
            "established_year": 1794,
            "autonomous": True,
            "facility": {"has_library": True, "has_sports": True, "has_transport": True},
            "hostel": {"boys_hostel_available": True, "girls_hostel_available": True, "annual_fee": 48000.0}
        },
        {
            "tnea_code": "0004",
            "name": "Madras Institute of Technology (MIT)",
            "district": "Chennai",
            "type": "Government",
            "established_year": 1949,
            "autonomous": True,
            "facility": {"has_library": True, "has_sports": True, "has_transport": True},
            "hostel": {"boys_hostel_available": True, "girls_hostel_available": True, "annual_fee": 45000.0}
        },
        {
            "tnea_code": "2006",
            "name": "PSG College of Technology",
            "district": "Coimbatore",
            "type": "Aided",
            "established_year": 1951,
            "autonomous": True,
            "facility": {"has_library": True, "has_sports": True, "has_transport": False},
            "hostel": {"boys_hostel_available": True, "girls_hostel_available": True, "annual_fee": 85000.0}
        }
    ]

    for data in sample_colleges:
        # Prevent inserting duplicates if script is run multiple times
        existing = College.query.filter_by(tnea_code=data["tnea_code"]).first()
        if existing:
            print(f"ℹ️ College code {data['tnea_code']} already exists. Skipping.")
            continue

        # 1. Add main college record
        college = College(
            tnea_code=data["tnea_code"],
            name=data["name"],
            district=data["district"],
            type=data["type"],
            established_year=data["established_year"],
            autonomous=data["autonomous"]
        )
        db.session.add(college)
        db.session.flush()  # Generates college.id for relationships

        # 2. Add structural relationship items
        facility = Facility(college_id=college.id, **data["facility"])
        hostel = HostelInformation(college_id=college.id, **data["hostel"])
        
        db.session.add(facility)
        db.session.add(hostel)
        print(f"✅ Successfully staged: {data['name']}")

    db.session.commit()
    print("🎉 Database seeded successfully with TNEA test data!")