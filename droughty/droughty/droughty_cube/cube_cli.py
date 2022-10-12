"""Console script for droughty cube module."""

from droughty.droughty_cube.cube_module import output
from droughty.droughty_cube.cube_explore_module import explore_output
from droughty.droughty_cube.cube_measure_module import measure_output
from droughty.droughty_cube.cube_unnesting_module import unnesting_output

from droughty.droughty_core.config import ExploresVariables

def base():

    print("Generating cube base layer")

    try:

        return output()

    finally:

        print("cube base layer generated")

def explore():

    print("Generating explore layer")


    try:

        return explore_output()

    finally:

        print("cube explore layer generated")

def unnesting():

    print ("Generating unnesting")

    try: 

        return unnesting_output()

    finally:

        print("unnesting generated")


#def measures():
#
#    print("Generating measure layer")
#
#    try:
#
#        return measure_output()
#
#    finally:
#
#        print("cube measure layer generated")

#def full_refresh():
#
#    for func in [base, explore, measures]:
#
#        result = func()