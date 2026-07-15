from app.extensions import db
from datetime import datetime

class ChoiceList(db.Model):
    __tablename__ = 'choice_lists'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(100), default="My Choice List")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Using JSON to store the ordered list of college_branch_ids
    choices_json = db.Column(db.Text, nullable=True)

class RecommendationHistory(db.Model):
    __tablename__ = 'recommendation_history'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    parameters_json = db.Column(db.Text, nullable=True)
    results_json = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class ImportLog(db.Model):
    __tablename__ = 'import_logs'
    
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(255), nullable=False)
    import_type = db.Column(db.String(50), nullable=False) # 'cutoffs', 'colleges'
    status = db.Column(db.String(20), nullable=False) # 'success', 'failed'
    records_processed = db.Column(db.Integer, default=0)
    error_message = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
