import { IsNumber, IsString } from "class-validator";

export class CreateFavoriteDto {
    @IsString()
    title: string;

    @IsString()
    overview: string;

    @IsString()
    backdrop_path: string;

    @IsNumber()
    id_tmdb: string;

    @IsNumber()
    userId: number;

}
