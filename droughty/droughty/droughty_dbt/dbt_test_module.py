import lkml as looker
from google.oauth2 import service_account
import pandas_gbq
from contextlib import redirect_stdout
import pandas as pd
import pandas
import os
import json
import sys
from itertools import chain

from collections import defaultdict


from droughty.droughty_dbt.dbt_test_base_dict import dbt_test_dict
from droughty.droughty_dbt.dbt_test_field_base import described_columns_list
from droughty.droughty_core.config import (
    IdentifyConfigVariables,
    ExploresVariables
)
from droughty.droughty_dbt.dbt_version_util import is_version_gte_1_8

import sys
import ruamel.yaml
import git


def get_test_definition_key():
    """
    Returns the appropriate test definition key based on the dbt version.
    """
    if is_version_gte_1_8():
        return "data_tests"
    else:
        return "tests"

def get_all_values(nested_dictionary):
    
    tests_config_key = get_test_definition_key()

    test_overwrite = ExploresVariables.test_overwrite

    try:
        
        if test_overwrite != None:
    
            ignore_test_keys_and_values = []

            for key, value in test_overwrite.items():

                nested_dictionary[key].update(value)

                for sub_key in value.keys():
                    ignore_test_keys_and_values.append(key + "-" + sub_key)

        else:
        
            pass

    except:

        ignore_test_keys = "None"

    res = [{"version":2},{"models":None}]
    
    for key,value in nested_dictionary.items():
            
            seq = []

            for key1,value1 in value.items():

                if key + "-" + key1 not in ignore_test_keys_and_values and not key in ExploresVariables.test_ignore:

                    if key1 in described_columns_list:

                        if "pk" in key1 and "not_null" not in value1 and "unique" not in value1:
                            
                            elem = {"name": key1, "description": "{{doc("+'"'+key1+'"'+")}}", tests_config_key: ["not_null","unique"]}
                            seq.append(elem)
                            
                        elif "fk" in key1:
                            
                            elem = {"name": key1, "description": "{{doc("+'"'+key1+'"'+")}}", tests_config_key: ["dbt_utils.at_least_one"]}
                            seq.append(elem)   
                            
                        elif "valid_to" in key1 or "valid_from" in key1:
                            
                            elem = {"name": key1, "description": "{{doc("+'"'+key1+'"'+")}}", tests_config_key: ["dbt_utils.expression_is_true"":""expression"":"" valid_from < valid_to","not_null","unique"]}
                            seq.append(elem)  

                        elif "pk" not in key1 or "fk" not in key1:
                    
                            elem = {"name": key1, "description": "{{doc("+'"'+key1+'"'+")}}", tests_config_key: [""+"dbt_utils.at_least_one"]}
                            seq.append(elem)  

                        elif "pk" not in key1 or "fk" not in key1:
                    
                            elem = {"name": key1, "description": "{{doc("+'"'+key1+'"'+")}}"}
                            seq.append(elem)  

                    elif key1 not in described_columns_list:

                            if "pk" in key1:
                                
                                elem = {"name": key1, tests_config_key: ["not_null","unique"]}
                                seq.append(elem)
                                
                            elif "fk" in key1:
                                
                                elem = {"name": key1, tests_config_key: ["dbt_utils.at_least_one"]}
                                seq.append(elem)   
                                
                            elif "valid_to" in key1 or "valid_from" in key1:
                                
                                elem = {"name": key1, tests_config_key: ["dbt_utils.expression_is_true"":""expression"":"" valid_from < valid_to","not_null","unique"]}
                                seq.append(elem)  

                            elif "pk" not in key1 or "fk" not in key1:
                        
                                elem = {"name": key1, tests_config_key: [""+"dbt_utils.at_least_one"]}
                                seq.append(elem)
                    
                elif key + "-" + key1 in ignore_test_keys_and_values and key not in ExploresVariables.test_ignore:
                    
                    if key1 in described_columns_list:

                            
                        elem = {"name": key1, "description": "{{doc("+'"'+key1+'"'+")}}", tests_config_key: value1}
                        seq.append(elem)

                    elif key1 not in described_columns_list:

                        elem = {"name": key1, tests_config_key: value1}
                        seq.append(elem)
            
            res.append([{"name": key, "columns": seq}])

    return res

def schema_output():

    if ExploresVariables.dbt_path == None:
    
        git_path = IdentifyConfigVariables.git_path

        rel_path = "models"

        path = os.path.join(git_path, rel_path)

    elif ExploresVariables.dbt_path != None:

        path = os.path.join(IdentifyConfigVariables.git_path,ExploresVariables.dbt_path)

    if not os.path.exists(path):
        os.makedirs(path)

    if ExploresVariables.dbt_tests_filename != None:

        filename = ExploresVariables.dbt_tests_filename
        
    else:

        filename = 'droughty_schema'
  
    suffix = '.yml'

    extension = filename+suffix

    with open(os.path.join(path,extension), 'w') as file:

        with redirect_stdout(file):

            for i in get_all_values(dbt_test_dict()):
                yaml = ruamel.yaml.YAML()
                yaml.indent(mapping=2, sequence=4, offset=2)
                yaml.dump(i,file)