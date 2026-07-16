from app.extensions import db
from sqlalchemy.orm import relationship

class College(db.Model):
    __tablename__ = 'colleges'
    
    id = db.Column(db.Integer, primary_key=True)
    tnea_code = db.Column(db.String(10), unique=True, nullable=False, index=True)
    name = db.Column(db.String(255), nullable=False)
    district = db.Column(db.String(100), nullable=True, index=True)
    type = db.Column(db.String(50), nullable=True) # Government, Aided, Self-Financing
    established_year = db.Column(db.Integer, nullable=True)
    autonomous = db.Column(db.Boolean, default=False)
    
    branches = db.relationship('CollegeBranch', back_populates='college', lazy='select')
    facilities = db.relationship('Facility', backref='college', uselist=False)
    hostel = db.relationship('HostelInformation', backref='college', uselist=False)
    fees = db.relationship('FeeStructure', backref='college', lazy='select')
    placements = db.relationship('PlacementStatistic', backref='college', lazy='select')

class Facility(db.Model):
    __tablename__ = 'facilities'
    
    id = db.Column(db.Integer, primary_key=True)
    college_id = db.Column(db.Integer, db.ForeignKey('colleges.id'), nullable=False)
    has_library = db.Column(db.Boolean, default=False)
    has_sports = db.Column(db.Boolean, default=False)
    has_transport = db.Column(db.Boolean, default=False)

class HostelInformation(db.Model):
    __tablename__ = 'hostel_information'
    
    id = db.Column(db.Integer, primary_key=True)
    college_id = db.Column(db.Integer, db.ForeignKey('colleges.id'), nullable=False)
    boys_hostel_available = db.Column(db.Boolean, default=False)
    girls_hostel_available = db.Column(db.Boolean, default=False)
    annual_fee = db.Column(db.Float, nullable=True)
