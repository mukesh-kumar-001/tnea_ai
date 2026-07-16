import os
from datetime import timedelta

basedir = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))

def get_database_url():
    url = os.environ.get('DATABASE_URL')
    if url:
        url = url.strip()
        # Automatically fix unencoded @ in password
        import urllib.parse
        parts = url.split('@')
        if len(parts) > 2:
            host_part = parts[-1]
            credentials = '@'.join(parts[:-1])
            if "://" in credentials:
                protocol, rest = credentials.split("://", 1)
                if ":" in rest:
                    username, password = rest.split(":", 1)
                    encoded_password = urllib.parse.quote(password, safe="")
                    url = f"{protocol}://{username}:{encoded_password}@{host_part}"
        
        if url.startswith("postgres://"):
            url = url.replace("postgres://", "postgresql+pg8000://", 1)
        elif url.startswith("postgresql://"):
            url = url.replace("postgresql://", "postgresql+pg8000://", 1)
    else:
        url = f"sqlite:///{os.path.join(basedir, 'app.db')}"
    return url

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev-key-for-tnea-platform')
    SQLALCHEMY_DATABASE_URI = get_database_url()
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'jwt-secret-for-tnea-platform')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=30)
    CORS_ORIGIN = os.environ.get('CORS_ORIGIN', '*')
    
class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False

class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = "sqlite:///:memory:"

config_by_name = dict(
    dev=DevelopmentConfig,
    test=TestingConfig,
    prod=ProductionConfig
)
