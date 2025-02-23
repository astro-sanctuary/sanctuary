"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwitchCaseJsonMapper = exports.SwitchCaseModelMapper = void 0;
var tslib_1 = require("tslib");
var simplePropertyMappers_1 = require("./simplePropertyMappers");
var utils_1 = require("./utils");
var SwitchCaseModelMapper = (function (_super) {
    tslib_1.__extends(SwitchCaseModelMapper, _super);
    function SwitchCaseModelMapper(options) {
        var _this = _super.call(this) || this;
        var _a = options || {}, _b = _a.switchAttributes, switchAttributes = _b === void 0 ? true : _b, _c = _a.switchRelationships, switchRelationships = _c === void 0 ? true : _c, _d = _a.switchType, switchType = _d === void 0 ? true : _d, _e = _a.switchChar, switchChar = _e === void 0 ? '-' : _e;
        _this.switchAttributes = switchAttributes;
        _this.switchRelationships = switchRelationships;
        _this.switchType = switchType;
        _this.switchChar = switchChar;
        _this.regex = new RegExp(/([a-z][A-Z0-9])/g);
        return _this;
    }
    SwitchCaseModelMapper.prototype.getType = function (model) {
        var type = _super.prototype.getType.call(this, model);
        if (!this.switchType || !type) {
            return type;
        }
        return this.convertFromCamelCaseString(type);
    };
    SwitchCaseModelMapper.prototype.getAttributes = function (model) {
        var camelCasedAttributes = _super.prototype.getAttributes.call(this, model);
        if (!this.switchAttributes || !camelCasedAttributes) {
            return camelCasedAttributes;
        }
        return this.convertFromCamelCase(camelCasedAttributes);
    };
    SwitchCaseModelMapper.prototype.getRelationships = function (model) {
        var camelCasedRelationships = _super.prototype.getRelationships.call(this, model);
        if (!this.switchRelationships || !camelCasedRelationships) {
            return camelCasedRelationships;
        }
        return this.convertFromCamelCase(camelCasedRelationships);
    };
    SwitchCaseModelMapper.prototype.convertFromCamelCase = function (stuff) {
        var _this = this;
        if (Array.isArray(stuff)) {
            return stuff.map(function (item) { return _this.convertFromCamelCase(item); });
        }
        if ((0, utils_1.isPlainObject)(stuff)) {
            var converted_1 = {};
            Object.entries(stuff).forEach(function (_a) {
                var propName = _a[0], value = _a[1];
                var kebabName = _this.convertFromCamelCaseString(propName);
                converted_1[kebabName] = _this.convertFromCamelCase(value);
            });
            return converted_1;
        }
        return stuff;
    };
    SwitchCaseModelMapper.prototype.convertFromCamelCaseString = function (camelCaseString) {
        var _this = this;
        return camelCaseString.replace(this.regex, function (g) { return g[0] + _this.switchChar + g[1].toLowerCase(); });
    };
    return SwitchCaseModelMapper;
}(simplePropertyMappers_1.ModelPropertiesMapper));
exports.SwitchCaseModelMapper = SwitchCaseModelMapper;
var SwitchCaseJsonMapper = (function (_super) {
    tslib_1.__extends(SwitchCaseJsonMapper, _super);
    function SwitchCaseJsonMapper(options) {
        var _this = _super.call(this) || this;
        var _a = options || {}, _b = _a.camelizeAttributes, camelizeAttributes = _b === void 0 ? true : _b, _c = _a.camelizeRelationships, camelizeRelationships = _c === void 0 ? true : _c, _d = _a.camelizeType, camelizeType = _d === void 0 ? true : _d, _e = _a.camelizeMeta, camelizeMeta = _e === void 0 ? false : _e, _f = _a.switchChar, switchChar = _f === void 0 ? '-' : _f;
        _this.camelizeAttributes = camelizeAttributes;
        _this.camelizeRelationships = camelizeRelationships;
        _this.camelizeType = camelizeType;
        _this.camelizeMeta = camelizeMeta;
        _this.switchChar = switchChar;
        _this.regex = new RegExp("".concat(_this.switchChar, "([a-z0-9])"), 'g');
        return _this;
    }
    SwitchCaseJsonMapper.prototype.createModel = function (type) {
        if (!this.camelizeType) {
            return { type: type };
        }
        var camelizedType = this.convertToCamelCaseString(type);
        return { type: camelizedType };
    };
    SwitchCaseJsonMapper.prototype.setAttributes = function (model, attributes) {
        if (!this.camelizeAttributes) {
            return _super.prototype.setAttributes.call(this, model, attributes);
        }
        Object.assign(model, this.convertToCamelCase(attributes));
    };
    SwitchCaseJsonMapper.prototype.setMeta = function (model, meta) {
        if (!this.camelizeMeta) {
            return _super.prototype.setMeta.call(this, model, meta);
        }
        model.meta = this.convertToCamelCase(meta);
    };
    SwitchCaseJsonMapper.prototype.setRelationships = function (model, relationships) {
        var _this = this;
        _super.prototype.setRelationships.call(this, model, relationships);
        if (!this.camelizeRelationships) {
            return;
        }
        model[simplePropertyMappers_1.RELATIONSHIP_NAMES_PROP].forEach(function (kebabName, i) {
            var camelName = _this.convertToCamelCaseString(kebabName);
            if (camelName !== kebabName) {
                model[camelName] = model[kebabName];
                delete model[kebabName];
                model[simplePropertyMappers_1.RELATIONSHIP_NAMES_PROP][i] = camelName;
            }
        });
    };
    SwitchCaseJsonMapper.prototype.convertToCamelCase = function (stuff) {
        var _this = this;
        if (Array.isArray(stuff)) {
            return stuff.map(function (item) { return _this.convertToCamelCase(item); });
        }
        if ((0, utils_1.isPlainObject)(stuff)) {
            var converted_2 = {};
            Object.entries(stuff).forEach(function (_a) {
                var propName = _a[0], value = _a[1];
                var camelName = _this.convertToCamelCaseString(propName);
                converted_2[camelName] = _this.convertToCamelCase(value);
            });
            return converted_2;
        }
        return stuff;
    };
    SwitchCaseJsonMapper.prototype.convertToCamelCaseString = function (notCamelCaseString) {
        return notCamelCaseString.replace(this.regex, function (g) { return g[1].toUpperCase(); });
    };
    return SwitchCaseJsonMapper;
}(simplePropertyMappers_1.JsonPropertiesMapper));
exports.SwitchCaseJsonMapper = SwitchCaseJsonMapper;
//# sourceMappingURL=switchCasePropertyMappers.js.map