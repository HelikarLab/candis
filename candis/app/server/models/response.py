from candis.app.server.app import db

class Response(db.Model):
    __tablename__ = 'response'

    id = db.Column(db.Integer, primary_key=True)
    response_id = db.Column(db.String, nullable=False)
    version = db.Column(db.String)
    status = db.Column(db.String(50))
    data = db.Column(db.JSON)
    error = db.Column(db.JSON)

    def add_response(self):
        try:
            db.session.add(self)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            db.session.flush()
            print(e)  # use logging

    @classmethod
    def get_response(cls, response_id=None, version=None, status=None):
        if response_id:
            return cls.query.filter_by(response_id=response_id).first()
        elif version:
            return cls.query.filter_by(version=version).first()
        elif status:
            return cls.query.filter_by(status=status).first()

    @classmethod
    def get_responses(cls, version=None, status=None):
        if version:
            return cls.query.filter_by(version=version).all()
        elif status:
            return cls.query.filter_by(status=status).all()        