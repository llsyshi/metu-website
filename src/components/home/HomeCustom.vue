<script setup>
defineProps({
  t: {
    type: Object,
    required: true,
  },
  activeService: {
    type: Number,
    required: true,
  },
})

defineEmits(['updateActiveService'])
</script>

<template>
      <section id="custom" class="surface-dark px-4 py-20 text-white md:py-28">
        <div class="mx-auto max-w-7xl">
          <div class="grid gap-12 lg:grid-cols-[0.78fr_1.22fr]">
            <div class="reveal-ready">
              <p class="text-sm font-semibold uppercase tracking-[0.18em] text-champagne">{{ t.custom.eyebrow }}</p>
              <h2 class="mt-4 font-display text-3xl font-semibold leading-tight md:text-4xl">{{ t.custom.title }}</h2>
            </div>
            <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <article
                v-for="([num, title, desc], index) in t.custom.steps"
                :key="num" class="cursor-pointer border border-white/12 bg-white/[0.05] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-champagne/70 hover:bg-white/[0.08]"
                :class="activeService === index ? 'border-champagne/70 bg-white/[0.08]' : ''"
                @mouseenter="$emit('updateActiveService', index)"
              >
                <p class="text-sm font-semibold text-champagne">{{ num }}</p>
                <h3 class="mt-6 text-xl font-semibold">{{ title }}</h3>
                <p class="mt-4 text-sm leading-7 text-white/62">{{ desc }}</p>
              </article>
            </div>
          </div>
        </div>
      </section>
</template>
