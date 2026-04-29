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
  aboutPath: {
    type: String,
    required: true,
  },
  activeAboutSection: {
    type: String,
    required: true,
  },
  activeAboutHistory: {
    type: Number,
    required: true,
  },
  factoryEnvironmentImage: {
    type: String,
    required: true,
  },
  machineImage4: {
    type: String,
    required: true,
  },
  logoImage: {
    type: String,
    required: true,
  },
  qrDarkCells: {
    required: true,
  },
})

defineEmits(['internalLink', 'aboutAnchor', 'setAboutHistory', 'footerLink', 'scrollToHash'])
</script>

<template>
      <section class="about-page relative bg-transparent">
        <section class="relative z-10 min-h-[70vh] overflow-hidden bg-carbon px-5 pb-20 pt-36 text-white sm:px-8 md:pb-28 md:pt-44 lg:px-14 xl:px-20">
          <div class="absolute inset-0">
            <img :src="factoryEnvironmentImage" alt="METU factory environment" class="h-full w-full object-cover object-center" />
            <div class="absolute inset-0 bg-gradient-to-r from-carbon/72 via-carbon/42 to-carbon/14"></div>
            <div class="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-carbon/52 to-transparent"></div>
            <div class="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-carbon/76 to-transparent"></div>
          </div>
          <div class="reveal-ready relative w-full max-w-7xl">
            <div class="mb-8 flex flex-wrap items-center gap-2 text-sm text-white/52">
              <a href="/" class="hover:text-white" @click="$emit('internalLink', $event, '/')">{{ lang === 'en' ? 'Home' : '首页' }}</a>
              <span>/</span>
              <span class="text-white">{{ lang === 'en' ? 'About METU' : '关于 METU' }}</span>
            </div>
            <p class="text-sm font-semibold uppercase tracking-[0.22em] text-white/58">{{ t.aboutPage.bannerEyebrow }}</p>
            <h1 class="mt-5 max-w-5xl text-2xl font-semibold leading-tight text-white md:text-4xl">{{ t.aboutPage.title }}</h1>
            <p class="mt-6 max-w-3xl text-sm leading-7 text-white/70 md:text-base md:leading-8">{{ t.aboutPage.subtitle }}</p>
          </div>
        </section>

        <nav class="sticky top-[84px] z-30 border-b border-carbon/10 bg-mist/94 px-4 backdrop-blur-xl">
          <div class="mx-auto flex max-w-7xl gap-2 overflow-x-auto py-3">
            <a
              v-for="[id, label] in t.aboutPage.nav"
              :key="id"
              :href="`${aboutPath}#${id}`"
              class="whitespace-nowrap border px-4 py-3 text-sm font-semibold transition-colors duration-200"
              :class="activeAboutSection === id ? 'border-carbon bg-carbon text-white' : 'border-carbon/10 bg-white/70 text-carbon/58 hover:border-champagne/60 hover:text-carbon'"
              @click="$emit('aboutAnchor', $event, id)"
            >
              {{ label }}
            </a>
          </div>
        </nav>

        <section id="company" data-about-section class="about-company-section relative z-10 scroll-mt-36 bg-white px-4 py-16 md:py-24">
          <div class="mx-auto max-w-7xl">
            <div class="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
              <div class="reveal-ready pt-2">
                <p class="section-dot-label text-sm font-semibold text-carbon">{{ t.aboutPage.company.eyebrow }}</p>
                <h2 class="mt-7 max-w-2xl text-2xl font-semibold leading-tight text-black md:text-4xl">
                  {{ t.aboutPage.company.title }}
                </h2>
                <div class="mt-10 max-w-2xl space-y-5 text-sm leading-8 text-carbon/62 md:text-base">
                  <p v-for="paragraph in t.aboutPage.company.body" :key="paragraph">{{ paragraph }}</p>
                </div>
              </div>

              <figure class="reveal-ready overflow-hidden rounded-[22px] bg-carbon">
                <img :src="factoryEnvironmentImage" alt="METU factory environment view" class="h-[340px] w-full object-cover md:h-[460px]" />
              </figure>
            </div>

            <div class="mt-20 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
              <div v-for="[value, label] in t.aboutPage.company.stats" :key="value" class="reveal-ready border-t border-carbon/18 pt-8">
                <p class="about-gradient-number text-4xl font-bold leading-none md:text-5xl">{{ value }}</p>
                <p class="mt-6 text-sm leading-7 text-carbon/62">{{ label }}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="culture" data-about-section class="relative z-10 scroll-mt-36 overflow-hidden px-4 py-16 text-white md:min-h-[760px] md:py-24">
          <div class="absolute inset-0">
            <img :src="machineImage4" alt="METU production background" class="h-full w-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-b from-black/18 via-black/8 to-black/36"></div>
            <div class="absolute inset-0 bg-sky-900/28"></div>
          </div>

          <div class="relative mx-auto max-w-7xl">
            <div class="reveal-ready">
              <p class="section-dot-label section-dot-light text-sm font-semibold">{{ t.aboutPage.culture.eyebrow }}</p>
              <h2 class="mt-7 max-w-4xl text-2xl font-semibold leading-tight md:text-4xl">{{ t.aboutPage.culture.title }}</h2>
            </div>

            <div class="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <article
                v-for="[title, body] in t.aboutPage.culture.cards"
                :key="title" class="reveal-ready culture-glass-card flex min-h-[360px] flex-col justify-between rounded-[18px] p-6 md:min-h-[420px]"
              >
                <h3 class="text-xl font-medium">{{ title }}</h3>
                <div>
                  <p class="text-lg font-semibold leading-8">{{ body }}</p>
                  <span class="mt-6 block h-px w-full bg-white/50"></span>
                  <p class="mt-5 text-sm text-white/86">{{ title }}</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="history" data-about-section class="history-section relative z-10 scroll-mt-36 overflow-hidden bg-white px-4 py-16 md:py-24">
          <div class="mx-auto max-w-7xl">
            <div class="reveal-ready max-w-4xl">
              <p class="inline-block bg-[#2f63c7] px-3 py-1 text-2xl font-semibold leading-none text-white md:text-3xl">{{ t.aboutPage.history.eyebrow }}</p>
              <p class="mt-8 max-w-2xl text-sm leading-7 text-carbon/56 md:text-base">{{ t.aboutPage.history.intro }}</p>
            </div>

            <div class="reveal-ready history-ruler mt-16 overflow-x-auto pb-8">
              <div class="min-w-[780px]">
                <div class="relative h-10 border-t border-black/55">
                  <span v-for="tick in 42" :key="tick" class="absolute top-0 h-2 w-px bg-black/55" :style="{ left: `${(tick - 1) * (100 / 41)}%` }"></span>
                </div>
                <div class="flex justify-center gap-16">
                  <button
                    v-for="([stage], index) in t.aboutPage.history.timeline"
                    :key="stage"
                    type="button"
                    class="relative px-2 text-base font-medium text-carbon transition-colors duration-200 hover:text-black"
                    :class="activeAboutHistory === index ? 'text-black' : 'text-carbon/58'"
                    @click="$emit('setAboutHistory', index)"
                  >
                    <span
                      class="absolute left-1/2 top-[-31px] h-0 w-0 -translate-x-1/2 border-l-[7px] border-r-[7px] border-t-[8px] border-l-transparent border-r-transparent transition-opacity duration-200"
                      :class="activeAboutHistory === index ? 'border-t-black opacity-100' : 'border-t-transparent opacity-0'"
                    ></span>
                    <span
                      class="absolute bottom-[-25px] left-1/2 h-0 w-0 -translate-x-1/2 border-b-[8px] border-l-[7px] border-r-[7px] border-b-black border-l-transparent border-r-transparent transition-opacity duration-200"
                      :class="activeAboutHistory === index ? 'opacity-100' : 'opacity-0'"
                    ></span>
                    {{ stage }}
                  </button>
                </div>
              </div>
            </div>

            <div class="reveal-ready relative mt-16 grid gap-10 lg:grid-cols-[0.95fr_1fr] lg:items-center">
              <div class="history-photo-stack">
                <div class="history-photo-shadow"></div>
                <div class="history-photo-card">
                  <img :src="t.aboutPage.history.timeline[activeAboutHistory][3]" alt="METU development stage" class="h-full w-full object-cover" />
                </div>
              </div>
              <div class="relative">
                <p class="about-gradient-number text-5xl font-bold leading-none md:text-6xl">{{ t.aboutPage.history.timeline[activeAboutHistory][0] }}</p>
                <h3 class="mt-8 text-xl font-semibold text-carbon md:text-2xl">{{ t.aboutPage.history.timeline[activeAboutHistory][1] }}</h3>
                <p class="mt-6 max-w-xl text-sm leading-8 text-carbon/64 md:text-base">{{ t.aboutPage.history.timeline[activeAboutHistory][2] }}</p>
                <p class="history-watermark select-none">HISTORY</p>
              </div>
            </div>
          </div>
        </section>

        <section id="honor" data-about-section class="honor-section relative z-20 scroll-mt-36 overflow-hidden px-4 py-16 text-white md:min-h-[760px] md:py-24">
          <div class="absolute inset-0 bg-gradient-to-br from-[#5f7898] via-[#8d9cad] to-[#d3c6b2]"></div>
          <div class="absolute inset-0 bg-white/10"></div>
          <div class="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div class="reveal-ready">
              <h2 class="text-2xl font-semibold leading-tight md:text-4xl">{{ t.aboutPage.honor.eyebrow }}</h2>
              <p class="mt-5 text-sm leading-7 text-white/88 md:text-base">{{ t.aboutPage.honor.body }}</p>
              <div class="mt-10 max-w-xl border-y border-white/42 py-8">
                <div v-for="item in t.aboutPage.honor.items" :key="item" class="flex items-center gap-4 py-3 text-base font-semibold text-white">
                  <svg aria-hidden="true" class="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">
                    <path d="M12 3 9.8 7.7 5 8.4l3.5 3.4-.8 4.8L12 14.2l4.3 2.4-.8-4.8L19 8.4l-4.8-.7L12 3Z" />
                  </svg>
                  <span>{{ item }}</span>
                </div>
              </div>
            </div>

            <div class="reveal-ready honor-stage min-h-[520px]">
              <div class="certificate certificate-left">
                <p>{{ t.aboutPage.honor.certificates[0] }}</p>
              </div>
              <div class="certificate certificate-center">
                <p>{{ t.aboutPage.honor.certificates[1] }}</p>
              </div>
              <div class="certificate certificate-right">
                <p>{{ t.aboutPage.honor.certificates[2] }}</p>
              </div>
              <div class="podium podium-left"></div>
              <div class="podium podium-center"></div>
              <div class="podium podium-right"></div>
            </div>
          </div>
        </section>

        <div id="footer" data-about-section class="about-footer-reveal-spacer relative scroll-mt-36 md:block" aria-hidden="true"></div>

        <footer class="about-fixed-footer z-0 bg-[#1b1b1b] px-4 pb-8 pt-16 text-white md:fixed md:inset-x-0 md:bottom-0 md:h-[720px] md:overflow-hidden md:pt-20" aria-label="METU footer">
          <div class="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.85fr] md:min-h-[620px]">
            <div class="reveal-ready flex flex-col">
              <a href="/" class="inline-flex items-center gap-4" @click="$emit('internalLink', $event, '/')">
                <span class="grid h-14 w-14 place-items-center bg-white p-2">
                  <img :src="logoImage" alt="METU logo" class="h-full w-full object-contain" />
                </span>
                <span class="text-3xl font-bold tracking-[0.08em] text-white">METU</span>
              </a>

              <div class="mt-16">
                <div class="flex items-center gap-4">
                  <span class="grid h-9 w-9 place-items-center rounded-full border border-white text-white">
                    <svg aria-hidden="true" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9">
                      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7A2 2 0 0 1 22 16.9Z" />
                    </svg>
                  </span>
                  <span class="text-xl font-bold tracking-tight">{{ t.aboutPage.footer.phone }}</span>
                </div>
                <div class="mt-7 space-y-3 text-sm font-semibold leading-6 text-white/44">
                  <p>{{ lang === 'en' ? 'Email:' : '邮箱：' }} {{ t.aboutPage.footer.email }}</p>
                  <p>{{ lang === 'en' ? 'Address:' : '地址：' }} {{ t.aboutPage.footer.address }}</p>
                </div>
              </div>

              <div class="mt-24 flex flex-wrap items-center gap-3">
                <span class="mr-2 text-sm font-semibold text-white/44">{{ t.aboutPage.footer.follow }}</span>
                <div v-for="[key, label, href] in t.aboutPage.footer.socials" :key="key" class="group relative">
                  <a
                    :href="href"
                    :aria-label="label"
                    target="_blank"
                    rel="noreferrer"
                    class="grid h-10 w-10 place-items-center rounded-full border border-white/18 text-white transition-colors duration-200 hover:border-white hover:bg-white hover:text-black"
                  >
                    <svg v-if="key === 'wechat'" aria-hidden="true" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                      <path d="M9.5 16.5a6.5 5.2 0 1 1 3.3-9.7" />
                      <path d="M13.5 10.5a5.4 4.4 0 1 1-2.6 7.9l-2.3.7.7-1.9" />
                      <path d="M7.8 10.3h.01" />
                      <path d="M11.1 10.3h.01" />
                      <path d="M15.6 14.1h.01" />
                      <path d="M18.3 14.1h.01" />
                    </svg>
                    <svg v-else-if="key === 'youtube'" aria-hidden="true" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21.6 7.2a3 3 0 0 0-2.1-2.1C17.7 4.6 12 4.6 12 4.6s-5.7 0-7.5.5a3 3 0 0 0-2.1 2.1A31 31 0 0 0 2 12a31 31 0 0 0 .4 4.8 3 3 0 0 0 2.1 2.1c1.8.5 7.5.5 7.5.5s5.7 0 7.5-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 22 12a31 31 0 0 0-.4-4.8ZM10 15.4V8.6l5.8 3.4L10 15.4Z" />
                    </svg>
                    <svg v-else-if="key === 'facebook'" aria-hidden="true" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.2 8.2V6.7c0-.8.3-1.2 1.4-1.2H17V2.8c-.7-.1-1.5-.2-2.3-.2-2.7 0-4.5 1.6-4.5 4.5v1.1H7.5v3h2.7v10.2h4V11.2h2.7l.4-3h-3.1Z" />
                    </svg>
                    <svg v-else-if="key === 'instagram'" aria-hidden="true" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                      <rect x="4" y="4" width="16" height="16" rx="4" />
                      <circle cx="12" cy="12" r="3.4" />
                      <path d="M17.4 6.8h.01" />
                    </svg>
                    <svg v-else-if="key === 'linkedin'" aria-hidden="true" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6.8 8.9H3.4v11.4h3.4V8.9ZM5.1 3.4a2 2 0 1 0 0 4.1 2 2 0 0 0 0-4.1ZM20.6 14c0-3.1-1.7-5.4-4.5-5.4-1.7 0-2.7.9-3.1 1.6V8.9H9.6v11.4H13v-6.1c0-1.6.8-2.6 2.1-2.6 1.2 0 2 1 2 2.6v6.1h3.5V14Z" />
                    </svg>
                    <span v-else class="text-sm font-bold">{{ key === 'pinterest' ? 'P' : key === 'tiktok' ? '♪' : 'X' }}</span>
                  </a>
                  <div
                    v-if="key === 'wechat'"
                    class="pointer-events-none absolute bottom-full left-1/2 z-20 mb-4 w-36 -translate-x-1/2 translate-y-2 border border-white/20 bg-white p-3 text-black opacity-0 shadow-metal transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    <div class="grid grid-cols-7 gap-1">
                      <span v-for="cell in 49" :key="cell" class="h-3 w-3" :class="qrDarkCells.has(cell) ? 'bg-black' : 'bg-white'"></span>
                    </div>
                    <p class="mt-3 text-center text-xs font-semibold">{{ lang === 'en' ? 'WeChat QR' : '微信二维码' }}</p>
                  </div>
                </div>
              </div>

              <div class="mt-auto hidden pt-24 text-xs leading-7 text-white/48 lg:block">
                <div class="flex flex-wrap gap-x-4 gap-y-2">
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
                </div>
                <p class="mt-4">Copyright @ 2026 METU. {{ lang === 'en' ? 'All rights reserved.' : '版权所有。' }} 粤ICP备占位号</p>
              </div>
            </div>

            <div class="reveal-ready grid content-start gap-x-16 gap-y-20 md:grid-cols-2 xl:grid-cols-3">
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
                    @click="$emit('footerLink', $event, href)"
                  >
                    {{ label }}
                  </a>
                </div>
              </section>
            </div>

            <div class="border-t border-white/10 pt-7 text-xs leading-7 text-white/48 lg:hidden">
              <div class="flex flex-wrap gap-x-4 gap-y-2">
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
              </div>
              <p class="mt-4">Copyright @ 2026 METU. {{ lang === 'en' ? 'All rights reserved.' : '版权所有。' }} 粤ICP备占位号</p>
            </div>
          </div>
        </footer>

        <button
          type="button"
          class="fixed bottom-8 right-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-[#5b3dbb] text-white shadow-metal transition-transform duration-200 hover:-translate-y-1"
          :aria-label="lang === 'en' ? 'Back to top' : '返回顶部'"
          @click="$emit('scrollToHash', '#company')"
        >
          <svg aria-hidden="true" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 19V5" />
            <path d="m5 12 7-7 7 7" />
          </svg>
        </button>
      </section>
</template>
