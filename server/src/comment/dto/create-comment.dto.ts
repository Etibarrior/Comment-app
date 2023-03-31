export class CreateCommentDto {
    readonly text: string
    readonly file: string
    readonly postId: number
    readonly commentId: number
    readonly userId: number
}