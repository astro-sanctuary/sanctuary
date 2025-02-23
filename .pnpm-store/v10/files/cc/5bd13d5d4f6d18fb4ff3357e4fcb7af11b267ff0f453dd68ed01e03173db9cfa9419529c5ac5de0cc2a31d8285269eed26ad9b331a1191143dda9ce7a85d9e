import { IDeserializeCache, TAnyKeyValueObject, TJsonaModel, TJsonApiData, TResourceIdObj } from './JsonaTypes';
export declare function jsonStringify(json: TAnyKeyValueObject): string;
export declare class DeserializeCache implements IDeserializeCache {
    protected cachedModels: {};
    getCachedModel(data: TJsonApiData, resourceIdObject: TResourceIdObj): any;
    handleModel(model: TJsonaModel, data: TJsonApiData, resourceIdObject: TResourceIdObj): void;
    createCacheKey(data: any, resourceIdObject?: TResourceIdObj): string;
}
