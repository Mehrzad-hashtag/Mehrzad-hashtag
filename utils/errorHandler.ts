/**
 * استخراج پیام خطا از پاسخ‌های مختلف بک‌اند
 * @param errOrRes - پاسخ خطا یا response از API
 * @returns پیام خطای قابل نمایش به کاربر
 */
const getBackendMessage = (errOrRes: any): string => {
  try {
    // حالت API که مثل نمونه شما داده برمی‌گردونه
    if (errOrRes?.Message && typeof errOrRes.Message === 'string') {
      try {
        const inner = JSON.parse(errOrRes.Message)
        if (inner?.Exception) return inner.Exception
        return errOrRes.Message
      } catch {
        return errOrRes.Message
      }
    }

    // حالت axios: err.response.data
    if (errOrRes?.response?.data?.Message) {
      const msg = errOrRes.response.data.Message
      try {
        const inner = JSON.parse(msg)
        return inner?.Exception || msg
      } catch {
        return msg
      }
    }

    // حالت useFetch: err.data
    if (errOrRes?.data?.Message) {
      const msg = errOrRes.data.Message
      try {
        const inner = JSON.parse(msg)
        return inner?.Exception || msg
      } catch {
        return msg
      }
    }

    // اگر فقط message معمولی داشت
    if (errOrRes?.message) return errOrRes.message

    return 'خطای ناشناخته'
  } catch {
    return 'خطای ناشناخته'
  }
}

// مثال استفاده:
// const errorMessage = getBackendMessage(apiResponse)
// console.log(errorMessage) // "اس ام اس هر 2 دقیقه یک بار میتواند ارسال شود"

export { getBackendMessage }

// نمونه‌ای از داده ورودی که شما ارسال کردید:
const exampleError = {
  IsSuccess: false,
  StatusCode: 2,
  Message: "{\"Exception\":\"اس ام اس هر 2 دقیقه یک بار میتواند ارسال شود\",\"StackTrace\":\"   at Kadiato.Services._User.UserService.SendVerificationCodeAsync...\"}"
}

// تست تابع با داده نمونه
console.log('Test result:', getBackendMessage(exampleError))
// خروجی: "اس ام اس هر 2 دقیقه یک بار میتواند ارسال شود"