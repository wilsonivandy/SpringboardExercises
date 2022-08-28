from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
# from wtforms.validators import InputRequired, Optional
# from flask_wtf import FlaskForm
# from wtforms import StringField, FloatField

db = SQLAlchemy()


def connect_db(app):
    """Connect to database."""

    db.app = app
    db.init_app(app)


class Pet(db.Model):
    __tablename__ = "pets"

    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)
    name = db.Column(db.String(50),
                     nullable=False,
                     unique=False)
    species = db.Column(db.String(50),
                        nullable=False,
                        unique=False)
    photo_url = db.Column(db.String(300),
                          nullable=True)
    age = db.Column(db.Integer,
                    nullable=True)
    notes = db.Column(db.String(50),
                      nullable=True)
    available = db.Column(db.Boolean,
                      nullable=False, default=True)