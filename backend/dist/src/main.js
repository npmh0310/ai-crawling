"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const core_1 = require("@nestjs/core");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const response_interceptor_1 = require("./common/interceptors/response.interceptor");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter());
    app.enableCors({ origin: true, credentials: true });
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true, whitelist: true }));
    app.useGlobalInterceptors(new response_interceptor_1.ResponseInterceptor());
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    const basePort = Number(process.env.PORT ?? 3009);
    const maxAttempts = 10;
    for (let i = 0; i < maxAttempts; i += 1) {
        const port = basePort + i;
        try {
            await app.listen(port, '0.0.0.0');
            console.log(`Backend running on http://localhost:${port}`);
            return;
        }
        catch (error) {
            if (error?.code !== 'EADDRINUSE' || i === maxAttempts - 1) {
                throw error;
            }
        }
    }
}
bootstrap();
//# sourceMappingURL=main.js.map