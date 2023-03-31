import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from 'sequelize-typescript'
import {Post} from '../post/post.model'

interface CommentCreationAttrs {
    text: string
    file: string
    postId: number
    commentId: number
    userLogin: string
    userEmail: string
}

@Table({tableName: 'comment'})
export class Comment extends Model<Comment, CommentCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataType.STRING, allowNull: true})
    text: string

    @Column({type: DataType.STRING})
    file: string

    @Column({type: DataType.STRING, allowNull: true})
    userLogin: string

    @Column({type: DataType.STRING, allowNull: true})
    userEmail: string

    @ForeignKey(() => Post)
    @Column({type: DataType.INTEGER})
    postId: number

    @ForeignKey(() => Comment)
    @Column({type: DataType.INTEGER})
    commentId: number

    @BelongsTo(() => Post)
    post: Post

    @HasMany(() => Comment)
    comments: Comment

}