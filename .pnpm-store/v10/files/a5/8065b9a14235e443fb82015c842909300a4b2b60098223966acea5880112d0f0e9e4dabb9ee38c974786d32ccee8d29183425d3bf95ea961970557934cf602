"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelsSerializer = void 0;
var tslib_1 = require("tslib");
var utils_1 = require("../utils");
var ModelsSerializer = (function () {
    function ModelsSerializer(propertiesMapper) {
        propertiesMapper && this.setPropertiesMapper(propertiesMapper);
        this.buildIncludedIndex = 0;
    }
    ModelsSerializer.prototype.setPropertiesMapper = function (propertiesMapper) {
        this.propertiesMapper = propertiesMapper;
    };
    ModelsSerializer.prototype.setStuff = function (stuff) {
        this.stuff = stuff;
    };
    ModelsSerializer.prototype.setIncludeNames = function (includeNames) {
        if (Array.isArray(includeNames)) {
            var includeNamesTree_1 = {};
            includeNames.forEach(function (namesChain) {
                (0, utils_1.createIncludeNamesTree)(namesChain, includeNamesTree_1);
            });
            this.includeNamesTree = includeNamesTree_1;
        }
        else {
            this.includeNamesTree = includeNames;
        }
    };
    ModelsSerializer.prototype.build = function () {
        var _a = this, stuff = _a.stuff, propertiesMapper = _a.propertiesMapper;
        if (!propertiesMapper || typeof propertiesMapper !== 'object') {
            throw new Error('ModelsSerializer cannot build, propertiesMapper is not set');
        }
        else if (!stuff || typeof stuff !== 'object') {
            throw new Error('ModelsSerializer cannot build, stuff is not set');
        }
        var body = {};
        var uniqueIncluded = {};
        if (stuff && Array.isArray(stuff)) {
            var collectionLength = stuff.length;
            var data = [];
            for (var i = 0; i < collectionLength; i++) {
                data.push(this.buildDataByModel(stuff[i]));
                this.buildIncludedByModel(stuff[i], this.includeNamesTree, uniqueIncluded);
            }
            body['data'] = data;
        }
        else if (stuff) {
            body['data'] = this.buildDataByModel(stuff);
            this.buildIncludedByModel(stuff, this.includeNamesTree, uniqueIncluded);
        }
        else if (stuff === null) {
            body['data'] = null;
        }
        if (Object.keys(uniqueIncluded).length) {
            body['included'] = Object.values(uniqueIncluded);
        }
        return body;
    };
    ModelsSerializer.prototype.buildDataByModel = function (model) {
        var id = this.propertiesMapper.getId(model);
        var type = this.propertiesMapper.getType(model);
        var attributes = this.propertiesMapper.getAttributes(model);
        var data = tslib_1.__assign(tslib_1.__assign({ type: type }, (typeof id !== 'undefined' ? { id: id } : {})), (typeof attributes !== 'undefined' ? { attributes: attributes } : {}));
        if (typeof data.type !== 'string' || !data.type) {
            console.warn('ModelsSerializer cannot buildDataByModel, type is not set or incorrect', model);
            throw new Error('ModelsSerializer cannot buildDataByModel, type is not set or incorrect');
        }
        var relationships = this.buildRelationshipsByModel(model);
        if (relationships && Object.keys(relationships).length) {
            data['relationships'] = relationships;
        }
        return data;
    };
    ModelsSerializer.prototype.buildResourceObjectPart = function (relation) {
        var id = this.propertiesMapper.getId(relation);
        var type = this.propertiesMapper.getType(relation);
        return tslib_1.__assign({ type: type }, (typeof id === 'undefined' ? {} : { id: id }));
    };
    ModelsSerializer.prototype.buildRelationshipsByModel = function (model) {
        var _this = this;
        var relations = this.propertiesMapper.getRelationships(model);
        if (!relations || !Object.keys(relations).length) {
            return;
        }
        var relationships = {};
        Object.keys(relations).forEach(function (k) {
            var relation = relations[k];
            if (Array.isArray(relation)) {
                var relationshipData = [];
                for (var _i = 0, relation_1 = relation; _i < relation_1.length; _i++) {
                    var relationItem = relation_1[_i];
                    var relationshipDataItem = _this.buildResourceObjectPart(relationItem);
                    if ('type' in relationshipDataItem) {
                        relationshipData.push(relationshipDataItem);
                    }
                    else {
                        console.error("Can't create data item for relationship ".concat(k, ",\n                            it doesn't have 'id' or 'type', it was skipped"), relationItem);
                    }
                }
                relationships[k] = {
                    data: relationshipData
                };
            }
            else if (relation) {
                var item = _this.buildResourceObjectPart(relation);
                if ('type' in item) {
                    relationships[k] = {
                        data: item
                    };
                }
                else {
                    console.error("Can't create data for relationship ".concat(k, ", it doesn't have 'type', it was skipped"), relation);
                }
            }
            else {
                relationships[k] = {
                    data: relation
                };
            }
        });
        return relationships;
    };
    ModelsSerializer.prototype.buildIncludedByModel = function (model, includeTree, builtIncluded) {
        if (builtIncluded === void 0) { builtIncluded = {}; }
        if (!includeTree || !Object.keys(includeTree).length) {
            return;
        }
        var modelRelationships = this.propertiesMapper.getRelationships(model);
        if (!modelRelationships || !Object.keys(modelRelationships).length) {
            return;
        }
        var includeNames = Object.keys(includeTree);
        var includeNamesLength = includeNames.length;
        for (var i = 0; i < includeNamesLength; i++) {
            var currentRelationName = includeNames[i];
            var relation = modelRelationships[currentRelationName];
            if (relation) {
                if (Array.isArray(relation)) {
                    var relationModelsLength = relation.length;
                    for (var r = 0; r < relationModelsLength; r++) {
                        var relationModel = relation[r];
                        this.buildIncludedItem(relationModel, includeTree[currentRelationName], builtIncluded);
                    }
                }
                else {
                    this.buildIncludedItem(relation, includeTree[currentRelationName], builtIncluded);
                }
            }
        }
    };
    ModelsSerializer.prototype.buildIncludedItem = function (relationModel, subIncludeTree, builtIncluded) {
        var id = this.propertiesMapper.getId(relationModel);
        var type = this.propertiesMapper.getType(relationModel);
        var includeKey = type + id;
        if (!id || !builtIncluded[includeKey]) {
            if (includeKey in builtIncluded) {
                includeKey += this.buildIncludedIndex;
                this.buildIncludedIndex += 1;
            }
            builtIncluded[includeKey] = this.buildDataByModel(relationModel);
            if (subIncludeTree) {
                this.buildIncludedByModel(relationModel, subIncludeTree, builtIncluded);
            }
        }
    };
    return ModelsSerializer;
}());
exports.ModelsSerializer = ModelsSerializer;
exports.default = ModelsSerializer;
//# sourceMappingURL=ModelsSerializer.js.map