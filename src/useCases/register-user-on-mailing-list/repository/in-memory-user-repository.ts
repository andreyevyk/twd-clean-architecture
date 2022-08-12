import { UserRepository } from '../ports/user-repository'
import { UserDto } from '../user-dto'

export class InMemoryUserRepository implements UserRepository {
  constructor (private repository: UserDto[]) {
  }

  add (user: UserDto): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async findUserByEmail (email: string): Promise<UserDto> {
    return null
  }

  findAllUsers (): Promise<UserDto[]> {
    throw new Error('Method not implemented.')
  }

  exists (user: UserDto): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
}
