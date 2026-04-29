import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

export const usePageObservers = ({ activeAboutSection, metricValues, route, scrollToHash, t }) => {
  const visibleMetrics = ref(false)

  let aboutSectionObserver
  let metricFrame
  let metricObserver
  let revealObserver

  const getMetricTargets = () => t.value.metrics.map((item) => item.value)

  const syncMetricTargets = () => {
    metricValues.value = getMetricTargets()
  }

  const startMetricCount = () => {
    if (visibleMetrics.value) return
    visibleMetrics.value = true

    const start = performance.now()
    const duration = 1200
    const targets = getMetricTargets()
    const starts = metricValues.value.length === targets.length ? [...metricValues.value] : targets.map(() => 0)

    const tick = (time) => {
      const progress = Math.min((time - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      metricValues.value = targets.map((target, index) => Math.round(starts[index] + (target - starts[index]) * eased))
      if (progress < 1) {
        metricFrame = requestAnimationFrame(tick)
      }
    }

    metricFrame = requestAnimationFrame(tick)
  }

  const observeRevealTargets = () => {
    if (!revealObserver) return
    document.querySelectorAll('.reveal-ready:not(.reveal-in)').forEach((el) => {
      revealObserver.observe(el)
    })
  }

  const syncAboutSectionObserver = () => {
    aboutSectionObserver?.disconnect()
    if (route.value.name !== 'about') return

    const sections = [...document.querySelectorAll('[data-about-section]')]
    if (!sections.length) return

    aboutSectionObserver = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]

        if (visibleEntry?.target?.id) {
          activeAboutSection.value = visibleEntry.target.id
        }
      },
      { rootMargin: '-32% 0px -58% 0px', threshold: 0 },
    )

    sections.forEach((section) => aboutSectionObserver.observe(section))
  }

  const syncRouteEffects = (shouldScroll = false, behavior = 'smooth') => {
    if (route.value.name === 'about') {
      activeAboutSection.value = window.location.hash ? window.location.hash.replace('#', '') : 'company'
    }

    nextTick(() => {
      observeRevealTargets()
      syncAboutSectionObserver()
      if (shouldScroll) {
        scrollToHash(window.location.hash, behavior)
      }
    })
  }

  const setupPageObservers = () => {
    syncMetricTargets()

    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-in')
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.14 },
    )

    syncRouteEffects(Boolean(window.location.hash), 'auto')

    const metricSection = document.querySelector('[data-metrics]')
    if (metricSection) {
      metricObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            startMetricCount()
            metricObserver.disconnect()
          }
        },
        { rootMargin: '0px 0px 35% 0px', threshold: 0 },
      )
      metricObserver.observe(metricSection)
    }
  }

  watch(t, syncMetricTargets)

  const cleanupPageObservers = () => {
    revealObserver?.disconnect()
    metricObserver?.disconnect()
    aboutSectionObserver?.disconnect()
    if (metricFrame) {
      cancelAnimationFrame(metricFrame)
    }
  }

  onMounted(() => {
    setupPageObservers()
  })

  onBeforeUnmount(() => {
    cleanupPageObservers()
  })

  return {
    syncRouteEffects,
  }
}
