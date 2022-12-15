## 0.0.51

### 缺陷/优化

- 修复 history helper 获取当前路由信息错误；
- 修复列表类视图通过客户端动作配置多个对话框类视图时前置实例化的视图显示错误；
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
