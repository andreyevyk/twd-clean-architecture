import { UserRepository } from '../ports/user-repository'
import { UserDto } from '../user-dto'

export class InMemoryUserRepository implements UserRepository {
  constructor (private repository: UserDto[]) {
  }

  async add (user: UserDto): Promise<void> {
    const exists = await this.exists(user)
    if (!exists) {
      this.repository.push(user)
    }
  }

  async findUserByEmail (email: string): Promise<UserDto> {
    const users = this.repository.filter(user => user.email === email)
    if (users.length) {
      return users[0]
    }
    return null
  }

  findAllUsers (): Promise<UserDto[]> {
    throw new Error('Method not implemented.')
  }

  async exists (user: UserDto): Promise<boolean> {
    if (await this.findUserByEmail(user.email) === null) {
      return false
    }
    return true
  }
}
