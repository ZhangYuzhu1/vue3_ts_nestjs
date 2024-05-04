import _userErrors from './_user.error'
import _authErrors from './_auth.error'
import type { ErrorMessageCollection } from 'src/types/enum/error-code.enum'

export const errorMessages: ErrorMessageCollection = {
  ..._authErrors,
  ..._userErrors,
}