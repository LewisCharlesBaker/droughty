from google.oauth2 import service_account
import pandas_gbq
from contextlib import redirect_stdout
import snowflake.connector
from sqlalchemy import create_engine
from snowflake.sqlalchemy import URL
import pandas as pd
import pandas


from droughty.droughty_core.warehouse_target import (
    create_cube_explore_sql,
    create_base_sql,
)
from droughty.droughty_core.config import (
    ProjectVariables,
    get_snowflake_connector_url
)
from droughty.droughty_core.droughty_data_prep import (
    wrangle_bigquery_cube_unnesting_dataframes,
    wrangle_snowflake_cube_dataframes
)
class CubeBaseDictVariables():

    distinct_duplicate_explore_rows: str

def get_cube_base_nested_dict():

    pd.options.mode.chained_assignment = None

    warehouse = ProjectVariables.warehouse

    sql = create_base_sql()
    explore_sql = create_cube_explore_sql()

    if warehouse == 'big_query':

        credentials = ProjectVariables.service_account
        project = ProjectVariables.project

        dataframe = pandas.read_gbq(sql, dialect='standard', project_id=project, credentials=credentials)

        wrangled_dataframe = wrangle_bigquery_cube_unnesting_dataframes(dataframe)

        explore_df = pandas.read_gbq(explore_sql, dialect='standard', project_id=project, credentials=credentials)

        pk_table_name_df = explore_df[['pk_table_name']]

        duplicate_explore_rows = pk_table_name_df[pk_table_name_df.duplicated(['pk_table_name'])]

        distinct_duplicate_explore_rows = duplicate_explore_rows['pk_table_name'].drop_duplicates().to_list()

        CubeBaseDictVariables.distinct_duplicate_explore_rows = distinct_duplicate_explore_rows

    elif warehouse == 'snowflake': 

        engine = create_engine(get_snowflake_connector_url())

        connection = engine.connect()

        dataframe = pd.read_sql(sql, connection)

        wrangled_dataframe = wrangle_snowflake_cube_dataframes(dataframe)

        explore_df = pd.read_sql(explore_sql, connection)

        pk_table_name_df = explore_df[['pk_table_name']]

        duplicate_explore_rows = pk_table_name_df[pk_table_name_df.duplicated(['pk_table_name'])]

        distinct_duplicate_explore_rows = duplicate_explore_rows['pk_table_name'].drop_duplicates().to_list()

        CubeBaseDictVariables.distinct_duplicate_explore_rows = distinct_duplicate_explore_rows
    
        connection.close()
        engine.dispose()

    if ProjectVariables.warehouse == 'big_query':

        wrangled_dataframe = {n: grp.loc[n].to_dict('index')
            
        for n, grp in wrangled_dataframe.set_index(['table_name', 'column_name','data_type','description','field_path','table_has_nested_paths','is_parent_field','field_name']).groupby(level='table_name')}

        return(wrangled_dataframe)

    elif ProjectVariables.warehouse == 'snowflake':

        wrangled_dataframe = {n: grp.loc[n].to_dict('index')
            
        for n, grp in wrangled_dataframe.set_index(['table_name', 'column_name','data_type','description']).groupby(level='table_name')}

        return(wrangled_dataframe)