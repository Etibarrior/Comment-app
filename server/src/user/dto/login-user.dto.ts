import {IsEmail, Length} from 'class-validator'

export class LoginUserDto {
    @IsEmail({}, {message: 'Incorrect email'})
    readonly email: string
    @Length(6, 20, {message: 'Min 6, Max 20'})
    readonly password: string
}