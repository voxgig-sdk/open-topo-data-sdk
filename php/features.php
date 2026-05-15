<?php
declare(strict_types=1);

// OpenTopoData SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class OpenTopoDataFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new OpenTopoDataBaseFeature();
            case "test":
                return new OpenTopoDataTestFeature();
            default:
                return new OpenTopoDataBaseFeature();
        }
    }
}
