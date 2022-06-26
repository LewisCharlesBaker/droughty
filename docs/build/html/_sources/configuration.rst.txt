Configuration
=============

Setting up droughty to run is pretty easy. It depends on two files, a droughty_project.yaml file within the root of your repo and a profile.yaml file within a .droughty/ dir within your user dir

**droughty_project.yaml set-up**

To differentiate between multiple warehouse targets within the profiles.yaml file, droughty uses a droughty_project.yaml to specify a project specific target. Find an droughty_project.yaml file below::

  profile: example_project

  dimensional_inference: enabled

  field_description_path: warehouse_docs
  field_description_file_name: field_descriptions.md

  test_schemas:
      - lewis_analytics_dev_staging
      - lewis_analytics_dev_integration
      - lewis_analytics_dev

  dbml_schemas:
      - lewis_analytics_dev_staging
      - lewis_analytics_dev_integration
      - lewis_analytics_dev
  
  dbml_filenames:
      - test_10
      - test_11
      - test_12

  explores:
    parent_table: 
      - example_parent
    dimensions: 
      - example_dim
    facts:
      - example_fact

  lookml_base_filename: example__1
  lookml_explore_filename: example__2
  lookml_measures_filename: example__3
  cube_base_filename: example__4
  cube_integration_filename: example__5
  cube_measures_filename: example__6
  dbt_tests_filename: example__8

Create this file in the root of your git repo (unless you are specifying the path through the --project-dir argument)

Optional variables
==================

**Defining relative file outputs**

Just add these variables to your droughty_project.yaml and it will write to the path name starting from the root of your git repo::

  dbt_path: example_path
  dbml_path: example_path
  lookml_path: example_path
  cube_path: example_path

**It's important that the profile name with the droughty_project.yaml aligns with the paired entry within your profile.yaml.**


--------------

**profile.yaml set-up**

A profile.yaml file is used to pass warehouse permissions to droughty, such as warehouse key files, project, schema names and other permissions. 


This file should be created in a .droughty dir, such as::

      /Users/titus_groan/.droughty/profile.yaml

Below is an example of what the profile should contain

profile example::

    droughty_demo:

      host:

      key_file: /Users/droughty_user/[key_file]

      password:

      port:

      project_name: example-project

      schema_name: analytics_qa

      user: 

      warehouse_name: big_query

--------------

**warehouse_name options**

At the moment, only 'big_query' and 'snowflake' are supported


**Configuration Considerations**

droughty has been developed to work with dbt, db docs and looker. However, it only really depends accessing the information schema within a supported warehouse.

When using droughty it's assumed that the warehouse structure it points towards has at least three data sets, staging, integration and a analytics layer. Look at the usage page for further information.