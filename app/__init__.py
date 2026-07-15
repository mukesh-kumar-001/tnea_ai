from flask import Flask
from .config import config_by_name
from .extensions import db, migrate, jwt, cors, bcrypt, ma

def create_app(config_name='dev'):
    app = Flask(__name__)
    app.config.from_object(config_by_name[config_name])

    # Initialize Extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    cors.init_app(app, resources={r"/api/*": {"origins": "*"}})
    bcrypt.init_app(app)
    ma.init_app(app)

    # Register Blueprints
    from .api import auth_bp, colleges_bp, cutoffs_bp, choices_bp, recommendations_bp, branches_bp, admin_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(colleges_bp, url_prefix='/api/colleges')
    app.register_blueprint(branches_bp, url_prefix='/api/branches')
    app.register_blueprint(cutoffs_bp, url_prefix='/api/cutoffs')
    app.register_blueprint(choices_bp, url_prefix='/api/choices')
    app.register_blueprint(recommendations_bp, url_prefix='/api/recommendations')
    app.register_blueprint(admin_bp, url_prefix='/api/admin')

    # Register error handlers
    from .utils.error_handlers import register_error_handlers
    register_error_handlers(app)

    return app
