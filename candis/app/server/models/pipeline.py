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
    pipeline_run = db.relationship('PipelineRun', backref='pipeline')
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


class PipelineRun(db.Model):
    __tablename__ = 'pipeline_run'

    id_ = db.Column(db.Integer, primary_key=True)
    gist = db.Column(db.JSON)
    last_ran_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    time_taken = db.Column(db.Numeric, nullable=False)
    pipeline_id = db.Column(db.Integer, db.ForeignKey('pipeline.id_'))
    
    def add_pipeline_run(self):
        try:
            db.session.add(self)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            db.session.flush()
            print(e)  # use logging

class Cdata(db.Model):
    __tablename__ = 'cdata'

    id_ = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    value = db.Column(db.JSON)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id_'))

    def add_cdata(self):
        try:
            db.session.add(self)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            db.session.flush()
            print(e)  # TODO: use logging

    @classmethod
    def get_cdata(cls, id_=None, name=None):
        if id_:
            return cls.query.filter_by(id_=id_).first()
        elif name:
            return cls.query.filter_by(name=name).first()

    def update_cdata(self, **kwargs):
        for key, value in kwargs.items():
            setattr(self, key, value)
        db.session.add(self)
        db.session.commit()    
