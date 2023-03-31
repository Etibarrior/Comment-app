import {Module} from '@nestjs/common'
import {CommentController} from './comment.controller'
import {CommentService} from './comment.service'
import {SequelizeModule} from '@nestjs/sequelize'
import {Comment} from './comment.model'
import {Post} from '../post/post.model'
import {UserModule} from '../user/user.module'
import {User} from '../user/user.model'

@Module({
    controllers: [CommentController],
    providers: [CommentService],
    imports: [
        SequelizeModule.forFeature([Comment, Post, User]),
        UserModule
    ]
})
export class CommentModule {
}
