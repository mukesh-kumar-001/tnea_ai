from app.services.ai_engine import AIEngine
from run import app

with app.app_context():
    user_profile = {
        "community": "BC",
        "general_rank": 2500,
        "community_rank": 1400
    }
    preferences = {
        "preferred_branches": [],
        "preferred_districts": ["Chennai", "Coimbatore"]
    }
    
    result = AIEngine.generate_recommendations(user_profile, preferences)
    print("Dream:", len(result['dream']))
    print("Target:", len(result['target']))
    print("Safe:", len(result['safe']))
