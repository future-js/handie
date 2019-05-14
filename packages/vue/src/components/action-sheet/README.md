# 动作面板

## `<ActionSheet>`

### 属性

名称 | 类型 | 默认值 | 说明
--- | --- | --- | ---
`title` | `String` | `''` | 顶部标题
`description` | `String` | `''` | 标题下的描述
`actions` | `Array` | `[]` | 操作列表
`cancelable` | `Boolean`<br>`Object` | `true` | 取消操作配置项
`show` | `Boolean` | `false` | 是否显示

#### `cancelable`

当值为 `Object` 时，默认值为 `{cancelable: true, mask: true, text: '取消'}`：

属性 | 类型 | 默认值 | 说明
--- | --- | --- | ---
`cancelable` | `Boolean` | `true` | 是否显示取消操作选项
`mask` | `Boolean` | `true` | 是否可点击遮罩层进行取消操作
`text` | `String` | `'取消'` | 取消操作选项文本

#### `actions`

每个元素必须为 `String` 类型或者包含 `text` 属性的 `Object` 类型的数据：`['欧雷', '卖好车', '前端']` 或 `[{text: '欧雷'}, {text: '卖好车'}, {text: '前端'}]`。

### 事件

名称 | 参数 | 说明
--- | --- | ---
`trigger` | `action` | 选择某个操作后触发，`action` 为当前操作的配置项
`cancel` | - | 选择取消操作时触发
`shown` | - | 组件显示后触发
`hidden` | - | 组件隐藏后触发

### 示例

```vue
<template>
  <div>
    <List>
      <ListItem>技术栈<XButton
        :icon="{type: 'right', append: true}"
        inline
        dummy
        @click="showTechTypes"
        slot="extra">{{ typeName || "请选择技术栈" }}</XButton>
      </ListItem>
    </List>
    <ActionSheet
      title="请选择技术栈"
      :actions="types"
      :show="techTypesShown"
      @trigger="onTechTypeSelected"
      @hidden="onTechTypeHidden" />
  </div>
</template>

<script>
  import { List, ListItem } from 'handie-vue/components/list';
  import { XButton } from 'handie-vue/components/x-button';
  import { ActionSheet } from 'handie-vue/components/action-sheet';

  export default {
    name: 'Demo',
    components: {
      List, ListItem,
      XButton,
      ActionSheet
    },
    data() {
      return {
        typeName: '',
        types: ['jQuery', 'Vue', 'React'],
        techTypesShown: false
      }
    },
    methods: {
      showTechTypes() {
        this.techTypesShown = true;
      },
      onTechTypeSelected( item ) {
        this.typeName = item.text;
      },
      onTechTypeHidden() {
        this.techTypesShown = false;
      }
    }
  }
</script>
```
