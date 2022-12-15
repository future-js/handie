# 更新日志

## 0.0.8 (2022-08-12)

### 特性

- `DataTable` 支持 `density` 属性；
- 列表类视图部件支持通过主题行为的 `common.view.listViewDensity` 和部件配置的 `density` 设置内容密度；
- 搜索部件支持通过主题行为的 `common.search.conditionPersists` 和部件配置的 `conditionPersists` 设置将条件留存。

### 缺陷/优化

- 修复数据类型为 `date` 的部件展示形态为范围时仍按单个日期时间校验；
- 将过滤器选择值后立即刷新列表的逻辑归一到搜索上下文的 `submit`。

## 0.0.7 (2022-05-23)

### 特性

- 动作 `execute` 将 `config` 作为参数传入；
- `Icon` 组件支持从 [`@ant-design/icons`](https://www.npmjs.com/package/@ant-design/icons) 中引用图标，需要注册 `antd` 这个图标提供者，通过 `<Icon refs="antd:step-backward" />` 的形式使用，如果 `antd` 为默认的图标提供者，则可以直接 `<Icon refs="step-backward" />`，图标引用中没有 `'outlined'`、`'filled'` 或 `'two-tone'` 时会默认使用「线框风格」的图标，具体可使用图标详见[官方文档](https://ant.design/components/icon-cn/#%E5%9B%BE%E6%A0%87%E5%88%97%E8%A1%A8)。

### 缺陷/优化

- 将对对话框视图的操作作为动作部件的通用能力；
- 移除 `DialogViewButtonActionWidget`，使用 `ButtonActionWidget`、`LinkActionWidget` 或 `IconActionWidget` 替代；
- 视图部件 `FormDialogViewWidget` 支持修改数据场景，并可通过配置项 `moduleLabel` 根据新增还是修改数据动态拼接对话框标题。
