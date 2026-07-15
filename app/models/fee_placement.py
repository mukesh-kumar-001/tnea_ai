from app.extensions import db

class FeeStructure(db.Model):
    __tablename__ = 'fee_structure'
    
    id = db.Column(db.Integer, primary_key=True)
    college_id = db.Column(db.Integer, db.ForeignKey('colleges.id'), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    
    category = db.Column(db.String(50), nullable=True) # Govt Quota, Management, etc.
    tuition_fee = db.Column(db.Float, nullable=True)
    other_fees = db.Column(db.Float, nullable=True)

class PlacementStatistic(db.Model):
    __tablename__ = 'placement_statistics'
    
    id = db.Column(db.Integer, primary_key=True)
    college_id = db.Column(db.Integer, db.ForeignKey('colleges.id'), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    
    total_companies = db.Column(db.Integer, nullable=True)
    highest_package = db.Column(db.Float, nullable=True) # in LPA
    average_package = db.Column(db.Float, nullable=True) # in LPA
    placement_percentage = db.Column(db.Float, nullable=True)
