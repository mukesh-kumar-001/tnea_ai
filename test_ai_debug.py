from app.services.ai_engine import AIEngine
from app.models.cutoff import YearlyCutoff
from app.models.branch import CollegeBranch
from run import app

with app.app_context():
    community = 'BC'
    query = YearlyCutoff.query.filter_by(category=community, year=2025).join(CollegeBranch)
    results = query.limit(500).all()
    print("Found cutoffs:", len(results))
    
    for record in results[:5]:
        print("Record:", record.id, record.college_branch.college.name, record.general_rank, record.college_branch.college.district)
