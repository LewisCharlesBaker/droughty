"""Helper functions for droughty data prep."""

from unicodedata import category
import pandas as pd
import numpy as np

def recur_dictify(frame):
    if len(frame.columns) == 1:
        if frame.values.size == 1: return frame.values[0][0]
        return frame.values.squeeze()
    grouped = frame.groupby(frame.columns[0])
    d = {k: recur_dictify(g.iloc[:,1:]) for k,g in grouped}
    return d

def wrangle_bigquery_dataframes(dataframe):

    dataframe['description'] = dataframe['description'].fillna('not available')

    dataframe = dataframe[['table_name','column_name','data_type','description','field_path']]
    dataframe['field_path'] = dataframe['field_path'].str.lower()
    dataframe['data_type'] = dataframe['data_type'].str.lower()

    dataframe['data_type'] = dataframe['data_type'].str.replace('TIMESTAMP','timestamp')
    dataframe['data_type'] = dataframe['data_type'].str.replace('DATE','date')
    dataframe['data_type'] = dataframe['data_type'].str.replace('INT64','number')
    dataframe['data_type'] = dataframe['data_type'].str.replace('FLOAT64','number')
    dataframe['data_type'] = dataframe['data_type'].str.replace('NUMERIC','number')
    dataframe['data_type'] = dataframe['data_type'].str.replace('STRING','string')
    dataframe['data_type'] = dataframe['data_type'].str.replace('BOOL','yesno')

    return (dataframe)

def wrangle_snowflake_dataframes(dataframe):

    dataframe['description'] = dataframe['comment'].fillna('not available')

    dataframe = dataframe.groupby(['table_name', 'column_name','data_type','description']).size().reset_index().rename(columns={0:'count'})

    dataframe = dataframe[['table_name','column_name','data_type','description']]

    dataframe['data_type'] = dataframe['data_type'].replace({'TIMESTAMP':'timestamp','TIMESTAMP_TZ':'timestamp','TIMESTAMP_NTZ':'timestamp'})
    dataframe['data_type'] = dataframe['data_type'].str.replace('DATE','date')
    dataframe['data_type'] = dataframe['data_type'].str.replace('INT64','number')
    dataframe['data_type'] = dataframe['data_type'].str.replace('FLOAT64','number')
    dataframe['data_type'] = dataframe['data_type'].str.replace('NUMERIC','number')
    dataframe['data_type'] = dataframe['data_type'].str.replace('NUMBER','number')
    dataframe['data_type'] = dataframe['data_type'].str.replace('FLOAT','number')
    dataframe['data_type'] = dataframe['data_type'].str.replace('TEXT','string')
    dataframe['data_type'] = dataframe['data_type'].str.replace('VARIANT','string')   
    dataframe['data_type'] = dataframe['data_type'].str.replace('BOOLEAN','yesno')

    dataframe = dataframe.apply(lambda col: col.str.lower())

    return (dataframe)

def wrangle_bigquery_dataframes_drill_sets(dataframe):

    dataframe['data_type'] = dataframe['data_type'].str.replace('TIMESTAMP','timestamp')
    dataframe['data_type'] = dataframe['data_type'].str.replace('DATE','date')
    dataframe['data_type'] = dataframe['data_type'].str.replace('INT64','number')
    dataframe['data_type'] = dataframe['data_type'].str.replace('FLOAT64','number')
    dataframe['data_type'] = dataframe['data_type'].str.replace('NUMERIC','number')
    dataframe['data_type'] = dataframe['data_type'].str.replace('STRING','string')
    dataframe['data_type'] = dataframe['data_type'].str.replace('BOOL','yesno')

    dataframe = dataframe[dataframe["data_type"].str.contains("date|timestamp") == False]
    dataframe = dataframe[dataframe["column_name"].str.contains("_fk|_pk|natural_key") == False]

    dataframe = dataframe[['table_name','column_name']]

    return (dataframe)

def wrangle_snowflake_dataframes_drill_sets(dataframe):


    dataframe['data_type'] = dataframe['data_type'].replace({'TIMESTAMP':'timestamp','TIMESTAMP_TZ':'timestamp','TIMESTAMP_NTZ':'timestamp'})
    dataframe['data_type'] = dataframe['data_type'].str.replace('DATE','date')
    dataframe['data_type'] = dataframe['data_type'].str.replace('INT64','number')
    dataframe['data_type'] = dataframe['data_type'].str.replace('FLOAT64','number')
    dataframe['data_type'] = dataframe['data_type'].str.replace('NUMERIC','number')
    dataframe['data_type'] = dataframe['data_type'].str.replace('NUMBER','number')
    dataframe['data_type'] = dataframe['data_type'].str.replace('FLOAT','number')
    dataframe['data_type'] = dataframe['data_type'].str.replace('TEXT','string')
    dataframe['data_type'] = dataframe['data_type'].str.replace('VARIANT','string')   
    dataframe['data_type'] = dataframe['data_type'].str.replace('BOOLEAN','yesno')

    dataframe = dataframe[dataframe["data_type"].str.contains("date|timestamp") == False]

    dataframe = dataframe.groupby(['table_name', 'column_name']).size().reset_index().rename(columns={0:'count'})

    dataframe = dataframe[['table_name','column_name']]

    dataframe = dataframe.apply(lambda col: col.str.lower())
    dataframe = dataframe[dataframe["column_name"].str.contains("_fk|_pk|natural_key") == False]

    return (dataframe)

def wrangle_bigquery_dbt_test_dataframes(dataframe):

    dataframe = dataframe[['table_name','column_name','data_type']]

    dataframe['data_type'] = dataframe['data_type'].str.replace('TIMESTAMP','timestamp')
    dataframe['data_type'] = dataframe['data_type'].str.replace('DATE','date')
    dataframe['data_type'] = dataframe['data_type'].str.replace('INT64','number')
    dataframe['data_type'] = dataframe['data_type'].str.replace('FLOAT64','number')
    dataframe['data_type'] = dataframe['data_type'].str.replace('NUMERIC','number')
    dataframe['data_type'] = dataframe['data_type'].str.replace('STRING','string')
    dataframe['data_type'] = dataframe['data_type'].str.replace('BOOL','yesno')

    return (dataframe)

def wrangle_snowflake_dbt_test_dataframes(dataframe):

    dataframe['description'] = dataframe['comment'].fillna('not available')
    
    dataframe = dataframe.groupby(['table_name', 'column_name','data_type','description']).size().reset_index().rename(columns={0:'count'})

    dataframe = dataframe[['table_name','column_name','data_type','description']]

    dataframe = dataframe.apply(lambda col: col.str.lower())

    return (dataframe)

def wrangle_bigquery_dbml_dataframes(dataframe):

    dataframe['description'] = dataframe['description'].fillna('not available')

    dataframe = dataframe[['table_name','column_name','data_type','description','pk_table_name','pk_column_name','schema']]

    dataframe['data_type'] = dataframe['data_type'].str.replace('TIMESTAMP','timestamp')
    dataframe['data_type'] = dataframe['data_type'].str.replace('DATE','date')
    dataframe['data_type'] = dataframe['data_type'].str.replace('INT64','numeric')
    dataframe['data_type'] = dataframe['data_type'].str.replace('FLOAT64','numeric')
    dataframe['data_type'] = dataframe['data_type'].str.replace('NUMERIC','numeric')
    dataframe['data_type'] = dataframe['data_type'].str.replace('STRING','varchar')
    dataframe['data_type'] = dataframe['data_type'].str.replace('BOOL','boolean')

    dataframe = dataframe.apply(lambda col: col.str.lower())

    conditions = [
        (dataframe['column_name'].str.endswith('_pk')),
        (dataframe['column_name'].str.endswith('_fk')),
        (dataframe['column_name'].str.contains('natural_key')),
        (dataframe['column_name'].str.strip().str[-3] != '_fk') & (dataframe['column_name'].str.strip().str[-3] != '_pk') & (dataframe['data_type'] == 'varchar'),      
        (dataframe['data_type'] == 'numeric'),
        (dataframe['data_type'] == 'boolean'),
        (dataframe['data_type'] == 'date'),
        (dataframe['data_type'] == 'timestamp'),

        ]

    # create a list of the values we want to assign for each condition
    values = ['1', '2','3','4','5','6','7','8']

    # create a new column and use np.select to assign values to it using our lists as arguments
    dataframe['index'] = np.select(conditions, values)

    dataframe = dataframe.sort_values('index')

    return (dataframe)

def wrangle_snowflake_dbml_dataframes(dataframe):

    dataframe.drop_duplicates(keep=False, inplace=True)

    dataframe['description'] = dataframe['comment'].fillna('not available')

    dataframe = dataframe[['table_name','column_name','data_type','description','pk_table_name','pk_column_name','schema']]

    dataframe['data_type'] = dataframe['data_type'].replace({'TIMESTAMP':'timestamp','TIMESTAMP_TZ':'timestamp','TIMESTAMP_NTZ':'timestamp'})
    dataframe['data_type'] = dataframe['data_type'].str.replace('DATE','date')
    dataframe['data_type'] = dataframe['data_type'].str.replace('INT64','numeric')
    dataframe['data_type'] = dataframe['data_type'].str.replace('FLOAT64','numeric')
    dataframe['data_type'] = dataframe['data_type'].str.replace('NUMERIC','numeric')
    dataframe['data_type'] = dataframe['data_type'].str.replace('NUMBER','numeric')
    dataframe['data_type'] = dataframe['data_type'].str.replace('FLOAT','numeric')
    dataframe['data_type'] = dataframe['data_type'].str.replace('TEXT','varchar')
    dataframe['data_type'] = dataframe['data_type'].str.replace('VARIANT','varchar')   
    dataframe['data_type'] = dataframe['data_type'].str.replace('BOOLEAN','boolean')

    dataframe = dataframe.apply(lambda col: col.str.lower())

    conditions = [
        (dataframe['column_name'].str.endswith('_pk')),
        (dataframe['column_name'].str.endswith('_fk')),
        (dataframe['column_name'].str.contains('natural_key')),
        (dataframe['column_name'].str.strip().str[-3] != '_fk') & (dataframe['column_name'].str.strip().str[-3] != '_pk') & (dataframe['data_type'] == 'varchar'),       
        (dataframe['data_type'] == 'numeric'),
        (dataframe['data_type'] == 'boolean'),
        (dataframe['data_type'] == 'date'),
        (dataframe['data_type'] == 'timestamp'),

        ]

    # create a list of the values we want to assign for each condition
    values = ['1','2','3','4','5','6','7','8']

    # create a new column and use np.select to assign values to it using our lists as arguments
    dataframe['index'] = np.select(conditions, values)

    dataframe = dataframe.sort_values('index')

    return (dataframe)

def wrangle_bigquery_cube_dataframes(dataframe):

    dataframe['description'] = dataframe['description'].fillna('not available')

    dataframe = dataframe[['table_name','column_name','data_type','description','field_path','table_has_nested_paths']]
    
    dataframe['field_path'] = dataframe['field_path'].str.lower()
    dataframe['data_type'] = dataframe['data_type'].str.lower()
    dataframe['table_has_nested_paths'] = dataframe['table_has_nested_paths'].str.lower()

    dataframe['data_type'] = dataframe['data_type'].str.replace('TIMESTAMP','time')
    dataframe['data_type'] = dataframe['data_type'].str.replace('DATE','time')
    dataframe['data_type'] = dataframe['data_type'].str.replace('INT64','number')
    dataframe['data_type'] = dataframe['data_type'].str.replace('FLOAT64','number')
    dataframe['data_type'] = dataframe['data_type'].str.replace('NUMERIC','number')
    dataframe['data_type'] = dataframe['data_type'].str.replace('STRING','string')
    dataframe['data_type'] = dataframe['data_type'].str.replace('BOOL','boolean')

    return(dataframe)

def wrangle_snowflake_cube_dataframes(dataframe):

    dataframe['description'] = dataframe['comment'].fillna('not available')

    dataframe = dataframe[['table_name','column_name','data_type','description']]

    dataframe['data_type'] = dataframe['data_type'].replace({'TIMESTAMP':'timestamp','TIMESTAMP_TZ':'timestamp','TIMESTAMP_NTZ':'timestamp'})
    dataframe['data_type'] = dataframe['data_type'].str.replace('DATE','time')
    dataframe['data_type'] = dataframe['data_type'].str.replace('INT64','number')
    dataframe['data_type'] = dataframe['data_type'].str.replace('FLOAT64','number')
    dataframe['data_type'] = dataframe['data_type'].str.replace('NUMERIC','number')
    dataframe['data_type'] = dataframe['data_type'].str.replace('NUMBER','number')
    dataframe['data_type'] = dataframe['data_type'].str.replace('FLOAT','number')
    dataframe['data_type'] = dataframe['data_type'].str.replace('TEXT','string')
    dataframe['data_type'] = dataframe['data_type'].str.replace('VARIANT','string')   
    dataframe['data_type'] = dataframe['data_type'].str.replace('BOOLEAN','boolean')

    dataframe = dataframe.apply(lambda col: col.str.lower())

    dataframe = dataframe.groupby(['table_name', 'column_name','data_type','description']).size().reset_index().rename(columns={0:'count'})

    dataframe = dataframe[['table_name','column_name','data_type','description']]

    return(dataframe)

def wrangle_bigquery_cube_unnesting_dataframes(dataframe):

    dataframe['description'] = dataframe['description'].fillna('not available')

    dataframe = dataframe.loc[dataframe['table_has_nested_paths'] == 'true']

    dataframe = dataframe[['table_name','column_name','data_type','description','field_path','table_has_nested_paths','is_parent_field','field_name']]
    
    dataframe['field_path'] = dataframe['field_path'].str.lower()
    dataframe['data_type'] = dataframe['data_type'].str.lower()
    dataframe['table_has_nested_paths'] = dataframe['table_has_nested_paths'].str.lower()

    dataframe['data_type'] = dataframe['data_type'].str.replace('TIMESTAMP','time')
    dataframe['data_type'] = dataframe['data_type'].str.replace('DATE','time')
    dataframe['data_type'] = dataframe['data_type'].str.replace('INT64','number')
    dataframe['data_type'] = dataframe['data_type'].str.replace('FLOAT64','number')
    dataframe['data_type'] = dataframe['data_type'].str.replace('NUMERIC','number')
    dataframe['data_type'] = dataframe['data_type'].str.replace('STRING','string')
    dataframe['data_type'] = dataframe['data_type'].str.replace('BOOL','boolean')

    return(dataframe)
