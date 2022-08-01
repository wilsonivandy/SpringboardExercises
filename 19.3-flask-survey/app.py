from flask import Flask, request, render_template, redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from surveys import satisfaction_survey

app = Flask(__name__)
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.config['SECRET_KEY'] = "secretkey12345"
debug = DebugToolbarExtension(app)


@app.route('/')
def home():
    return render_template('home.html', title = satisfaction_survey.title, instructions = satisfaction_survey.instructions)

@app.route('/start_survey', methods=["POST"])
def start_survey():
    session["responses"] = []
    return redirect('/questions/0')

@app.route('/questions/<int:number>')
def question(number):
    if len(satisfaction_survey.questions) == len(session["responses"]):
        return redirect('/thankyou')
    elif number != len(session["responses"]):
        flash("You are trying to access an invalid question!")
        return redirect(f'/questions/{len(session["responses"])}')
    else:
        return render_template("survey.html", question = satisfaction_survey.questions[number], currQuestion = number, answered = len(session["responses"]))

@app.route('/answer', methods=["POST"])
def add_Response():
    responses = session["responses"]
    response = request.form['response']
    responses.append(response)
    session["responses"] = responses
    nextIndex = len(session["responses"])
    if len(satisfaction_survey.questions) == nextIndex:
        return redirect('/thankyou')
    else: 
        return redirect(f'/questions/{nextIndex}')

@app.route('/thankyou')
def thankyou():
    return render_template('thanks.html')