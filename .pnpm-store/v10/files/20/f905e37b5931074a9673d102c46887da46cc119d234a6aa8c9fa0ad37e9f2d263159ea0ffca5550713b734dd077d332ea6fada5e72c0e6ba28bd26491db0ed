"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeserializeCache = exports.jsonStringify = void 0;
function jsonStringify(json) {
    var stringified;
    try {
        stringified = JSON.stringify(json);
    }
    catch (e) {
        stringified = '';
        console.warn(e);
    }
    return stringified;
}
exports.jsonStringify = jsonStringify;
var DeserializeCache = (function () {
    function DeserializeCache() {
        this.cachedModels = {};
    }
    DeserializeCache.prototype.getCachedModel = function (data, resourceIdObject) {
        var entityKey = this.createCacheKey(data, resourceIdObject);
        return this.cachedModels[entityKey] || null;
    };
    DeserializeCache.prototype.handleModel = function (model, data, resourceIdObject) {
        var entityKey = this.createCacheKey(data, resourceIdObject);
        var dataWithPayload = data.attributes || data.relationships;
        if (entityKey && dataWithPayload) {
            this.cachedModels[entityKey] = model;
        }
    };
    DeserializeCache.prototype.createCacheKey = function (data, resourceIdObject) {
        if (!data.id || !data.type) {
            return;
        }
        var resourcePart = resourceIdObject ? "".concat(resourceIdObject.type, "-").concat(resourceIdObject.id) : '';
        if (resourceIdObject === null || resourceIdObject === void 0 ? void 0 : resourceIdObject.meta) {
            resourcePart += "-".concat(jsonStringify(resourceIdObject.meta));
        }
        if (data.meta) {
            return "".concat(data.type, "-").concat(data.id, "-").concat(jsonStringify(data.meta), "-").concat(resourcePart);
        }
        return "".concat(data.type, "-").concat(data.id, "-").concat(resourcePart);
    };
    return DeserializeCache;
}());
exports.DeserializeCache = DeserializeCache;
//# sourceMappingURL=cache.js.map