"""Blogly application."""

from contextlib import redirect_stderr
from crypt import methods
from email.mime import image
from flask import Flask, render_template, session, request, redirect
from models import db, connect_db, User
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "secretkey12345"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

connect_db(app)
db.create_all()


@app.route('/users')
def home():
    # user1 = User(first_name='Wilson', last_name='Natan',
    #              image_url='https://google.com')
    # user2 = User(first_name='Samantha', last_name='Gabriella',
    #              image_url='https://wikipedia.com')
    # db.session.add(user1)
    # db.session.add(user2)
    # db.session.commit()
    users = User.query.all()
    return render_template('home.html', users=users)


@app.route('/users/new', methods=['POST'])
def addedUser():
    firstName = request.form['FirstName']
    lastName = request.form['LastName']
    imageUrl = request.form['ImageURL']

    newUser = User(first_name=firstName,
                   last_name=lastName, image_url=imageUrl)
    db.session.add(newUser)
    db.session.commit()
    return redirect('/users')


@app.route('/add_user')
def addUser():
    return render_template('userForm.html')


@app.route("/users/<int:userId>")
def userInfo(userId):
    user = User.query.get(userId)
    return render_template('userInfo.html', user=user)


@app.route("/users/<int:userId>/edit", methods=['POST'])
def userEdit(userId):
    user = User.query.get(userId)
    user.first_name = request.form['FirstName']
    user.last_name = request.form['LastName']
    user.image_url = request.form['ImageURL']
    db.session.commit()
    return redirect('/users')


@app.route("/users/<int:userId>/edit")
def userEditProcess(userId):
    user = User.query.get(userId)
    return render_template('editUser.html', user=user)


@app.route("/users/<int:userId>/delete")
def userDeleteProcess(userId):
    User.query.filter_by(id=userId).delete()
    db.session.commit()
    return redirect('/users')


@app.route("/reset")
def reset():
    User.query.delete()
    db.session.commit()
    return redirect('/users')
