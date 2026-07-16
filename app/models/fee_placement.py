from app.extensions import db

class FeeStructure(db.Model):
    __tablename__ = 'fee_structure'
    
    id = db.Column(db.Integer, primary_key=True)
    college_id = db.Column(db.Integer, db.ForeignKey('colleges.id'), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    
    tuition_fee = db.Column(db.Float, nullable=True)
    admission_fee = db.Column(db.Float, nullable=True)
    establishment_fee = db.Column(db.Float, nullable=True)
    hostel_fee = db.Column(db.Float, nullable=True)
    transport_min_fee = db.Column(db.Float, nullable=True)
    transport_max_fee = db.Column(db.Float, nullable=True)

class PlacementStatistic(db.Model):
    __tablename__ = 'placement_statistics'
    
    id = db.Column(db.Integer, primary_key=True)
    college_id = db.Column(db.Integer, db.ForeignKey('colleges.id'), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    
    total_companies = db.Column(db.Integer, nullable=True)
    highest_package = db.Column(db.Float, nullable=True) # in LPA
    average_package = db.Column(db.Float, nullable=True) # in LPA
    placement_percentage = db.Column(db.Float, nullable=True)
