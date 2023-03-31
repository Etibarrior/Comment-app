import {Module} from '@nestjs/common'
import {UserController} from './user.controller'
import {UserService} from './user.service'
import {SequelizeModule} from '@nestjs/sequelize'
import {User} from './user.model'
import {Post} from '../post/post.model'
import {JwtModule} from '@nestjs/jwt'

@Module({
    controllers: [UserController],
    providers: [UserService],
    imports: [
        SequelizeModule.forFeature([User, Post]),
        JwtModule.register({
            secret: process.env.SECRET_KEY || 'SECRET',
            signOptions: {expiresIn: '5h'}
        })
    ],
    exports: [
        JwtModule
    ]
})
export class UserModule {
}
