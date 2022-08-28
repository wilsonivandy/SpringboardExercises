from ast import Num
from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField, SelectField, BooleanField
from wtforms.validators import InputRequired, Optional, DataRequired, URL, NumberRange

class AddPetForm(FlaskForm):
    name = StringField("Pet Name", validators=[InputRequired()])
    species = SelectField("Species", choices=[('dog','Dog'),('cat','Cat'),('porcupine','Porcupine')], validators=[InputRequired()])
    photo_url = StringField("Photo URL", validators=[DataRequired(), URL(), Optional()])
    age = IntegerField("Age", validators=[Optional(), NumberRange(min=0, max=30)])
    notes = StringField("Notes")

class EditPetForm(FlaskForm):
    photo_url = StringField("Photo URL", validators=[DataRequired(), URL(), Optional()])
    notes = StringField("Notes")
    available = BooleanField("Available?")