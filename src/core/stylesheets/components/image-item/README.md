# 图片条目

展示一张图片及其相关信息。

## API

### CSS class

名称 | 说明
--- | ---
`.ImageItem` | 图片条目容器

### Sass 变量

名称 | 默认值 | 说明
--- | --- | ---
`$image-item-deletion-width` | `30px` | 删除按钮宽度
`$image-item-deletion-height` | `$image-item-deletion-width` | 删除按钮高度
`$image-item-deletion-offset-top` | `-($image-item-deletion-height / 2)` | 删除按钮距离容器右上角的上方偏移值
`$image-item-deletion-offset-right` | `-($image-item-deletion-width / 2)` | 删除按钮距离容器右上角的右方偏移值
`$image-item-deletion-border-radius` | `50%` | 删除按钮的边框圆角大小
`$image-item-deletion-bg-color` | `#000` | 删除按钮的背景颜色
`$image-item-deletion-text-color` | `#fff` | 删除按钮的文本颜色
`$image-item-deletion-font-size` | `20px` | 删除按钮的字体大小
`$image-item-placeholder-border-width` | `2px` | 占位符的边框宽度
`$image-item-placeholder-border-color` | `$figure-bg-color` | 占位符的边框颜色
`$image-item-placeholder-bg-color` | `transparent` | 占位符的背景颜色
`$image-item-waiting-text` | `"图片正在上传"` | 上传图片时的占位符提示文本
`$image-item-blank-text` | `"暂无图片"` | 无图片时的占位符提示文本

## 示例

有图片时一定要指定 `<a>` 的链接地址。

```html
<figure class="ImageItem">
  <div><a href="https://ourai.ws/assets/avatars/ourai-200px-8f9378ded6603689c73eb1cfddc995863c516bdb580e9ce682644d31f5765bd8.jpg" target="_blank"><img src="https://ourai.ws/assets/avatars/ourai-200px-8f9378ded6603689c73eb1cfddc995863c516bdb580e9ce682644d31f5765bd8.jpg" alt="欧雷"></a></div>
  <figcaption>欧雷</figcaption>
</figure>
```

不指定链接地址的被认为没有图片，所以不显示图片，取而代之的是「暂无图片」的占位符提示。

```html
<figure class="ImageItem">
  <div><a href="javascript:void(0);"><img src="" alt="无脸男"></a></div>
  <figcaption>无脸男</figcaption>
</figure>
```
