import mitt from 'mitt'
import type { IChangeSetting } from '../types'

export type emitterEvents = { 'change-column-setting': IChangeSetting }

export default mitt<emitterEvents>()
