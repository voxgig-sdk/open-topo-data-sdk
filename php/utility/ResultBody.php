<?php
declare(strict_types=1);

// OpenTopoData SDK utility: result_body

class OpenTopoDataResultBody
{
    public static function call(OpenTopoDataContext $ctx): ?OpenTopoDataResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
