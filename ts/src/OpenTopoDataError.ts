
import { Context } from './Context'


class OpenTopoDataError extends Error {

  isOpenTopoDataError = true

  sdk = 'OpenTopoData'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  OpenTopoDataError
}

