import { UserDto } from '../../../entities/user-dto'

export interface UserRepository {
  add(user: UserDto): Promise<void>
  findUserByEmail(email:string): Promise<UserDto>
  findAllUsers(): Promise<UserDto[]>
  exists(user:UserDto): Promise<boolean>
}
