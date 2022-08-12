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
    const found = this.repository.find(user => user.email === email)

    return found || null
  }

  async findAllUsers (): Promise<UserDto[]> {
    return this.repository
  }

  async exists (user: UserDto): Promise<boolean> {
    if (await this.findUserByEmail(user.email) === null) {
      return false
    }
    return true
  }
}
