# 分组

将子元素进行分组并生成一个 `<div>` 进行包裹。

## `<Group>`

**该组件被设计为作为其它特定场景的组件的基础组件，不建议在业务开发中直接使用本组件。**

### 属性

名称 | 类型 | 默认值 | 说明
--- | --- | --- | ---
`size` | `Number` | `3` | 每组子元素的个数
`className` | `String` | `''` | 包裹 `<div>` 的 `class` HTML 属性

### 插槽

名称 | 说明
--- | ---
`default` | 主体内容

### 示例

```vue
<template>
  <Group class="Demo" className="Demo-group">
    <p v-for="(n, i) in [1, 2, 3, 4, 5]" :key="i">demo {{ n }}</p>
  </Group>
</template>

<script>
  import { Group } from 'handie-vue/components/group';

  export default {
    name: 'Demo',
    components: {
      Group
    }
  }
</script>
```

会生成：

```html
<div class="Demo">
  <div class="Demo-group">
    <p>demo 1</p>
    <p>demo 2</p>
    <p>demo 3</p>
  </div>
  <div class="Demo-group">
    <p>demo 4</p>
    <p>demo 5</p>
  </div>
</div>
```
