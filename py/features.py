# OpenTopoData SDK feature factory

from feature.base_feature import OpenTopoDataBaseFeature
from feature.test_feature import OpenTopoDataTestFeature


def _make_feature(name):
    features = {
        "base": lambda: OpenTopoDataBaseFeature(),
        "test": lambda: OpenTopoDataTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
