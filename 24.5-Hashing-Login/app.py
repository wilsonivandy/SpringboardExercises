from bz2 import decompress
from crypt import methods
from hashlib import new
from tkinter import E
from flask import Flask, flash, render_template, session, request, redirect, jsonify
from sqlalchemy import desc
from models import db, connect_db, User, Feedback
from forms import registerForm, loginForm, feedbackForm

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///feedback'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "secretkey12345"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

connect_db(app)
db.drop_all()
db.create_all()

@app.route('/')
def home():
    return redirect('/register')

@app.route('/register', methods=['GET','POST'])
def register():
    allUsers = User.query.all()
    form = registerForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        email = form.email.data
        first_name = form.first_name.data
        last_name = form.last_name.data
        newUser = User.register(username=username, password=password, email=email, first_name=first_name, last_name=last_name)
        db.session.add(newUser)
        db.session.commit()
        flash("Added User!")
        session["username"] = username
        return redirect(f'/users/{username}/feedback/add')
    return render_template('register.html', form=form, allUsers=allUsers)

@app.route('/login', methods=['GET','POST'])
def login():
    form = loginForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        user = User.authenticate(username, password)
        if user:
            session["username"] = user.username
            return redirect(f'/users/{user.username}/feedback/add')
        else:
            form.username.errors = ['Invalid username / password']
    return render_template('login.html', form=form)

@app.route('/users/<username>/feedback/add', methods=['GET', 'POST'])
def secret(username): 
    form = feedbackForm()
    if form.validate_on_submit():
        title = form.title.data
        content = form.content.data
        feedback = Feedback(title=title, content=content, username = username)
        db.session.add(feedback)
        db.session.commit()
        return redirect(f'/users/{username}/feedback/add')
    else: 
        if "username" not in session:
            flash("You must be logged in to view!")
            return redirect("/")
        else:
            user = User.query.filter_by(username = username).first()
            print(user.feedbacks)
            return render_template('detail.html', user = user, form=form)

@app.route('/logout')
def logout():
    session.pop('username')
    return redirect('/')

@app.route('/users/<username>/delete', methods=['POST'])
def delete(username):
    if "username" not in session:
        flash("You must be logged in to delete!")
        return redirect(f'/users/{username}/feedback/add')
    else:
        user = User.query.filter_by(username = username).first()
        db.session.delete(user)
        db.session.commit()
        return redirect('/login')

@app.route('/feedback/<feedbackId>/update', methods=['GET', 'POST'])
def updateFeedback(feedbackId):
    form = feedbackForm()
    feedback = Feedback.query.get_or_404(feedbackId)
    user = feedback.username
    if form.validate_on_submit():
        if "username" not in session:
            flash("You must be logged in to update feedback!")
            return redirect(f'/')
        elif session['username'] == user:
            feedback.title = form.title.data
            feedback.content = form.content.data
            db.session.commit()
            return redirect(f'/users/{user}/feedback/add')
        else:
            flash("You cannot update this feedback!")
            return redirect(f'/users/{user}/feedback/add')
    else:
        return render_template('updateFeedback.html', form = form, feedbackId = feedbackId)

@app.route('/feedback/<feedbackId>/delete', methods=['POST'])
def deleteFeedback(feedbackId):
    feedback = Feedback.query.get_or_404(feedbackId)
    user = feedback.username
    if session['username'] == user:
        db.session.delete(feedback)
        db.session.commit()
    return redirect(f'/users/{user}/feedback/add')