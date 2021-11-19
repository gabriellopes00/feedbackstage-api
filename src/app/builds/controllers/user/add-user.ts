import { PgUserRepository } from '@/infra/database/repositories/account-repository'
import { Argon2Hasher } from '@/infra/utils/argon2-hasher'
import { IDGenerator } from '@/infra/utils/uuid-generator'
import { AddUserController } from '@/presentation/controllers/user/add-user'
import { ValidatorCompositor } from '@/presentation/validation/compositor'
import { EmailValidator } from '@/presentation/validation/email-validator'
import { NameValidator } from '@/presentation/validation/name-validator'
import { PasswordValidator } from '@/presentation/validation/password-validator'
import { RequiredFieldValidation } from '@/presentation/validation/required-fields'
import { DbAddUser } from '@/usecases/user/add-user'
import { signIn } from '../../usecases/sign-in'

const validator = new ValidatorCompositor([
  new RequiredFieldValidation(['name', 'email', 'password']),
  new NameValidator(),
  new PasswordValidator(),
  new EmailValidator()
])

const dbAddUser = new DbAddUser(new PgUserRepository(), new IDGenerator(), new Argon2Hasher())
export const addUserController = new AddUserController(validator, dbAddUser, signIn)
