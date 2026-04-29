<script setup>
import SiteHeader from './components/SiteHeader.vue'
import HomePage from './components/HomePage.vue'
import AboutPage from './components/AboutPage.vue'
import PcCategoryPage from './components/PcCategoryPage.vue'
import ProductDetailPage from './components/ProductDetailPage.vue'
import { useSiteApp } from './composables/useSiteApp.js'

const site = useSiteApp()
</script>

<template>
  <div :lang="site.lang" class="min-h-screen bg-mist text-carbon">
    <SiteHeader
      :t="site.t"
      :logo-image="site.logoImage"
      :header-solid="site.isHeaderSolid"
      :menu-open="site.menuOpen"
      :active-menu="site.activeMenu"
      :active-mega="site.activeMega"
      :about-path="site.aboutPath"
      @update:menu-open="site.menuOpen = $event"
      @open-mega="site.openMega"
      @close-mega="site.closeMega"
      @schedule-mega-close="site.scheduleMegaClose"
      @cancel-mega-close="site.cancelMegaClose"
      @switch-language="site.switchLanguage"
      @internal-link="site.handleInternalLink"
      @nav-link="site.handleNavLink"
      @toggle-mega="site.toggleMega"
      @navigate="site.navigateTo"
    />
    <main>
      <HomePage
        v-if="site.route.name === 'home'"
        :t="site.t"
        :lang="site.lang"
        :hero-slides="site.heroSlides"
        :hero-background="site.heroBackground"
        :hero-transition-name="site.heroTransitionName"
        :active-hero="site.activeHero"
        :hero-text-visible="site.heroTextVisible"
        :metric-values="site.metricValues"
        :active-service="site.activeService"
        :pc-category-path="site.pcCategoryPath"
        :factory-environment-image="site.factoryEnvironmentImage"
        :machine-image1="site.machineImage1"
        :machine-image2="site.machineImage2"
        :machine-gallery="site.machineGallery"
        @go-hero="site.goHero"
        @navigate="site.navigateTo"
        @update-active-service="site.activeService = $event"
      />
      <AboutPage
        v-else-if="site.route.name === 'about'"
        :t="site.t"
        :lang="site.lang"
        :about-path="site.aboutPath"
        :active-about-section="site.activeAboutSection"
        :active-about-history="site.activeAboutHistory"
        :factory-environment-image="site.factoryEnvironmentImage"
        :machine-image4="site.machineImage4"
        :logo-image="site.logoImage"
        :qr-dark-cells="site.qrDarkCells"
        @internal-link="site.handleInternalLink"
        @about-anchor="site.handleAboutAnchor"
        @set-about-history="site.setAboutHistory"
        @footer-link="site.handleFooterLink"
        @scroll-to-hash="site.scrollToHash"
      />
      <PcCategoryPage
        v-else-if="site.route.name === 'pc-category'"
        :t="site.t"
        :lang="site.lang"
        :mt1007-product="site.mt1007Product"
        :mt1007-path="site.mt1007Path"
        @internal-link="site.handleInternalLink"
      />

      <ProductDetailPage
        v-else-if="site.route.name === 'product-detail'"
        :lang="site.lang"
        :mt1007-product="site.mt1007Product"
        :active-product-color="site.activeProductColor"
        :active-product-image="site.activeProductImage"
        :pc-category-path="site.pcCategoryPath"
        @internal-link="site.handleInternalLink"
        @set-product-color="site.setProductColor"
        @set-product-image="site.setProductImage"
      />
    </main>
  </div>
</template>
