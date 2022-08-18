import { Either, left } from '../shared/either'
import { Email } from './email'
import { InvalidEmailError } from './errors/invalid-email-error'
import { UserDto } from './user-dto'

export class User {
  static create (userData: UserDto): Either<InvalidEmailError, User> {
    const emailOrError = Email.create(userData.email)
    if (emailOrError.isLeft()) {
      return left(new InvalidEmailError())
    }
  }
}
