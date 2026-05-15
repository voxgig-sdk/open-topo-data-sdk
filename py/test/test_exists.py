# ProjectName SDK exists test

import pytest
from opentopodata_sdk import OpenTopoDataSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = OpenTopoDataSDK.test(None, None)
        assert testsdk is not None
