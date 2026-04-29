import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

export const useHeroCarousel = (heroSlides) => {
  const activeHero = ref(0)
  const heroDirection = ref('next')
  const heroTextVisible = ref(false)

  let heroTimer
  let heroTextTimer

  const heroBackground = computed(() => heroSlides[activeHero.value])
  const heroTransitionName = computed(() => (heroDirection.value === 'next' ? 'hero-slide-next' : 'hero-slide-prev'))

  const restartHeroText = () => {
    heroTextVisible.value = false
    window.clearTimeout(heroTextTimer)
    heroTextTimer = window.setTimeout(() => {
      heroTextVisible.value = true
    }, 560)
  }

  const goHero = (index) => {
    if (index === activeHero.value) return
    heroDirection.value = index > activeHero.value ? 'next' : 'prev'
    activeHero.value = index
    restartHeroText()
  }

  const nextHero = () => {
    heroDirection.value = 'next'
    activeHero.value = (activeHero.value + 1) % heroSlides.length
    restartHeroText()
  }

  const startHeroCarousel = () => {
    heroSlides.forEach((slide) => {
      const image = new Image()
      image.src = slide.image
    })
    restartHeroText()
    heroTimer = window.setInterval(nextHero, 5600)
  }

  const stopHeroCarousel = () => {
    window.clearInterval(heroTimer)
    window.clearTimeout(heroTextTimer)
  }

  onMounted(() => {
    startHeroCarousel()
  })

  onBeforeUnmount(() => {
    stopHeroCarousel()
  })

  return {
    activeHero,
    goHero,
    heroBackground,
    heroTextVisible,
    heroTransitionName,
  }
}
