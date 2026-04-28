<script setup>
import { computed, ref } from 'vue'
import heroImage from '../图片/红正.jpg'
import openImage from '../图片/红开.jpg'
import sideImage from '../图片/红侧.jpg'
import handleImage from '../图片/红拉杆.jpg'
import lockImage from '../图片/红锁.jpg'
import interiorImage from '../图片/内装.jpg'

const lang = ref('en')
const menuOpen = ref(false)

const copy = {
  en: {
    meta: {
      language: '中文',
      inquiry: 'Send Inquiry',
      logoSub: 'Guangdong Meitu Composite Materials Co., Ltd.',
    },
    nav: [
      ['home', 'Home'],
      ['about', 'About Us'],
      ['products', 'Products'],
      ['custom', 'OEM/ODM'],
      ['factory', 'Factory'],
      ['quality', 'Quality'],
      ['contact', 'Contact'],
    ],
    hero: {
      eyebrow: 'China luggage OEM / ODM factory',
      title: 'METU Luggage OEM & ODM Manufacturer',
      subtitle: 'Professional PC, PP and Aluminum Frame Suitcase Factory in China',
      body: 'Built by an experienced luggage manufacturing team, METU provides OEM/ODM solutions for global brands, wholesalers and travel product companies.',
      cta: 'Start a Project',
      secondary: 'Explore Capability',
      stats: [
        ['PC', 'Main product line'],
        ['OEM/ODM', 'Flexible cooperation'],
        ['QC', 'Process-driven inspection'],
      ],
      label: 'PC luggage development focus',
    },
    about: {
      eyebrow: 'About METU',
      title: 'A new factory platform shaped by decades of luggage manufacturing experience.',
      body: 'Guangdong Meitu Composite Materials Co., Ltd. is building a focused luggage manufacturing base for international OEM and ODM cooperation. The company is newly established, while its core team brings long-term practical experience across suitcase structure, materials, molding, assembly, sourcing and production management.',
      note: 'Our first priority is not to look large on paper. It is to respond like a serious manufacturing partner: clear sampling, practical engineering feedback, stable production planning and disciplined quality control.',
      points: ['Experienced luggage manufacturing team', 'Product engineering and sample development', 'Export-oriented OEM/ODM service mindset'],
    },
    products: {
      eyebrow: 'Product Center',
      title: 'Focused on PC luggage, with full suitcase category support.',
      intro: 'METU develops and produces hard-shell and frame suitcase programs for brands, traders, wholesalers and cross-border channels.',
      categories: [
        ['PC Luggage', 'Lightweight, impact-resistant shell programs for premium and mainstream collections.', heroImage],
        ['PP Luggage', 'Durable polypropylene luggage options for value-focused bulk production.', sideImage],
        ['Aluminum Frame Luggage', 'Clean frame construction with refined hardware and elevated presentation.', openImage],
        ['Zipper Luggage', 'Reliable zipper suitcase structures for flexible market positioning.', handleImage],
        ['Custom Luggage', 'Logo, color, texture, lining, wheels, handle and packaging customization.', interiorImage],
      ],
    },
    custom: {
      eyebrow: 'OEM / ODM Customization',
      title: 'From concept direction to production-ready suitcase programs.',
      steps: [
        ['01', 'Brief & market target', 'Define product level, shell material, sizes, color range, target price and channel needs.'],
        ['02', 'Design & sample development', 'Support logo placement, color matching, packaging mockups, structure review and first sample building.'],
        ['03', 'Engineering confirmation', 'Review hardware, wheels, trolley system, lock, lining, shell thickness and assembly details before bulk order.'],
        ['04', 'Bulk production', 'Coordinate materials, process control, packaging and delivery schedules for repeatable production.'],
      ],
      services: ['Logo customization', 'Color customization', 'Packaging customization', 'Sample development', 'Bulk production', 'Private label support'],
    },
    factory: {
      eyebrow: 'Factory Capability',
      title: 'Manufacturing capability designed for practical OEM/ODM execution.',
      intro: 'As METU expands its production base, the website reserves space for real factory images, line photos, certifications and capacity data. The first version communicates the capability architecture customers expect to evaluate.',
      capabilities: [
        ['Material selection', 'PC, PP and aluminum frame suitcase programs with practical material recommendations.'],
        ['Molding & shell process', 'Support for textured shells, color matching, surface finish review and shell structure optimization.'],
        ['Assembly management', 'Integrated control of wheels, trolley handles, locks, lining, zippers and frame components.'],
        ['Export coordination', 'Sampling, order follow-up and packaging preparation for international buyers.'],
      ],
    },
    quality: {
      eyebrow: 'Quality Control',
      title: 'Quality is managed through checkpoints, not slogans.',
      intro: 'METU emphasizes inspection before, during and after production, helping buyers reduce risk before shipment.',
      checks: ['Incoming material check', 'Shell appearance review', 'Wheel and trolley handle test', 'Lock and zipper inspection', 'Assembly fit review', 'Final packing check'],
    },
    contact: {
      eyebrow: 'Contact Us',
      title: 'Send your suitcase project brief.',
      intro: 'Share your target market, product category, size range, quantity and customization requirements. METU will reserve space here for confirmed phone, email, WeChat, WhatsApp and address details.',
      details: [
        ['Email', 'To be confirmed'],
        ['Phone', 'To be confirmed'],
        ['WhatsApp', 'Placeholder'],
        ['WeChat', 'To be confirmed'],
        ['Address', 'Guangdong, China - detailed address to be added'],
      ],
      form: {
        name: 'Name',
        company: 'Company',
        email: 'Email / WhatsApp',
        message: 'Project requirements',
        button: 'Submit Placeholder',
      },
    },
  },
  zh: {
    meta: {
      language: 'EN',
      inquiry: '发送询盘',
      logoSub: '广东美途复合材料有限公司',
    },
    nav: [
      ['home', '首页'],
      ['about', '关于我们'],
      ['products', '产品中心'],
      ['custom', '定制服务'],
      ['factory', '工厂实力'],
      ['quality', '质量控制'],
      ['contact', '联系我们'],
    ],
    hero: {
      eyebrow: '中国行李箱 OEM / ODM 工厂',
      title: 'METU 美途行李箱制造',
      subtitle: '专业 PC、PP、铝框行李箱代工与定制生产厂家',
      body: '美途由深耕行李箱制造行业多年的团队创立，为全球品牌方、贸易商和旅行用品客户提供 OEM/ODM 定制生产服务。',
      cta: '提交项目需求',
      secondary: '查看工厂能力',
      stats: [
        ['PC', '主推产品线'],
        ['OEM/ODM', '灵活合作模式'],
        ['QC', '流程化品质管控'],
      ],
      label: 'PC 行李箱开发重点',
    },
    about: {
      eyebrow: '关于 METU',
      title: '新工厂平台，由经验丰富的行李箱制造团队打造。',
      body: '广东美途复合材料有限公司专注于面向海外客户的行李箱 OEM/ODM 制造合作。公司虽然新成立，但核心团队长期参与行李箱结构、材料、开模、装配、供应链和生产管理等制造环节。',
      note: '我们第一阶段更重视成为可靠的制造伙伴：清晰打样、务实工程建议、稳定生产安排以及严谨质量控制。',
      points: ['资深行李箱制造团队', '产品工程与样品开发', '面向出口客户的 OEM/ODM 服务意识'],
    },
    products: {
      eyebrow: '产品中心',
      title: '以 PC 行李箱为主，同时覆盖多类拉杆箱产品。',
      intro: 'METU 面向品牌方、贸易商、批发商和跨境渠道开发硬壳箱、铝框箱及定制箱包项目。',
      categories: [
        ['PC Luggage', '轻量、抗冲击，适合中高端及主流系列开发。', heroImage],
        ['PP Luggage', '耐用聚丙烯箱体，适合高性价比批量生产。', sideImage],
        ['Aluminum Frame Luggage', '铝框结构搭配精致五金，提升产品质感。', openImage],
        ['Zipper Luggage', '拉链箱结构稳定，适合灵活市场定位。', handleImage],
        ['Custom Luggage', '支持 Logo、颜色、纹理、内里、轮子、拉杆与包装定制。', interiorImage],
      ],
    },
    custom: {
      eyebrow: 'OEM / ODM 定制服务',
      title: '从产品方向到可量产方案，配合客户完成开发。',
      steps: [
        ['01', '需求与市场定位', '确认产品档次、箱体材料、尺寸、颜色、目标价格和销售渠道。'],
        ['02', '设计与样品开发', '支持 Logo 位置、配色、包装效果、结构评估和首件样品制作。'],
        ['03', '工程确认', '量产前确认五金、轮子、拉杆、锁具、内里、箱壳厚度和装配细节。'],
        ['04', '批量生产', '协调材料、工艺控制、包装和交期，保障订单稳定执行。'],
      ],
      services: ['Logo 定制', '颜色定制', '包装定制', '样品开发', '批量生产', '贴牌合作'],
    },
    factory: {
      eyebrow: '工厂实力',
      title: '围绕 OEM/ODM 项目执行搭建制造能力。',
      intro: '随着 METU 生产基地完善，官网将补充真实工厂图、产线照片、认证和产能数据。第一版先清晰呈现海外客户评估工厂时关注的能力结构。',
      capabilities: [
        ['材料选择', '围绕 PC、PP、铝框行李箱项目提供务实材料建议。'],
        ['成型与箱壳工艺', '支持纹理箱壳、颜色匹配、表面效果评估和箱体结构优化。'],
        ['装配管理', '综合管控轮子、拉杆、锁具、内里、拉链和铝框部件。'],
        ['出口协同', '支持打样、订单跟进和面向海外客户的包装准备。'],
      ],
    },
    quality: {
      eyebrow: '质量控制',
      title: '品质来自过程节点控制，而不是口号。',
      intro: 'METU 重视产前、产中、产后的检查流程，帮助客户在出货前降低质量风险。',
      checks: ['来料检查', '箱壳外观检查', '轮子与拉杆测试', '锁具与拉链检查', '装配吻合度检查', '最终包装检查'],
    },
    contact: {
      eyebrow: '联系我们',
      title: '发送您的行李箱项目需求。',
      intro: '请提供目标市场、产品类别、尺寸范围、订单数量和定制要求。电话、邮箱、微信、WhatsApp、地址等信息位已预留，后续可替换为真实资料。',
      details: [
        ['邮箱', '待补充'],
        ['电话', '待补充'],
        ['WhatsApp', '占位'],
        ['微信', '待补充'],
        ['地址', '中国广东 - 详细地址待补充'],
      ],
      form: {
        name: '姓名',
        company: '公司',
        email: '邮箱 / WhatsApp',
        message: '项目需求',
        button: '提交占位表单',
      },
    },
  },
}

const t = computed(() => copy[lang.value])

const switchLanguage = () => {
  lang.value = lang.value === 'en' ? 'zh' : 'en'
  menuOpen.value = false
}

const closeMenu = () => {
  menuOpen.value = false
}
</script>

<template>
  <div :lang="lang" class="min-h-screen bg-mist text-carbon">
    <header class="fixed left-3 right-3 top-3 z-50">
      <nav class="mx-auto flex max-w-7xl items-center justify-between border border-white/55 bg-mist/88 px-4 py-3 shadow-metal backdrop-blur-xl md:px-5">
        <a href="#home" class="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-carbon" @click="closeMenu">
          <span class="grid h-10 w-10 place-items-center bg-carbon text-sm font-semibold text-mist">M</span>
          <span>
            <span class="block text-base font-semibold">METU</span>
            <span class="hidden text-xs text-carbon/55 sm:block">{{ t.meta.logoSub }}</span>
          </span>
        </a>

        <div class="hidden items-center gap-1 lg:flex">
          <a
            v-for="[id, label] in t.nav"
            :key="id"
            :href="`#${id}`"
            class="px-3 py-2 text-sm text-carbon/68 transition-colors duration-200 hover:text-carbon focus:outline-none focus-visible:ring-2 focus-visible:ring-carbon"
          >
            {{ label }}
          </a>
        </div>

        <div class="flex items-center gap-2">
          <button
            type="button"
            class="cursor-pointer border border-carbon/15 px-3 py-2 text-sm font-medium text-carbon transition-colors duration-200 hover:border-carbon hover:bg-carbon hover:text-mist focus:outline-none focus-visible:ring-2 focus-visible:ring-carbon"
            @click="switchLanguage"
          >
            {{ t.meta.language }}
          </button>
          <a
            href="#contact"
            class="hidden cursor-pointer items-center gap-2 bg-carbon px-4 py-2 text-sm font-medium text-mist transition-colors duration-200 hover:bg-champagne hover:text-carbon focus:outline-none focus-visible:ring-2 focus-visible:ring-carbon md:inline-flex"
          >
            <span>{{ t.meta.inquiry }}</span>
            <svg aria-hidden="true" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          </a>
          <button
            type="button"
            class="grid h-10 w-10 cursor-pointer place-items-center border border-carbon/15 text-carbon transition-colors duration-200 hover:border-carbon hover:bg-carbon hover:text-mist focus:outline-none focus-visible:ring-2 focus-visible:ring-carbon lg:hidden"
            :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
            @click="menuOpen = !menuOpen"
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

      <div v-if="menuOpen" class="mx-auto mt-2 max-w-7xl border border-carbon/10 bg-mist p-3 shadow-metal lg:hidden">
        <a
          v-for="[id, label] in t.nav"
          :key="id"
          :href="`#${id}`"
          class="block px-3 py-3 text-sm text-carbon/72 transition-colors duration-200 hover:bg-carbon hover:text-mist focus:outline-none focus-visible:ring-2 focus-visible:ring-carbon"
          @click="closeMenu"
        >
          {{ label }}
        </a>
      </div>
    </header>

    <main>
      <section id="home" class="relative overflow-hidden px-4 pb-16 pt-28 md:pb-20 md:pt-32">
        <div class="absolute inset-x-0 top-0 h-32 bg-white/70"></div>
        <div class="mx-auto grid min-h-[86vh] max-w-7xl items-center gap-10 lg:grid-cols-[1fr_0.88fr]">
          <div class="relative z-10">
            <p class="mb-6 inline-flex border border-carbon/15 bg-white/70 px-4 py-2 text-xs font-semibold uppercase text-carbon/70">
              {{ t.hero.eyebrow }}
            </p>
            <h1 class="font-display text-[clamp(3rem,8vw,7rem)] font-semibold leading-[0.88] text-carbon">
              {{ t.hero.title }}
            </h1>
            <p class="mt-7 max-w-3xl text-xl font-medium text-graphite md:text-2xl">
              {{ t.hero.subtitle }}
            </p>
            <p class="mt-5 max-w-2xl text-base leading-8 text-carbon/66 md:text-lg">
              {{ t.hero.body }}
            </p>
            <div class="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                class="inline-flex cursor-pointer items-center justify-center gap-3 bg-carbon px-6 py-4 text-sm font-semibold text-mist transition-colors duration-200 hover:bg-champagne hover:text-carbon focus:outline-none focus-visible:ring-2 focus-visible:ring-carbon"
              >
                {{ t.hero.cta }}
                <svg aria-hidden="true" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
              </a>
              <a
                href="#factory"
                class="inline-flex cursor-pointer items-center justify-center border border-carbon/15 px-6 py-4 text-sm font-semibold text-carbon transition-colors duration-200 hover:border-carbon hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-carbon"
              >
                {{ t.hero.secondary }}
              </a>
            </div>
            <div class="mt-12 grid max-w-2xl grid-cols-3 border-y border-carbon/12">
              <div v-for="[value, label] in t.hero.stats" :key="value" class="py-5 pr-4">
                <p class="text-xl font-semibold text-carbon md:text-2xl">{{ value }}</p>
                <p class="mt-1 text-xs leading-5 text-carbon/55">{{ label }}</p>
              </div>
            </div>
          </div>

          <div class="group relative z-10 mx-auto w-full max-w-lg lg:max-w-none">
            <div class="absolute -left-4 top-8 h-[76%] w-10 bg-carbon"></div>
            <div class="absolute -right-4 bottom-8 h-[66%] w-10 border border-carbon/20"></div>
            <div class="relative overflow-hidden bg-carbon p-3 shadow-metal">
              <div class="image-sheen relative overflow-hidden bg-white">
                <img :src="heroImage" alt="Red PC luggage product placeholder" class="h-[620px] w-full object-cover object-center max-lg:h-[520px] max-sm:h-[420px]" />
              </div>
              <div class="mt-3 flex items-center justify-between bg-mist px-4 py-3">
                <span class="text-xs font-semibold uppercase text-carbon/60">{{ t.hero.label }}</span>
                <span class="h-px w-20 bg-champagne"></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" class="bg-white px-4 py-20 md:py-28">
        <div class="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.72fr_1fr]">
          <div>
            <p class="text-sm font-semibold uppercase text-champagne">{{ t.about.eyebrow }}</p>
            <h2 class="mt-4 font-display text-4xl font-semibold leading-tight text-carbon md:text-6xl">{{ t.about.title }}</h2>
          </div>
          <div class="space-y-8">
            <p class="text-lg leading-9 text-carbon/70">{{ t.about.body }}</p>
            <div class="border-l-2 border-champagne bg-mist px-6 py-6 text-base leading-8 text-carbon/72">
              {{ t.about.note }}
            </div>
            <div class="grid gap-3 md:grid-cols-3">
              <div v-for="point in t.about.points" :key="point" class="border border-carbon/10 p-5">
                <svg aria-hidden="true" class="mb-4 h-5 w-5 text-champagne" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <path d="m5 12 4 4L19 6" />
                </svg>
                <p class="text-sm font-medium leading-6">{{ point }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="products" class="px-4 py-20 md:py-28">
        <div class="mx-auto max-w-7xl">
          <div class="mb-12 max-w-3xl">
            <p class="text-sm font-semibold uppercase text-champagne">{{ t.products.eyebrow }}</p>
            <h2 class="mt-4 font-display text-4xl font-semibold leading-tight md:text-6xl">{{ t.products.title }}</h2>
            <p class="mt-5 text-lg leading-8 text-carbon/66">{{ t.products.intro }}</p>
          </div>
          <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <article
              v-for="[name, desc, image] in t.products.categories"
              :key="name"
              class="group flex min-h-[430px] flex-col justify-between overflow-hidden border border-carbon/10 bg-white transition-shadow duration-200 hover:shadow-metal"
            >
              <div class="image-sheen relative h-60 overflow-hidden bg-carbon">
                <img :src="image" :alt="`${name} placeholder`" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
              </div>
              <div class="flex flex-1 flex-col justify-between p-5">
                <h3 class="text-xl font-semibold">{{ name }}</h3>
                <p class="mt-4 text-sm leading-6 text-carbon/62">{{ desc }}</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="custom" class="surface-dark px-4 py-20 text-mist md:py-28">
        <div class="mx-auto max-w-7xl">
          <div class="grid gap-12 lg:grid-cols-[0.8fr_1fr]">
            <div>
              <p class="text-sm font-semibold uppercase text-champagne">{{ t.custom.eyebrow }}</p>
              <h2 class="mt-4 font-display text-4xl font-semibold leading-tight md:text-6xl">{{ t.custom.title }}</h2>
              <div class="mt-9 flex flex-wrap gap-2">
                <span v-for="service in t.custom.services" :key="service" class="border border-white/14 bg-white/6 px-4 py-2 text-sm text-mist/76">
                  {{ service }}
                </span>
              </div>
            </div>
            <div class="grid gap-4 md:grid-cols-2">
              <article v-for="[num, title, desc] in t.custom.steps" :key="num" class="border border-white/12 bg-white/[0.04] p-6">
                <p class="font-display text-4xl text-champagne">{{ num }}</p>
                <h3 class="mt-6 text-xl font-semibold">{{ title }}</h3>
                <p class="mt-4 text-sm leading-7 text-mist/64">{{ desc }}</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section id="factory" class="bg-white px-4 py-20 md:py-28">
        <div class="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p class="text-sm font-semibold uppercase text-champagne">{{ t.factory.eyebrow }}</p>
            <h2 class="mt-4 font-display text-4xl font-semibold leading-tight md:text-6xl">{{ t.factory.title }}</h2>
            <p class="mt-6 text-lg leading-9 text-carbon/66">{{ t.factory.intro }}</p>
            <div class="mt-10 grid gap-4 md:grid-cols-2">
              <article v-for="[title, desc] in t.factory.capabilities" :key="title" class="border-t border-carbon/18 pt-5">
                <h3 class="text-lg font-semibold">{{ title }}</h3>
                <p class="mt-3 text-sm leading-7 text-carbon/62">{{ desc }}</p>
              </article>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <img :src="sideImage" alt="Suitcase side detail placeholder" class="h-80 w-full object-cover" />
            <img :src="lockImage" alt="Suitcase lock detail placeholder" class="mt-12 h-80 w-full object-cover" />
            <div class="col-span-2 bg-carbon p-6 text-mist">
              <p class="text-sm uppercase text-champagne">Factory images reserved</p>
              <p class="mt-3 text-2xl font-semibold">{{ lang === 'en' ? 'Real workshop photos can replace this block.' : '后续可替换真实车间与产线照片。' }}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="quality" class="px-4 py-20 md:py-28">
        <div class="mx-auto max-w-7xl">
          <div class="grid gap-10 lg:grid-cols-[0.82fr_1fr]">
            <div>
              <p class="text-sm font-semibold uppercase text-champagne">{{ t.quality.eyebrow }}</p>
              <h2 class="mt-4 font-display text-4xl font-semibold leading-tight md:text-6xl">{{ t.quality.title }}</h2>
              <p class="mt-6 text-lg leading-9 text-carbon/66">{{ t.quality.intro }}</p>
            </div>
            <div class="grid gap-3 sm:grid-cols-2">
              <div v-for="check in t.quality.checks" :key="check" class="flex items-start gap-4 border border-carbon/10 bg-white p-5">
                <span class="mt-1 grid h-7 w-7 shrink-0 place-items-center bg-carbon text-mist">
                  <svg aria-hidden="true" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                    <path d="m5 12 4 4L19 6" />
                  </svg>
                </span>
                <p class="font-medium leading-7">{{ check }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" class="bg-carbon px-4 py-20 text-mist md:py-28">
        <div class="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1fr]">
          <div>
            <p class="text-sm font-semibold uppercase text-champagne">{{ t.contact.eyebrow }}</p>
            <h2 class="mt-4 font-display text-4xl font-semibold leading-tight md:text-6xl">{{ t.contact.title }}</h2>
            <p class="mt-6 text-lg leading-9 text-mist/68">{{ t.contact.intro }}</p>
            <div class="mt-9 divide-y divide-white/10 border-y border-white/10">
              <div v-for="[label, value] in t.contact.details" :key="label" class="grid grid-cols-[120px_1fr] gap-4 py-4 text-sm">
                <span class="text-mist/46">{{ label }}</span>
                <span class="text-mist/84">{{ value }}</span>
              </div>
            </div>
          </div>

          <form class="bg-mist p-5 text-carbon md:p-8" @submit.prevent>
            <div class="grid gap-4 md:grid-cols-2">
              <label class="block">
                <span class="mb-2 block text-sm font-medium">{{ t.contact.form.name }}</span>
                <input class="w-full border border-carbon/12 bg-white px-4 py-3 outline-none transition-colors duration-200 focus:border-carbon" type="text" />
              </label>
              <label class="block">
                <span class="mb-2 block text-sm font-medium">{{ t.contact.form.company }}</span>
                <input class="w-full border border-carbon/12 bg-white px-4 py-3 outline-none transition-colors duration-200 focus:border-carbon" type="text" />
              </label>
            </div>
            <label class="mt-4 block">
              <span class="mb-2 block text-sm font-medium">{{ t.contact.form.email }}</span>
              <input class="w-full border border-carbon/12 bg-white px-4 py-3 outline-none transition-colors duration-200 focus:border-carbon" type="text" />
            </label>
            <label class="mt-4 block">
              <span class="mb-2 block text-sm font-medium">{{ t.contact.form.message }}</span>
              <textarea class="min-h-40 w-full resize-y border border-carbon/12 bg-white px-4 py-3 outline-none transition-colors duration-200 focus:border-carbon"></textarea>
            </label>
            <button
              type="submit"
              class="mt-5 inline-flex w-full cursor-pointer items-center justify-center gap-3 bg-carbon px-6 py-4 text-sm font-semibold text-mist transition-colors duration-200 hover:bg-champagne hover:text-carbon focus:outline-none focus-visible:ring-2 focus-visible:ring-carbon"
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
    </main>
  </div>
</template>
