def flip_case(phrase, to_swap):
    """Flip [to_swap] case each time it appears in phrase.

        >>> flip_case('Aaaahhh', 'a')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'A')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'h')
        'AaaaHHH'

    """

    res = []
    for p in list(phrase):
        if p.lower() == to_swap.lower():
            res.append(p.swapcase())
        else:
            res.append(p)
    return "".join(res)