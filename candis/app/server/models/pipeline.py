# imports - standard imports
from datetime import datetime

# imports - module imports
from candis.app.server.app import db


class Pipeline(db.Model):
    __tablename__ = 'pipeline'

    id_ = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    last_modified = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    status = db.Column(db.String(30))
    # stages = db.relationship('Stage', backref='pipeline')
    stages = db.Column(db.JSON)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id_'))

    def add_pipeline(self):
        try:
            db.session.add(self)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            db.session.flush()
            print(e)  # use logging

    def delete_pipeline(self):
        try:
            db.session.delete(self)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            db.session.flush()
            print(e)  # use logging
        

    def update_pipeline(self, **kwargs):
        for key, value in kwargs.items():
            setattr(self, key, value)
        db.session.add(self)
        db.session.commit()

    @classmethod
    def get_pipeline(cls, id_=None, name=None, last_modified=None):
        if id_:
            return cls.query.filter_by(id_=id_).first()
        elif name:
            return cls.query.filter_by(name=name).first()
        elif last_modified:
            return cls.query.filter_by(last_modified=last_modified).first()     

class Stage(db.Model):
    __tablename__ = 'stage'

    id_ = db.Column(db.Integer, primary_key=True)
    ID = db.Column(db.String(100), nullable=False)
    code = db.Column(db.String(50))
    name = db.Column(db.String(50))
    label = db.Column(db.String(50))
    status = db.Column(db.String(50))
    value = db.Column(db.JSON)
    stage_number = db.Column(db.Integer)
    # pipeline_id = db.Column(db.Integer, db.ForeignKey('pipeline.id_'))

    def add_stage(self):
        try:
            db.session.add(self)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            db.session.flush()
            print(e)  # use logging

    def update_stage(self, **kwargs):
        for key, value in kwargs.items():
            setattr(self, key, value)
        db.session.add(self)
        db.session.commit()

    @classmethod
    def get_stage(cls, ID=None, code=None, pipeline_id=None):
        if ID:
            return cls.query.filter_by(ID=ID).first()
        elif code:
            return cls.query.filter_by(code=code).first()
        elif pipeline_id:
            return cls.query.filter_by(pipeline_id=pipeline_id).first()
