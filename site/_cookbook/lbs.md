---
title: 位置服务

flag:
  primary: api
  secondary: lbs
---

基于地理位置的服务。

## 目录

* [默认配置项](#defaults)
  * [`lbs.map`](#defaults-map)
* 路线规划
  * [`.lbs.route(from, to, map)`](#lbs-route-default)
  * [`.lbs.route(opts)`](#lbs-route-options)

## 默认配置项 {#defaults}

通过 [`muu.setDefaults(settings)`]({{ '/cookbook/configuration/' | prepend: site.baseurl | prepend: site.url }}#method-setDefaults-setter) 进行设置：

{% highlight js %}
muu.setDefaults({
  lbs: {
    /* ... */
  }
});
{% endhighlight %}

可用配置项如下——

### `lbs.map` {#defaults-map}

地图服务提供商。默认值为 `gaode`。

## `.lbs.route()` {#lbs-route}

路线规划。

### `.lbs.route(from, to, map)` {#lbs-route-default}

根据起始地和目的地的地点信息获取路线规划。

#### 参数

1. `from`（String / Plain Object）：起始地信息；
2. `to`（String / Plain Object）：目的地信息；
3. `map`（String）：地图服务提供商。

当 `from` 或 `to` 的值为字符串时，必须是像 `"120.0002162,30.2895489,杭州"` 这样将经度、纬度和名字（可以省略）通过 `,` 分隔的形式。若传入一个纯对象，得是如下结构：

{% highlight js %}
{
  longitude: "120.0002162",
  latitude: "30.2895489",
  name: "杭州"                  // 非必须
}
{% endhighlight %}

`map` 不是必选项，默认值为 [`defaults.lbs.map`](#defaults-map)，可用值有 `"gaode"` 和 `"baidu"`。

#### 示例

{% highlight js %}
// 只指定坐标
muu.lbs.route("120.0002162,30.2895489", {longitude: "105.7338840", latitude: "34.5763393"});

// 指定坐标和地点名字
muu.lbs.route({longitude: "120.0002162", latitude: "30.2895489", name: "杭州"}, "105.7338840,34.5763393,天水");

// 生成百度地图的路线规划
muu.lbs.route("120.0002162,30.2895489", "105.7338840,34.5763393,天水", "baidu");
{% endhighlight %}

### `.lbs.route(opts)` {#lbs-route-options}

根据路线规划配置项获取在线地图地址。

#### 参数

1. `opts`（Plain Object）：路线规划配置项，结构为 `{from: "", to: "", map: ""}`，各配置项的具体用法参见 [`muu.lbs.route(from, to, map)`](#lbs-route-default)。

#### 示例

{% highlight js %}
muu.lbs.route({
  from: "120.0002162,30.2895489",
  to: {
    longitude: "105.7338840",
    latitude: "34.5763393",
    name: "天水"
  },
  map: "baidu"
});
{% endhighlight %}
