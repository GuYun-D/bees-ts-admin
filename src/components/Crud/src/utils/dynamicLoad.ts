import type { DynamicLoadFn } from '../types'

export const dynamicLoad = (staticOptions: any, rowData: any, dynamicLoadFn?: DynamicLoadFn) => {
  const cloneOptions = JSON.parse(JSON.stringify(staticOptions))
  if (dynamicLoadFn && typeof dynamicLoadFn === 'function') {
    const newOption = dynamicLoadFn(rowData, staticOptions)

    for (const key in cloneOptions) {
      cloneOptions[key] = newOption[key] || cloneOptions[key]
    }
  }

  return cloneOptions || {}
}
