import mitt from 'mitt'
import type { IColumnFixedInfo, IMoveColumnPosition } from '../types'

export type emitterEvents = {
  'change-column-visible': string[]
  'change-column-fixed': IColumnFixedInfo
  'move-column-position': IMoveColumnPosition
}

export default mitt<emitterEvents>()
