import {Column, DataType, HasMany, Model, Table} from 'sequelize-typescript'
import {Post} from '../post/post.model'

interface UserCreationAttrs {
    login: string
    email: string
    password: string
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataType.STRING, unique: true, allowNull: true})
    login: string

    @Column({type: DataType.STRING, unique: true, allowNull: true})
    email: string

    @Column({type: DataType.STRING, allowNull: true})
    password: string

    @HasMany(() => Post)
    posts: Post

}