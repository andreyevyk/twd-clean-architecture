import { UserDto } from '../../../src/entities/user-dto'
import { UserRepository } from '../../../src/useCases/register-user-on-mailing-list/ports/user-repository'
import { RegisterUserOnMailingList } from '../../../src/useCases/register-user-on-mailing-list/register-user-on-mailing-list'
import { InMemoryUserRepository } from '../../../src/useCases/register-user-on-mailing-list/repository/in-memory-user-repository'

describe('Register user on mailing list use case', () => {
  test('should add user with complete data to mailing list', async () => {
    const users: UserDto[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const useCase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)

    const name = 'any_name'
    const email = 'any@email.com'

    const response = await useCase.perform({ name, email })

    const user = await repo.findUserByEmail(email)

    expect(user.name).toBe('any_name')
    expect(response.value.name).toBe('any_name')
  })

  test('should not add user with invalid email', async () => {
    const users: UserDto[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const useCase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)

    const name = 'any_name'
    const invalidEmail = 'invalid_email'

    const response = await (await useCase.perform({ name, email: invalidEmail })).value as Error

    const user = await repo.findUserByEmail(invalidEmail)

    expect(user).toBe(null)
    expect(response.name).toEqual('InvalidEmailError')
  })

  test('should not add user with invalid name', async () => {
    const users: UserDto[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const useCase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)

    const invalidName = ''
    const email = 'any@email.com'

    const response = await (await useCase.perform({ name: invalidName, email })).value as Error

    const user = await repo.findUserByEmail(email)

    expect(user).toBe(null)
    expect(response.name).toEqual('InvalidNameError')
  })
})
