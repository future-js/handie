# 标签栏

## `<TabBar>`

### 属性

名称 | 类型 | 默认值 | 说明
--- | --- | --- | ---
`items` | `Array` | `[]` | 标签配置项集合

### 事件

名称 | 参数 | 说明
--- | --- | ---
`activate` | `index`<br>`event` | 在标签被激活（点击）时触发，`index` 是目标标签的配置项在集合中的索引，`event` 是相应的点击事件对象实例

### 插槽

名称 | 说明
--- | ---
`default` | 标签栏的主体内容，只允许使用 `<TabBarItem>`

## `<TabBarItem>`

### 属性

名称 | 类型 | 默认值 | 说明
--- | --- | --- | ---
`active` | `Boolean` | `false` | 是否为激活状态
`className` | `String` | `''` | 自定义 class
`icon` | `String`<br>`Object` | `''` | 图标，可以为 `<Icon>` 的 `type` 属性，也可以为 `{default: '', active: ''}`
`link` | `String`<br>`Object` | `''` | 用于 `<router-link>` 的配置项

### 事件

名称 | 参数 | 说明
--- | --- | ---
`activate` | `index`<br>`event` | 在标签被激活（点击）时触发，`index` 是目标标签的配置项在集合中的索引，`event` 是相应的点击事件对象实例

### 插槽

名称 | 说明
--- | ---
`default` | 标签文本
