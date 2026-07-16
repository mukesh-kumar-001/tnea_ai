import os
import sys
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app import create_app
from app.extensions import db
from app.models.college import College
from app.models.branch import Branch, CollegeBranch
from app.models.cutoff import YearlyCutoff
from app.models.placement import Placement
from app.models.facility import Facility
from app.models.scholarship import Scholarship
from app.models.user import User
from app.models.choice import ChoiceList, ChoiceItem
from app.models.recommendation import RecommendationHistory

def migrate():
    postgres_url = os.environ.get("POSTGRES_URL")
    if not postgres_url:
        print("Error: POSTGRES_URL environment variable is required.")
        sys.exit(1)

    app = create_app('prod')
    
    # We create two engines
    sqlite_url = app.config['SQLALCHEMY_DATABASE_URI'] # This will be postgres if DATABASE_URL is set
    # So we should force sqlite for reading
    basedir = os.path.abspath(os.path.dirname(__file__))
    sqlite_url = f"sqlite:///{os.path.join(basedir, 'app.db')}"
    
    sqlite_engine = create_engine(sqlite_url)
    postgres_engine = create_engine(postgres_url)
    
    SqliteSession = sessionmaker(bind=sqlite_engine)
    PostgresSession = sessionmaker(bind=postgres_engine)
    
    sqlite_session = SqliteSession()
    postgres_session = PostgresSession()

    print("Creating tables in PostgreSQL...")
    db.metadata.create_all(postgres_engine)
    print("Tables created.")

    models = [
        User, College, Branch, CollegeBranch, 
        Facility, Scholarship, Placement, YearlyCutoff,
        ChoiceList, ChoiceItem, RecommendationHistory
    ]

    for model in models:
        print(f"Migrating {model.__name__}...")
        records = sqlite_session.query(model).all()
        
        # Clear existing
        postgres_session.query(model).delete()
        
        for record in records:
            postgres_session.merge(record)
            
        postgres_session.commit()
        print(f"Migrated {len(records)} records for {model.__name__}.")
        
    print("Migration complete successfully!")

if __name__ == "__main__":
    migrate()
