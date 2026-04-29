<script setup>
defineProps({
  t: {
    type: Object,
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
</script>

<template>
      <section id="factory" class="bg-white px-4 py-20 md:py-28">
        <div class="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div class="reveal-ready">
            <p class="text-sm font-semibold uppercase tracking-[0.18em] text-champagne">{{ t.capability.eyebrow }}</p>
            <h2 class="mt-4 font-display text-3xl font-semibold leading-tight md:text-4xl">{{ t.capability.title }}</h2>
            <div class="mt-10 space-y-5">
              <article v-for="[title, desc] in t.capability.list" :key="title" class="border-l-2 border-champagne bg-mist p-5">
                <h3 class="text-xl font-semibold">{{ title }}</h3>
                <p class="mt-2 text-sm leading-7 text-carbon/62">{{ desc }}</p>
              </article>
            </div>
          </div>

          <div class="reveal-ready">
            <div class="grid grid-cols-2 gap-4">
              <img :src="factoryEnvironmentImage" alt="METU factory environment" class="col-span-2 h-80 w-full object-cover" />
              <img :src="machineImage1" alt="Factory production machine" class="h-56 w-full object-cover" />
              <img :src="machineImage2" alt="Factory equipment detail" class="mt-10 h-56 w-full object-cover" />
            </div>
            <div class="mt-6 bg-carbon p-8 text-white">
              <p class="text-sm font-semibold uppercase tracking-[0.18em] text-champagne">{{ t.factory.eyebrow }}</p>
              <h2 class="mt-3 text-2xl font-semibold">{{ t.factory.title }}</h2>
              <p class="mt-4 text-sm leading-7 text-white/66">{{ t.factory.body }}</p>
              <div class="mt-6 grid gap-3 sm:grid-cols-2">
                <span v-for="feature in t.factory.features" :key="feature" class="border border-white/12 px-4 py-3 text-sm text-white/76">{{ feature }}</span>
              </div>
            </div>
            <div class="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
              <img
                v-for="(image, index) in machineGallery"
                :key="index"
                :src="image"
                :alt="`METU production equipment ${index + 1}`"
                class="h-28 w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
</template>
