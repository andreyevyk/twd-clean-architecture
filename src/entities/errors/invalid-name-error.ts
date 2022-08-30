export class InvalidNameError extends Error {
  public readonly name = 'InvalidNameError'
  constructor (email: string) {
    super('Invalid name: ' + email + '.')
  }
}
