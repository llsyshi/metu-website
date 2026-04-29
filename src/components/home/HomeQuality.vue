<script setup>
defineProps({
  t: {
    type: Object,
    required: true,
  },
})
</script>

<template>
      <section id="quality" class="bg-mist px-4 py-20 md:py-28">
        <div class="mx-auto max-w-7xl">
          <div class="reveal-ready mb-12 max-w-3xl">
            <p class="text-sm font-semibold uppercase tracking-[0.18em] text-champagne">{{ t.quality.eyebrow }}</p>
            <h2 class="mt-4 font-display text-3xl font-semibold leading-tight md:text-4xl">{{ t.quality.title }}</h2>
          </div>
          <div class="grid gap-3 md:grid-cols-3">
            <div v-for="(item, index) in t.quality.list" :key="item" class="reveal-ready flex items-center gap-4 border border-carbon/10 bg-white p-5">
              <span class="text-sm font-semibold text-champagne">{{ String(index + 1).padStart(2, '0') }}</span>
              <span class="text-sm font-medium leading-6">{{ item }}</span>
            </div>
          </div>
        </div>
      </section>
</template>
