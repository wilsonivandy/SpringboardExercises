from cmath import atan
from termios import FIONREAD
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from traitlets import default
from flask_bcrypt import Bcrypt
# from wtforms.validators import InputRequired, Optional
# from flask_wtf import FlaskForm
# from wtforms import StringField, FloatField
db = SQLAlchemy()
bcrypt = Bcrypt()


def connect_db(app):
    """Connect to database."""

    db.app = app
    db.init_app(app)


class User(db.Model):

    __tablename__ = 'user'

    @classmethod
    def register(cls, username, password, email, first_name, last_name):
        hashed = bcrypt.generate_password_hash(password)
        hashed_utf8 = hashed.decode("utf8")
        return cls(username=username, password=hashed_utf8, email=email, first_name=first_name, last_name=last_name)

    @classmethod
    def authenticate(cls, username, password):
        user = User.query.filter_by(username = username).first()
        if user and bcrypt.check_password_hash(user.password, password):
            return user
        else:
            return False

    username = db.Column(db.String(20),
                   primary_key=True)
    password = db.Column(db.String(500),
                       nullable=False,
                       unique=False)
    email = db.Column(db.String(50),
                     nullable=False,
                     unique=False)
    first_name = db.Column(db.String(50),
                     nullable=False,
                     unique=False)
    last_name = db.Column(db.String(50),
                     nullable=False,
                     unique=False)
    feedbacks = db.relationship('Feedback', cascade="all, delete", backref="user")

class Feedback(db.Model):

    __tablename__ = 'feedbacks'

    id = db.Column(db.Integer, primary_key = True, autoincrement=True)
    title = db.Column(db.String(100),
                       nullable=False,
                       unique=False)
    content = db.Column(db.String(500),
                       nullable=False,
                       unique=False)
    username = db.Column(db.Text, db.ForeignKey('user.username', ondelete="CASCADE"))