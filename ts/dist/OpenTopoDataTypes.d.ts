export interface GetElevation {
    dataset: string;
    elevation: number;
    id?: string;
    location: Record<string, any>;
}
export interface GetElevationListMatch {
    id: string;
    interpolation?: string;
    location: string;
}
