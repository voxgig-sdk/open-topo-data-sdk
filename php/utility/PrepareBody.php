<?php
declare(strict_types=1);

// OpenTopoData SDK utility: prepare_body

class OpenTopoDataPrepareBody
{
    public static function call(OpenTopoDataContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
