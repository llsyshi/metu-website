<script setup>
defineProps({
  t: {
    type: Object,
    required: true,
  },
  lang: {
    type: String,
    required: true,
  },
  pcCategoryPath: {
    type: String,
    required: true,
  },
})

defineEmits(['navigate'])
</script>

<template>
      <section id="products" class="bg-white px-4 py-20 md:py-28">
        <div class="mx-auto max-w-7xl">
          <div class="reveal-ready mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div class="max-w-3xl">
              <p class="text-sm font-semibold uppercase tracking-[0.18em] text-champagne">{{ t.products.eyebrow }}</p>
              <h2 class="mt-4 font-display text-3xl font-semibold leading-tight md:text-4xl">{{ t.products.title }}</h2>
            </div>
            <p class="max-w-xl text-base leading-8 text-carbon/62">{{ t.products.intro }}</p>
          </div>

          <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <article
              v-for="([name, desc, image], index) in t.products.list"
              :key="name"
              :class="index === 0 ? 'lg:col-span-2 cursor-pointer' : ''" class="reveal-ready group overflow-hidden border border-carbon/10 bg-mist"
              @click="index === 0 && $emit('navigate', pcCategoryPath)"
            >
              <div :class="index === 0 ? 'h-[440px]' : 'h-72'" class="relative overflow-hidden bg-carbon">
                <template v-if="image">
                  <div class="image-sheen absolute inset-0">
                    <img :src="image" :alt="`${name} product image`" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                  </div>
                  <div class="absolute inset-0 flex items-end bg-gradient-to-t from-carbon/80 via-carbon/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span class="m-5 border border-white/24 bg-white/12 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md">
                      {{ t.meta.inquiry }}
                    </span>
                  </div>
                </template>
                <div v-else class="flex h-full w-full items-center justify-center bg-mist p-6 text-center">
                  <span class="border border-carbon/12 bg-white px-5 py-3 text-sm font-semibold text-carbon/48">
                    {{ lang === 'en' ? 'No product photo' : '没有' }}
                  </span>
                </div>
              </div>
              <div class="flex items-start justify-between gap-6 p-6">
                <div>
                  <h3 class="text-xl font-semibold">{{ name }}</h3>
                  <p class="mt-3 max-w-2xl text-sm leading-7 text-carbon/62">{{ desc }}</p>
                </div>
                <span v-if="index === 0" class="mt-1 grid h-9 w-9 shrink-0 place-items-center border border-carbon/15 text-carbon">
                  <svg aria-hidden="true" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                    <path d="M7 17 17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </span>
                <span v-else class="mt-1 shrink-0 border border-carbon/10 px-3 py-2 text-xs font-semibold text-carbon/42">
                  {{ lang === 'en' ? 'No photo' : '没有' }}
                </span>
              </div>
            </article>
          </div>
        </div>
      </section>
</template>
