from app.extensions import db

class Branch(db.Model):
    __tablename__ = 'branches'
    
    id = db.Column(db.Integer, primary_key=True)
    code = db.Column(db.String(10), unique=True, nullable=False, index=True) # e.g., CS, EC, ME
    name = db.Column(db.String(255), nullable=False)
    
    colleges = db.relationship('CollegeBranch', back_populates='branch', lazy='dynamic')

class CollegeBranch(db.Model):
    __tablename__ = 'college_branches'
    
    id = db.Column(db.Integer, primary_key=True)
    college_id = db.Column(db.Integer, db.ForeignKey('colleges.id'), nullable=False)
    branch_id = db.Column(db.Integer, db.ForeignKey('branches.id'), nullable=False)
    nba_accredited = db.Column(db.Boolean, default=False)
    
    college = db.relationship('College', back_populates='branches')
    branch = db.relationship('Branch', back_populates='colleges')
    
    cutoffs = db.relationship('YearlyCutoff', back_populates='college_branch', lazy='dynamic')
    seat_matrix = db.relationship('SeatMatrix', back_populates='college_branch', lazy='dynamic')
