"""Models for Blogly."""
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


def connect_db(app):
    """Connect to database."""

    db.app = app
    db.init_app(app)


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)
    first_name = db.Column(db.String(50),
                           nullable=False,
                           unique=False)
    last_name = db.Column(db.String(50),
                          nullable=False,
                          unique=False)
    image_url = db.Column(db.String(50),
                          nullable=False)

    def greet(self):
        return f"Hi, my name is {self.first_name} {self.last_name}"

    posts = db.relationship('Post', cascade="all, delete")


class Post(db.Model):
    __tablename__ = "posts"

    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)
    user_id = db.Column(db.Integer,
                        db.ForeignKey('users.id', ondelete="CASCADE"))
    title = db.Column(db.String(50),
                      nullable=False,
                      unique=False)
    content = db.Column(db.String(200),
                        nullable=False,
                        unique=False)
    created_at = db.Column(db.DateTime)

    user = db.relationship('User')
