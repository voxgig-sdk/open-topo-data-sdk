import { Context } from './Context';
declare class OpenTopoDataError extends Error {
    isOpenTopoDataError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { OpenTopoDataError };
