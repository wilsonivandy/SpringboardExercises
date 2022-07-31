from flask import Flask, request, render_template
from stories import Story

app = Flask(__name__)

story1 = Story(
    ["place", "noun", "verb", "adjective", "plural_noun"],
    """Once upon a time in a long-ago {place}, there lived a
       large {adjective} {noun}. It loved to {verb} {plural_noun}."""
)

story2 = Story(
    ["place", "verb", "adjective", "plural_noun"],
    """Twice upon a time in a long-ago {place}, there lived a
       large {adjective}. It love {plural_noun}."""
)

story3 = Story(
    ["place", "noun", "verb", "plural_noun"],
    """Thrice upon a time in a long-ago {place}, there lived a
       large {noun}. It loved to {verb} {plural_noun}."""
)

@app.route('/')
def home():
    return render_template("home.html")

@app.route('/form/<story>')
def form(story):
    chosen_story = get_chosen_story(story)
    return render_template("form.html", questions=chosen_story.prompts, chosenStory = story)

@app.route('/submit/<chosenStory>')
def submit(chosenStory):
    answer = {}
    chosen_story = get_chosen_story(chosenStory)
    for p in chosen_story.prompts:
        answer[p] = request.args.get(p)
    finished_story = chosen_story.generate(answer)
    return render_template("submitted.html", story = finished_story)


def get_chosen_story(story):
    if story == 'story1':
        return story1
    elif story == 'story2':
        return story2
    elif story == 'story3':
        return story3