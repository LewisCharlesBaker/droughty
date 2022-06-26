.. droughty documentation master file, created by
   sphinx-quickstart on Wed Jan 19 11:39:42 2022.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

Welcome to droughty's documentation!
====================================

.. toctree::
   :maxdepth: 2

   installation
   configuration
   warehouse_support
   usage
   commands


#### droughty.
## adjective, drought·i·er, drought·i·est.
## dry.

Droughty helps keep your workflow *ah hem* dry 

==================

**What is droughty?**

droughty is an analytics engineering toolkit. It takes warehouse metadata and outputs semantic files.

Current tools and supported platforms are:

- lookml - generates a lkml with views, explores and measures from a warehouse schema 
- dbt - generates a base schema from specified warehouse schemas. Includes standard testing routines
- dbml - generates an ERD based on the warehouse layer of your warehouse. Includes pk, fk relationships
- cube - generates a cube schema including dimensions, integrations and meassures

The purpose of this project is to automate the repetitive, dull elements of analytics engineering in the modern data stack. It turns out this also leads to cleaner projects, less human error and increases the likelihood of the basics getting done...

**Documentation**

Installation, configuration and usage documentation can be found on `ReadTheDocs <https://droughty.readthedocs.io/en/latest/>`_

**Installation**

droughty is available through `pip <https://pypi.org/project/droughty>`_::

    pip install droughty


==================

**Dependencies**

droughty uses a number of open-source projects to work properly:

- [lkml](https://pypi.org/project/lkml/) - This project uses lkml  as its base parser - John Temple
- [ruamel.yaml](https://pypi.org/project/ruamel.yaml/) - Yaml parser -  Anthon van der Neut
- Pandas
- Python Git
- Click
- Pandas GBQ
- Protobuf
- snowflake_connector_python

==================

**Considerations**

You need to run Droughty from a git repo. It uses the Git package to control certain relative dirs
Currently the cli sub-commands have an issue where all they are not mutually exclusive. This needs to be resolved but doesn't impact usage dramatically.