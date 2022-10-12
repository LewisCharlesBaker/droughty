from contextlib import redirect_stdout
import pandas as pd
import pandas
import os
import sqlparse

import droughty.cube_parser.cube as cube
from droughty.droughty_cube.cube_base_unnesting_dict import get_cube_base_nested_dict
from droughty.droughty_cube.cube_explore_dict import get_cube_explore_dict
from droughty.droughty_core.config import (
    ProjectVariables,
    ExploresVariables,
    IdentifyConfigVariables
)

def get_all_values(nested_dictionary,explore_dictionary):

    for key,value in nested_dictionary.items():
            
        base_sql = '''

        export const model_sql_{0} = `

        select

        '''.format(key)

        yield(base_sql)

        for key1, value1 in value.items():

            if key1[4] == 'true':

                if "array" or "struct" in key1[1]:

                    unnest_sql = '''

                    {1} as {0}_{2},

                    '''.format(key1[0],key1[3],key1[6])

                    yield(unnest_sql)

        closing_syntax = '''from {0}'''

        yield (closing_syntax).format(key)

        for key1, value1 in value.items():

            if key1[5] == 'true' and "array" in key1[1]:

                unnest_sql = '''

                cross join unnest ({0}) as {0}

                '''.format(key1[0])

                yield(unnest_sql)

        for key,value in nested_dictionary.items():

            closing_syntax = "`"

        yield (closing_syntax)

def get_all_values_cube(nested_dictionary,explore_dictionary):

    for key,value in nested_dictionary.items():
            
        explore = {


            "cube": "model_sql_"+key,
            "sql": "model_sql_"+key,
            "dimensions": '{'

        }

        yield(cube.dump(explore))

        for key1, value1 in value.items():
            
            if "pk" not in key1[0]: #and "number" not in key1[1]:  

                dimension = {


                        "dimension": {
                        "sql": key1[0]+"_"+key1[6],
                        "type": key1[1],
                        "name": key1[0]+"_"+key1[6],
                        "description": key1[2]

                        }

                    }

                yield(cube.dump(dimension))
                
            elif "pk" in key1[0]:

                dimension = {


                    "dimension": {
                        "primaryKey": "true",
                        "type": key1[1],
                        "sql": key1[0]+"_"+key1[6],
                        "name": key1[0]+"_"+key1[6],
                        "description": key1[2]

                    }
                }

                yield(cube.dump(dimension))

        closing_syntax = "} ,"

        yield (closing_syntax)

        measure_start = "measures: {"

        yield(measure_start)

        for key1, value1 in value.items():
            
            if "pk" in key1[0]:

                measure = {


                    "measure": {
                    "sql": key1[0]+"_"+key1[6],
                    "type": "count",
                    "name": "count_of_"+key1[0]+"_"+key1[6]

                    }

                }

                yield(cube.dump(measure))
                

            if key1[1] == 'number':

                measure = {


                    "measure": {
                    "sql": key1[0]+"_"+key1[6],
                    "type": "sum",
                    "name": "sum_of_"+key1[0]+"_"+key1[6]

                    }

                }

                yield(cube.dump(measure))
        
        
        for key,value in nested_dictionary.items():

            closing_syntax = "}});"

        yield (closing_syntax)

def unnesting_output():

    if ExploresVariables.cube_path == None:
 
        git_path = IdentifyConfigVariables.git_path

        rel_path = "schema"

        path = os.path.join(git_path, rel_path)

    elif ExploresVariables.cube_path != None:

        path = os.path.join(IdentifyConfigVariables.git_path,ExploresVariables.cube_path)

    if not os.path.exists(path):
        os.makedirs(path)

    if ExploresVariables.cube_base_filename != None:

        filename = ExploresVariables.cube_base_filename

    else:
        
        filename = 'cube_unnesting'

    suffix = '.js'

    extension = filename+suffix

    with open(os.path.join(path,extension), 'w') as file:

        with redirect_stdout(file):

                for value in get_all_values(get_cube_base_nested_dict(),get_cube_explore_dict()):

                    print(sqlparse.format(value, reindent=True, keyword_case='lower'))

                for value in get_all_values_cube(get_cube_base_nested_dict(),get_cube_explore_dict()):

                    print(value)