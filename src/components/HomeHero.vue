<script setup>
defineProps({
  t: {
    type: Object,
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
})

defineEmits(['goHero'])
</script>

<template>
      <section id="home" class="relative min-h-screen overflow-hidden bg-carbon text-white">
        <div class="absolute inset-0">
          <Transition :name="heroTransitionName">
            <div :key="activeHero" class="hero-slide absolute inset-0">
              <img :src="heroBackground.image" :alt="heroBackground.label" class="absolute inset-0 h-full w-full object-cover object-center" />
            </div>
          </Transition>
          <div class="absolute inset-0 bg-gradient-to-r from-carbon/66 via-carbon/32 to-carbon/8"></div>
          <div class="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-carbon/54 to-transparent"></div>
          <div class="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-carbon/66 to-transparent"></div>
        </div>

        <div class="relative flex min-h-screen w-full flex-col justify-center px-5 pb-32 pt-36 sm:px-8 md:pt-40 lg:px-14 xl:px-20">
          <div class="hero-copy-panel max-w-6xl" :class="heroTextVisible ? 'hero-copy-visible' : 'hero-copy-hidden'">
            <h1 class="hero-copy-title whitespace-nowrap font-display text-[clamp(1.45rem,2.7vw,2.85rem)] font-semibold leading-tight text-white max-md:whitespace-normal">
              {{ t.hero.title }}
            </h1>
            <p class="hero-copy-subtitle mt-4 max-w-3xl text-base font-medium leading-7 text-white/82 md:text-lg">
              {{ t.hero.subtitle }}
            </p>
          </div>

          <div class="absolute bottom-10 left-4 right-4">
            <div class="flex w-full items-center justify-start px-1 sm:px-4 lg:px-10 xl:px-16">
              <div class="flex items-center gap-3">
                <button
                  v-for="(slide, index) in heroSlides"
                  :key="slide.label"
                  type="button"
                  class="h-3 w-3 cursor-pointer rounded-full border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  :class="activeHero === index ? 'border-champagne bg-champagne shadow-[0_0_0_6px_rgba(185,144,86,0.22)]' : 'border-white/70 bg-white/20 hover:bg-white/80'"
                  :aria-label="`Go to ${slide.label}`"
                  @click="$emit('goHero', index)"
                ></button>
              </div>
            </div>
          </div>
        </div>
      </section>
</template>
