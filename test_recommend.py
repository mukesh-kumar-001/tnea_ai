import os
from app import create_app
from app.services.ai_engine import AIEngine
app = create_app('prod')
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('POSTGRES_URL')
with app.app_context():
    try:
        results = AIEngine.generate_recommendations(
            user_profile={"community": "BC", "community_rank": 15000, "general_rank": 40000},
            preferences={"preferred_branches": [], "preferred_districts": []}
        )
        print("Success:", results)
    except Exception as e:
        import traceback
        traceback.print_exc()
