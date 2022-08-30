"""Models for Cupcake app."""
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from traitlets import default
# from wtforms.validators import InputRequired, Optional
# from flask_wtf import FlaskForm
# from wtforms import StringField, FloatField

db = SQLAlchemy()


def connect_db(app):
    """Connect to database."""

    db.app = app
    db.init_app(app)


class Cupcake(db.Model):
    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)
    flavor = db.Column(db.String(50),
                       nullable=False,
                       unique=False)
    size = db.Column(db.String(50),
                     nullable=False,
                     unique=False)
    rating = db.Column(db.Float(50),
                       nullable=False,
                       unique=False)
    image = db.Column(db.String(300),
                      nullable=False,
                      default='https://tinyurl.com/demo-cupcake')
