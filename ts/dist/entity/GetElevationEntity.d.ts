import { OpenTopoDataEntityBase } from '../OpenTopoDataEntityBase';
import type { OpenTopoDataSDK } from '../OpenTopoDataSDK';
import type { Control } from '../types';
import type { GetElevation, GetElevationListMatch } from '../OpenTopoDataTypes';
declare class GetElevationEntity extends OpenTopoDataEntityBase<GetElevation> {
    constructor(client: OpenTopoDataSDK, entopts: any);
    make(this: GetElevationEntity): GetElevationEntity;
    list(this: any, reqmatch?: GetElevationListMatch, ctrl?: Control): Promise<GetElevationEntity[]>;
}
export { GetElevationEntity };
