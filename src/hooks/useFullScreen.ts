import { ref, onMounted, onUnmounted } from 'vue'
import screenfull from 'screenfull'
import { ElMessage } from 'element-plus'
import i18n from '@/i18n'
import type { Screenfull } from 'screenfull'
import type { Ref } from 'vue'

interface IUseFullScreen {
  isAllowScreenFull: Ref<boolean>
  isScreenFull: Ref<boolean>
  screenfull: Screenfull
}

export default (element?: HTMLElement): IUseFullScreen => {
  const isScreenFull = ref<boolean>(false)
  const isAllowScreenFull = ref<boolean>(screenfull.isEnabled)

  if (isAllowScreenFull.value) {
    if (element) {
      ;(screenfull as Screenfull).request(element)
    }

    const change = () => {
      isScreenFull.value = (screenfull as Screenfull).isFullscreen
    }

    onMounted(() => {
      ;(screenfull as Screenfull).on('change', change)
    })

    onUnmounted(() => {
      ;(screenfull as Screenfull).off('change', change)
    })
  } else {
    ElMessage.warning(i18n.global.t('sys.unAllowScreen'))
  }

  return {
    isAllowScreenFull,
    isScreenFull,
    screenfull: screenfull as Screenfull
  }
}
