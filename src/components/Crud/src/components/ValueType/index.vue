<template>
  <div class="bee-value__type__container">
    <template v-if="name === 'tag'">
      <el-tag @click="tagClick" v-bind="options">{{ getValue(value) }}</el-tag>
    </template>

    <template v-if="name === 'avatar'">
      <el-avatar @error="valueTypeError" v-bind="options" :src="value"></el-avatar>
    </template>

    <template v-if="name === 'img'">
      <el-image @close="imgClose" @show="imgShow" @load="imgLoad" @switch="imgSwitch" @error="valueTypeError" preview-teleported :z-index="10000" v-bind="options" :src="value" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import type { ValueTypeName, ICrudTableColumnDicts, IValueTypeEvents } from '../../types'

const props = withDefaults(
  defineProps<{
    name?: ValueTypeName
    dicts: ICrudTableColumnDicts[]
    value: any
    options?: any
    events?: any
  }>(),
  {
    name: 'tag',
    options: undefined
  }
)

let tagClick: IValueTypeEvents['click'] | null
let imgLoad: IValueTypeEvents['load'] | null
let valueTypeError: IValueTypeEvents['error'] | null
let imgSwitch: IValueTypeEvents['switch'] | null
let imgClose: IValueTypeEvents['close'] | null
let imgShow: IValueTypeEvents['show'] | null

const getValue = (value: any) => {
  if (!props.dicts || !props.dicts.length) return props.value
  const currentData = props.dicts.find((item) => item.value === value)
  if (currentData) {
    return currentData.label
  }
}

const initValueTypeEvents = (events: IValueTypeEvents) => {
  tagClick = events?.click
  imgLoad = events?.load
  valueTypeError = events?.error
  imgSwitch = events?.switch
  imgClose = events?.close
  imgShow = events?.show
}

watch(() => props.events, initValueTypeEvents, { immediate: true })
</script>

<style scoped></style>
