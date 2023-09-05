import type { InjectionKey } from 'vue'
import type { ICrudTableProps } from '../types'

export const TABLE_CONFIG_KEY = Symbol('when column settings changed') as InjectionKey<ICrudTableProps>
export const COLUMN_SETTINGS_PREFIX = 'COLUMN-'
