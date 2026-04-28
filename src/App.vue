<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import logoImage from './assets/logo/metu-logo.png'
import heroImage from './assets/products/mt1007/mt1007-main.png'
import openImage from './assets/products/mt1007/mt1007-interior.png'
import sideImage from './assets/products/mt1007/mt1007-side.png'
import sideAltImage from './assets/products/mt1007/mt1007-wheel.png'
import handleImage from './assets/products/mt1007/mt1007-trolley-handle.png'
import lockImage from './assets/products/mt1007/mt1007-lock.png'
import interiorImage from './assets/products/mt1007/mt1007-interior.png'
import displayImage1 from './assets/products/mt1007/mt1007-display-01.png'
import factoryEnvironmentImage from './assets/factory/environment/factory-environment-01.png'
import machineImage1 from './assets/factory/machines/machine-01.png'
import machineImage2 from './assets/factory/machines/machine-02.png'
import machineImage3 from './assets/factory/machines/machine-03.png'
import machineImage4 from './assets/factory/machines/machine-04.png'

const lang = ref('en')
const menuOpen = ref(false)
const activeMenu = ref(null)
const activeHero = ref(0)
const heroDirection = ref('next')
const heroTextVisible = ref(false)
const activeService = ref(0)
const route = ref({ name: 'home' })
const activeProductImage = ref(0)
const activeAboutSection = ref('company')
const activeAboutHistory = ref(0)
const visibleMetrics = ref(false)
const metricValues = ref([0, 0, 0, 0])
let heroTimer
let revealObserver
let metricObserver
let metricFrame
let megaCloseTimer
let heroTextTimer
let popstateHandler
let aboutSectionObserver

const copy = {
  en: {
    meta: {
      language: '中文',
      inquiry: 'Send Inquiry',
      logoSub: 'Guangdong Meitu Composite Materials Co., Ltd.',
      topbar: 'OEM / ODM Luggage Manufacturer in Guangdong, China',
    },
    nav: [
      ['home', 'Home'],
      ['about', 'About'],
      ['products', 'Products'],
      ['custom', 'OEM/ODM'],
      ['factory', 'Factory'],
      ['quality', 'Quality'],
      ['contact', 'Contact'],
    ],
    mega: {
      about: {
        eyebrow: 'Company',
        title: 'New factory, experienced team',
        summary: 'Understand METU positioning, team background and cooperation mindset.',
        image: factoryEnvironmentImage,
        links: [
          ['/about#company', 'Company profile'],
          ['/about#culture', 'Corporate culture'],
          ['/about#history', 'Development history'],
        ],
      },
      products: {
        eyebrow: 'Product Center',
        title: 'PC luggage as the main line',
        summary: 'Browse PC, PP, aluminum frame, zipper and custom suitcase programs.',
        image: heroImage,
        links: [
          ['/PC-Luggage', 'PC Luggage'],
          ['#products', 'PP Luggage'],
          ['#products', 'Aluminum Frame Luggage'],
          ['#products', 'Custom Luggage'],
        ],
      },
      custom: {
        eyebrow: 'OEM / ODM',
        title: 'From brief to bulk production',
        summary: 'See how METU supports logo, color, packaging, sample and production development.',
        image: openImage,
        links: [
          ['#custom', 'Customization process'],
          ['#factory', 'Manufacturing capability'],
          ['#contact', 'Start a project'],
        ],
      },
      factory: {
        eyebrow: 'Capability',
        title: 'Manufacturing modules buyers care about',
        summary: 'Material, shell process, component integration and order execution.',
        image: handleImage,
        links: [
          ['#factory', 'Factory capability'],
          ['#quality', 'Quality control'],
          ['#contact', 'Capacity inquiry'],
        ],
      },
      quality: {
        eyebrow: 'Inspection',
        title: 'Checkpoints before shipment',
        summary: 'Incoming material, shell appearance, wheels, trolley handle, lock, zipper and packing checks.',
        image: lockImage,
        links: [
          ['#quality', 'QC checkpoints'],
          ['#factory', 'Production control'],
          ['#contact', 'Ask for QC details'],
        ],
      },
      contact: {
        eyebrow: 'Inquiry',
        title: 'Send your luggage project brief',
        summary: 'Tell us your product type, target market, quantity and customization requirements.',
        image: interiorImage,
        links: [
          ['#contact', 'Inquiry form'],
          ['#products', 'Product range'],
          ['#custom', 'OEM/ODM service'],
        ],
      },
    },
    hero: {
      eyebrow: 'METU Luggage OEM & ODM Manufacturer',
      title: 'Professional suitcase manufacturing for global brands.',
      subtitle: 'PC, PP and aluminum frame luggage factory in China',
      body: 'Built by an experienced luggage manufacturing team, METU supports brands, wholesalers, traders and travel product companies with practical OEM/ODM development and bulk production.',
      cta: 'Request a Quote',
      secondary: 'View Products',
      cardTitle: 'Main product focus',
      cardText: 'PC hard-shell luggage programs with custom logo, color, lining, wheels, handles and packaging.',
      tags: ['PC Luggage', 'ODM Development', 'Bulk Production'],
    },
    metrics: [
      { value: 5, suffix: '+', label: 'Product categories' },
      { value: 6, suffix: '', label: 'OEM/ODM service steps' },
      { value: 4, suffix: '', label: 'Manufacturing capability modules' },
      { value: 6, suffix: '', label: 'Quality checkpoints' },
    ],
    about: {
      eyebrow: 'About METU',
      title: 'A new factory backed by a deeply experienced manufacturing team.',
      body: 'Guangdong Meitu Composite Materials Co., Ltd. is a focused luggage manufacturing company serving international OEM and ODM projects. METU is newly established, but its core team has long-term experience in suitcase structure, materials, mold coordination, assembly, sourcing and production management.',
      points: ['New manufacturing platform', 'Experienced luggage team', 'Export-oriented cooperation', 'PC luggage as the key product line'],
    },
    aboutPage: {
      bannerEyebrow: 'About METU',
      title: 'Guangdong Meitu Composite Materials Co., Ltd.',
      subtitle: 'A new luggage manufacturing platform in Guangdong, China, built by an experienced suitcase team for OEM/ODM cooperation.',
      nav: [
        ['company', 'Company Profile'],
        ['culture', 'Corporate Culture'],
        ['history', 'Development History'],
        ['honor', 'Honor'],
        ['footer', 'Contact'],
      ],
      company: {
        eyebrow: 'Company Profile',
        title: 'METU is a new factory name backed by real luggage manufacturing experience.',
        body: [
          'METU is a luggage OEM/ODM manufacturing company based in Guangdong, China. The company focuses on practical suitcase development and production support for brands, wholesalers, traders and travel product companies.',
          'Although METU is a newly established factory, its core team has long-term hands-on experience across suitcase structure, material selection, mold coordination, component integration, assembly flow and production management.',
        ],
        facts: ['PC luggage focus', 'OEM/ODM cooperation', 'Experienced core team', 'China factory platform'],
        stats: [
          ['PC', 'Focused hard-shell luggage development direction.'],
          ['OEM', 'Private label cooperation for brands and traders.'],
          ['ODM', 'Sample development and product structure support.'],
          ['QC', 'Quality control awareness before shipment.'],
        ],
      },
      culture: {
        eyebrow: 'Corporate Culture',
        title: 'Creating better travel product cooperation for global buyers.',
        cards: [
          ['Company Mission', 'Provide practical luggage OEM/ODM solutions for global brands.'],
          ['Core Values', 'Professional, reliable, efficient and quality-focused.'],
          ['Corporate Vision', 'Build a dependable suitcase factory platform in Guangdong, China.'],
          ['Business Philosophy', 'Customer first, quick response, stable cooperation and long-term value.'],
        ],
      },
      history: {
        eyebrow: 'Development History',
        title: 'A developing factory platform prepared for global luggage projects.',
        intro: 'The formal timeline will be updated after METU confirms company milestones. The first version keeps the structure ready without inventing false dates.',
        timeline: [
          ['Stage 04', 'Global Cooperation Ready', 'The website, product pages and inquiry flow are prepared for overseas and domestic customers.', factoryEnvironmentImage],
          ['Stage 03', 'Product Line Preparation', 'PC luggage is set as the key product direction, with PP and aluminum frame luggage reserved for expansion.', heroImage],
          ['Stage 02', 'Factory Platform Setup', 'METU organizes product direction, image assets and cooperation structure for OEM/ODM buyers.', machineImage1],
          ['Stage 01', 'Experienced Team Formation', 'Core members bring long-term luggage manufacturing knowledge into the METU project.', machineImage2],
        ],
      },
      honor: {
        eyebrow: 'Honor & Qualification',
        title: 'Reserved for future certificates, factory documents and cooperation proof.',
        body: 'This area is intentionally prepared as a clean placeholder. After certificates, audit records, test reports or exhibition materials are ready, they can be added here without changing the page structure.',
        items: ['Quality system document to be added', 'Factory audit materials to be added', 'Testing reports to be added', 'Export cooperation proof to be added', 'Product certificate to be added'],
        certificates: ['Factory Document', 'Quality Certificate', 'Product Report'],
      },
      footer: {
        tagline: 'METU Luggage OEM/ODM Manufacturer',
        summary: 'Professional PC, PP and aluminum frame suitcase manufacturing partner in Guangdong, China.',
        phone: 'To be confirmed',
        email: 'To be confirmed',
        address: 'Guangdong, China - detailed address to be added',
        follow: 'Follow Us',
        groups: [
          ['About METU', [
            ['Company Profile', '/about#company'],
            ['Founder Message', 'https://www.baidu.com/'],
            ['Corporate Culture', '/about#culture'],
            ['Development History', '/about#history'],
            ['Honor & Qualification', '/about#honor'],
          ]],
          ['Product Service', [
            ['PC Luggage', '/PC-Luggage'],
            ['PP Luggage', 'https://www.baidu.com/'],
            ['Aluminum Frame Luggage', 'https://www.baidu.com/'],
            ['Other Luggage', 'https://www.baidu.com/'],
          ]],
          ['Technology & R&D', [
            ['R&D Capability', 'https://www.baidu.com/'],
            ['Lean Production', 'https://www.baidu.com/'],
            ['Quality Management', '/#quality'],
          ]],
          ['Sustainable Development', [
            ['Green Factory', 'https://www.baidu.com/'],
            ['Eco Materials', 'https://www.baidu.com/'],
            ['LCA & Carbon Footprint', 'https://www.baidu.com/'],
            ['Latest Updates', 'https://www.baidu.com/'],
          ]],
          ['Information Center', [
            ['Exhibitions', 'https://www.baidu.com/'],
            ['News', 'https://www.baidu.com/'],
          ]],
          ['Contact Us', [
            ['Contact Information', '/#contact'],
            ['Join METU', 'https://www.baidu.com/'],
          ]],
        ],
        socials: [
          ['wechat', 'WeChat', 'https://www.baidu.com/'],
          ['youtube', 'YouTube', 'https://www.baidu.com/'],
          ['twitter', 'X', 'https://www.baidu.com/'],
          ['pinterest', 'Pinterest', 'https://www.baidu.com/'],
          ['linkedin', 'LinkedIn', 'https://www.baidu.com/'],
          ['facebook', 'Facebook', 'https://www.baidu.com/'],
          ['instagram', 'Instagram', 'https://www.baidu.com/'],
          ['tiktok', 'TikTok', 'https://www.baidu.com/'],
        ],
        legalLinks: [
          ['Privacy Policy', 'https://www.baidu.com/'],
          ['Legal Notice', 'https://www.baidu.com/'],
          ['Sitemap', 'https://www.baidu.com/'],
          ['Website Support', 'https://www.baidu.com/'],
        ],
      },
    },
    products: {
      eyebrow: 'Product Range',
      title: 'Complete suitcase categories for private label programs.',
      intro: 'PC luggage is the main development direction, with PP, aluminum frame, zipper and custom luggage available for different market levels.',
      list: [
        ['MT1007 PC Luggage', 'Main recommended range for premium and mainstream hard-shell collections.', heroImage],
        ['PP Luggage', 'Durable, value-focused luggage for large quantity programs.', sideImage],
        ['Aluminum Frame Luggage', 'Refined frame construction for elevated product positioning.', openImage],
        ['Zipper Luggage', 'Flexible structure for broad market applications.', sideAltImage],
        ['Custom Luggage', 'Logo, shell texture, color, lining, wheel, handle and packaging customization.', interiorImage],
      ],
    },
    capability: {
      eyebrow: 'Manufacturing Capability',
      title: 'From product idea to shipment-ready suitcase production.',
      list: [
        ['Product Development', 'Market positioning, size planning, shell style, function configuration and sample direction.'],
        ['Material & Shell Process', 'PC, PP and aluminum frame solutions with color, texture and surface finish support.'],
        ['Component Integration', 'Wheels, trolley handles, locks, zippers, lining, frame parts and packaging coordination.'],
        ['Order Execution', 'Sampling, pre-production confirmation, bulk production follow-up and export packing preparation.'],
      ],
    },
    custom: {
      eyebrow: 'OEM / ODM Service',
      title: 'Customization support similar to a mature luggage partner.',
      steps: [
        ['01', 'Requirement Brief', 'Share target market, product level, sizes, material and quantity.'],
        ['02', 'Design Direction', 'Confirm shell style, color, logo placement, lining and packaging concept.'],
        ['03', 'Sample Development', 'Build and review samples before bulk production decisions.'],
        ['04', 'Engineering Check', 'Confirm wheels, handle, lock, zipper, frame and assembly details.'],
        ['05', 'Bulk Production', 'Arrange materials, production schedule and process control.'],
        ['06', 'Final Inspection', 'Check appearance, function, packaging and shipment readiness.'],
      ],
    },
    factory: {
      eyebrow: 'Factory Strength',
      title: 'Structured for professional OEM/ODM cooperation.',
      body: 'Factory environment and production equipment photos are now organized in the site assets. More workshop, warehouse, QC and certificate photos can be added as METU prepares the next content batch.',
      features: ['Factory environment', 'Production equipment', 'Workshop capability', 'QC area to be added'],
    },
    quality: {
      eyebrow: 'Quality Control',
      title: 'Controlled checkpoints before shipment.',
      list: ['Incoming material check', 'Shell appearance inspection', 'Wheel rolling test', 'Trolley handle test', 'Lock and zipper check', 'Final packing inspection'],
    },
    contact: {
      eyebrow: 'Contact Us',
      title: 'Send your luggage project brief.',
      intro: 'Tell us your product category, target market, size range, customization request and estimated quantity. Contact details are reserved and can be replaced with confirmed information later.',
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
      topbar: '中国广东行李箱 OEM / ODM 代工制造商',
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
    mega: {
      about: {
        eyebrow: '公司介绍',
        title: '新工厂，资深制造团队',
        summary: '了解 METU 的公司定位、团队背景和合作思路。',
        image: factoryEnvironmentImage,
        links: [
          ['/about#company', '公司简介'],
          ['/about#culture', '企业文化'],
          ['/about#history', '发展历程'],
        ],
      },
      products: {
        eyebrow: '产品中心',
        title: '以 PC 行李箱为主线',
        summary: '查看 PC、PP、铝框、拉链箱和定制行李箱方案。',
        image: heroImage,
        links: [
          ['/PC-Luggage', 'PC 行李箱'],
          ['#products', 'PP 行李箱'],
          ['#products', '铝框行李箱'],
          ['#products', '定制行李箱'],
        ],
      },
      custom: {
        eyebrow: 'OEM / ODM',
        title: '从需求沟通到批量生产',
        summary: '查看 Logo、颜色、包装、样品和量产开发服务。',
        image: openImage,
        links: [
          ['#custom', '定制流程'],
          ['#factory', '制造能力'],
          ['#contact', '提交项目'],
        ],
      },
      factory: {
        eyebrow: '制造能力',
        title: '海外客户关注的工厂能力模块',
        summary: '材料、箱壳工艺、部件整合和订单执行能力。',
        image: handleImage,
        links: [
          ['#factory', '工厂实力'],
          ['#quality', '质量控制'],
          ['#contact', '产能咨询'],
        ],
      },
      quality: {
        eyebrow: '检验流程',
        title: '出货前质量检查节点',
        summary: '来料、箱壳外观、轮子、拉杆、锁具、拉链和包装检查。',
        image: lockImage,
        links: [
          ['#quality', '质控节点'],
          ['#factory', '生产控制'],
          ['#contact', '咨询质检要求'],
        ],
      },
      contact: {
        eyebrow: '询盘联系',
        title: '发送您的行李箱项目需求',
        summary: '告诉我们产品类型、目标市场、数量和定制要求。',
        image: interiorImage,
        links: [
          ['#contact', '询盘表单'],
          ['#products', '产品范围'],
          ['#custom', '定制服务'],
        ],
      },
    },
    hero: {
      eyebrow: 'METU 美途行李箱制造',
      title: '面向全球品牌的专业行李箱制造服务。',
      subtitle: '专业 PC、PP、铝框行李箱代工与定制生产厂家',
      body: '美途由深耕行李箱制造行业多年的团队创立，为品牌方、批发商、贸易商和旅行用品客户提供务实的 OEM/ODM 开发与批量生产服务。',
      cta: '获取报价',
      secondary: '查看产品',
      cardTitle: '主推产品方向',
      cardText: 'PC 硬壳行李箱项目，支持 Logo、颜色、内里、轮子、拉杆和包装定制。',
      tags: ['PC 行李箱', 'ODM 开发', '批量生产'],
    },
    metrics: [
      { value: 5, suffix: '+', label: '产品类别' },
      { value: 6, suffix: '', label: 'OEM/ODM 服务步骤' },
      { value: 4, suffix: '', label: '制造能力模块' },
      { value: 6, suffix: '', label: '质量检查节点' },
    ],
    about: {
      eyebrow: '关于 METU',
      title: '新工厂平台，由经验丰富的制造团队打造。',
      body: '广东美途复合材料有限公司专注服务国际行李箱 OEM/ODM 项目。公司虽然新成立，但核心团队长期参与行李箱结构、材料、开模协同、装配、供应链和生产管理等关键环节。',
      points: ['新一代制造平台', '资深行李箱团队', '面向出口合作', 'PC 行李箱为重点产品线'],
    },
    aboutPage: {
      bannerEyebrow: '关于 METU',
      title: '广东美途复合材料有限公司',
      subtitle: '位于中国广东的新一代行李箱制造平台，由经验丰富的箱包制造团队打造，面向 OEM/ODM 合作。',
      nav: [
        ['company', '公司简介'],
        ['culture', '企业文化'],
        ['history', '发展历程'],
        ['honor', '荣誉资质'],
        ['footer', '联系方式'],
      ],
      company: {
        eyebrow: '公司简介',
        title: 'METU 是一个新的工厂品牌，但背后有真实的行李箱制造经验。',
        body: [
          '广东美途复合材料有限公司是一家位于中国广东的行李箱 OEM/ODM 制造企业，专注为品牌方、批发商、贸易商和旅行用品公司提供务实的箱包开发与生产支持。',
          '美途虽然是新成立的工厂，但核心团队长期参与行李箱结构、材料选择、开模协同、部件整合、装配流程和生产管理等关键环节。',
        ],
        facts: ['专注 PC 行李箱', 'OEM/ODM 合作', '经验丰富核心团队', '中国工厂平台'],
        stats: [
          ['PC', '以 PC 硬壳行李箱作为重点开发方向。'],
          ['OEM', '面向品牌方和贸易商提供贴牌合作。'],
          ['ODM', '支持样品开发与产品结构配合。'],
          ['QC', '重视出货前质量控制与细节检查。'],
        ],
      },
      culture: {
        eyebrow: '企业文化',
        title: '创造更美好的旅行产品合作体验。',
        cards: [
          ['公司使命', '为全球品牌提供务实的行李箱 OEM/ODM 解决方案。'],
          ['核心价值观', '专业、可靠、高效，并始终重视品质。'],
          ['企业愿景', '打造位于中国广东的可信赖拉杆箱制造平台。'],
          ['经营理念', '客户第一，快速响应，稳定合作，长期共赢。'],
        ],
      },
      history: {
        eyebrow: '发展历程',
        title: '一个正在面向全球行李箱项目搭建的工厂平台。',
        intro: '正式发展历程将在 METU 确认公司节点后更新。第一版先保留清晰结构，不虚构年份和数据。',
        timeline: [
          ['阶段 04', '全球合作准备', '官网、产品页面和询盘流程开始面向海外及国内客户准备。', factoryEnvironmentImage],
          ['阶段 03', '产品线准备', 'PC 行李箱作为重点方向，PP 和铝框行李箱作为后续扩展方向。', heroImage],
          ['阶段 02', '工厂平台搭建', 'METU 整理产品方向、图片素材和面向 OEM/ODM 客户的合作结构。', machineImage1],
          ['阶段 01', '经验团队形成', '核心成员将长期行李箱制造经验带入 METU 项目。', machineImage2],
        ],
      },
      honor: {
        eyebrow: '荣誉资质',
        title: '用于后续补充证书、验厂资料和合作证明。',
        body: '该区域先作为干净的占位结构保留。后续如果有证书、验厂记录、检测报告或展会资料，可以直接补充到这里，不需要重新调整页面结构。',
        items: ['质量体系文件待补充', '验厂资料待补充', '检测报告待补充', '出口合作证明待补充', '产品证书待补充'],
        certificates: ['工厂资料', '质量证书', '产品报告'],
      },
      footer: {
        tagline: 'METU 美途行李箱 OEM/ODM 制造商',
        summary: '位于中国广东，专注 PC、PP、铝框行李箱代工与定制生产。',
        phone: '待补充',
        email: '待补充',
        address: '中国广东 - 详细地址待补充',
        follow: '关注我们',
        groups: [
          ['关于美途', [
            ['美途简介', '/about#company'],
            ['董事长介绍', 'https://www.baidu.com/'],
            ['企业文化', '/about#culture'],
            ['发展历程', '/about#history'],
            ['资质荣誉', '/about#honor'],
          ]],
          ['产品服务', [
            ['PC拉杆箱', '/PC-Luggage'],
            ['PP拉杆箱', 'https://www.baidu.com/'],
            ['铝框拉杆箱', 'https://www.baidu.com/'],
            ['其他拉杆箱', 'https://www.baidu.com/'],
          ]],
          ['技术与研发', [
            ['研发实力', 'https://www.baidu.com/'],
            ['精益生产', 'https://www.baidu.com/'],
            ['质量管理', '/#quality'],
          ]],
          ['可持续发展', [
            ['绿色工厂', 'https://www.baidu.com/'],
            ['环保材料', 'https://www.baidu.com/'],
            ['LCA评估与碳足迹', 'https://www.baidu.com/'],
            ['最新动态', 'https://www.baidu.com/'],
          ]],
          ['资讯中心', [
            ['展会活动', 'https://www.baidu.com/'],
            ['新闻资讯', 'https://www.baidu.com/'],
          ]],
          ['联系我们', [
            ['联系方式', '/#contact'],
            ['加入美途', 'https://www.baidu.com/'],
          ]],
        ],
        socials: [
          ['wechat', '微信', 'https://www.baidu.com/'],
          ['youtube', 'YouTube', 'https://www.baidu.com/'],
          ['twitter', 'X', 'https://www.baidu.com/'],
          ['pinterest', 'Pinterest', 'https://www.baidu.com/'],
          ['linkedin', 'LinkedIn', 'https://www.baidu.com/'],
          ['facebook', 'Facebook', 'https://www.baidu.com/'],
          ['instagram', 'Instagram', 'https://www.baidu.com/'],
          ['tiktok', 'TikTok', 'https://www.baidu.com/'],
        ],
        legalLinks: [
          ['隐私政策', 'https://www.baidu.com/'],
          ['法律声明', 'https://www.baidu.com/'],
          ['网站地图', 'https://www.baidu.com/'],
          ['网站建设：占位链接', 'https://www.baidu.com/'],
        ],
      },
    },
    products: {
      eyebrow: '产品范围',
      title: '覆盖贴牌项目常用的多类行李箱产品。',
      intro: '以 PC 行李箱为主要开发方向，同时支持 PP、铝框、拉链箱和定制箱，适配不同市场定位。',
      list: [
        ['MT1007 PC Luggage', '主推系列，适合中高端及主流硬壳箱项目。', heroImage],
        ['PP Luggage', '耐用且高性价比，适合大批量订单。', sideImage],
        ['Aluminum Frame Luggage', '铝框结构更有质感，适合更高产品定位。', openImage],
        ['Zipper Luggage', '结构灵活，适合广泛市场应用。', sideAltImage],
        ['Custom Luggage', '支持 Logo、箱壳纹理、颜色、内里、轮子、拉杆和包装定制。', interiorImage],
      ],
    },
    capability: {
      eyebrow: '制造能力',
      title: '从产品想法到可出货的行李箱量产方案。',
      list: [
        ['产品开发', '协助市场定位、尺寸规划、箱壳风格、功能配置和样品方向。'],
        ['材料与箱壳工艺', '支持 PC、PP、铝框方案，以及颜色、纹理和表面效果开发。'],
        ['部件整合', '协调轮子、拉杆、锁具、拉链、内里、框架部件和包装。'],
        ['订单执行', '打样、产前确认、量产跟进和出口包装准备。'],
      ],
    },
    custom: {
      eyebrow: 'OEM / ODM 服务',
      title: '按照成熟行李箱合作伙伴的流程提供定制支持。',
      steps: [
        ['01', '需求沟通', '确认目标市场、产品档次、尺寸、材料和数量。'],
        ['02', '设计方向', '确认箱壳风格、颜色、Logo 位置、内里和包装方案。'],
        ['03', '样品开发', '制作并评估样品，再进入量产决策。'],
        ['04', '工程确认', '确认轮子、拉杆、锁具、拉链、铝框和装配细节。'],
        ['05', '批量生产', '安排材料、生产计划和过程控制。'],
        ['06', '最终检验', '检查外观、功能、包装和出货状态。'],
      ],
    },
    factory: {
      eyebrow: '工厂实力',
      title: '围绕专业 OEM/ODM 合作搭建能力结构。',
      body: '工厂环境和生产设备图片已经整理进网站素材目录。后续可以继续补充车间、仓储、质检区域和证书照片。',
      features: ['工厂环境', '生产设备', '车间能力', '质检区域待补充'],
    },
    quality: {
      eyebrow: '质量控制',
      title: '出货前进行流程化质量检查。',
      list: ['来料检查', '箱壳外观检查', '轮子滚动测试', '拉杆测试', '锁具与拉链检查', '最终包装检查'],
    },
    contact: {
      eyebrow: '联系我们',
      title: '发送您的行李箱项目需求。',
      intro: '请提供产品类别、目标市场、尺寸范围、定制要求和预计数量。联系方式位置已预留，后续可替换为确认后的电话、邮箱、微信、WhatsApp 和地址。',
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
const heroSlides = [
  { image: factoryEnvironmentImage, label: 'Factory Environment' },
  { image: machineImage1, label: 'Production Equipment 01' },
  { image: machineImage2, label: 'Production Equipment 02' },
  { image: machineImage3, label: 'Production Equipment 03' },
  { image: machineImage4, label: 'Production Equipment 04' },
]
const heroBackground = computed(() => heroSlides[activeHero.value])
const heroTransitionName = computed(() => (heroDirection.value === 'next' ? 'hero-slide-next' : 'hero-slide-prev'))
const activeMega = computed(() => (activeMenu.value ? t.value.mega[activeMenu.value] : null))
const machineGallery = [machineImage1, machineImage2, machineImage3, machineImage4]
const aboutPath = '/about'
const placeholderLink = 'https://www.baidu.com/'
const pcCategoryPath = '/PC-Luggage'
const mt1007Path = '/PC-Luggage/mt1007-pc-luggage.html'
const qrDarkCells = new Set([1, 2, 3, 4, 5, 7, 11, 13, 15, 17, 19, 21, 22, 23, 25, 29, 31, 33, 34, 35, 37, 41, 43, 45, 46, 47, 48, 49])
const mt1007Product = {
  model: 'MT1007',
  category: 'PC Luggage',
  image: heroImage,
  coverImage: handleImage,
  displayImage: displayImage1,
  gallery: [heroImage, sideImage, interiorImage, handleImage, sideAltImage, lockImage],
  en: {
    title: 'MT1007 PC Luggage',
    summary: 'PC hard-shell suitcase sample for OEM/ODM programs, with logo, color, lining, wheel, handle and lock customization support.',
    highlights: ['PC hard shell', 'Custom logo', 'OEM/ODM ready', 'Detail customization'],
  },
  zh: {
    title: 'MT1007 PC 行李箱',
    summary: '适合 OEM/ODM 项目的 PC 硬壳行李箱样品，支持 Logo、颜色、内里、轮子、拉杆和锁具定制。',
    highlights: ['PC 硬壳箱', 'Logo 定制', '支持 OEM/ODM', '细节可定制'],
  },
}

const parseRoute = () => {
  const path = window.location.pathname.replace(/\/$/, '') || '/'
  if (path.toLowerCase() === mt1007Path.toLowerCase()) return { name: 'product-detail' }
  if (path.toLowerCase() === pcCategoryPath.toLowerCase()) return { name: 'pc-category' }
  if (path.toLowerCase() === aboutPath.toLowerCase()) return { name: 'about' }
  return { name: 'home' }
}

const scrollToHash = (hash, behavior = 'smooth') => {
  if (!hash) {
    window.scrollTo({ top: 0, behavior })
    return
  }

  nextTick(() => {
    requestAnimationFrame(() => {
      document.querySelector(hash)?.scrollIntoView({ behavior, block: 'start' })
    })
  })
}

const navigateTo = (path, hash = '') => {
  const target = `${path}${hash}`
  window.history.pushState({}, '', target)
  route.value = parseRoute()
  if (route.value.name === 'about') {
    activeAboutSection.value = hash ? hash.replace('#', '') : 'company'
  }
  closeMenu()
  scrollToHash(hash)
}

const handleInternalLink = (event, path, hash = '') => {
  event.preventDefault()
  navigateTo(path, hash)
}

const handleNavLink = (event, href) => {
  event.preventDefault()
  if (href.startsWith('#')) {
    navigateTo('/', href)
    return
  }
  const [path, hash] = href.split('#')
  navigateTo(path || '/', hash ? `#${hash}` : '')
}

const handleAboutAnchor = (event, id) => {
  event.preventDefault()
  activeAboutSection.value = id
  navigateTo(aboutPath, `#${id}`)
}

const setAboutHistory = (index) => {
  activeAboutHistory.value = index
}

const navHref = (id) => {
  if (id === 'home') return '/'
  if (id === 'about') return aboutPath
  return `/#${id}`
}

const handleFooterNav = (event, id) => {
  event.preventDefault()
  if (id === 'home') {
    navigateTo('/')
    return
  }
  if (id === 'about') {
    navigateTo(aboutPath)
    return
  }
  navigateTo('/', `#${id}`)
}

const handleFooterLink = (event, href) => {
  if (href.startsWith('http')) return
  event.preventDefault()
  const [path, hash] = href.split('#')
  navigateTo(path || '/', hash ? `#${hash}` : '')
}

const setProductImage = (index) => {
  activeProductImage.value = index
}

const switchLanguage = () => {
  lang.value = lang.value === 'en' ? 'zh' : 'en'
  menuOpen.value = false
  activeMenu.value = null
}

const closeMenu = () => {
  menuOpen.value = false
  activeMenu.value = null
  window.clearTimeout(megaCloseTimer)
}

const toggleMega = (id) => {
  activeMenu.value = activeMenu.value === id ? null : id
}

const openMega = (id) => {
  window.clearTimeout(megaCloseTimer)
  activeMenu.value = id
}

const closeMega = () => {
  activeMenu.value = null
}

const scheduleMegaClose = () => {
  window.clearTimeout(megaCloseTimer)
  megaCloseTimer = window.setTimeout(closeMega, 140)
}

const cancelMegaClose = () => {
  window.clearTimeout(megaCloseTimer)
}

const goHero = (index) => {
  if (index === activeHero.value) return
  heroDirection.value = index > activeHero.value ? 'next' : 'prev'
  activeHero.value = index
  restartHeroText()
}

const nextHero = () => {
  heroDirection.value = 'next'
  activeHero.value = (activeHero.value + 1) % heroSlides.length
  restartHeroText()
}

const restartHeroText = () => {
  heroTextVisible.value = false
  window.clearTimeout(heroTextTimer)
  heroTextTimer = window.setTimeout(() => {
    heroTextVisible.value = true
  }, 560)
}

const startMetricCount = () => {
  if (visibleMetrics.value) return
  visibleMetrics.value = true

  const start = performance.now()
  const duration = 1200
  const targets = t.value.metrics.map((item) => item.value)

  const tick = (time) => {
    const progress = Math.min((time - start) / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    metricValues.value = targets.map((target) => Math.round(target * eased))
    if (progress < 1) {
      metricFrame = requestAnimationFrame(tick)
    }
  }

  metricFrame = requestAnimationFrame(tick)
}

const vReveal = {
  mounted(el) {
    el.classList.add('reveal-ready')
    if (revealObserver) {
      revealObserver.observe(el)
    }
  },
  unmounted(el) {
    if (revealObserver) {
      revealObserver.unobserve(el)
    }
  },
}

const observeRevealTargets = () => {
  if (!revealObserver) return
  document.querySelectorAll('.reveal-ready:not(.reveal-in)').forEach((el) => {
    revealObserver.observe(el)
  })
}

const syncAboutSectionObserver = () => {
  aboutSectionObserver?.disconnect()
  if (route.value.name !== 'about') return

  const sections = [...document.querySelectorAll('[data-about-section]')]
  if (!sections.length) return

  aboutSectionObserver = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]

      if (visibleEntry?.target?.id) {
        activeAboutSection.value = visibleEntry.target.id
      }
    },
    { rootMargin: '-32% 0px -58% 0px', threshold: 0 },
  )

  sections.forEach((section) => aboutSectionObserver.observe(section))
}

const syncRouteEffects = (shouldScroll = false, behavior = 'smooth') => {
  if (route.value.name === 'about') {
    activeAboutSection.value = window.location.hash ? window.location.hash.replace('#', '') : 'company'
  }

  nextTick(() => {
    observeRevealTargets()
    syncAboutSectionObserver()
    if (shouldScroll) {
      scrollToHash(window.location.hash, behavior)
    }
  })
}

watch(
  () => route.value.name,
  () => {
    syncRouteEffects()
  },
)

onMounted(() => {
  route.value = parseRoute()
  popstateHandler = () => {
    route.value = parseRoute()
    syncRouteEffects(true)
  }
  window.addEventListener('popstate', popstateHandler)

  heroSlides.forEach((slide) => {
    const image = new Image()
    image.src = slide.image
  })
  restartHeroText()
  heroTimer = window.setInterval(nextHero, 5600)

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-in')
          revealObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.14 },
  )

  syncRouteEffects(Boolean(window.location.hash), 'auto')

  const metricSection = document.querySelector('[data-metrics]')
  if (metricSection) {
    metricObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startMetricCount()
          metricObserver.disconnect()
        }
      },
      { threshold: 0.35 },
    )
    metricObserver.observe(metricSection)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('popstate', popstateHandler)
  window.clearInterval(heroTimer)
  window.clearTimeout(megaCloseTimer)
  window.clearTimeout(heroTextTimer)
  revealObserver?.disconnect()
  metricObserver?.disconnect()
  aboutSectionObserver?.disconnect()
  if (metricFrame) {
    cancelAnimationFrame(metricFrame)
  }
})
</script>

<template>
  <div :lang="lang" class="min-h-screen bg-mist text-carbon">
    <header
      class="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-carbon/92 text-white backdrop-blur-xl"
      @mouseenter="cancelMegaClose"
      @mouseleave="scheduleMegaClose"
    >
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs text-white/62">
        <span>{{ t.meta.topbar }}</span>
        <span class="hidden sm:inline">PC / PP / Aluminum Frame Luggage</span>
      </div>

      <nav class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <a href="/" class="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-white" @click="handleInternalLink($event, '/')">
          <span class="grid h-11 w-11 place-items-center border border-white/20 bg-white p-1.5">
            <img :src="logoImage" alt="METU logo" class="h-full w-full object-contain" />
          </span>
          <span>
            <span class="block text-lg font-semibold tracking-[0.18em]">METU</span>
            <span class="hidden text-xs text-white/55 md:block">{{ t.meta.logoSub }}</span>
          </span>
        </a>

        <div class="hidden items-center gap-1 lg:flex">
          <a
            v-if="t.nav[0]"
            href="/"
            class="relative px-3 py-2 text-sm text-white/68 transition-colors duration-200 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            @mouseenter="closeMega"
            @focus="closeMega"
            @click="handleInternalLink($event, '/')"
          >
            {{ t.nav[0][1] }}
          </a>
          <button
            v-for="[id, label] in t.nav"
            v-show="id !== 'home'"
            :key="id"
            type="button"
            class="relative cursor-pointer px-3 py-2 text-sm transition-colors duration-200 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            :class="activeMenu === id ? 'text-white' : 'text-white/68'"
            @mouseenter="openMega(id)"
            @focus="openMega(id)"
            @click="id === 'about' ? navigateTo(aboutPath) : null"
          >
            {{ label }}
            <span class="absolute inset-x-3 -bottom-4 h-0.5 origin-left bg-champagne transition-transform duration-300" :class="activeMenu === id ? 'scale-x-100' : 'scale-x-0'"></span>
          </button>
        </div>

        <div class="flex items-center gap-2">
          <button
            type="button"
            class="cursor-pointer border border-white/20 px-3 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-white hover:text-carbon focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            @click="switchLanguage"
          >
            {{ t.meta.language }}
          </button>
          <a
            href="#contact"
            class="hidden cursor-pointer bg-champagne px-4 py-2 text-sm font-semibold text-carbon transition-colors duration-200 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white md:inline-flex"
            @click="handleInternalLink($event, '/', '#contact')"
          >
            {{ t.meta.inquiry }}
          </a>
          <button
            type="button"
            class="grid h-10 w-10 cursor-pointer place-items-center border border-white/20 text-white transition-colors duration-200 hover:bg-white hover:text-carbon focus:outline-none focus-visible:ring-2 focus-visible:ring-white lg:hidden"
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

      <Transition name="mega">
        <div v-if="activeMega" class="hidden border-t border-white/10 bg-carbon/96 shadow-metal lg:block">
          <div class="mx-auto grid max-w-7xl grid-cols-[0.85fr_1.35fr_220px] gap-8 px-4 py-7">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.2em] text-champagne">{{ activeMega.eyebrow }}</p>
              <h2 class="mt-3 text-3xl font-semibold text-white">{{ activeMega.title }}</h2>
              <p class="mt-4 text-sm leading-7 text-white/62">{{ activeMega.summary }}</p>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <a
                v-for="[href, label] in activeMega.links"
                :key="label"
                :href="href"
                class="group flex cursor-pointer items-center justify-between border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-white/78 transition-colors duration-200 hover:border-champagne/70 hover:bg-white/[0.08] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                @click="handleNavLink($event, href)"
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

      <div v-if="menuOpen" class="border-t border-white/10 bg-carbon px-4 py-3 lg:hidden">
        <div v-for="[id, label] in t.nav" :key="id" class="border-b border-white/8 last:border-b-0">
          <a
            v-if="id === 'home'"
            :href="`#${id}`"
            class="block px-2 py-3 text-sm text-white/76 transition-colors duration-200 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            @click="handleInternalLink($event, '/')"
          >
            {{ label }}
          </a>
          <template v-else>
            <button
              type="button"
              class="w-full cursor-pointer px-2 py-3 text-left text-sm text-white/76 transition-colors duration-200 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              @click="toggleMega(id)"
            >
              <span>{{ label }}</span>
            </button>
            <div v-if="activeMenu === id && t.mega[id]" class="pb-3 pl-2">
              <p class="mb-2 text-xs leading-5 text-white/48">{{ t.mega[id].summary }}</p>
              <a
                v-for="[href, itemLabel] in t.mega[id].links"
                :key="itemLabel"
                :href="href"
                class="block py-2 text-sm text-white/68"
                @click="handleNavLink($event, href)"
              >
                {{ itemLabel }}
              </a>
            </div>
          </template>
        </div>
      </div>
    </header>

    <main>
      <template v-if="route.name === 'home'">
      <section id="home" class="relative min-h-screen overflow-hidden bg-carbon text-white">
        <div class="absolute inset-0">
          <Transition :name="heroTransitionName">
            <div :key="activeHero" class="hero-slide absolute inset-0">
              <img :src="heroBackground.image" :alt="heroBackground.label" class="absolute inset-0 h-full w-full object-cover object-center opacity-28 blur-xl scale-105" />
              <img :src="heroBackground.image" :alt="heroBackground.label" class="relative z-10 h-full w-full object-contain object-center p-0 md:p-8" />
            </div>
          </Transition>
          <div class="absolute inset-0 bg-gradient-to-r from-carbon/82 via-carbon/50 to-carbon/20"></div>
          <div class="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-carbon/82 to-transparent"></div>
        </div>

        <div class="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 pb-32 pt-36 md:pt-40">
          <div class="hero-copy-panel max-w-6xl" :class="heroTextVisible ? 'hero-copy-visible' : 'hero-copy-hidden'">
            <h1 class="hero-copy-title whitespace-nowrap font-display text-[clamp(1.55rem,3.25vw,3.45rem)] font-semibold leading-tight text-white max-md:whitespace-normal">
              美途：为全球品牌提供拉杆箱解决方案
            </h1>
            <p class="hero-copy-subtitle mt-4 max-w-3xl text-base font-medium leading-7 text-white/82 md:text-xl">
              以技术创新驱动制造战略，追求高品质发展
            </p>
          </div>

          <div class="absolute bottom-10 left-4 right-4">
            <div class="mx-auto flex max-w-7xl items-center justify-center">
              <div class="flex items-center gap-3">
                <button
                  v-for="(slide, index) in heroSlides"
                  :key="slide.label"
                  type="button"
                  class="h-3 w-3 cursor-pointer rounded-full border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  :class="activeHero === index ? 'border-champagne bg-champagne shadow-[0_0_0_6px_rgba(185,144,86,0.22)]' : 'border-white/70 bg-white/20 hover:bg-white/80'"
                  :aria-label="`Go to ${slide.label}`"
                  @click="goHero(index)"
                ></button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section data-metrics class="relative z-10 -mt-10 px-4">
        <div class="mx-auto grid max-w-7xl divide-y divide-carbon/10 bg-white shadow-metal md:grid-cols-4 md:divide-x md:divide-y-0">
          <div v-for="(item, index) in t.metrics" :key="item.label" class="p-6 md:p-8">
            <p class="text-4xl font-semibold text-carbon">
              {{ metricValues[index] }}<span class="text-champagne">{{ item.suffix }}</span>
            </p>
            <p class="mt-2 text-sm leading-6 text-carbon/58">{{ item.label }}</p>
          </div>
        </div>
      </section>

      <section id="about" class="bg-mist px-4 py-20 md:py-28">
        <div class="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div v-reveal>
            <p class="text-sm font-semibold uppercase tracking-[0.18em] text-champagne">{{ t.about.eyebrow }}</p>
            <h2 class="mt-4 font-display text-4xl font-semibold leading-tight md:text-6xl">{{ t.about.title }}</h2>
          </div>
          <div v-reveal>
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

      <section id="products" class="bg-white px-4 py-20 md:py-28">
        <div class="mx-auto max-w-7xl">
          <div v-reveal class="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div class="max-w-3xl">
              <p class="text-sm font-semibold uppercase tracking-[0.18em] text-champagne">{{ t.products.eyebrow }}</p>
              <h2 class="mt-4 font-display text-4xl font-semibold leading-tight md:text-6xl">{{ t.products.title }}</h2>
            </div>
            <p class="max-w-xl text-base leading-8 text-carbon/62">{{ t.products.intro }}</p>
          </div>

          <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <article
              v-for="([name, desc, image], index) in t.products.list"
              :key="name"
              :class="index === 0 ? 'lg:col-span-2 cursor-pointer' : ''"
              v-reveal
              class="group overflow-hidden border border-carbon/10 bg-mist"
              @click="index === 0 && navigateTo(pcCategoryPath)"
            >
              <div :class="index === 0 ? 'h-[440px]' : 'h-72'" class="image-sheen relative overflow-hidden bg-carbon">
                <img :src="image" :alt="`${name} product image`" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                <div class="absolute inset-0 flex items-end bg-gradient-to-t from-carbon/80 via-carbon/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span class="m-5 border border-white/24 bg-white/12 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md">
                    {{ t.meta.inquiry }}
                  </span>
                </div>
              </div>
              <div class="flex items-start justify-between gap-6 p-6">
                <div>
                  <h3 class="text-2xl font-semibold">{{ name }}</h3>
                  <p class="mt-3 max-w-2xl text-sm leading-7 text-carbon/62">{{ desc }}</p>
                </div>
                <span class="mt-1 grid h-9 w-9 shrink-0 place-items-center border border-carbon/15 text-carbon">
                  <svg aria-hidden="true" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                    <path d="M7 17 17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </span>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="custom" class="surface-dark px-4 py-20 text-white md:py-28">
        <div class="mx-auto max-w-7xl">
          <div class="grid gap-12 lg:grid-cols-[0.78fr_1.22fr]">
            <div v-reveal>
              <p class="text-sm font-semibold uppercase tracking-[0.18em] text-champagne">{{ t.custom.eyebrow }}</p>
              <h2 class="mt-4 font-display text-4xl font-semibold leading-tight md:text-6xl">{{ t.custom.title }}</h2>
            </div>
            <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <article
                v-for="([num, title, desc], index) in t.custom.steps"
                :key="num"
                v-reveal
                class="cursor-pointer border border-white/12 bg-white/[0.05] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-champagne/70 hover:bg-white/[0.08]"
                :class="activeService === index ? 'border-champagne/70 bg-white/[0.08]' : ''"
                @mouseenter="activeService = index"
              >
                <p class="text-sm font-semibold text-champagne">{{ num }}</p>
                <h3 class="mt-6 text-xl font-semibold">{{ title }}</h3>
                <p class="mt-4 text-sm leading-7 text-white/62">{{ desc }}</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section id="factory" class="bg-white px-4 py-20 md:py-28">
        <div class="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div v-reveal>
            <p class="text-sm font-semibold uppercase tracking-[0.18em] text-champagne">{{ t.capability.eyebrow }}</p>
            <h2 class="mt-4 font-display text-4xl font-semibold leading-tight md:text-6xl">{{ t.capability.title }}</h2>
            <div class="mt-10 space-y-5">
              <article v-for="[title, desc] in t.capability.list" :key="title" class="border-l-2 border-champagne bg-mist p-5">
                <h3 class="text-xl font-semibold">{{ title }}</h3>
                <p class="mt-2 text-sm leading-7 text-carbon/62">{{ desc }}</p>
              </article>
            </div>
          </div>

          <div v-reveal>
            <div class="grid grid-cols-2 gap-4">
              <img :src="factoryEnvironmentImage" alt="METU factory environment" class="col-span-2 h-80 w-full object-cover" />
              <img :src="machineImage1" alt="Factory production machine" class="h-56 w-full object-cover" />
              <img :src="machineImage2" alt="Factory equipment detail" class="mt-10 h-56 w-full object-cover" />
            </div>
            <div class="mt-6 bg-carbon p-8 text-white">
              <p class="text-sm font-semibold uppercase tracking-[0.18em] text-champagne">{{ t.factory.eyebrow }}</p>
              <h2 class="mt-3 text-3xl font-semibold">{{ t.factory.title }}</h2>
              <p class="mt-4 text-sm leading-7 text-white/66">{{ t.factory.body }}</p>
              <div class="mt-6 grid gap-3 sm:grid-cols-2">
                <span v-for="feature in t.factory.features" :key="feature" class="border border-white/12 px-4 py-3 text-sm text-white/76">{{ feature }}</span>
              </div>
            </div>
            <div class="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
              <img
                v-for="(image, index) in machineGallery"
                :key="index"
                :src="image"
                :alt="`METU production equipment ${index + 1}`"
                class="h-28 w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="quality" class="bg-mist px-4 py-20 md:py-28">
        <div class="mx-auto max-w-7xl">
          <div v-reveal class="mb-12 max-w-3xl">
            <p class="text-sm font-semibold uppercase tracking-[0.18em] text-champagne">{{ t.quality.eyebrow }}</p>
            <h2 class="mt-4 font-display text-4xl font-semibold leading-tight md:text-6xl">{{ t.quality.title }}</h2>
          </div>
          <div class="grid gap-3 md:grid-cols-3">
            <div v-for="(item, index) in t.quality.list" :key="item" v-reveal class="flex items-center gap-4 border border-carbon/10 bg-white p-5">
              <span class="text-sm font-semibold text-champagne">{{ String(index + 1).padStart(2, '0') }}</span>
              <span class="text-sm font-medium leading-6">{{ item }}</span>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" class="bg-carbon px-4 py-20 text-white md:py-28">
        <div class="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1fr]">
          <div v-reveal>
            <p class="text-sm font-semibold uppercase tracking-[0.18em] text-champagne">{{ t.contact.eyebrow }}</p>
            <h2 class="mt-4 font-display text-4xl font-semibold leading-tight md:text-6xl">{{ t.contact.title }}</h2>
            <p class="mt-6 text-lg leading-9 text-white/66">{{ t.contact.intro }}</p>
            <div class="mt-9 divide-y divide-white/10 border-y border-white/10">
              <div v-for="[label, value] in t.contact.details" :key="label" class="grid grid-cols-[120px_1fr] gap-4 py-4 text-sm">
                <span class="text-white/44">{{ label }}</span>
                <span class="text-white/82">{{ value }}</span>
              </div>
            </div>
          </div>

          <form v-reveal class="bg-white p-5 text-carbon md:p-8" @submit.prevent>
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

      <section v-else-if="route.name === 'about'" class="about-page bg-mist">
        <section class="relative overflow-hidden bg-carbon px-4 pb-20 pt-36 text-white md:pb-28 md:pt-44">
          <div class="absolute inset-0">
            <img :src="factoryEnvironmentImage" alt="METU factory environment" class="h-full w-full object-cover opacity-28" />
            <div class="absolute inset-0 bg-gradient-to-r from-carbon via-carbon/88 to-carbon/44"></div>
            <div class="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-carbon to-transparent"></div>
          </div>
          <div v-reveal class="relative mx-auto max-w-7xl">
            <div class="mb-8 flex flex-wrap items-center gap-2 text-sm text-white/52">
              <a href="/" class="hover:text-white" @click="handleInternalLink($event, '/')">{{ lang === 'en' ? 'Home' : '首页' }}</a>
              <span>/</span>
              <span class="text-white">{{ lang === 'en' ? 'About METU' : '关于 METU' }}</span>
            </div>
            <p class="text-sm font-semibold uppercase tracking-[0.22em] text-white/58">{{ t.aboutPage.bannerEyebrow }}</p>
            <h1 class="mt-5 max-w-5xl text-3xl font-semibold leading-tight text-white md:text-5xl">{{ t.aboutPage.title }}</h1>
            <p class="mt-6 max-w-3xl text-sm leading-7 text-white/70 md:text-base md:leading-8">{{ t.aboutPage.subtitle }}</p>
          </div>
        </section>

        <nav class="sticky top-[92px] z-30 border-b border-carbon/10 bg-mist/94 px-4 backdrop-blur-xl">
          <div class="mx-auto flex max-w-7xl gap-2 overflow-x-auto py-3">
            <a
              v-for="[id, label] in t.aboutPage.nav"
              :key="id"
              :href="`${aboutPath}#${id}`"
              class="whitespace-nowrap border px-4 py-3 text-sm font-semibold transition-colors duration-200"
              :class="activeAboutSection === id ? 'border-carbon bg-carbon text-white' : 'border-carbon/10 bg-white/70 text-carbon/58 hover:border-champagne/60 hover:text-carbon'"
              @click="handleAboutAnchor($event, id)"
            >
              {{ label }}
            </a>
          </div>
        </nav>

        <section id="company" data-about-section class="about-company-section scroll-mt-36 bg-white px-4 py-16 md:py-24">
          <div class="mx-auto max-w-7xl">
            <div class="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
              <div v-reveal class="pt-2">
                <p class="section-dot-label text-sm font-semibold text-carbon">{{ t.aboutPage.company.eyebrow }}</p>
                <h2 class="mt-7 max-w-2xl text-3xl font-semibold leading-tight text-black md:text-5xl">
                  {{ t.aboutPage.company.title }}
                </h2>
                <div class="mt-10 max-w-2xl space-y-5 text-sm leading-8 text-carbon/62 md:text-base">
                  <p v-for="paragraph in t.aboutPage.company.body" :key="paragraph">{{ paragraph }}</p>
                </div>
              </div>

              <figure v-reveal class="overflow-hidden rounded-[22px] bg-carbon">
                <img :src="factoryEnvironmentImage" alt="METU factory environment view" class="h-[340px] w-full object-cover md:h-[460px]" />
              </figure>
            </div>

            <div class="mt-20 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
              <div v-for="[value, label] in t.aboutPage.company.stats" :key="value" v-reveal class="border-t border-carbon/18 pt-8">
                <p class="about-gradient-number text-5xl font-bold leading-none md:text-6xl">{{ value }}</p>
                <p class="mt-6 text-sm leading-7 text-carbon/62">{{ label }}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="culture" data-about-section class="relative scroll-mt-36 overflow-hidden px-4 py-16 text-white md:min-h-[760px] md:py-24">
          <div class="absolute inset-0">
            <img :src="machineImage4" alt="METU production background" class="h-full w-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-b from-black/18 via-black/8 to-black/36"></div>
            <div class="absolute inset-0 bg-sky-900/28"></div>
          </div>

          <div class="relative mx-auto max-w-7xl">
            <div v-reveal>
              <p class="section-dot-label section-dot-light text-sm font-semibold">{{ t.aboutPage.culture.eyebrow }}</p>
              <h2 class="mt-7 max-w-4xl text-3xl font-semibold leading-tight md:text-5xl">{{ t.aboutPage.culture.title }}</h2>
            </div>

            <div class="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <article
                v-for="[title, body] in t.aboutPage.culture.cards"
                :key="title"
                v-reveal
                class="culture-glass-card flex min-h-[360px] flex-col justify-between rounded-[18px] p-6 md:min-h-[420px]"
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

        <section id="history" data-about-section class="history-section relative scroll-mt-36 overflow-hidden bg-white px-4 py-16 md:py-24">
          <div class="mx-auto max-w-7xl">
            <div v-reveal class="max-w-4xl">
              <p class="inline-block bg-[#2f63c7] px-3 py-1 text-3xl font-semibold leading-none text-white md:text-4xl">{{ t.aboutPage.history.eyebrow }}</p>
              <p class="mt-8 max-w-2xl text-sm leading-7 text-carbon/56 md:text-base">{{ t.aboutPage.history.intro }}</p>
            </div>

            <div v-reveal class="history-ruler mt-16 overflow-x-auto pb-8">
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
                    @click="setAboutHistory(index)"
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

            <div v-reveal class="relative mt-16 grid gap-10 lg:grid-cols-[0.95fr_1fr] lg:items-center">
              <div class="history-photo-stack">
                <div class="history-photo-shadow"></div>
                <div class="history-photo-card">
                  <img :src="t.aboutPage.history.timeline[activeAboutHistory][3]" alt="METU development stage" class="h-full w-full object-cover" />
                </div>
              </div>
              <div class="relative">
                <p class="about-gradient-number text-7xl font-bold leading-none md:text-8xl">{{ t.aboutPage.history.timeline[activeAboutHistory][0] }}</p>
                <h3 class="mt-8 text-2xl font-semibold text-carbon md:text-3xl">{{ t.aboutPage.history.timeline[activeAboutHistory][1] }}</h3>
                <p class="mt-6 max-w-xl text-sm leading-8 text-carbon/64 md:text-base">{{ t.aboutPage.history.timeline[activeAboutHistory][2] }}</p>
                <p class="history-watermark select-none">HISTORY</p>
              </div>
            </div>
          </div>
        </section>

        <section id="honor" data-about-section class="honor-section relative scroll-mt-36 overflow-hidden px-4 py-16 text-white md:min-h-[760px] md:py-24">
          <div class="absolute inset-0 bg-gradient-to-br from-[#5f7898] via-[#8d9cad] to-[#d3c6b2]"></div>
          <div class="absolute inset-0 bg-white/10"></div>
          <div class="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div v-reveal>
              <h2 class="text-3xl font-semibold leading-tight md:text-5xl">{{ t.aboutPage.honor.eyebrow }}</h2>
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

            <div v-reveal class="honor-stage min-h-[520px]">
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

        <footer id="footer" data-about-section class="scroll-mt-36 bg-[#1b1b1b] px-4 pb-8 pt-16 text-white md:pt-24">
          <div class="mx-auto grid min-h-[620px] max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.85fr]">
            <div v-reveal class="flex flex-col">
              <a href="/" class="inline-flex items-center gap-4" @click="handleInternalLink($event, '/')">
                <span class="grid h-14 w-14 place-items-center bg-white p-2">
                  <img :src="logoImage" alt="METU logo" class="h-full w-full object-contain" />
                </span>
                <span class="text-5xl font-bold tracking-[0.08em] text-white">METU</span>
              </a>

              <div class="mt-16">
                <div class="flex items-center gap-4">
                  <span class="grid h-9 w-9 place-items-center rounded-full border border-white text-white">
                    <svg aria-hidden="true" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9">
                      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7A2 2 0 0 1 22 16.9Z" />
                    </svg>
                  </span>
                  <span class="text-3xl font-bold tracking-tight">{{ t.aboutPage.footer.phone }}</span>
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

            <div v-reveal class="grid content-start gap-x-16 gap-y-20 md:grid-cols-2 xl:grid-cols-3">
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
          @click="scrollToHash('#company')"
        >
          <svg aria-hidden="true" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 19V5" />
            <path d="m5 12 7-7 7 7" />
          </svg>
        </button>
      </section>

      <section v-else-if="route.name === 'pc-category'" class="bg-mist">
        <div class="relative overflow-hidden bg-carbon px-4 pb-20 pt-36 text-white md:pb-28 md:pt-44">
          <div class="absolute inset-0">
            <img :src="mt1007Product.displayImage" alt="MT1007 PC luggage display background" class="h-full w-full object-cover opacity-24 blur-sm scale-105" />
            <div class="absolute inset-0 bg-gradient-to-r from-carbon via-carbon/86 to-carbon/42"></div>
          </div>
          <div v-reveal class="relative mx-auto max-w-7xl">
            <div class="mb-8 flex flex-wrap items-center gap-2 text-sm text-white/52">
              <a href="/" class="hover:text-white" @click="handleInternalLink($event, '/')">{{ lang === 'en' ? 'Home' : '首页' }}</a>
              <span>/</span>
              <a href="/#products" class="hover:text-white" @click="handleInternalLink($event, '/', '#products')">{{ lang === 'en' ? 'Products' : '产品中心' }}</a>
              <span>/</span>
              <span class="text-white">PC Luggage</span>
            </div>
            <p class="text-sm font-semibold uppercase tracking-[0.22em] text-champagne">
              {{ lang === 'en' ? 'Product Category' : '产品分类' }}
            </p>
            <h1 class="mt-5 font-display text-5xl font-semibold leading-tight md:text-7xl">PC Luggage</h1>
            <p class="mt-6 max-w-3xl text-base leading-8 text-white/70 md:text-lg">
              {{ lang === 'en'
                ? 'PC hard-shell luggage solutions for OEM/ODM projects, built for brands, traders, wholesalers and cross-border sellers.'
                : '面向 OEM/ODM 项目的 PC 硬壳行李箱解决方案，服务品牌方、贸易商、批发商和跨境电商客户。' }}
            </p>
          </div>
        </div>

        <div class="mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div v-reveal class="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
            <div>
              <p class="text-sm font-semibold uppercase tracking-[0.18em] text-champagne">
                {{ lang === 'en' ? 'PC Luggage Development' : 'PC 行李箱开发' }}
              </p>
              <h2 class="mt-4 font-display text-4xl font-semibold leading-tight text-carbon md:text-6xl">
                {{ lang === 'en' ? 'Focused PC hard-shell luggage for private label programs.' : '专注贴牌项目的 PC 硬壳行李箱。' }}
              </h2>
            </div>
            <p class="text-base leading-8 text-carbon/64">
              {{ lang === 'en'
                ? 'METU focuses on PC hard-shell luggage development for brands, traders, wholesalers and cross-border sellers. The MT1007 series can support logo, color, lining, wheel, trolley handle, lock and packaging customization.'
                : 'METU 专注于面向品牌方、贸易商、批发商和跨境电商客户的 PC 硬壳行李箱开发。MT1007 系列支持 Logo、颜色、内里、轮子、拉杆、锁具和包装定制。' }}
            </p>
          </div>

          <figure v-reveal class="mt-12 overflow-hidden border border-carbon/10 bg-white">
            <img :src="mt1007Product.displayImage" alt="MT1007 PC luggage display image" class="h-auto w-full object-contain" />
            <figcaption class="border-t border-carbon/10 px-5 py-4 text-sm text-carbon/56">
              {{ lang === 'en'
                ? 'MT1007 PC luggage display for OEM/ODM development.'
                : 'MT1007 PC 行李箱展示，适用于 OEM/ODM 定制开发。' }}
            </figcaption>
          </figure>

          <div class="mt-16 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div v-reveal>
              <p class="text-sm font-semibold uppercase tracking-[0.18em] text-champagne">
                {{ lang === 'en' ? 'Available Model' : '当前产品' }}
              </p>
              <h2 class="mt-3 font-display text-4xl font-semibold text-carbon md:text-5xl">
                {{ lang === 'en' ? 'PC Luggage Products' : 'PC 行李箱产品' }}
              </h2>
            </div>
            <p v-reveal class="max-w-xl text-sm leading-7 text-carbon/58">
              {{ lang === 'en'
                ? 'More PC luggage models can be added here as product materials and photos are prepared.'
                : '后续产品资料和图片准备完成后，可继续在这里添加更多 PC 行李箱型号。' }}
            </p>
          </div>

          <div class="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <a
              :href="mt1007Path"
              v-reveal
              class="group block overflow-hidden border border-carbon/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-champagne/60 hover:shadow-metal focus:outline-none focus-visible:ring-2 focus-visible:ring-carbon"
              @click="handleInternalLink($event, mt1007Path)"
            >
              <div class="image-sheen relative h-[430px] overflow-hidden bg-mist">
                <img :src="mt1007Product.coverImage" alt="MT1007 PC luggage trolley handle cover image" class="h-full w-full object-contain p-5 transition-transform duration-500 group-hover:scale-[1.035]" />
              </div>
              <div class="p-6">
                <p class="text-xs font-semibold uppercase tracking-[0.18em] text-champagne">PC Luggage</p>
                <h3 class="mt-3 text-2xl font-semibold text-carbon">{{ mt1007Product[lang].title }}</h3>
                <p class="mt-3 text-sm leading-7 text-carbon/60">{{ mt1007Product[lang].summary }}</p>
                <div class="mt-5 flex flex-wrap gap-2">
                  <span v-for="item in mt1007Product[lang].highlights.slice(0, 3)" :key="item" class="border border-carbon/10 px-3 py-2 text-xs text-carbon/58">
                    {{ item }}
                  </span>
                </div>
              </div>
            </a>

            <div v-reveal class="flex min-h-[560px] flex-col justify-center border border-dashed border-carbon/18 bg-white/70 p-8 text-center">
              <p class="text-sm font-semibold uppercase tracking-[0.18em] text-champagne">
                {{ lang === 'en' ? 'Coming Soon' : '即将补充' }}
              </p>
              <h3 class="mt-4 text-3xl font-semibold text-carbon">
                {{ lang === 'en' ? 'More PC Luggage Models' : '更多 PC 行李箱型号' }}
              </h3>
              <p class="mt-4 text-sm leading-7 text-carbon/56">
                {{ lang === 'en'
                  ? 'Additional PC suitcase programs will be added after model photos and basic product information are ready.'
                  : '更多 PC 箱款将在产品图片和基础资料准备完成后继续补充。' }}
              </p>
            </div>
          </div>

          <div v-reveal class="mt-16 grid gap-5 bg-carbon p-6 text-white md:grid-cols-[0.9fr_1.1fr] md:p-10">
            <div>
              <p class="text-sm font-semibold uppercase tracking-[0.18em] text-champagne">
                {{ lang === 'en' ? 'OEM/ODM Customization Available' : '支持 OEM/ODM 定制' }}
              </p>
              <h2 class="mt-3 text-3xl font-semibold">
                {{ lang === 'en' ? 'Build your PC luggage program with METU.' : '与 METU 一起开发您的 PC 行李箱项目。' }}
              </h2>
            </div>
            <div>
              <p class="text-sm leading-7 text-white/66">
                {{ lang === 'en'
                  ? 'Logo, color, lining, wheel, trolley handle, lock, packaging and sample development support for private label buyers.'
                  : '支持 Logo、颜色、内里、轮子、拉杆、锁具、包装和样品开发，适合贴牌和定制客户。' }}
              </p>
              <a
                href="/#contact"
                class="mt-6 inline-flex cursor-pointer bg-champagne px-6 py-4 text-sm font-semibold text-carbon transition-colors duration-200 hover:bg-white"
                @click="handleInternalLink($event, '/', '#contact')"
              >
                {{ lang === 'en' ? 'Send Inquiry' : '发送询盘' }}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section v-else-if="route.name === 'product-detail'" class="bg-white px-4 pb-24 pt-36 md:pt-40">
        <div class="mx-auto max-w-7xl">
          <div class="mb-8 flex flex-wrap items-center gap-2 text-sm text-carbon/52">
            <a href="/" class="hover:text-carbon" @click="handleInternalLink($event, '/')">{{ lang === 'en' ? 'Home' : '首页' }}</a>
            <span>/</span>
            <a :href="pcCategoryPath" class="hover:text-carbon" @click="handleInternalLink($event, pcCategoryPath)">PC Luggage</a>
            <span>/</span>
            <span class="text-carbon">{{ mt1007Product.model }}</span>
          </div>

          <div class="grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <div class="border border-carbon/10 bg-mist p-4">
                <Transition name="product-image" mode="out-in">
                  <img
                    :key="activeProductImage"
                    :src="mt1007Product.gallery[activeProductImage]"
                    alt="MT1007 PC luggage product main image"
                    class="h-[580px] w-full object-contain"
                  />
                </Transition>
              </div>
              <div class="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-6">
                <button
                  v-for="(image, index) in mt1007Product.gallery"
                  :key="image"
                  type="button"
                  class="cursor-pointer border bg-mist p-2 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-carbon"
                  :class="activeProductImage === index ? 'border-champagne' : 'border-carbon/10 hover:border-carbon/35'"
                  :aria-label="`View MT1007 product image ${index + 1}`"
                  @click="setProductImage(index)"
                >
                  <img :src="image" alt="MT1007 PC luggage thumbnail" class="h-24 w-full object-contain" />
                </button>
              </div>
            </div>

            <div>
              <p class="text-sm font-semibold uppercase tracking-[0.18em] text-champagne">PC Luggage / OEM ODM</p>
              <h1 class="mt-4 font-display text-5xl font-semibold leading-tight text-carbon md:text-7xl">{{ mt1007Product[lang].title }}</h1>
              <p class="mt-6 text-lg leading-9 text-carbon/66">{{ mt1007Product[lang].summary }}</p>
              <div class="mt-8 grid gap-3 sm:grid-cols-2">
                <div v-for="item in mt1007Product[lang].highlights" :key="item" class="border border-carbon/10 bg-mist p-4 text-sm font-medium">
                  {{ item }}
                </div>
              </div>
              <div class="mt-10 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/#contact"
                  class="inline-flex cursor-pointer items-center justify-center bg-carbon px-6 py-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-champagne hover:text-carbon"
                  @click="handleInternalLink($event, '/', '#contact')"
                >
                  {{ lang === 'en' ? 'Send Inquiry' : '发送询盘' }}
                </a>
                <a
                  :href="pcCategoryPath"
                  class="inline-flex cursor-pointer items-center justify-center border border-carbon/15 px-6 py-4 text-sm font-semibold text-carbon transition-colors duration-200 hover:bg-mist"
                  @click="handleInternalLink($event, pcCategoryPath)"
                >
                  {{ lang === 'en' ? 'Back to PC Luggage' : '返回 PC 行李箱' }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
