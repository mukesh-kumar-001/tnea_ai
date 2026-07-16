from app.extensions import db

class YearlyCutoff(db.Model):
    __tablename__ = 'yearly_cutoffs'
    
    id = db.Column(db.Integer, primary_key=True)
    college_branch_id = db.Column(db.Integer, db.ForeignKey('college_branches.id'), nullable=False, index=True)
    year = db.Column(db.Integer, nullable=False, index=True)
    
    # Categories (e.g., OC, BC, BCM, MBC, SC, SCA, ST)
    category = db.Column(db.String(10), nullable=False, index=True)
    cutoff_mark = db.Column(db.Float, nullable=True)
    community_rank = db.Column(db.Integer, nullable=True, index=True)
    general_rank = db.Column(db.Integer, nullable=True, index=True)
    
    college_branch = db.relationship('CollegeBranch', back_populates='cutoffs')

class SeatMatrix(db.Model):
    __tablename__ = 'seat_matrix'
    
    id = db.Column(db.Integer, primary_key=True)
    college_branch_id = db.Column(db.Integer, db.ForeignKey('college_branches.id'), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    
    category = db.Column(db.String(10), nullable=False)
    total_seats = db.Column(db.Integer, default=0)
    filled_seats = db.Column(db.Integer, default=0)
    
    college_branch = db.relationship('CollegeBranch', back_populates='seat_matrix')
