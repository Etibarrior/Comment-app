import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/sequelize'
import {Post} from './post.model'
import {CreatePostDto} from './dto/create-post.dto'
import {User} from '../user/user.model'
import {FileService} from '../file/file.service'

@Injectable()
export class PostService {

    constructor(
        @InjectModel(Post) private postRepository: typeof Post,
        @InjectModel(User) private userRepository: typeof User,
        private fileService: FileService
    ) {}

    async createPost(dto: CreatePostDto): Promise<Post> {
        // const filePath = file ? this.fileService.createFile(file) : null
        const user = await this.userRepository.findByPk(dto.userId)
        return await this.postRepository.create({
            ...dto,
            // file: filePath,
            userLogin: user.login,
            userEmail: user.email
        })
    }

    async getAll(page: number): Promise<any> {
        page = page || 1
        const limit = 5
        let offset = page * limit - limit
        const posts = await this.postRepository.findAndCountAll({limit, offset})
        return posts
    }

    async getOne(id: number): Promise<Post> {
        const post = await this.postRepository.findByPk(id, {include: {all: true}})
        return post
    }
}
