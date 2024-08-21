import { ErrorCode } from "src/types/enum/error-code.enum";
import { errorMessages } from './error'
import { HttpException } from "@nestjs/common";


/**根据状态码返回错误信息 */
export function getErrorMessage(code: ErrorCode) {
  return errorMessages[code] || errorMessages[ErrorCode.COMMON_ERROR_CODE_NOT_DEFINED]
}

/** 返回指定错误 */
export function responseError<T = any>(code: ErrorCode, _detail?: T) {
  const { httpStatus, message, detail } = getErrorMessage(code)
  throw new HttpException(
    {
      status: code,
      message,
      detail: detail || _detail
    },
    httpStatus
  )
}

/**
 * 返回统一格式的成功响应
 */
export function responseSuccess<T>(data: T) {
  return {
    code: 0,
    result: data === undefined ? null : data,
    message: '请求成功'
  }
}