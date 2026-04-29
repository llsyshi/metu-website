import { computed, reactive, ref } from 'vue'
import { useHeaderState } from './useHeaderState.js'
import { useHeroCarousel } from './useHeroCarousel.js'
import { usePageObservers } from './usePageObservers.js'
import { useSiteNavigation } from './useSiteNavigation.js'
import {
  aboutPath,
  copy,
  factoryEnvironmentImage,
  heroSlides,
  logoImage,
  machineGallery,
  machineImage1,
  machineImage2,
  machineImage4,
  mt1007Path,
  mt1007Product,
  pcCategoryPath,
  qrDarkCells,
} from '../data/siteData.js'

export const useSiteApp = () => {
  const header = useHeaderState(copy)
  const hero = useHeroCarousel(heroSlides)
  const activeService = ref(0)
  const metricValues = ref(copy.en.metrics.map((item) => item.value))
  const navigation = useSiteNavigation({
    aboutPath,
    closeMenu: header.closeMenu,
    mt1007Path,
    pcCategoryPath,
    syncHeaderSolid: header.syncHeaderSolid,
  })
  const { syncRouteEffects } = usePageObservers({
    activeAboutSection: navigation.activeAboutSection,
    metricValues,
    route: navigation.route,
    scrollToHash: navigation.scrollToHash,
    t: header.t,
  })
  const isHeaderSolid = computed(() => header.headerSolid.value || navigation.route.value.name === 'product-detail')

  navigation.setRouteEffects(syncRouteEffects)

  return reactive({
    aboutPath,
    activeService,
    factoryEnvironmentImage,
    heroSlides,
    isHeaderSolid,
    logoImage,
    machineGallery,
    machineImage1,
    machineImage2,
    machineImage4,
    metricValues,
    mt1007Path,
    mt1007Product,
    pcCategoryPath,
    qrDarkCells,
    ...header,
    ...hero,
    ...navigation,
  })
}
