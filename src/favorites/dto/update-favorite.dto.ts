import { PartialType } from '@nestjs/mapped-types';
import { CreateFavoriteDto } from './create-favorite.dto';
import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateFavoriteDto extends PartialType(CreateFavoriteDto) {
    @IsString()
    @ApiProperty({
        type: String,
        description: 'Movie name: this is an optional property',
    })
    title: string;

    @IsString()
    @ApiProperty({
        type: String,
        description: 'Overview: this is an optional property',
    })
    overview: string;

    @IsString()
    @ApiProperty({
        type: String,
        description: 'Backdrop path: this is an optional property',
    })
    backdrop_path: string;

    @IsString()
    @ApiProperty({
        type: String,
        description: 'Movie id: this is an optional property',
    })
    id_tmdb: string;

    @IsNumber()
    @ApiProperty({
        type: Number,
        description: 'User id: this is an optional property',
    })
    userId: number;
}
