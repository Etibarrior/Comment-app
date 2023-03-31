import {Body, Controller, HttpCode, HttpStatus, Post} from '@nestjs/common'
import {CreateUserDto} from './dto/create-user.dto'
import {UserService} from './user.service'
import {LoginUserDto} from './dto/login-user.dto'

@Controller('user')
export class UserController {

    constructor(private userService: UserService) {
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        return this.userService.registration(userDto)
    }

    @Post('/login')
    login(@Body() userDto: LoginUserDto) {
        return this.userService.login(userDto)
    }
}
