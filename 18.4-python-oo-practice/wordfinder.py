"""Word Finder: finds random words from a dictionary."""

import random

class WordFinder:
    """
    >>> wf = WordFinder("words.txt")
    235887 words read

    """

    def __init__(self, filename):
        self.file = open(f"{filename}", "r")
        self.read = self.file.read().split("\n")
        print(len(self.read), "words read")

    def random(self):
        print(self.read)
        return random.choice(self.read)


class SpecialWordFinder(WordFinder):
    """
    >>> wf = SpecialWordFinder("complex.txt")
    8 words read

    >>> wf.random() in ["pear", "carrot", "kale"]
    True

    """
    def special(self):
        return [w.strip() for w in self.read if w.strip() and not w.startswith("#")]