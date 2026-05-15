<?php
declare(strict_types=1);

// OpenTopoData SDK exists test

require_once __DIR__ . '/../opentopodata_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = OpenTopoDataSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
