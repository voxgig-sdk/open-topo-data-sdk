<?php
declare(strict_types=1);

// OpenTopoData SDK base feature

class OpenTopoDataBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(OpenTopoDataContext $ctx, array $options): void {}
    public function PostConstruct(OpenTopoDataContext $ctx): void {}
    public function PostConstructEntity(OpenTopoDataContext $ctx): void {}
    public function SetData(OpenTopoDataContext $ctx): void {}
    public function GetData(OpenTopoDataContext $ctx): void {}
    public function GetMatch(OpenTopoDataContext $ctx): void {}
    public function SetMatch(OpenTopoDataContext $ctx): void {}
    public function PrePoint(OpenTopoDataContext $ctx): void {}
    public function PreSpec(OpenTopoDataContext $ctx): void {}
    public function PreRequest(OpenTopoDataContext $ctx): void {}
    public function PreResponse(OpenTopoDataContext $ctx): void {}
    public function PreResult(OpenTopoDataContext $ctx): void {}
    public function PreDone(OpenTopoDataContext $ctx): void {}
    public function PreUnexpected(OpenTopoDataContext $ctx): void {}
}
