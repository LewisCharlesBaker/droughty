from droughty.droughty_lookml.lookml_cli import (
    lookml_base,
    lookml_explore,
    lookml_measures,
    lookml_pop
)
from droughty.droughty_cube.cube_cli import (
    base,
    explore,
    unnesting
    #measures

)
from droughty.droughty_dbt.dbt_test_cli import tests
from droughty.droughty_dbml.dbml_cli import erd
from droughty.droughty_core.config_cli import Common
from droughty.droughty_core.config import ExploresVariables

def start():

    if Common.args_command == 'lookml':

        if ExploresVariables.explore_tables != None and ExploresVariables.lookml_pop != None :

            lookml_base()
            lookml_explore()
            lookml_measures()
            lookml_pop()

        elif hasattr(ExploresVariables,'lookml_pop') == True and ExploresVariables.explore_tables == None :

            lookml_base()
            lookml_measures()
            lookml_pop()

        elif ExploresVariables.explore_tables != None and ExploresVariables.lookml_pop == None :

            lookml_base()
            lookml_measures()
            lookml_explore()

        elif ExploresVariables.explore_tables == None and hasattr(ExploresVariables,'lookml_pop') == False :

            lookml_base()
            lookml_measures()

    elif Common.args_command == 'cube':

        base()
        explore()
        #measures()
        unnesting()

    elif Common.args_command == 'dbml':

        erd()

    elif Common.args_command == 'dbt':

        tests()

    else:

        lookml_base()
        lookml_explore()
        lookml_measures()
        lookml_pop()
        base()
        explore()
        measures()
        erd()
        tests()


if __name__ == '__main__':
    start()
