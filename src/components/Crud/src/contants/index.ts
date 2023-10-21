import type { InjectionKey } from 'vue'
import type { ICrudTableProps } from '../types'

export const COLUMN_SETTINGS_PREFIX = 'COLUMN-'
export const DEFAULT_MAIN_COLOR = 'rgb(64, 158, 255)'

// Inject Key
export const TABLE_CONFIG_KEY = Symbol('when column settings changed') as InjectionKey<ICrudTableProps>
export const BEE_COMPONENTS_MAIN_COLOR = Symbol('main-color-theme') as InjectionKey<string>
