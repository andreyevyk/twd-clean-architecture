import { UserDto } from '../../../../src/entities/user-dto'
import { InMemoryUserRepository } from './in-memory-user-repository'

describe('In memory User repository', () => {
  test('should return null if user is not found', async () => {
    const users: UserDto[] = []
    const sut = new InMemoryUserRepository(users)
    const user = await sut.findUserByEmail('any@email.com')
    expect(user).toBeNull()
  })

  test('should return user if it is found in the repository', async () => {
    const users: UserDto[] = []
    const name = 'any_name'
    const email = 'any@mail.com'
    const sut = new InMemoryUserRepository(users)
    await sut.add({
      name,
      email
    })
    const user = await sut.findUserByEmail('any@mail.com')
    expect(user.name).toBe('any_name')
  })

  test('shoudl return all users in the repository', async () => {
    const users: UserDto[] = [{ email: 'any@mail.com', name: 'any_name' },
      { email: 'second@mail.com', name: 'second_name' }]

    const sut = new InMemoryUserRepository(users)
    const returnedUsers = await sut.findAllUsers()

    expect(returnedUsers).toHaveLength(2)
  })
})
