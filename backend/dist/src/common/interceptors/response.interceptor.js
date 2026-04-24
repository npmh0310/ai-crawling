"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const api_response_factory_1 = require("../responses/api-response.factory");
let ResponseInterceptor = class ResponseInterceptor {
    intercept(context, next) {
        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode ?? 200;
        return next.handle().pipe((0, operators_1.map)((result) => {
            if (result === null || result === undefined) {
                return { ...(0, api_response_factory_1.createSuccessResponse)(null), statusCode };
            }
            if (this.isPaginatedResponse(result)) {
                return {
                    ...result,
                    statusCode,
                    success: true,
                };
            }
            return { ...(0, api_response_factory_1.createSuccessResponse)(result), statusCode };
        }));
    }
    isPaginatedResponse(result) {
        return Boolean(result && typeof result === 'object' && Array.isArray(result.data) && result.meta);
    }
};
exports.ResponseInterceptor = ResponseInterceptor;
exports.ResponseInterceptor = ResponseInterceptor = __decorate([
    (0, common_1.Injectable)()
], ResponseInterceptor);
//# sourceMappingURL=response.interceptor.js.map