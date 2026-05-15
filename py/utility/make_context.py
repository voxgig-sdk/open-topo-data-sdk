# OpenTopoData SDK utility: make_context

from core.context import OpenTopoDataContext


def make_context_util(ctxmap, basectx):
    return OpenTopoDataContext(ctxmap, basectx)
