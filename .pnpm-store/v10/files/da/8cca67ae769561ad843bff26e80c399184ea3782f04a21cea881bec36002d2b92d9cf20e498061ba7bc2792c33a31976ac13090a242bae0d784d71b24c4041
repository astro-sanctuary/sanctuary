import { IModelPropertiesMapper, IJsonPropertiesMapper, TAnyKeyValueObject, TJsonaModel, TJsonaRelationships, SwitchCaseModelMapperOptionsType, SwitchCaseJsonMapperOptionsType } from './JsonaTypes';
import { ModelPropertiesMapper, JsonPropertiesMapper } from './simplePropertyMappers';
export declare class SwitchCaseModelMapper extends ModelPropertiesMapper implements IModelPropertiesMapper {
    switchAttributes: boolean;
    switchRelationships: boolean;
    switchType: boolean;
    switchChar: string;
    regex: RegExp;
    constructor(options?: SwitchCaseModelMapperOptionsType);
    getType(model: TJsonaModel): any;
    getAttributes(model: TJsonaModel): any;
    getRelationships(model: TJsonaModel): any;
    private convertFromCamelCase;
    private convertFromCamelCaseString;
}
export declare class SwitchCaseJsonMapper extends JsonPropertiesMapper implements IJsonPropertiesMapper {
    camelizeAttributes: boolean;
    camelizeRelationships: boolean;
    camelizeType: boolean;
    camelizeMeta: boolean;
    switchChar: string;
    regex: RegExp;
    constructor(options?: SwitchCaseJsonMapperOptionsType);
    createModel(type: string): TJsonaModel;
    setAttributes(model: TJsonaModel, attributes: TAnyKeyValueObject): void;
    setMeta(model: TJsonaModel, meta: TAnyKeyValueObject): void;
    setRelationships(model: TJsonaModel, relationships: TJsonaRelationships): void;
    private convertToCamelCase;
    convertToCamelCaseString(notCamelCaseString: string): string;
}
