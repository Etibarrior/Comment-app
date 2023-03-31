import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    UseGuards,
    // UseInterceptors,
    // UploadedFile,
    // ParseFilePipe,
    // MaxFileSizeValidator,
    // FileTypeValidator
} from '@nestjs/common'
import {PostService} from './post.service'
import {CreatePostDto} from './dto/create-post.dto'
import {JwtAuthGuard} from '../user/jwt-auth.guard'
// import {FileInterceptor} from '@nestjs/platform-express'

@Controller('post')
export class PostController {

    constructor(private postService: PostService) {
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.CREATED)
    @Post()
    // @UseInterceptors(FileInterceptor('file'))
    // create(@UploadedFile(
        // new ParseFilePipe({
        //     validators: [
        //         new MaxFileSizeValidator({ maxSize: 1000000}),
        //         new FileTypeValidator({ fileType: /(jpeg|png|gif|plain|null)/})
        //     ]
        // })
    // ) file: Express.Multer.File, @Body() postDto: CreatePostDto) {
        create(@Body() postDto: CreatePostDto) {
        return this.postService.createPost(postDto)
    }

    @Get('page/:page')
    getAllPosts(@Param('page') page: number) {
        return this.postService.getAll(page)
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getOne(@Param('id') id: number) {
        return this.postService.getOne(id)
    }
}
