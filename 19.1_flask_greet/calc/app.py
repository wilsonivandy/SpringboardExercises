# Put your app in here.
from flask import Flask, request
from operations import add, sub, mult, div
#
app = Flask(__name__)

@app.route('/add')
def add_Numbers():
    a = int(request.args["a"])
    b = int(request.args["b"])
    return str(add(a,b))

@app.route('/sub')
def sub_Numbers():
    a = int(request.args["a"])
    b = int(request.args["b"])
    return str(sub(a,b))

@app.route('/mult')
def mult_Numbers():
    a = int(request.args["a"])
    b = int(request.args["b"])
    return str(mult(a,b))

@app.route('/div')
def div_Numbers():
    a = int(request.args["a"])
    b = int(request.args["b"])
    return str(div(a,b))

operations = {
    'add': add,
    'sub': sub,
    'mult': mult,
    'div': div
}

@app.route('/math/<operate>')
def all_Numbers(operate):
    a = int(request.args["a"])
    b = int(request.args["b"])
    return str(operations[operate](a,b))