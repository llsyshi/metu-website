<script setup>
import HomeHero from './HomeHero.vue'
import HomeMetrics from './home/HomeMetrics.vue'
import HomeIntroAbout from './home/HomeIntroAbout.vue'
import HomeProducts from './home/HomeProducts.vue'
import HomeCustom from './home/HomeCustom.vue'
import HomeFactory from './home/HomeFactory.vue'
import HomeQuality from './home/HomeQuality.vue'
import HomeContact from './home/HomeContact.vue'

defineProps({
  t: {
    type: Object,
    required: true,
  },
  lang: {
    type: String,
    required: true,
  },
  heroSlides: {
    type: Array,
    required: true,
  },
  heroBackground: {
    type: Object,
    required: true,
  },
  heroTransitionName: {
    type: String,
    required: true,
  },
  activeHero: {
    type: Number,
    required: true,
  },
  heroTextVisible: {
    type: Boolean,
    required: true,
  },
  metricValues: {
    type: Array,
    required: true,
  },
  activeService: {
    type: Number,
    required: true,
  },
  pcCategoryPath: {
    type: String,
    required: true,
  },
  factoryEnvironmentImage: {
    type: String,
    required: true,
  },
  machineImage1: {
    type: String,
    required: true,
  },
  machineImage2: {
    type: String,
    required: true,
  },
  machineGallery: {
    type: Array,
    required: true,
  },
})

defineEmits(['goHero', 'navigate', 'updateActiveService'])
</script>

<template>
  <HomeHero
    :t="t"
    :hero-slides="heroSlides"
    :hero-background="heroBackground"
    :hero-transition-name="heroTransitionName"
    :active-hero="activeHero"
    :hero-text-visible="heroTextVisible"
    @go-hero="$emit('goHero', $event)"
  />

  <HomeMetrics :t="t" :metric-values="metricValues" />
  <HomeIntroAbout :t="t" />
  <HomeProducts :t="t" :lang="lang" :pc-category-path="pcCategoryPath" @navigate="$emit('navigate', $event)" />
  <HomeCustom :t="t" :active-service="activeService" @update-active-service="$emit('updateActiveService', $event)" />
  <HomeFactory
    :t="t"
    :factory-environment-image="factoryEnvironmentImage"
    :machine-image1="machineImage1"
    :machine-image2="machineImage2"
    :machine-gallery="machineGallery"
  />
  <HomeQuality :t="t" />
  <HomeContact :t="t" />
</template>