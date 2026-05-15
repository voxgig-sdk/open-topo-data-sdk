<?php
declare(strict_types=1);

// OpenTopoData SDK utility: result_headers

class OpenTopoDataResultHeaders
{
    public static function call(OpenTopoDataContext $ctx): ?OpenTopoDataResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
