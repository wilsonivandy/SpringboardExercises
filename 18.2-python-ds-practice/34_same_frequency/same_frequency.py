def same_frequency(num1, num2):
    """Do these nums have same frequencies of digits?
    
        >>> same_frequency(551122, 221515)
        True
        
        >>> same_frequency(321142, 3212215)
        False
        
        >>> same_frequency(1212, 2211)
        True
    """

    res = True
    dict1 = {num : str(num1).count(num) for num in str(num1)}
    for k in list(dict1.keys()):
        if str(num2).count(k) != dict1.get(k):
            res = False
    return res