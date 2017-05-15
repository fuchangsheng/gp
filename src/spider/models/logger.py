import sys
if not (sys.path[0] + '/../') in sys.path:
    sys.path.append(sys.path[0] + '/../')


log = 0

def d(msg):
    if log <= 0:
        print('Debug:', msg)

def i(msg):
    if log <= 1:
        print('Info:', msg)

def w(msg):
    if log <= 2:
        print('Warning:', msg)

def e(msg):
    if log <= 3:
        print('Error:', msg)
