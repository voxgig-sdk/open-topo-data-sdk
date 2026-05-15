<?php
declare(strict_types=1);

// OpenTopoData SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

OpenTopoDataUtility::setRegistrar(function (OpenTopoDataUtility $u): void {
    $u->clean = [OpenTopoDataClean::class, 'call'];
    $u->done = [OpenTopoDataDone::class, 'call'];
    $u->make_error = [OpenTopoDataMakeError::class, 'call'];
    $u->feature_add = [OpenTopoDataFeatureAdd::class, 'call'];
    $u->feature_hook = [OpenTopoDataFeatureHook::class, 'call'];
    $u->feature_init = [OpenTopoDataFeatureInit::class, 'call'];
    $u->fetcher = [OpenTopoDataFetcher::class, 'call'];
    $u->make_fetch_def = [OpenTopoDataMakeFetchDef::class, 'call'];
    $u->make_context = [OpenTopoDataMakeContext::class, 'call'];
    $u->make_options = [OpenTopoDataMakeOptions::class, 'call'];
    $u->make_request = [OpenTopoDataMakeRequest::class, 'call'];
    $u->make_response = [OpenTopoDataMakeResponse::class, 'call'];
    $u->make_result = [OpenTopoDataMakeResult::class, 'call'];
    $u->make_point = [OpenTopoDataMakePoint::class, 'call'];
    $u->make_spec = [OpenTopoDataMakeSpec::class, 'call'];
    $u->make_url = [OpenTopoDataMakeUrl::class, 'call'];
    $u->param = [OpenTopoDataParam::class, 'call'];
    $u->prepare_auth = [OpenTopoDataPrepareAuth::class, 'call'];
    $u->prepare_body = [OpenTopoDataPrepareBody::class, 'call'];
    $u->prepare_headers = [OpenTopoDataPrepareHeaders::class, 'call'];
    $u->prepare_method = [OpenTopoDataPrepareMethod::class, 'call'];
    $u->prepare_params = [OpenTopoDataPrepareParams::class, 'call'];
    $u->prepare_path = [OpenTopoDataPreparePath::class, 'call'];
    $u->prepare_query = [OpenTopoDataPrepareQuery::class, 'call'];
    $u->result_basic = [OpenTopoDataResultBasic::class, 'call'];
    $u->result_body = [OpenTopoDataResultBody::class, 'call'];
    $u->result_headers = [OpenTopoDataResultHeaders::class, 'call'];
    $u->transform_request = [OpenTopoDataTransformRequest::class, 'call'];
    $u->transform_response = [OpenTopoDataTransformResponse::class, 'call'];
});
