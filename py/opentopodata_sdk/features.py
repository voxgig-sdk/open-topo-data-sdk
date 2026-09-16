# OpenTopoData SDK feature factory

from opentopodata_sdk.feature.base_feature import OpenTopoDataBaseFeature
from opentopodata_sdk.feature.ratelimit_feature import OpenTopoDataRatelimitFeature
from opentopodata_sdk.feature.retry_feature import OpenTopoDataRetryFeature
from opentopodata_sdk.feature.test_feature import OpenTopoDataTestFeature
from opentopodata_sdk.feature.timeout_feature import OpenTopoDataTimeoutFeature


_FEATURES = {
    "base": lambda: OpenTopoDataBaseFeature(),
    "ratelimit": lambda: OpenTopoDataRatelimitFeature(),
    "retry": lambda: OpenTopoDataRetryFeature(),
    "test": lambda: OpenTopoDataTestFeature(),
    "timeout": lambda: OpenTopoDataTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
