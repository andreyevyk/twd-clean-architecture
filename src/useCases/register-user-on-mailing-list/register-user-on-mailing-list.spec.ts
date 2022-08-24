import { UserDto } from '../../entities/user-dto'
import { UserRepository } from './ports/user-repository'
import { RegisterUserOnMailingList } from './register-user-on-mailing-list'
import { InMemoryUserRepository } from './repository/in-memory-user-repository'

describe('Register user on mailing list use case', () => {
  test('should add user with complete data to mailing list', async () => {
    const users: UserDto[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const useCase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)

    const name = 'any_name'
    const email = 'any@email.com'

    const response = await useCase.perform({ name, email })

    const user = await repo.findUserByEmail('any@email.com')

    expect(user.name).toBe('any_name')
    expect(response.value.name).toBe('any_name')
  })
})
