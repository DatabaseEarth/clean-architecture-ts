import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";

export class AppRequest {
    @ApiPropertyOptional({ name: 'page', type: 'number' })
    page: number = 1;

    @ApiPropertyOptional({ name: 'size', type: 'number' })
    size: number = 10;

    @ApiPropertyOptional({ name: 'query', type: 'string' })
    query?: string;
}

export class AppResponse {
    @ApiProperty({ name: 'port', type: 'number' })
    port!: number;

    @ApiProperty({ name: 'host', type: 'string' })
    host!: string;
}