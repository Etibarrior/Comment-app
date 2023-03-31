import {Module} from '@nestjs/common'
import {PostController} from './post.controller'
import {PostService} from './post.service'
import {SequelizeModule} from '@nestjs/sequelize'
import {Post} from './post.model'
import {User} from '../user/user.model'
import {Comment} from '../comment/comment.model'
import {UserModule} from '../user/user.module'
import {FileService} from '../file/file.service'

@Module({
    controllers: [PostController],
    providers: [PostService, FileService],
    imports: [
        SequelizeModule.forFeature([Post, User, Comment]),
        UserModule
    ]
})
export class PostModule {
}
