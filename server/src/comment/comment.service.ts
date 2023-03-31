import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/sequelize'
import {Comment} from './comment.model'
import {CreateCommentDto} from './dto/create-comment.dto'
import {User} from '../user/user.model'

@Injectable()
export class CommentService {

    constructor(
        @InjectModel(Comment) private commentRepository: typeof Comment,
        @InjectModel(User) private userRepository: typeof User
    ) {
    }

    async createComment(dto: CreateCommentDto): Promise<Comment> {
        const user = await this.userRepository.findByPk(dto.userId)
        const comment = await this.commentRepository.create({...dto, userLogin: user.login, userEmail: user.email})
        return comment
    }

    async getOne(id: number): Promise<Comment> {
        const comment = await this.commentRepository.findByPk(id, {include: {all: true}})
        return comment
    }

    async getAll(): Promise<Comment[]> {
        const comments = await this.commentRepository.findAll({include: {all: true}})
        return comments
    }
}
