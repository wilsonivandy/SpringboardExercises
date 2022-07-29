def print_upper_words(words, must_start_with):
    """ Give list of words to capitalize and print """
    for word in words:
        if word[0] in must_start_with:
            print(word.upper())