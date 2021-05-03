import { AuthUserController } from '@/presentation/controllers/auth-user'
import { ValidatorCompositor } from '@/presentation/validation/compositor'
import { EmailValidator } from '@/presentation/validation/email-validator'
import { PasswordValidator } from '@/presentation/validation/password-validator'
import { RequiredFieldValidation } from '@/presentation/validation/required-fields'
import { authenticator } from '../usecases/authenticator'
import { makeController } from './factory'

const requiredFieldsValidation = new RequiredFieldValidation(['email', 'password'])
const passValidator = new PasswordValidator()
const emailValidator = new EmailValidator()
const validator = new ValidatorCompositor([requiredFieldsValidation, emailValidator, passValidator])

export const authUserController = makeController(new AuthUserController(validator, authenticator))
