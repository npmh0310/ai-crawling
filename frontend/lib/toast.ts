import { sileo } from "sileo"

export const toast = {
  success: (title: string) => sileo.success({ title }),
  error: (title: string) => sileo.error({ title }),
  warning: (title: string) => sileo.warning({ title }),
  loading: (title: string) => sileo.loading({ title }),
  promise: <T>(
    promise: Promise<T>,
    messages: { loading: string; success: string; error: string }
  ) =>
    sileo.promise(promise, {
      loading: messages.loading,
      success: messages.success,
      error: messages.error,
    }),
}
