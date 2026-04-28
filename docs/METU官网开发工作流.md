# METU 官网开发工作流

## 1. 文档目的

这份文档用于规范 METU 官网后续开发、维护和迭代流程。

它解决的问题：

- 需求容易变散。
- 页面越改越乱。
- 图片、文案、路由、动效没有统一规则。
- 改完后忘记验证。
- 遇到问题时容易凭感觉乱修。

以后新增需求时，先看这份文档，再决定使用哪个 skill、改哪些文件、如何验收。

## 2. 推荐固定使用的 Skill

### 2.1 planning-with-files

用途：

- 需求整理
- 多步骤任务规划
- 记录发现
- 记录进度
- 防止项目方向丢失

适用场景：

- 新增页面
- 调整首页结构
- 整理图片素材
- 修改产品结构
- 写需求文档
- 做大范围改版

对应文件：

- `task_plan.md`
- `findings.md`
- `progress.md`
- `docs/`

使用规则：

- 复杂任务开始前先看现有计划。
- 重要发现写进 `findings.md`。
- 做完一个阶段更新 `progress.md`。
- 阶段完成后更新 `task_plan.md`。

### 2.2 frontend-design

用途：

- 官网页面设计
- 首页视觉优化
- 产品页布局
- 工厂页布局
- 动效和交互
- 响应式体验

适用场景：

- 参考宾豪做布局
- 调整首页轮播
- 优化产品卡片
- 优化 PC 行李箱页面
- 增加工厂展示区
- 页面看起来不够高级时

使用规则：

- 页面设计类需求优先使用。
- 保持 METU 风格：高端感 + 成熟外贸工厂官网 + 工厂可信度。
- 不做普通黄页风格。
- 不做过度花哨动画。

### 2.3 ui-ux-pro-max

用途：

- 生成设计系统建议
- 判断页面结构
- 选择交互方式
- 评估颜色、字体、布局和用户体验

适用场景：

- 不确定页面该怎么排。
- 不确定某个交互是否合适。
- 想参考竞品但不想照抄。
- 要做新的页面结构前。

使用规则：

- 大改视觉前先用它确认方向。
- 输出作为设计依据，再用 `frontend-design` 落地。

### 2.4 writing-plans

用途：

- 把需求拆成可执行开发计划。

适用场景：

- 拆组件
- 引入 Vue Router
- 做真正多页面
- 把文案迁移到数据文件
- 做产品详情系统
- 做询盘表单
- 做 SEO
- 做图片压缩和资源优化

使用规则：

- 大改代码前先写计划。
- 计划要写清楚改哪些文件、每一步做什么、怎么验证。

### 2.5 executing-plans

用途：

- 按已有计划执行开发。

适用场景：

- 已经有明确实施计划。
- 需要按步骤完成重构或功能开发。

使用规则：

- 执行前先读计划。
- 按步骤做，不临时扩大范围。
- 每一步都验证。

### 2.6 systematic-debugging

用途：

- 系统排查 bug。

适用场景：

- 构建失败
- 页面打不开
- 图片不显示
- 路由跳转错误
- 动画卡顿
- 移动端错位
- 样式覆盖异常
- 线上刷新 404

使用规则：

- 先复现问题。
- 再找根因。
- 不直接凭感觉改。
- 修复后必须验证原问题。

### 2.7 verification-before-completion

用途：

- 完成前验证。

适用场景：

- 每次声称“完成”“修好了”“能用了”之前。

必须验证：

```powershell
npm run build
```

常用访问验证：

```text
http://localhost:5173/
http://localhost:5173/PC-Luggage
http://localhost:5173/PC-Luggage/mt1007-pc-luggage.html
```

使用规则：

- 没有运行验证，不要说完成。
- 构建失败必须先修。
- 多页面改动必须检查对应路径。

## 3. 按需求类型选择 Skill

| 需求类型 | 推荐 Skill | 说明 |
|---|---|---|
| 想法不清楚 | planning-with-files / brainstorming | 先把目标和边界问清楚 |
| 首页视觉优化 | ui-ux-pro-max + frontend-design | 先定设计方向，再落地 |
| 参考宾豪改布局 | frontend-design + ui-ux-pro-max | 借鉴结构和体验，不照抄素材 |
| 新增产品分类页 | writing-plans + frontend-design | 先规划路由、数据和页面结构 |
| 新增产品详情页 | writing-plans + executing-plans | 避免产品页越加越乱 |
| 整理图片素材 | planning-with-files | 更新目录和文档 |
| 拆组件 | writing-plans + executing-plans | 大改前必须有计划 |
| 遇到 bug | systematic-debugging | 先找根因再修 |
| 完成前检查 | verification-before-completion | 必须构建验证 |

## 4. 当前项目关键文件

### 页面代码

```text
src/App.vue
```

当前首页、PC 分类页、MT1007 详情页都在这个文件中。

### 全局样式

```text
src/style.css
```

包含字体、基础样式、轮播动画、滚动动效、导航动效。

### 图片素材

```text
src/assets/
```

当前结构：

```text
src/assets/
  logo/
  products/
    mt1007/
  factory/
    environment/
    machines/
```

### 需求和架构文档

```text
docs/METU官网需求文档与首页布局方案.md
docs/METU官网项目架构与迭代计划.md
docs/METU官网开发工作流.md
```

## 5. 新增产品的标准流程

以后新增一个产品时，按下面流程做。

### 第一步：整理素材

把图片放到：

```text
src/assets/products/产品型号/
```

命名示例：

```text
mt1008-main.png
mt1008-side.png
mt1008-interior.png
mt1008-wheel.png
mt1008-lock.png
```

### 第二步：确定页面路径

PC 行李箱产品路径示例：

```text
/PC-Luggage/mt1008-pc-luggage.html
```

### 第三步：更新产品数据

当前产品数据还在 `src/App.vue` 内。

后续重构后，应迁移到：

```text
src/data/products.js
```

### 第四步：更新产品分类页

在 `/PC-Luggage` 页面增加产品卡片。

### 第五步：新增产品详情页

详情页需要包含：

- 产品型号
- 产品主图
- 细节图
- 简短说明
- 可定制项
- 询盘按钮

### 第六步：验证

运行：

```powershell
npm run build
```

检查：

```text
/
/PC-Luggage
/PC-Luggage/新产品路径.html
```

## 6. 新增工厂图片的标准流程

### 图片分类

工厂图片放到：

```text
src/assets/factory/
```

建议分类：

```text
environment/
machines/
workshop/
warehouse/
qc/
certificates/
```

### 命名规则

```text
factory-environment-01.png
machine-01.png
workshop-01.png
warehouse-01.png
qc-area-01.png
certificate-01.png
```

### 页面对应

| 图片类型 | 页面位置 |
|---|---|
| 工厂环境 | 首页轮播第一张、工厂实力区 |
| 机器设备 | 首页轮播、工厂实力区 |
| 车间 | 工厂实力页或区块 |
| 仓储 | 工厂实力页或区块 |
| 质检 | Quality Control |
| 证书 | About / Factory / Quality |

## 7. 改首页轮播的规则

当前首页轮播要求：

- 5 张图。
- 第 1 张是工厂环境。
- 第 2-5 张是机器设备。
- 使用圆点跳转。
- 图片尽量展示全貌。
- 使用左右滑动切换。
- 两行中文文案延时出现。

首屏文案：

```text
美途：为全球品牌提供拉杆箱解决方案
以技术创新驱动制造战略，追求高品质发展
```

改轮播时必须检查：

- 是否仍然是 5 张。
- 圆点数量是否等于图片数量。
- 切换是否丝滑。
- 图片是否被过度裁切。
- 移动端文字是否溢出。

## 8. 路由和部署注意事项

当前已有路径：

```text
/
/PC-Luggage
/PC-Luggage/mt1007-pc-luggage.html
```

注意：

- 当前是前端路由。
- 本地 Vite 可以直接访问。
- 正式部署时服务器必须配置所有路径回退到 `index.html`。
- 否则刷新 `/PC-Luggage/mt1007-pc-luggage.html` 可能 404。

## 9. 完成前检查清单

每次改完至少检查：

- `npm run build` 是否通过。
- 首页是否能打开。
- PC 分类页是否能打开。
- MT1007 详情页是否能打开。
- 顶部导航是否一致。
- Logo 是否正常显示。
- 中英文切换是否还正常。
- 手机端是否没有明显错位。
- 文档是否同步更新。

## 10. 推荐下一步

当前最值得做的下一步：

1. 把 `src/App.vue` 拆成组件。
2. 把产品数据迁移到 `src/data/products.js`。
3. 把中英文文案迁移到 `src/data/content.js`。
4. 压缩首页轮播图和产品图。
5. 给产品详情页增加参数表占位。
6. 准备真实联系方式并替换占位内容。

