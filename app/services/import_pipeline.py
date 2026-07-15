import pandas as pd
from app.extensions import db
from app.models.college import College
from app.models.system import ImportLog

class ImportPipeline:
    @staticmethod
    def import_colleges(file_path):
        try:
            df = pd.read_csv(file_path)
            records_processed = 0
            
            for index, row in df.iterrows():
                college = College.query.filter_by(tnea_code=str(row['tnea_code'])).first()
                if not college:
                    college = College(
                        tnea_code=str(row['tnea_code']),
                        name=row['name'],
                        district=row.get('district', ''),
                        type=row.get('type', ''),
                        autonomous=bool(row.get('autonomous', False))
                    )
                    db.session.add(college)
                records_processed += 1
                
            db.session.commit()
            ImportPipeline._log_import(file_path, 'colleges', 'success', records_processed)
            return True, f"Imported {records_processed} colleges."
            
        except Exception as e:
            db.session.rollback()
            ImportPipeline._log_import(file_path, 'colleges', 'failed', 0, str(e))
            return False, str(e)
            
    @staticmethod
    def _log_import(filename, import_type, status, records, error=""):
        log = ImportLog(
            filename=filename,
            import_type=import_type,
            status=status,
            records_processed=records,
            error_message=error
        )
        db.session.add(log)
        db.session.commit()
