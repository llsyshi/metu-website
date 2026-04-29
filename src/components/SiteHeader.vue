<script setup>
const props = defineProps({
  t: {
    type: Object,
    required: true,
  },
  logoImage: {
    type: String,
    required: true,
  },
  headerSolid: {
    type: Boolean,
    required: true,
  },
  menuOpen: {
    type: Boolean,
    required: true,
  },
  activeMenu: {
    type: String,
    default: null,
  },
  activeMega: {
    type: Object,
    default: null,
  },
  aboutPath: {
    type: String,
    required: true,
  },
})

const emit = defineEmits([
  'update:menuOpen',
  'openMega',
  'closeMega',
  'scheduleMegaClose',
  'cancelMegaClose',
  'switchLanguage',
  'internalLink',
  'navLink',
  'toggleMega',
  'navigate',
])

const toggleMobileMenu = () => {
  emit('update:menuOpen', !props.menuOpen)
}

const handleDesktopNavClick = (id) => {
  if (id === 'about') {
    emit('navigate', props.aboutPath)
  }
}
</script>

<template>
    <header
      class="fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,color] duration-500 ease-[cubic-bezier(0.22,0.9,0.24,1)]"
      :class="headerSolid ? 'border-carbon/10 bg-white text-carbon' : 'border-transparent bg-transparent text-white'"
      @mouseenter="$emit('cancelMegaClose')"
      @mouseleave="$emit('scheduleMegaClose')"
    >
      <nav
        class="flex w-full items-center justify-between px-5 transition-[padding] duration-500 ease-[cubic-bezier(0.22,0.9,0.24,1)] sm:px-8 lg:px-14 xl:px-20"
        :class="headerSolid ? 'py-4 md:py-5' : 'py-3'"
      >
        <a
          href="/"
          class="flex min-w-[170px] items-center focus:outline-none focus-visible:ring-2"
          :class="headerSolid ? 'focus-visible:ring-carbon' : 'focus-visible:ring-white'"
          @click="$emit('internalLink', $event, '/')"
        >
          <span class="block">
            <img
              :src="logoImage"
              alt="METU logo"
              class="h-11 w-auto max-w-[190px] object-contain md:h-12"
              :class="headerSolid ? 'filter-none' : 'brightness-0 invert drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]'"
            />
          </span>
        </a>

        <div class="hidden items-center gap-5 lg:absolute lg:left-1/2 lg:flex lg:-translate-x-1/2 xl:gap-8">
          <a
            v-if="t.nav[0]"
            href="/"
            class="relative px-2 py-2 text-sm font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2"
            :class="headerSolid ? 'text-carbon hover:text-carbon focus-visible:ring-carbon' : 'text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.55)] hover:text-white focus-visible:ring-white'"
            @mouseenter="$emit('closeMega')"
            @focus="$emit('closeMega')"
            @click="$emit('internalLink', $event, '/')"
          >
            {{ t.nav[0][1] }}
          </a>
          <button
            v-for="[id, label] in t.nav"
            v-show="id !== 'home'"
            :key="id"
            type="button"
            class="relative cursor-pointer px-2 py-2 text-sm font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2"
            :class="headerSolid ? 'text-carbon hover:text-carbon focus-visible:ring-carbon' : 'text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.55)] hover:text-white focus-visible:ring-white'"
            @mouseenter="$emit('openMega', id)"
            @focus="$emit('openMega', id)"
            @click="handleDesktopNavClick(id)"
          >
            {{ label }}
            <span
              class="absolute inset-x-2 -bottom-3 h-0.5 origin-left transition-all duration-300"
              :class="[activeMenu === id ? 'scale-x-100' : 'scale-x-0', headerSolid ? 'bg-carbon' : 'bg-white']"
            ></span>
          </button>
        </div>

        <div class="flex min-w-[152px] items-center justify-end gap-3">
          <button
            type="button"
            class="cursor-pointer border px-3 py-2 text-sm font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2"
            :class="headerSolid ? 'border-transparent bg-transparent text-carbon hover:text-carbon focus-visible:ring-carbon' : 'border-white/72 text-white hover:bg-white hover:text-carbon focus-visible:ring-white'"
            @click="$emit('switchLanguage')"
          >
            {{ t.meta.language }}
          </button>
          <a
            href="#contact"
            class="hidden cursor-pointer items-center gap-4 rounded-full bg-gradient-to-r from-[#8a39bf] to-[#0759b8] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(26,82,170,0.26)] focus:outline-none focus-visible:ring-2 md:inline-flex"
            :class="headerSolid ? 'shadow-none focus-visible:ring-carbon' : 'shadow-[0_16px_36px_rgba(15,68,142,0.28)] focus-visible:ring-white'"
            @click="$emit('internalLink', $event, '/', '#contact')"
          >
            <span>{{ t.meta.inquiry }}</span>
            <svg aria-hidden="true" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </a>
          <button
            type="button"
            class="grid h-10 w-10 cursor-pointer place-items-center border transition-colors duration-200 focus:outline-none focus-visible:ring-2 lg:hidden"
            :class="headerSolid ? 'border-carbon/30 text-carbon hover:bg-white hover:text-carbon focus-visible:ring-carbon' : 'border-white/40 text-white hover:bg-white hover:text-carbon focus-visible:ring-white'"
            :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
            @click="toggleMobileMenu"
          >
            <svg v-if="!menuOpen" aria-hidden="true" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M4 7h16" />
              <path d="M4 12h16" />
              <path d="M4 17h16" />
            </svg>
            <svg v-else aria-hidden="true" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="m6 6 12 12" />
              <path d="m18 6-12 12" />
            </svg>
          </button>
        </div>
      </nav>

      <Transition name="mega">
        <div v-if="activeMega" class="hidden border-t border-white/10 bg-[#111] text-white shadow-metal lg:block">
          <div class="grid w-full grid-cols-[0.85fr_1.35fr_220px] gap-8 px-5 py-7 sm:px-8 lg:px-14 xl:px-20">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.2em] text-champagne">{{ activeMega.eyebrow }}</p>
              <h2 class="mt-3 text-2xl font-semibold text-white">{{ activeMega.title }}</h2>
              <p class="mt-4 text-sm leading-7 text-white/82">{{ activeMega.summary }}</p>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <a
                v-for="[href, label] in activeMega.links"
                :key="label"
                :href="href"
                class="group flex cursor-pointer items-center justify-between border border-white/16 bg-white/[0.08] px-5 py-4 text-sm font-semibold text-white transition-colors duration-200 hover:border-champagne/80 hover:bg-white/[0.14] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                @click="$emit('navLink', $event, href)"
              >
                <span>{{ label }}</span>
                <svg aria-hidden="true" class="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
              </a>
            </div>
            <div class="overflow-hidden bg-white/8">
              <img :src="activeMega.image" alt="Navigation preview" class="h-40 w-full object-cover" />
            </div>
          </div>
        </div>
      </Transition>

      <div
        v-if="menuOpen"
        class="border-t px-4 py-3 lg:hidden"
        :class="headerSolid ? 'border-carbon/10 bg-white text-carbon shadow-metal' : 'border-white/10 bg-carbon/95 text-white'"
      >
        <div v-for="[id, label] in t.nav" :key="id" class="border-b last:border-b-0" :class="headerSolid ? 'border-carbon/10' : 'border-white/10'">
          <a
            v-if="id === 'home'"
            :href="`#${id}`"
            class="block px-2 py-3 text-sm text-current opacity-75 transition-opacity duration-200 hover:opacity-100 focus:outline-none focus-visible:ring-2"
            :class="headerSolid ? 'focus-visible:ring-carbon' : 'focus-visible:ring-white'"
            @click="$emit('internalLink', $event, '/')"
          >
            {{ label }}
          </a>
          <template v-else>
            <button
              type="button"
              class="w-full cursor-pointer px-2 py-3 text-left text-sm text-current opacity-75 transition-opacity duration-200 hover:opacity-100 focus:outline-none focus-visible:ring-2"
              :class="headerSolid ? 'focus-visible:ring-carbon' : 'focus-visible:ring-white'"
              @click="$emit('toggleMega', id)"
            >
              <span>{{ label }}</span>
            </button>
            <div v-if="activeMenu === id && t.mega[id]" class="pb-3 pl-2">
              <p class="mb-2 text-xs leading-5 text-current opacity-60">{{ t.mega[id].summary }}</p>
              <a
                v-for="[href, itemLabel] in t.mega[id].links"
                :key="itemLabel"
                :href="href"
                class="block py-2 text-sm text-current opacity-70 transition-opacity duration-200 hover:opacity-100"
                @click="$emit('navLink', $event, href)"
              >
                {{ itemLabel }}
              </a>
            </div>
          </template>
        </div>
      </div>
    </header>
</template>
