import { EqualPasswordError } from './errors/equal-passwords'
import { UnmatchedPasswordError } from './errors/unmatched-password'

export interface ChangePassParams {
  userId: string
  currentPass: string
  newPass: string
}

export interface ChangePassword {
  change(data: ChangePassParams): Promise<void | UnmatchedPasswordError | EqualPasswordError>
}
