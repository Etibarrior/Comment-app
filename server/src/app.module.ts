import {Module} from '@nestjs/common'
import {UserModule} from './user/user.module'
import {PostModule} from './post/post.module'
import {CommentModule} from './comment/comment.module'
import {ConfigModule} from '@nestjs/config'
import {SequelizeModule} from '@nestjs/sequelize'
import {User} from './user/user.model'
import {Post} from './post/post.model'
import {Comment} from './comment/comment.model'
import { FileModule } from './file/file.module';
import {ServeStaticModule} from '@nestjs/serve-static'
import * as path from 'path'

@Module({
    imports: [
        UserModule,
        PostModule,
        CommentModule,
        FileModule,
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Post, Comment],
            autoLoadModels: true
        }),
        ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, 'static')})
    ],
    controllers: [],
    providers: []
})
export class AppModule {
}
