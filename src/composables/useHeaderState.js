import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

export const useHeaderState = (copy) => {
  const lang = ref('en')
  const menuOpen = ref(false)
  const activeMenu = ref(null)
  const headerSolid = ref(false)

  let megaCloseTimer
  let headerScrollHandler
  let lastHeaderScrollY = 0

  const t = computed(() => copy[lang.value])
  const activeMega = computed(() => (activeMenu.value ? t.value.mega[activeMenu.value] : null))

  const clearMegaTimer = () => {
    window.clearTimeout(megaCloseTimer)
  }

  const closeMenu = () => {
    menuOpen.value = false
    activeMenu.value = null
    clearMegaTimer()
  }

  const switchLanguage = () => {
    lang.value = lang.value === 'en' ? 'zh' : 'en'
    closeMenu()
  }

  const toggleMega = (id) => {
    activeMenu.value = activeMenu.value === id ? null : id
  }

  const openMega = (id) => {
    clearMegaTimer()
    activeMenu.value = id
  }

  const closeMega = () => {
    activeMenu.value = null
  }

  const scheduleMegaClose = () => {
    clearMegaTimer()
    megaCloseTimer = window.setTimeout(closeMega, 140)
  }

  const syncHeaderSolid = () => {
    const currentY = window.scrollY
    const scrollingDown = currentY > lastHeaderScrollY

    if (scrollingDown && currentY > 120) {
      headerSolid.value = true
    } else if (!scrollingDown && currentY < 60) {
      headerSolid.value = false
    } else if (currentY <= 0) {
      headerSolid.value = false
    }

    lastHeaderScrollY = currentY
  }

  onMounted(() => {
    headerScrollHandler = syncHeaderSolid
    syncHeaderSolid()
    window.addEventListener('scroll', headerScrollHandler, { passive: true })
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', headerScrollHandler)
    clearMegaTimer()
  })

  return {
    activeMega,
    activeMenu,
    cancelMegaClose: clearMegaTimer,
    closeMega,
    closeMenu,
    headerSolid,
    lang,
    menuOpen,
    openMega,
    scheduleMegaClose,
    switchLanguage,
    syncHeaderSolid,
    t,
    toggleMega,
  }
}
