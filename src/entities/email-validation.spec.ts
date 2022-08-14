import { Email } from './email'

describe('Email validation', () => {
  test('should not accept null strings', () => {
    const email = null
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept undefined strings', () => {
    const email = undefined
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept empty strings', () => {
    const email = ''
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should accept valid email', () => {
    const email = 'any@mail.com'
    expect(Email.validate(email)).toBeTruthy()
  })

  test('should not accept local part larget than 64 chars', () => {
    const email = 'l'.repeat(65) + '@mail.com'
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept strings larget than 320 chars', () => {
    const email = 'l'.repeat(64) + '@' + 'd'.repeat(128) + '.' + 'd'.repeat(127)
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept domain part larget than 255 chars', () => {
    const email = 'local@' + 'd'.repeat(128) + '.' + 'd'.repeat(127)
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept empty local part', () => {
    const email = '@mail.com'
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept empty domain part', () => {
    const email = 'mail@'
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept domain with a part larger ghan 63 chars', () => {
    const email = 'any@' + 'd'.repeat(64) + '.com'
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept local part with invalid char', () => {
    const email = 'any email@mail.com'
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept local part with two dots char', () => {
    const email = 'any..email@mail.com'
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept local part with ending dot', () => {
    const email = 'any.@mail.com'
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept local part with ending dot', () => {
    const email = 'anymail.com'
    expect(Email.validate(email)).toBeFalsy()
  })
})
