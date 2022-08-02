from flask import Flask, redirect, render_template, session, request, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from boggle import Boggle
import json

boggle_game = Boggle()

app = Flask(__name__)
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.config['SECRET_KEY'] = "secretkey12345"
debug = DebugToolbarExtension(app)


@app.route('/')
def home():
    """ Portal to enter size of boggle board and set sessions """
    session['scores'] = []
    session['submissions'] = []
    size = 0
    return render_template("play.html")


@app.route('/play')
def portal():
    print(session['scores'])
    scores = session['scores']
    if len(scores) == 0:
        session['boardSize'] = request.args.get('boardSize')
        boardSize = int(session['boardSize'])
        board = boggle_game.make_board(boardSize)
        maxScore = 0
    else:
        maxScore = max(scores)
        boardSize = int(session['boardSize'])
        board = boggle_game.make_board(boardSize)
    numGames = len(scores)
    session['board'] = board
    return render_template("board.html", board=board, boardSize=boardSize, maxScore=maxScore, numGames=numGames)


@app.route('/submit-guess', methods=["POST"])
def submit_guess():
    board = session['board']
    submissions = session['submissions']
    response = request.json.get('guess')
    #response = request.json
    # print("***************")
    # print(response)
    check_board = boggle_game.check_valid_word(board, response)
    check_words = response in boggle_game.words
    result = {}
    if check_words:
        result = {"result": check_board}
        if response not in submissions:
            submissions.append(response)
        else:
            result = {"result": "already answered!"}
    else:
        result = {"result": check_board}
    session['submissions'] = submissions
    return jsonify(result)


@app.route('/finish-guess', methods=["POST"])
def finish_guess():
    response = request.json.get('score')
    scores = session['scores']

    scores.append(int(response))

    session['scores'] = scores

    return jsonify({"score": scores})


def get_board_size():
    return int(session['boardSize'])
