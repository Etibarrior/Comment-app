import {IsEmail, IsString, Length} from 'class-validator'

export class CreateUserDto {
    @IsString({message: 'Must be a string'})
    @Length(3, 20, {message: 'Min 3, Max 20'})
    readonly login: string
    @IsEmail({}, {message: 'Incorrect email'})
    readonly email: string
    @Length(6, 20, {message: 'Min 6, Max 20'})
    readonly password: string
}