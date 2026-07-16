import os
from app import create_app
app = create_app('prod')
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('POSTGRES_URL')
with app.test_client() as client:
    response = client.post('/api/recommendations/', json={
        'user_profile': {'community': 'BC', 'general_rank': 2500, 'community_rank': 1400},
        'preferences': {'preferred_branches': [], 'preferred_districts': ['Chennai', 'Coimbatore']}
    })
    print(response.status_code)
    print(response.data)
