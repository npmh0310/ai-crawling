"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSuccessResponse = createSuccessResponse;
exports.createPaginatedResponse = createPaginatedResponse;
function createSuccessResponse(data) {
    return {
        statusCode: 200,
        success: true,
        data,
    };
}
function createPaginatedResponse(data, page, take, itemCount) {
    const meta = {
        page,
        take,
        itemCount,
        pageCount: Math.ceil(itemCount / take),
        hasPreviousPage: page > 1,
        hasNextPage: page * take < itemCount,
    };
    return {
        data,
        meta,
    };
}
//# sourceMappingURL=api-response.factory.js.map