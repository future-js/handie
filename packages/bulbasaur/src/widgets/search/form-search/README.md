# 表单搜索部件

## 主题配置

通过应用主题的 `search.form` 来配置：

```js
createApp({
  theme: {
    behavior: {
      search: {
        form: {
          // 下表中的配置项
        }
      }
    }
  }
});
```

| 配置项 | 说明 | 值类型/可选值 | 默认值 |
| --- | --- | --- | --- |
| `formLayout` | 表单布局 | `'inline' \| 'flex' \| 'grid'` | `'inline'` |
| `formControlLabelWidth` | 表单控件文本标签宽度 | `number \| string` | - |
| `formControlSize` | 表单控件尺寸，会统一控制输入框、下拉列表、按钮等的尺寸 | `'large' \| 'medium' \| 'small'` | `'medium'` |
| `searchable` | 是否显示「查询」按钮 | `boolean` | `true` |
| `resettable` | 是否显示「重置」按钮 | `boolean` | `true` |
| `actionsStandalone` | 「查询」和「重置」按钮是否与表单主体剥离，剥离后不受 `formLayout` 影响 | `boolean` | `false` |
| `submitButtonAsPrimary` | 是否将「查询」按钮标为主要操作 | `boolean` | `true` |

## 部件配置

通过搜索描述器的 `config` 属性来配置。

| 配置项 | 说明 | 值类型/可选值 | 默认值 |
| --- | --- | --- | --- |
| `formControlLabelWidth` | 表单控件文本标签宽度，会覆盖主题配置中的 `formControlLabelWidth` | `number \| string` | - |
| `searchable` | 是否显示「查询」按钮，会覆盖主题配置中的 `searchable` | `boolean` | - |
| `resettable` | 是否显示「重置」按钮，会覆盖主题配置中的 `resettable` | `boolean` | - |
| `arrangement` | 对过滤器进行分组编排，见下面详细说明 | `string` | - |

### `arrangement`

用来指定每行有几个过滤器，用 `|` 分割，如：`3|2|4`。当指定数量超过实际数量时，视觉上不会出现多余的行；若实际数量多于指定数量，会将剩余过滤器全部在新的一行中显示。
