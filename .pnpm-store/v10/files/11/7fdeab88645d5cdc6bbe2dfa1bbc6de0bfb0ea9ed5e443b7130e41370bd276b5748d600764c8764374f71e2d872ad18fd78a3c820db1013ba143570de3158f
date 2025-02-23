import { TJsonaModel, TJsonApiBody, TJsonApiData, TJsonaDenormalizedIncludeNames, TJsonaNormalizedIncludeNamesTree, TJsonaUniqueIncluded, IModelPropertiesMapper, IModelsSerializer } from '../JsonaTypes';
export declare class ModelsSerializer implements IModelsSerializer {
    protected propertiesMapper: IModelPropertiesMapper;
    protected stuff: TJsonaModel | Array<TJsonaModel>;
    protected includeNamesTree: TJsonaNormalizedIncludeNamesTree;
    private buildIncludedIndex;
    constructor(propertiesMapper?: IModelPropertiesMapper);
    setPropertiesMapper(propertiesMapper: IModelPropertiesMapper): void;
    setStuff(stuff: TJsonaModel | TJsonaModel[]): void;
    setIncludeNames(includeNames: TJsonaDenormalizedIncludeNames | TJsonaNormalizedIncludeNamesTree): void;
    build(): TJsonApiBody;
    buildDataByModel(model: TJsonaModel | null): TJsonApiData;
    buildResourceObjectPart(relation: TJsonaModel): {
        id?: string | number;
        type: string;
    };
    buildRelationshipsByModel(model: TJsonaModel): {};
    buildIncludedByModel(model: TJsonaModel, includeTree: TJsonaNormalizedIncludeNamesTree, builtIncluded?: TJsonaUniqueIncluded): void;
    buildIncludedItem(relationModel: TJsonaModel, subIncludeTree: TJsonaNormalizedIncludeNamesTree, builtIncluded: TJsonaUniqueIncluded): void;
}
export default ModelsSerializer;
