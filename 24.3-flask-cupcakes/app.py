"""Flask app for Cupcakes"""

from bz2 import decompress
from crypt import methods
from hashlib import new
import json
from flask import Flask, render_template, session, request, redirect, jsonify
from sqlalchemy import desc
from models import db, connect_db, Cupcake

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "secretkey12345"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

connect_db(app)


def serialize_cupcakes(cupcake):
    return {
        "id": cupcake.id,
        "flavor": cupcake.flavor,
        "size": cupcake.size,
        "rating": cupcake.rating,
        "image": cupcake.image
    }


@app.route('/')
def home():
    cupcakes = Cupcake.query.all()
    return render_template('home.html', cupcakes=cupcakes)


@app.route('/api/cupcakes')
def cupcakes():
    cupcakes = Cupcake.query.all()
    serialized = [serialize_cupcakes(c) for c in cupcakes]
    return jsonify(cupcakes=serialized)


@app.route('/api/cupcakes/<int:cupcakeId>')
def get_cupcake(cupcakeId):
    cupcake = Cupcake.query.get_or_404(cupcakeId)
    serialized_cupcake = serialize_cupcakes(cupcake)
    return jsonify(cupcake=serialized_cupcake)


@app.route('/api/cupcakes', methods=['POST'])
def create_cupcake():
    flavor = request.json.get("flavor")
    size = request.json.get("size")
    rating = request.json.get("rating")
    image = request.json.get("image")
    new_cupcake = Cupcake(flavor=flavor, size=size, rating=rating, image=image)
    db.session.add(new_cupcake)
    db.session.commit()

    serialized = serialize_cupcakes(new_cupcake)
    return (jsonify(cupcake=serialized), 201)


@app.route('/api/cupcakes/<int:cupcakeId>', methods=['PATCH'])
def update_cupcake(cupcakeId):
    cupcake = Cupcake.query.get_or_404(cupcakeId)
    cupcake.flavor = request.json.get('flavor', cupcake.flavor)
    cupcake.size = request.json.get('size', cupcake.size)
    cupcake.rating = request.json.get('rating', cupcake.rating)
    cupcake.image = request.json.get('image', cupcake.image)
    db.session.commit()
    return jsonify(cupcake=serialize_cupcakes(cupcake))


@app.route('/api/cupcakes/<int:cupcakeId>', methods=['DELETE'])
def delete_cupcake(cupcakeId):
    cupcake = Cupcake.query.get_or_404(cupcakeId)
    db.session.delete(cupcake)
    db.session.commit()
    return jsonify(message="deleted")
