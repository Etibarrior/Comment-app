import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from 'sequelize-typescript'
import {User} from '../user/user.model'
import {Comment} from '../comment/comment.model'

interface PostCreationAttrs {
    text: string
    file: string
    userLogin: string
    userEmail: string
    userId: number
}

@Table({tableName: 'posts'})
export class Post extends Model<Post, PostCreationAttrs> {

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

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number

    @BelongsTo(() => User)
    author: User

    @HasMany(() => Comment)
    comment: Comment
}