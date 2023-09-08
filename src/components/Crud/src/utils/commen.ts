export const isEmptyObj = (value: any) => {
  try {
    return ['{}', '[]'].includes(JSON.stringify(value))
  } catch (error) {
    return false
  }
}
