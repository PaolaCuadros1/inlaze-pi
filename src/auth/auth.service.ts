import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';


@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ){}

    async register(registerDto: RegisterDto){
        const user = await this.usersService.findByEmail(registerDto.email);
        if(user){
            throw new BadRequestException('User already registered');
        }
        registerDto.password = bcryptjs.hashSync(registerDto.password, 8);
        return await this.usersService.create(registerDto);
    }

    async login(loginDto: LoginDto){
        const user = await this.usersService.findByEmail(loginDto.email);
        if(!user){
            throw new UnauthorizedException('Email or password are wrong');
        }
        const password = await bcryptjs.compare(loginDto.password, user.password);
        if(!password){
            throw new UnauthorizedException('Email or password are wrong');
        }

        const payload = {email: user.email};
        const token = await this.jwtService.signAsync(payload);
        return token;
    }
}
