type typeErrorWithMessage = {
  status: number;
  data: { message: string }
}
export const isErrorWithMessage = (error: unknown): error is typeErrorWithMessage => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'data' in error &&
    typeof (error as Record<string, unknown>).data === 'object'
  )
}

