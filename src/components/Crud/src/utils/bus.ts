import mitt from 'mitt'
import type { IColumnFixedInfo, IMoveColumnPosition, IRequestConfig } from '../types'

export type emitterEvents = {
  'change-column-visible': string[]
  'change-column-export': string[]
  'change-column-fixed': IColumnFixedInfo
  'move-column-position': IMoveColumnPosition
  'export-excel': void
  'get-request-config': (config: IRequestConfig) => void
  'main-color-change': string
}

export default mitt<emitterEvents>()
