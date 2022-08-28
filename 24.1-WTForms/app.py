from contextlib import redirect_stderr
from crypt import methods
from email.mime import image
from hashlib import new
from os import supports_effective_ids
from flask import Flask, render_template, session, request, redirect
from pets import db, connect_db, Pet
from forms import AddPetForm, EditPetForm
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///adopt'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "secretkey12345"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

connect_db(app)
db.drop_all()
db.create_all()

@app.route("/")
def home():
    pets = Pet.query.all()
    return render_template('home.html', pets = pets)

@app.route("/add", methods=["GET", "POST"])
def add_pet():
    form = AddPetForm()

    if form.validate_on_submit():
        name = form.name.data
        species = form.species.data
        photo_url = form.photo_url.data
        age = form.age.data
        notes = form.notes.data
        newPet = Pet(name = name, species = species, photo_url=photo_url, age = age, notes = notes)
        db.session.add(newPet)
        db.session.commit()
        return redirect("/")
    else:
        return render_template("addPetForm.html", form = form)
    
@app.route("/<int:petId>", methods=["GET", "POST"])
def moreInfo(petId):
    pet = Pet.query.get_or_404(petId)
    form = EditPetForm(obj=pet)
    if form.validate_on_submit():
        pet.photo_url = form.photo_url.data
        pet.notes = form.notes.data
        pet.available = form.available.data
        db.session.commit()
        return redirect("/")
    else:
        return render_template("petInfo.html", pet = pet, form = form)


