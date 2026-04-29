<script setup>
defineProps({
  t: {
    type: Object,
    required: true,
  },
})
</script>

<template>
      <section id="contact" class="bg-carbon px-4 py-20 text-white md:py-28">
        <div class="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1fr]">
          <div class="reveal-ready">
            <p class="text-sm font-semibold uppercase tracking-[0.18em] text-champagne">{{ t.contact.eyebrow }}</p>
            <h2 class="mt-4 font-display text-3xl font-semibold leading-tight md:text-4xl">{{ t.contact.title }}</h2>
            <p class="mt-6 text-lg leading-9 text-white/66">{{ t.contact.intro }}</p>
            <div class="mt-9 divide-y divide-white/10 border-y border-white/10">
              <div v-for="[label, value] in t.contact.details" :key="label" class="grid grid-cols-[120px_1fr] gap-4 py-4 text-sm">
                <span class="text-white/44">{{ label }}</span>
                <span class="text-white/82">{{ value }}</span>
              </div>
            </div>
          </div>

          <form class="reveal-ready bg-white p-5 text-carbon md:p-8" @submit.prevent>
            <div class="grid gap-4 md:grid-cols-2">
              <label class="block">
                <span class="mb-2 block text-sm font-medium">{{ t.contact.form.name }}</span>
                <input class="w-full border border-carbon/12 bg-mist px-4 py-3 outline-none transition-colors duration-200 focus:border-carbon" type="text" />
              </label>
              <label class="block">
                <span class="mb-2 block text-sm font-medium">{{ t.contact.form.company }}</span>
                <input class="w-full border border-carbon/12 bg-mist px-4 py-3 outline-none transition-colors duration-200 focus:border-carbon" type="text" />
              </label>
            </div>
            <label class="mt-4 block">
              <span class="mb-2 block text-sm font-medium">{{ t.contact.form.email }}</span>
              <input class="w-full border border-carbon/12 bg-mist px-4 py-3 outline-none transition-colors duration-200 focus:border-carbon" type="text" />
            </label>
            <label class="mt-4 block">
              <span class="mb-2 block text-sm font-medium">{{ t.contact.form.message }}</span>
              <textarea class="min-h-40 w-full resize-y border border-carbon/12 bg-mist px-4 py-3 outline-none transition-colors duration-200 focus:border-carbon"></textarea>
            </label>
            <button
              type="submit"
              class="mt-5 inline-flex w-full cursor-pointer items-center justify-center gap-3 bg-carbon px-6 py-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-champagne hover:text-carbon focus:outline-none focus-visible:ring-2 focus-visible:ring-carbon"
            >
              {{ t.contact.form.button }}
              <svg aria-hidden="true" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </button>
          </form>
        </div>
      </section>
</template>
