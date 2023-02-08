# 更新日志

## 0.0.9 (2023-02-08)

### 缺陷/优化

- 修复字段部件在对应的无头部件未实例化时就调用其方法而发生的错误；
- 修复搜索上下文已实例化状态下视图部件重新创建时搜索条件值初始化与列表数据加载顺序颠倒；
- 部件基类添加 `$$history`、`$$route`、`$$session` 等便捷辅助属性；
- 将视图部件通用的属性与方法从 `TableViewStructuralWidget` 移到 `ViewStructuralWidget`；
- 将列表类视图部件通用的属性与方法从 `TableViewStructuralWidget` 移到 `ListViewStructuralWidget`。

### 特性

- 新增对话框类视图的基础结构部件 `DialogViewStructuralWidget`；
- 客户端动作可通过配置 `goto` 和 `routeParamKeys` 便捷指定要跳转的页面；
- 对象类视图部件获取当前记录时所用的路由参数可配置；
- 对象类视图部件所要显示的动作及具备特定语义的动作文本可配置。

## 0.0.7 (2022-08-12)

### 特性

- 列表类视图部件支持通过主题行为的 `common.view.listViewDensity` 和部件配置的 `density` 设置内容密度；
- 搜索部件支持通过主题行为的 `common.search.conditionPersists` 和部件配置的 `conditionPersists` 设置将条件留存。

## 0.0.6 (2022-05-23)

### 缺陷/优化

- 将对对话框视图的操作作为动作部件的通用能力。
