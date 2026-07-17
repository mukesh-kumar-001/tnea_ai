import sys
from app import create_app
import json

app = create_app()
with app.app_context():
    client = app.test_client()
    resp = client.get('/api/cutoffs/?college_code=0001&per_page=5')
    if resp.status_code != 200:
        print("Error:", resp.status_code, resp.data)
    else:
        print(json.dumps(resp.json, indent=2))
