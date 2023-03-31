import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards} from '@nestjs/common'
import {CommentService} from './comment.service'
import {CreateCommentDto} from './dto/create-comment.dto'
import {JwtAuthGuard} from '../user/jwt-auth.guard'

@Controller('comment')
export class CommentController {

    constructor(private commentService: CommentService) {
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.CREATED)
    @Post()
    create(@Body() commentDto: CreateCommentDto) {
        return this.commentService.createComment(commentDto)
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getOne(@Param('id') id: number) {
        return this.commentService.getOne(id)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getAllComments() {
        return this.commentService.getAll()
    }
}
