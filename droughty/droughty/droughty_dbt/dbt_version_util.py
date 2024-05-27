import dbt.version
import dbt_common.semver as semver

def is_version_gte_1_8():
    """
    Checks if the installed dbt version is greater than or equal to 1.8.0.
    """
    installed_version = dbt.version.get_installed_version()
    target_version = semver.VersionSpecifier.from_version_string("1.8.0")
    return installed_version.compare(target_version) >= 0