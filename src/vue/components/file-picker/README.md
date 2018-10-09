# 文件选择器

提供兼容各平台的基础的上传文件功能。

## `<FilePicker>`

**该组件被设计为作为其它特定场景的上传文件组件的基础组件，不建议在业务开发中直接使用本组件。**

如果使用 web 方式进行文件选择及上传，请自行引入 [Plupload](https://www.plupload.com)，直传七牛的话推荐使用 [Qiniu SDK](https://github.com/qiniu/js-sdk/tree/1.x)。

### 属性

名称 | 类型 | 默认值 | 说明
--- | --- | --- | ---
`url` | `String` | `''` | 上传文件的请求地址
`extensions` | `String`<br>`Array` | `''` | 允许上传的文件扩展名，可以为 `'jpg,png,gif'` 或 `['jpg', 'png', 'gif']` 的形式
`multiple` | `Boolean` | `false` | 是否可以选择多个文件
`size` | `Number`<br>`String` | `0` | 单个文件大小限制
`max` | `Number` | `1` | 允许上传的文件数量
`type` | `String`<br>`Array` | `''` | 文件类型，可以从 `'image'`、`'video'` 和 `'audio'` 中选择一个或多个
`provider` | `Object` | `{}` | 上传功能提供者的额外配置

#### `provider`

针对上传功能提供者（操作系统、第三方库等）的额外配置项，以弥补组件的其他通用属性的不足。

`provider.type` 是一个固定的、特殊的属性，如果值为 `'native'` 则优先使用系统原生的方式选择文件并上传，否则会采用 web 的方式。

### 事件

名称 | 参数 | 说明
--- | --- | ---
`beforeUpload` | `file` | 开始上传文件前触发，`file` 为将要上传的文件的信息
`upload` | `url` | 成功上传一个文件后触发，`url` 为上传后的文件 URL
`complete` | `urls` | 成功上传所选文件后触发，`urls` 为上传后的所有文件的 URL
`fail` | `error` | 上传失败时触发，`error` 为错误信息
