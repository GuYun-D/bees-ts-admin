import { ref, watch } from 'vue'

export default (isClickBodyClose = true) => {
  const contextMenuVisible = ref<boolean>(false)
  const contextMenuStyle = ref({
    left: '0',
    top: '0'
  })

  const _setContextMenuPosition = (e: MouseEvent) => {
    const { x, y } = e
    contextMenuStyle.value.left = x + 10 + 'px'
    contextMenuStyle.value.top = y + 'px'
  }

  const toggleContextMenu = (e: MouseEvent) => {
    _setContextMenuPosition(e)
    contextMenuVisible.value = !contextMenuVisible.value
  }

  const openContextMenu = (e: MouseEvent) => {
    _setContextMenuPosition(e)
    contextMenuVisible.value = true
  }

  const closeContextMenu = () => {
    contextMenuVisible.value = false
  }

  if (isClickBodyClose) {
    watch(
      () => contextMenuVisible.value,
      (newVisible: boolean) => {
        if (newVisible) {
          document.body.addEventListener('click', closeContextMenu)
        } else {
          document.body.removeEventListener('click', closeContextMenu)
        }
      },
      {
        immediate: true
      }
    )
  }

  return { contextMenuVisible, toggleContextMenu, openContextMenu, closeContextMenu, contextMenuStyle }
}
