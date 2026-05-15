<?php
declare(strict_types=1);

// OpenTopoData SDK utility: feature_add

class OpenTopoDataFeatureAdd
{
    public static function call(OpenTopoDataContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
