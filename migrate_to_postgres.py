import os
import sys
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app import create_app
from app.extensions import db
from app.models.college import College, Facility, HostelInformation
from app.models.branch import Branch, CollegeBranch
from app.models.cutoff import YearlyCutoff, SeatMatrix
from app.models.fee_placement import FeeStructure, PlacementStatistic
from app.models.user import User
from app.models.system import ChoiceList, RecommendationHistory

def migrate():
    postgres_url = os.environ.get("POSTGRES_URL") or os.environ.get("DATABASE_URL")
    if not postgres_url:
        print("Error: POSTGRES_URL or DATABASE_URL environment variable is required.")
        sys.exit(1)

    if postgres_url.startswith("postgresql://"):
        postgres_url = postgres_url.replace("postgresql://", "postgresql+pg8000://", 1)

    app = create_app('prod')
    
    # We create two engines
    basedir = os.path.abspath(os.path.dirname(__file__))
    sqlite_url = f"sqlite:///{os.path.join(basedir, 'app.db')}"
    
    print(f"Reading from: {sqlite_url}")
    print("Connecting to PostgreSQL...")
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
        Facility, HostelInformation, FeeStructure, PlacementStatistic, YearlyCutoff, SeatMatrix,
        ChoiceList, RecommendationHistory
    ]

    # Clear existing tables in reverse order to respect foreign key constraints
    for model in reversed(models):
        print(f"Deleting existing records for {model.__name__}...")
        postgres_session.query(model).delete()
        postgres_session.commit()

    for model in models:
        print(f"Migrating {model.__name__}...")
        records = sqlite_session.query(model).all()
        
        print(f"Inserting {len(records)} records in bulk...")
        # Prepare dicts
        data = []
        for r in records:
            d = r.__dict__.copy()
            d.pop('_sa_instance_state', None)
            data.append(d)
            
        if data:
            # Insert in batches of 1000 with a single multi-values INSERT statement to avoid roundtrip latency
            batch_size = 1000
            for i in range(0, len(data), batch_size):
                batch = data[i:i+batch_size]
                postgres_session.execute(model.__table__.insert().values(batch))
                postgres_session.commit()
                print(f"Inserted batch {i//batch_size + 1} ({len(batch)} records) for {model.__name__}...")
            
        print(f"Migrated {len(records)} records for {model.__name__}.")
        
    print("Migration completed successfully!")

if __name__ == "__main__":
    migrate()
