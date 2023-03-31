import {HttpException, HttpStatus, Injectable} from '@nestjs/common'
import {User} from './user.model'
import {InjectModel} from '@nestjs/sequelize'
import {CreateUserDto} from './dto/create-user.dto'
import * as bcrypt from 'bcryptjs'
import {JwtService} from '@nestjs/jwt'
import {LoginUserDto} from './dto/login-user.dto'

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User) private userRepository: typeof User,
        private jwtService: JwtService
    ) {
    }

    async registration(dto: CreateUserDto): Promise<string> {
        const candidateLogin = await this.userRepository.findOne({where: {login: dto.login}})
        const candidateEmail = await this.userRepository.findOne({where: {email: dto.email}})
        if (candidateLogin) {
            throw new HttpException('User with this login exists', HttpStatus.BAD_REQUEST)
        } else if (candidateEmail) {
            throw new HttpException('User with this email exists', HttpStatus.BAD_REQUEST)
        }

        const hasPassword = await bcrypt.hash(dto.password, 4)
        const user = await this.userRepository.create({...dto, password: hasPassword})
        return this.generateToken(user)
    }

    async login(dto: LoginUserDto): Promise<any> {
        const user = await this.userRepository.findOne({where: {email: dto.email}})
        if (!user) {
            throw new HttpException('Incorrect login details', HttpStatus.BAD_REQUEST)
        }

        const passwordEquals = await bcrypt.compare(dto.password, user.password)
        if (!passwordEquals) {
            throw new HttpException('Incorrect login details', HttpStatus.BAD_REQUEST)
        }
        return this.generateToken(user)
    }

    private async generateToken(user: User): Promise<any> {
        const payload = {
            id: user.id,
            login: user.login,
            email: user.email
        }
        return {
            token: this.jwtService.sign(payload)
        }
    }
}
