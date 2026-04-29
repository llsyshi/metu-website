import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

export const useSiteNavigation = ({ aboutPath, closeMenu, mt1007Path, pcCategoryPath, syncHeaderSolid }) => {
  const parseRoute = () => {
    const path = window.location.pathname.replace(/\/$/, '') || '/'
    if (path.toLowerCase() === mt1007Path.toLowerCase()) return { name: 'product-detail' }
    if (path.toLowerCase() === pcCategoryPath.toLowerCase()) return { name: 'pc-category' }
    if (path.toLowerCase() === aboutPath.toLowerCase()) return { name: 'about' }
    return { name: 'home' }
  }

  const route = ref(parseRoute())
  const activeProductColor = ref('red')
  const activeProductImage = ref(0)
  const activeAboutSection = ref(window.location.hash ? window.location.hash.replace('#', '') : 'company')
  const activeAboutHistory = ref(0)

  let popstateHandler
  let routeEffects = () => {}
  let smoothWheelFrame

  const clampScroll = (value) => {
    const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0)
    return Math.min(Math.max(value, 0), maxScroll)
  }

  const easeOutQuart = (progress) => 1 - Math.pow(1 - progress, 4)

  const animateScrollTo = (targetY, duration = 1250) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.scrollTo(0, targetY)
      return
    }

    if (smoothWheelFrame) {
      cancelAnimationFrame(smoothWheelFrame)
      smoothWheelFrame = null
    }

    const startY = window.scrollY
    const distance = clampScroll(targetY) - startY
    if (Math.abs(distance) < 1) return

    const start = performance.now()
    const tick = (time) => {
      const progress = Math.min((time - start) / duration, 1)
      window.scrollTo(0, startY + distance * easeOutQuart(progress))
      if (progress < 1) {
        smoothWheelFrame = requestAnimationFrame(tick)
        return
      }
      smoothWheelFrame = null
    }

    smoothWheelFrame = requestAnimationFrame(tick)
  }

  const scrollToHash = (hash, behavior = 'smooth') => {
    if (!hash) {
      if (behavior === 'auto') {
        window.scrollTo({ top: 0, behavior })
        syncHeaderSolid()
      } else {
        animateScrollTo(0, route.value.name === 'about' ? 1350 : 900)
      }
      return
    }

    nextTick(() => {
      requestAnimationFrame(() => {
        const target = document.querySelector(hash)
        if (!target) return
        if (behavior === 'auto') {
          target.scrollIntoView({ behavior, block: 'start' })
          syncHeaderSolid()
          return
        }

        const top = target.getBoundingClientRect().top + window.scrollY
        animateScrollTo(top, route.value.name === 'about' ? 1350 : 900)
      })
    })
  }

  const setRouteEffects = (effects) => {
    routeEffects = effects
  }

  const navigateTo = (path, hash = '') => {
    const target = `${path}${hash}`
    window.history.pushState({}, '', target)
    route.value = parseRoute()
    if (route.value.name === 'about') {
      activeAboutSection.value = hash ? hash.replace('#', '') : 'company'
    }
    closeMenu()
    scrollToHash(hash)
  }

  const handleInternalLink = (event, path, hash = '') => {
    event.preventDefault()
    navigateTo(path, hash)
  }

  const handleNavLink = (event, href) => {
    event.preventDefault()
    if (href.startsWith('#')) {
      navigateTo('/', href)
      return
    }
    const [path, hash] = href.split('#')
    navigateTo(path || '/', hash ? `#${hash}` : '')
  }

  const handleAboutAnchor = (event, id) => {
    event.preventDefault()
    activeAboutSection.value = id
    navigateTo(aboutPath, `#${id}`)
  }

  const setAboutHistory = (index) => {
    activeAboutHistory.value = index
  }

  const handleFooterLink = (event, href) => {
    if (href.startsWith('http')) return
    event.preventDefault()
    const [path, hash] = href.split('#')
    navigateTo(path || '/', hash ? `#${hash}` : '')
  }

  const setProductImage = (index) => {
    activeProductImage.value = index
  }

  const setProductColor = (id) => {
    activeProductColor.value = id
    activeProductImage.value = 0
  }

  watch(
    () => route.value.name,
    () => {
      routeEffects()
    },
  )

  onMounted(() => {
    popstateHandler = () => {
      route.value = parseRoute()
      routeEffects(true)
    }
    window.addEventListener('popstate', popstateHandler)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('popstate', popstateHandler)
    if (smoothWheelFrame) {
      cancelAnimationFrame(smoothWheelFrame)
    }
  })

  return {
    activeAboutHistory,
    activeAboutSection,
    activeProductColor,
    activeProductImage,
    handleAboutAnchor,
    handleFooterLink,
    handleInternalLink,
    handleNavLink,
    navigateTo,
    route,
    scrollToHash,
    setAboutHistory,
    setProductColor,
    setProductImage,
    setRouteEffects,
  }
}
