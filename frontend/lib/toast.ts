import { sileo } from "sileo"

export const toast = {
  success: (title: string) => sileo.success({ title }),
  error: (title: string) => sileo.error({ title }),
  warning: (title: string) => sileo.warning({ title }),
  loading: (title: string) => sileo.show({ title, type: "loading" }),
  promise: <T>(
    promise: Promise<T>,
    messages: { loading: string; success: string; error: string }
  ) =>
    sileo.promise(promise, {
      loading: { title: messages.loading },
      success: { title: messages.success },
      error: { title: messages.error },
    }),
}
