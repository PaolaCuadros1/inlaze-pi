import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { Favorite } from './entities/favorite.entity';


@Injectable()
export class FavoritesService {

  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createFavoriteDto: CreateFavoriteDto) {
    const isFavorite = await this.findByMovieAndUser(createFavoriteDto.title, createFavoriteDto.userId);
    if (isFavorite) {
      throw new BadRequestException('The movie is already a favorite');
    }

    const user = await this.validateUser(createFavoriteDto.userId);

    const favorite = this.favoriteRepository.create({
      title: createFavoriteDto.title,
      backdrop_path: createFavoriteDto.backdrop_path,
      overview: createFavoriteDto.overview,
      id_tmdb: createFavoriteDto.id_tmdb,
      user,
    });
    return await this.favoriteRepository.save(favorite);
  }

  async findAll() {
    return await this.favoriteRepository.find();
  }

  async findOne(id: number) {
    return await this.favoriteRepository.findOneBy({ id });
  }

  async update(id: number, updateFavoriteDto: UpdateFavoriteDto) {
    const favorite = await this.favoriteRepository.findOneBy({ id });

    if (!favorite) {
      throw new BadRequestException('Favorite not found');
    }

    let user;
    if (updateFavoriteDto.userId) {
      let user = await this.validateUser(updateFavoriteDto.userId);
    }

    return await this.favoriteRepository.save({
      ...favorite,
      ...updateFavoriteDto,
      user,
    });
  }

  async remove(id: number) {
    return await this.favoriteRepository.delete(id);
  }

  async findByMovieAndUser(title: string, userId: number) {
    const user = await this.validateUser(userId);
    return this.favoriteRepository.findOneBy({ title, user });
  }

  async validateUser(userId: number) {
    const user = await this.userRepository.findOneBy({
      id: userId,
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

}
