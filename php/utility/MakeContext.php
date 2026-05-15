<?php
declare(strict_types=1);

// OpenTopoData SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class OpenTopoDataMakeContext
{
    public static function call(array $ctxmap, ?OpenTopoDataContext $basectx): OpenTopoDataContext
    {
        return new OpenTopoDataContext($ctxmap, $basectx);
    }
}
