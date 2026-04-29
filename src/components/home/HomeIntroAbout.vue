<script setup>
defineProps({
  t: {
    type: Object,
    required: true,
  },
})
</script>

<template>
      <section id="about" class="bg-mist px-4 py-20 md:py-28">
        <div class="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div class="reveal-ready">
            <p class="text-sm font-semibold uppercase tracking-[0.18em] text-champagne">{{ t.about.eyebrow }}</p>
            <h2 class="mt-4 font-display text-3xl font-semibold leading-tight md:text-4xl">{{ t.about.title }}</h2>
          </div>
          <div class="reveal-ready">
            <p class="text-lg leading-9 text-carbon/68">{{ t.about.body }}</p>
            <div class="mt-8 grid gap-3 sm:grid-cols-2">
              <div v-for="point in t.about.points" :key="point" class="flex items-center gap-3 border border-carbon/10 bg-white p-4">
                <span class="grid h-8 w-8 shrink-0 place-items-center bg-carbon text-white">
                  <svg aria-hidden="true" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                    <path d="m5 12 4 4L19 6" />
                  </svg>
                </span>
                <span class="text-sm font-medium">{{ point }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
</template>
