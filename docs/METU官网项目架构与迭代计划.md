# METU 官网项目架构与迭代计划

## 1. 当前项目状态

当前项目是一个 Vue + Vite + Tailwind CSS 的纯前端静态官网。

技术栈：

- Vue 3
- Vite
- Tailwind CSS
- 静态前端，无后端
- 中英文切换目前在前端组件内完成
- 当前已加入轻量前端路由，用于 `/about`、`/PC-Luggage` 和 `/PC-Luggage/mt1007-pc-luggage.html`

当前主要入口文件：

- `src/App.vue`：首页结构、文案数据、交互逻辑
- `src/style.css`：全局样式、动画、字体、基础效果
- `src/assets/`：正式网站图片素材
- `tailwind.config.js`：Tailwind 主题配置
- `package.json`：启动和构建命令
- `启动说明.md`：项目启动说明
- `start-dev.ps1`：PowerShell 一键启动脚本

## 2. 当前问题

项目目前能运行，但存在几个维护风险：

- 页面内容、文案、图片、交互逻辑都集中在 `src/App.vue`。
- 中英文文案直接写在组件中，后续维护会越来越重。
- 产品图片和工厂图片还没有清晰分类。
- 当前是单页结构，但未来可能需要多页面。
- 需求变动较快，需要文档作为后续迭代依据。

## 3. 推荐架构方向

第一阶段不建议马上重构成复杂系统。建议采用渐进式架构：

### 阶段 1：稳定首页与基础产品页

目标：

- 保持一个完整首页。
- 先把页面逻辑、内容顺序、视觉风格稳定下来。
- 用真实产品图和工厂图替换占位素材。
- 先实现 About 公司简介页、PC 行李箱分类页和 MT1007 产品详情页。

适合当前阶段。

### 阶段 2：拆分组件和数据

当首页结构稳定后，把 `src/App.vue` 拆分为：

```text
src/
  components/
    SiteHeader.vue
    HeroSection.vue
    MetricsStrip.vue
    ProductSection.vue
    OemOdmSection.vue
    FactorySection.vue
    QualitySection.vue
    ContactSection.vue
    SiteFooter.vue
  data/
    content.js
    navigation.js
    products.js
  assets/
    products/
    factory/
    logo/
  App.vue
  main.js
  style.css
```

好处：

- 每个模块更容易修改。
- 文案和图片数据可以集中管理。
- 后续多页面更容易迁移。

### 阶段 3：多页面结构

当内容足够丰富后，再引入 Vue Router。

建议页面：

```text
/
/about
/products
/PC-Luggage
/PC-Luggage/mt1007-pc-luggage.html
/products/pp-luggage
/products/aluminum-frame-luggage
/oem-odm
/factory
/quality
/contact
```

拆多页面的前提：

- 有足够产品图和参数。
- 有真实工厂照片。
- 有更多关于团队、工厂、质控、证书的信息。
- 需要搜索引擎优化。

## 4. 内容维护规则

### 4.1 文案维护

后续建议把文案集中到：

```text
src/data/content.js
```

结构示例：

```js
export const content = {
  en: {
    hero: {},
    products: {},
    factory: {},
  },
  zh: {
    hero: {},
    products: {},
    factory: {},
  },
}
```

维护原则：

- 英文为主，中文对应翻译。
- 不确定的信息不要写死。
- 产能、证书、客户案例等必须有真实依据。

### 4.2 图片维护

当前已使用的图片目录：

```text
src/assets/
  logo/
    metu-logo.png

  products/
    mt1007/
      mt1007-main.png
      mt1007-side.png
      mt1007-display-01.png
      mt1007-display-02.png
      mt1007-interior.png
      mt1007-trolley-handle.png
      mt1007-wheel.png
      mt1007-lock.png

  factory/
    environment/
      factory-environment-01.png
    machines/
      machine-01.png
      ...
      machine-10.png
```

命名建议使用英文和短横线：

```text
pc-luggage-red-front.png
pc-luggage-red-handle.png
factory-workshop-01.jpg
qc-wheel-test-01.jpg
```

这样可以避免中文文件名在构建、部署或服务器环境中出现路径问题。

后续新增图片时，建议按用途继续扩展：

```text
src/assets/
  products/
    mt1008/
    mt1009/
    pp-series/
    aluminum-frame-series/
  factory/
    workshop/
    warehouse/
    qc/
    certificates/
```

维护原则：

- 不再把正式使用的图片长期放在根目录 `图片/`。
- 新图片先按用途归类，再在页面中引用。
- 产品图以型号命名，例如 `mt1007-main.png`。
- 工厂图以场景命名，例如 `factory-environment-01.png`。
- 机器图以序号命名，例如 `machine-01.png`。

### 4.3 产品资料维护

目前没有产品参数，后续可以先整理一个表格：

```text
products/product-data.xlsx
```

字段建议：

- 产品类别
- 型号名称
- 材质
- 尺寸
- 可选颜色
- 轮子类型
- 拉杆类型
- 锁具类型
- 内里
- MOQ
- 样品交期
- 大货交期
- 可定制项目

等资料稳定后，再转成网站数据。

## 5. 页面迭代计划

### 第一阶段：首页可信度优化

目标：

- 梳理布局。
- 突出 PC 行李箱、OEM/ODM、经验丰富的团队、中国工厂、质量控制。
- 替换真实工厂照片。
- 首页首屏使用 5 张全屏轮播图：第一张工厂环境图，后四张机器设备图。
- 首屏文案为“美途：为全球品牌提供拉杆箱解决方案 / 以技术创新驱动制造战略，追求高品质发展”，并在每次切换后延时出现。
- 首屏轮播控制器使用圆点，不使用大按钮。
- 轮播图片需要完整展示主体，避免过度放大裁切。
- 切换动效使用左右滑动，减少生硬闪烁和卡顿感。
- 保留单页结构。

任务：

- 调整首页内容顺序。
- 产品图和工厂图分区。
- 优化导航悬停扩展栏。
- 优化首页全屏轮播图和圆点跳转。
- 联系区补齐真实联系方式。
- 压缩图片。
- 已完成：将 Logo、MT1007 产品图、工厂环境图、机器设备图整理到 `src/assets/`。

### 第二阶段：组件拆分

目标：

- 降低维护难度。
- 让每个页面区块独立修改。

任务：

- 拆分 `src/App.vue`。
- 新建 `src/components/`。
- 新建 `src/data/`。
- 把中英文文案迁移到数据文件。
- 把图片路径迁移到产品和工厂数据中。

### 第三阶段：产品内容增强

目标：

- 让客户能更清楚了解产品能力。

任务：

- 增加 PC 行李箱重点展示。
- 在 `/PC-Luggage` 中继续增加更多 PC 行李箱产品卡片。
- 每个产品卡片点击后进入独立详情页，例如 `/PC-Luggage/型号-pc-luggage.html`。
- 增加产品详情弹窗或详情区。
- 增加产品参数。
- 增加可定制项展示。
- 增加产品应用客户类型说明。

### 第四阶段：多页面和搜索引擎优化

目标：

- 提升搜索引擎收录和海外客户访问体验。

任务：

- 引入 Vue Router。
- 拆出 About、Products、OEM/ODM、Factory、Quality、Contact 页面。
- 每个页面配置独立 title 和 description。
- 增加网站地图和基础搜索引擎优化配置。

### 第五阶段：询盘功能

目标：

- 让客户能够真正提交询盘。

可选方案：

- 方案 A：使用第三方表单服务。
- 方案 B：接入企业邮箱发送。
- 方案 C：后端接口 + 数据库。

第一阶段建议先用第三方表单或邮件方案，成本低。

## 6. 推荐开发优先级

当前最推荐的下一步：

1. 整理真实工厂照片。
2. 选出 6-10 张最能体现工厂实力的图片。
3. 替换首页 Factory 区域占位图。
4. 压缩产品和工厂图片。
5. 重新调整首页顺序，让 Products 更靠前。
6. 把 `src/App.vue` 拆成组件。
7. 把中英文文案迁移到 `src/data/content.js`。

## 6.1 产品页面维护规则

当前产品页面先采用轻量前端路由：

```text
/PC-Luggage
/PC-Luggage/mt1007-pc-luggage.html
```

维护规则：

- 产品分类页用于展示同一类产品列表。
- 产品详情页用于展示单个产品图片、型号、说明和询盘入口。
- 顶部导航、Logo、悬停扩展菜单必须和首页保持一致。
- 后续新增产品时，优先补充产品正面主图和细节图。
- 有产品参数后，再在详情页中增加参数表。

部署注意：

- 当前产品页属于前端路由，本地 Vite 开发服务器可正常直接访问。
- 正式部署时，服务器需要配置所有路径回退到 `index.html`。
- 如果没有回退配置，用户直接刷新 `/PC-Luggage/mt1007-pc-luggage.html` 可能出现 404。

## 6.2 About 页面维护规则

当前公司简介页先采用轻量前端路由：

```text
/about
/about#company
```

维护规则：

- About 页面用于承接公司简介、企业文化、发展历程、荣誉资质和黑白底部联系区。
- `/about#company` 用于从外部或导航扩展菜单直接定位到公司简介区。
- 当前公司简介区使用 `src/assets/factory/environment/factory-environment-01.png`。
- 后续补充正式公司简介后，优先替换占位文案，不虚构成立年份、产能、面积、员工数或证书。
- 当前页脚社交图标链接先使用占位链接；微信二维码先使用黑白占位二维码，后续替换真实二维码图片。
- 真实地址、邮箱、电话、WhatsApp、微信号确认后，优先更新 About 页脚和首页 Contact 区。
- 顶部导航、Logo、悬停扩展菜单必须和首页保持一致。

部署注意：

- About 页同样属于前端路由，本地 Vite 开发服务器可正常直接访问。
- 正式部署时，服务器需要配置所有路径回退到 `index.html`。
- 如果没有回退配置，用户直接刷新 `/about` 或 `/about#company` 可能出现 404。

## 7. 维护检查清单

每次改版前检查：

- 是否符合网站第一目标：展示工厂、建立兴趣和信任。
- 是否继续突出 PC 行李箱。
- 是否清楚表达 OEM/ODM。
- 是否体现 Experienced Team。
- 是否有 China Factory 的真实证据。
- 是否有 Quality Control 内容。
- 是否影响中英文切换。
- 是否影响移动端浏览。
- 是否运行 `npm run build`。

## 8. 不建议现在做的事

当前阶段不建议：

- 过早做复杂后台。
- 过早拆很多页面。
- 写没有依据的产能和出口数据。
- 做过多花哨动画。
- 引入大型 UI 组件库。
- 把官网做成普通黄页风格。

## 9. 决策原则

后续所有设计和功能变化，都按下面顺序判断：

1. 是否帮助客户理解 METU 是做什么的？
2. 是否帮助客户信任 METU？
3. 是否帮助客户更容易发起询盘？
4. 是否方便后续维护？
5. 是否让页面更专业，而不是更复杂？
