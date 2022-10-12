from google.oauth2 import service_account
import pandas_gbq
from contextlib import redirect_stdout
import snowflake.connector
from sqlalchemy import create_engine
from snowflake.sqlalchemy import URL
import pandas as pd
import pandas
import os
import json
import sys
import yaml
import git

import droughty.cube_parser.cube as cube
from droughty.droughty_cube.cube_base_dict import get_cube_base_dict
from droughty.droughty_cube.cube_explore_dict import get_cube_explore_dict
from droughty.droughty_core.config import (
    ProjectVariables,
    ExploresVariables,
    IdentifyConfigVariables
)


explore_list = []

for explore_key in get_cube_explore_dict().keys():

    explore_list.append(explore_key)

    
def get_all_values(nested_dictionary,explore_dictionary):

    for key,value in nested_dictionary.items():

        if key not in explore_list:
            
            explore = {


                "cube": key,
                "sql": "select * from"+" "+ProjectVariables.schema+"."+key,
                "dimensions": '{'

            }

            yield(cube.dump(explore))

            for key1, value1 in value.items():
                
                if "pk" not in key1[0]: #and "number" not in key1[1]:  

                    dimension = {


                            "dimension": {
                            "sql": key1[0],
                            "type": key1[1],
                            "name": key1[0],
                            "description": key1[2]

                            }

                        }

                    yield(cube.dump(dimension))
                    
                elif "pk" in key1[0]:

                    dimension = {


                        "dimension": {
                            "primaryKey": "true",
                            "type": key1[1],
                            "sql": key1[0],
                            "name": key1[0],
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
                        "sql": key1[0],
                        "type": "count",
                        "name": "count_of_"+key1[0]

                        }

                    }

                    yield(cube.dump(measure))
                    

                if key1[1] == 'number':

                    measure = {


                        "measure": {
                        "sql": key1[0],
                        "type": "sum",
                        "name": "sum_of_"+key1[0]

                        }

                    }

                    yield(cube.dump(measure))
            
            
            for key,value in nested_dictionary.items():

                closing_syntax = "}});"

            yield (closing_syntax)

        else:

            pass

def output():

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
        
        filename = 'cube_base'

    suffix = '.js'

    extension = filename+suffix

    with open(os.path.join(path,extension), 'w') as file:

        with redirect_stdout(file):

                for value in get_all_values(get_cube_base_dict(),get_cube_explore_dict()):

                    print(value)