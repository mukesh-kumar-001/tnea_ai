import os
from dotenv import load_dotenv
from app import create_app
from flask_cors import CORS
load_dotenv()

app = create_app(os.getenv('FLASK_ENV', 'dev'))

@app.route('/api/test', methods=['GET'])
def test():
    return {"Status":"Success",'message': 'Flask backend is running successfully!'}
if __name__ == '__main__':
    app.run(debug=True, port=5000)
