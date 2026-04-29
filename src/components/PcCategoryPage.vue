<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  t: {
    type: Object,
    required: true,
  },
  lang: {
    type: String,
    required: true,
  },
  mt1007Product: {
    type: Object,
    required: true,
  },
  mt1007Path: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['internalLink'])

const activeColorId = ref(props.mt1007Product.colors[0]?.id || '')

const activeColor = computed(() => {
  return props.mt1007Product.colors.find((color) => color.id === activeColorId.value) || props.mt1007Product.colors[0]
})

const handleFooterLink = (event, href) => {
  if (href.startsWith('http')) return
  event.preventDefault()
  const [path, hash] = href.split('#')
  emit('internalLink', event, path || '/', hash ? `#${hash}` : '')
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <section class="bg-white">
    <section class="relative min-h-[76vh] overflow-hidden bg-carbon text-white md:min-h-[86vh]">
      <img :src="mt1007Product.displayImage" alt="MT1007 PC luggage model campaign image" class="absolute inset-0 h-full w-full object-cover object-center" />
      <div class="absolute inset-0 bg-gradient-to-b from-black/28 via-black/6 to-black/34"></div>
      <div class="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/45 to-transparent"></div>
      <div class="relative mx-auto flex min-h-[76vh] max-w-[1540px] items-end justify-center px-5 pb-16 text-center md:min-h-[86vh] md:pb-24">
        <div>
          <h1 class="text-4xl font-bold leading-tight md:text-5xl">{{ lang === 'en' ? 'PC Luggage' : 'PC材质拉杆箱' }}</h1>
          <p class="mt-5 text-base font-medium text-white/86 md:text-xl">
            {{ lang === 'en' ? 'A durable travel companion for OEM/ODM programs' : '坚固百搭，全程相伴的贴心旅伴' }}
          </p>
        </div>
      </div>
    </section>

    <section class="px-5 py-16 md:px-8 md:py-20 lg:px-14 xl:px-20">
      <div class="mx-auto max-w-[1540px]">
        <nav class="flex flex-wrap items-center gap-3 text-sm text-carbon/54" aria-label="Breadcrumb">
          <a href="/" class="transition-colors duration-200 hover:text-carbon" @click="$emit('internalLink', $event, '/')">
            {{ lang === 'en' ? 'Home' : '首页' }}
          </a>
          <span class="h-4 w-px bg-carbon/18"></span>
          <a href="/#products" class="transition-colors duration-200 hover:text-carbon" @click="$emit('internalLink', $event, '/', '#products')">
            {{ lang === 'en' ? 'Product Service' : '产品服务' }}
          </a>
          <span class="h-4 w-px bg-carbon/18"></span>
          <span class="text-carbon/72">PC Luggage</span>
        </nav>

        <div class="mt-12 flex justify-center">
          <article class="w-full max-w-[560px] text-center">
            <a
              :href="mt1007Path"
              class="group block bg-[#f7f7f7] px-6 pb-9 pt-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-carbon"
              @click="$emit('internalLink', $event, mt1007Path)"
            >
              <Transition name="product-image" mode="out-in">
                <img
                  :key="activeColor.id"
                  :src="activeColor.image"
                  :alt="`${mt1007Product.model} ${activeColor.name[lang]} PC luggage`"
                  class="mx-auto h-[430px] w-full object-contain transition-transform duration-500 group-hover:scale-[1.025]"
                />
              </Transition>
              <p class="mt-6 text-sm text-carbon/58">{{ mt1007Product[lang].colorLabel }}</p>
            </a>

            <div class="mt-4 flex items-center justify-center gap-4" aria-label="Available colors">
              <button
                v-for="color in mt1007Product.colors"
                :key="color.id"
                type="button"
                class="h-7 w-7 cursor-pointer rounded-full border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-carbon"
                :class="activeColor.id === color.id ? 'scale-110 border-carbon shadow-[0_0_0_4px_rgba(20,20,20,0.08)]' : 'border-carbon/10 shadow-[0_1px_4px_rgba(20,20,20,0.12)] hover:border-carbon/45'"
                :style="{ backgroundColor: color.swatch }"
                :aria-label="`Switch to ${color.name[lang]}`"
                @click="activeColorId = color.id"
              ></button>
            </div>

            <a
              :href="mt1007Path"
              class="mt-8 inline-block text-xl font-medium text-carbon transition-colors duration-200 hover:text-champagne"
              @click="$emit('internalLink', $event, mt1007Path)"
            >
              {{ mt1007Product[lang].title }}
            </a>
          </article>
        </div>
      </div>
    </section>

    <footer class="bg-[#1b1b1b] px-5 pb-8 pt-16 text-white md:px-8 lg:px-14 xl:px-20" aria-label="METU footer">
      <div class="mx-auto grid max-w-[1540px] gap-14 lg:grid-cols-[0.9fr_1.85fr]">
        <div>
          <a href="/" class="inline-flex items-center text-4xl font-bold tracking-[0.12em] text-white" @click="$emit('internalLink', $event, '/')">METU</a>

          <div class="mt-14">
            <p class="text-2xl font-bold tracking-tight">{{ t.aboutPage.footer.phone }}</p>
            <div class="mt-6 space-y-3 text-sm font-semibold leading-6 text-white/48">
              <p>{{ lang === 'en' ? 'Email:' : '邮箱：' }} {{ t.aboutPage.footer.email }}</p>
              <p>{{ lang === 'en' ? 'Address:' : '地址：' }} {{ t.aboutPage.footer.address }}</p>
            </div>
          </div>

          <div class="mt-20 flex flex-wrap items-center gap-3">
            <span class="mr-2 text-sm font-semibold text-white/44">{{ t.aboutPage.footer.follow }}</span>
            <a
              v-for="[key, label, href] in t.aboutPage.footer.socials"
              :key="key"
              :href="href"
              :aria-label="label"
              target="_blank"
              rel="noreferrer"
              class="grid h-9 w-9 place-items-center rounded-full border border-white/18 text-xs font-bold text-white transition-colors duration-200 hover:border-white hover:bg-white hover:text-black"
            >
              {{ key === 'wechat' ? '微' : key === 'youtube' ? '▶' : key === 'pinterest' ? 'P' : key === 'linkedin' ? 'in' : key === 'instagram' ? '◎' : key === 'tiktok' ? '♪' : key === 'facebook' ? 'f' : 'X' }}
            </a>
          </div>
        </div>

        <div class="grid content-start gap-x-16 gap-y-16 md:grid-cols-2 xl:grid-cols-3">
          <section v-for="[title, links] in t.aboutPage.footer.groups" :key="title">
            <h3 class="text-base font-bold text-white">{{ title }}</h3>
            <div class="mt-6 h-1 w-full bg-white/10"></div>
            <div class="mt-7 grid gap-4">
              <a
                v-for="[label, href] in links"
                :key="label"
                :href="href"
                class="text-sm font-medium text-white/56 transition-colors duration-200 hover:text-white"
                :target="href.startsWith('http') ? '_blank' : undefined"
                :rel="href.startsWith('http') ? 'noreferrer' : undefined"
                @click="handleFooterLink($event, href)"
              >
                {{ label }}
              </a>
            </div>
          </section>
        </div>
      </div>

      <div class="mx-auto mt-16 flex max-w-[1540px] flex-wrap gap-x-4 gap-y-2 border-t border-white/10 pt-7 text-xs leading-7 text-white/48">
        <a
          v-for="[label, href] in t.aboutPage.footer.legalLinks"
          :key="label"
          :href="href"
          target="_blank"
          rel="noreferrer"
          class="transition-colors duration-200 hover:text-white"
        >
          {{ label }}
        </a>
        <p class="w-full">Copyright @ 2026 METU. {{ lang === 'en' ? 'All rights reserved.' : '版权所有。' }}</p>
      </div>
    </footer>

    <button
      type="button"
      class="fixed bottom-8 right-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-[#5b3dbb] text-white shadow-metal transition-transform duration-200 hover:-translate-y-1"
      :aria-label="lang === 'en' ? 'Back to top' : '返回顶部'"
      @click="scrollToTop"
    >
      <svg aria-hidden="true" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 19V5" />
        <path d="m5 12 7-7 7 7" />
      </svg>
    </button>
  </section>
</template>
