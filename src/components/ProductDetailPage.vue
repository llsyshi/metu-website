<script setup>
import { computed } from 'vue'

const props = defineProps({
  lang: {
    type: String,
    required: true,
  },
  mt1007Product: {
    type: Object,
    required: true,
  },
  activeProductColor: {
    type: String,
    required: true,
  },
  activeProductImage: {
    type: Number,
    required: true,
  },
  pcCategoryPath: {
    type: String,
    required: true,
  },
})

defineEmits(['internalLink', 'setProductColor', 'setProductImage'])

const activeColor = computed(() => {
  return props.mt1007Product.colors.find((color) => color.id === props.activeProductColor) || props.mt1007Product.colors[0]
})

const activeGallery = computed(() => activeColor.value?.gallery || props.mt1007Product.gallery)
const activeImage = computed(() => activeGallery.value[props.activeProductImage] || activeGallery.value[0])
const detailImages = computed(() => activeGallery.value.slice(1, 5))
</script>

<template>
  <section class="bg-white px-5 pb-24 pt-28 md:px-8 md:pt-32 lg:px-14 xl:px-20">
    <div class="mx-auto max-w-[1540px]">
      <div class="grid gap-8 lg:grid-cols-[150px_minmax(0,1fr)_430px] xl:grid-cols-[170px_minmax(0,1fr)_460px]">
        <aside class="lg:pt-1">
          <a
            :href="pcCategoryPath"
            class="inline-flex items-center text-sm font-medium text-carbon transition-colors duration-200 hover:text-champagne"
            @click="$emit('internalLink', $event, pcCategoryPath)"
          >
            <span class="mr-2 text-lg leading-none">&lt;</span>
            {{ lang === 'en' ? 'Back to list' : '返回列表' }}
          </a>

          <div class="mt-8 flex gap-4 overflow-x-auto border-carbon/18 pb-2 lg:max-h-[660px] lg:flex-col lg:overflow-y-auto lg:border-r lg:pr-5">
            <button
              v-for="(image, index) in activeGallery"
              :key="`${activeColor.id}-${image}`"
              type="button"
              class="h-28 w-32 shrink-0 cursor-pointer border bg-[#f7f7f7] p-2 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-carbon lg:h-[116px] lg:w-full"
              :class="activeProductImage === index ? 'border-[#4438ca]' : 'border-transparent hover:border-carbon/25'"
              :aria-label="`View ${mt1007Product.model} image ${index + 1}`"
              @click="$emit('setProductImage', index)"
            >
              <img :src="image" alt="MT1007 PC luggage thumbnail" class="h-full w-full object-contain" />
            </button>
          </div>
        </aside>

        <div class="min-w-0 bg-[#f7f7f7] px-4 py-6 sm:px-8 lg:min-h-[520px]">
          <Transition name="product-image" mode="out-in">
            <img
              :key="`${activeColor.id}-${activeProductImage}`"
              :src="activeImage"
              :alt="`${mt1007Product.model} ${activeColor.name[lang]} PC luggage large view`"
              class="mx-auto h-[430px] w-full object-contain sm:h-[500px] lg:h-[500px]"
            />
          </Transition>
        </div>

        <div class="lg:pt-16">
          <nav class="flex flex-wrap items-center gap-3 text-sm text-carbon/50" aria-label="Breadcrumb">
            <a href="/" class="transition-colors duration-200 hover:text-carbon" @click="$emit('internalLink', $event, '/')">
              {{ lang === 'en' ? 'Home' : '首页' }}
            </a>
            <span class="h-4 w-px bg-carbon/18"></span>
            <a href="/#products" class="transition-colors duration-200 hover:text-carbon" @click="$emit('internalLink', $event, '/', '#products')">
              {{ lang === 'en' ? 'Product Service' : '产品服务' }}
            </a>
            <span class="h-4 w-px bg-carbon/18"></span>
            <a :href="pcCategoryPath" class="transition-colors duration-200 hover:text-carbon" @click="$emit('internalLink', $event, pcCategoryPath)">
              PC Luggage
            </a>
          </nav>

          <div class="mt-8 border-t border-carbon/10 pt-7">
            <h1 class="font-display text-3xl font-semibold leading-tight text-carbon md:text-4xl">
              {{ mt1007Product[lang].title }}
            </h1>
            <p class="mt-4 text-lg leading-8 text-carbon/72">{{ mt1007Product[lang].summary }}</p>
          </div>

          <div class="mt-7 border-t border-carbon/10 pt-7">
            <p class="text-sm font-medium text-carbon/56">
              {{ lang === 'en' ? 'Color' : '颜色' }}: <span class="text-carbon">{{ activeColor.name[lang] }}</span>
            </p>
            <div class="mt-5 flex items-center gap-4">
              <button
                v-for="color in mt1007Product.colors"
                :key="color.id"
                type="button"
                class="h-11 w-11 cursor-pointer rounded-full border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-carbon"
                :class="activeColor.id === color.id ? 'scale-105 border-carbon shadow-[0_0_0_4px_rgba(20,20,20,0.08)]' : 'border-carbon/12 hover:border-carbon/45'"
                :style="{ backgroundColor: color.swatch }"
                :aria-label="`Choose ${color.name[lang]}`"
                @click="$emit('setProductColor', color.id)"
              ></button>
            </div>
          </div>

          <div class="mt-8 grid gap-3 sm:grid-cols-2">
            <div v-for="item in mt1007Product[lang].highlights" :key="item" class="bg-[#f7f7f7] px-4 py-3 text-sm font-medium text-carbon/72">
              {{ item }}
            </div>
          </div>

          <div class="mt-9 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <a
              href="/#contact"
              class="inline-flex cursor-pointer items-center justify-center bg-carbon px-7 py-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-champagne hover:text-carbon"
              @click="$emit('internalLink', $event, '/', '#contact')"
            >
              {{ lang === 'en' ? 'Send Inquiry' : '发送询盘' }}
            </a>
            <a
              :href="pcCategoryPath"
              class="inline-flex cursor-pointer items-center justify-center border border-carbon/15 px-7 py-4 text-sm font-semibold text-carbon transition-colors duration-200 hover:bg-[#f7f7f7]"
              @click="$emit('internalLink', $event, pcCategoryPath)"
            >
              {{ lang === 'en' ? 'PC Luggage List' : 'PC 拉杆箱列表' }}
            </a>
          </div>
        </div>
      </div>

      <div class="mt-20 border-t border-carbon/10 pt-12">
        <div class="max-w-3xl">
          <p class="text-sm font-semibold uppercase tracking-[0.18em] text-champagne">
            {{ lang === 'en' ? 'Product Details' : '产品详情' }}
          </p>
          <h2 class="mt-3 font-display text-3xl font-semibold text-carbon md:text-4xl">
            {{ lang === 'en' ? 'MT1007 structure and customization details' : 'MT1007 结构与定制细节' }}
          </h2>
        </div>

        <div class="mt-10 grid gap-6 md:grid-cols-2">
          <figure v-for="(image, index) in detailImages" :key="`${activeColor.id}-detail-${index}`" class="bg-[#f7f7f7] px-5 py-8">
            <img :src="image" :alt="`MT1007 PC luggage detail ${index + 1}`" class="mx-auto h-[360px] w-full object-contain" />
          </figure>
        </div>
      </div>
    </div>
  </section>
</template>
