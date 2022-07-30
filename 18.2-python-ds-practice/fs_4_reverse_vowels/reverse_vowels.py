def reverse_vowels(s):
    """Reverse vowels in a string.

    Characters which re not vowels do not change position in string, but all
    vowels (y is not a vowel), should reverse their order.

    >>> reverse_vowels("Hello!")
    'Holle!'

    >>> reverse_vowels("Tomatoes")
    'Temotaos'

    >>> reverse_vowels("Reverse Vowels In A String")
    'RivArsI Vewols en e Streng'

    reverse_vowels("aeiou")
    'uoiea'

    reverse_vowels("why try, shy fly?")
    'why try, shy fly?''
    """
    reversed_vowels = [l for l in s if l in "AaEeIiOoUu"][::-1]
    res = ""
    for a in s:
        if a in "AaEeIiOoUu":
            a = reversed_vowels[0]
            reversed_vowels.pop(0)
        res += a
    return res
