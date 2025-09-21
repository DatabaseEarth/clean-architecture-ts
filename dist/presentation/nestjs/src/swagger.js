"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSwaggerDocument = void 0;
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("./common/decorators");
const config = new swagger_1.DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('The NestJS API description')
    .setVersion('1.0')
    .build();
const createSwaggerDocument = (app) => {
    const document = swagger_1.SwaggerModule.createDocument(app, config, {
        extraModels: [
            decorators_1.DataResponse, decorators_1.DataMetaData
        ],
    });
    swagger_1.SwaggerModule.setup('api-doc', app, document, {
        swaggerOptions: {
            docExpansion: true,
        },
    });
};
exports.createSwaggerDocument = createSwaggerDocument;
//# sourceMappingURL=swagger.js.map