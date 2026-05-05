"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchQueryDto = exports.FeedQueryDto = exports.SourceTypeFilter = exports.CompanyFilter = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
var CompanyFilter;
(function (CompanyFilter) {
    CompanyFilter["OpenAI"] = "OpenAI";
    CompanyFilter["Anthropic"] = "Anthropic";
    CompanyFilter["Google"] = "Google";
    CompanyFilter["Meta"] = "Meta";
    CompanyFilter["Mistral"] = "Mistral";
    CompanyFilter["NVIDIA"] = "NVIDIA";
    CompanyFilter["xAI"] = "xAI";
})(CompanyFilter || (exports.CompanyFilter = CompanyFilter = {}));
var SourceTypeFilter;
(function (SourceTypeFilter) {
    SourceTypeFilter["news"] = "news";
    SourceTypeFilter["social"] = "social";
})(SourceTypeFilter || (exports.SourceTypeFilter = SourceTypeFilter = {}));
class FeedQueryDto {
    company;
    sourceType;
    category;
    unreadOnly;
    page = 1;
    take = 10;
}
exports.FeedQueryDto = FeedQueryDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(CompanyFilter),
    __metadata("design:type", String)
], FeedQueryDto.prototype, "company", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(SourceTypeFilter),
    __metadata("design:type", String)
], FeedQueryDto.prototype, "sourceType", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FeedQueryDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value === 'true'),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], FeedQueryDto.prototype, "unreadOnly", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], FeedQueryDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], FeedQueryDto.prototype, "take", void 0);
class SearchQueryDto {
    q;
    page = 1;
    take = 10;
}
exports.SearchQueryDto = SearchQueryDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchQueryDto.prototype, "q", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], SearchQueryDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], SearchQueryDto.prototype, "take", void 0);
//# sourceMappingURL=feed-query.dto.js.map