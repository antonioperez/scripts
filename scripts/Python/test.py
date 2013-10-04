def check_equal(iterator):
    return len(set(iterator)) <= 1

test = [None, None, None, None, None, None, None, None, None, None, None, None, None, None, None, None]

print check_equal(test)