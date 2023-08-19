declare module '*.scss'
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'css-color-function' {
  interface ICssColorFunction {
    convert: (color: string) => string
    parse: (color: string) => string
  }
  const cssColorFunction: ICssColorFunction
  export default cssColorFunction
}

declare function md5(message: string | number[] | Uint8Array, options: md5.Options & { asBytes: true }): number[]
declare function md5(message: string | number[] | Uint8Array, options?: Pick<md5.Options, 'asString' | 'encoding'>): string
declare function md5(message: string | number[] | Uint8Array, options?: md5.Options): string | number[]

declare namespace md5 {
  interface Options {
    asBytes?: boolean | undefined
    asString?: boolean | undefined
    encoding?: 'binary' | string | undefined
  }
}
