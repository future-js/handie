---
title: 数据通信

flag:
  primary: api
  secondary: communication
---

根据业务场景对 [`jQuery.ajax()`](http://api.jquery.com/jQuery.ajax/){:target="_blank"}{:rel="nofollow external"} 和 [WebSockets API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API){:target="_blank"}{:rel="nofollow external"} 做了进一步封装。

## 目录

* [默认配置项](#defaults)
  * [`ajax.RESTful`](#defaults-RESTful)
  * [`ajax.waitingText`](#defaults-waitingText)
  * [`ajax.serverErrorText`](#defaults-serverErrorText)
  * [`ajax.errorHandler(evt, req, settings, err)`](#defaults-errorHandler)
  * [`ajax.responseHandler(res, callback)`](#defaults-responseHandler)
* AJAX
  * [`.ajax.get(url, callback)`](#ajax-get-without-params)
  * [`.ajax.get(url, params, callback)`](#ajax-get-general)
  * [`.ajax.post(url, params, callback, isJson)`](#ajax-post-jsonify)
  * [`.ajax.put(url, params, callback, isJson)`](#ajax-put-jsonify)
  * [`.ajax.delete(url, params, callback)`](#ajax-delete-general)
* WebSocket
  * [`.socket.init(url)`](#socket-init-default)
  * [`.socket.init(opts)`](#socket-init-complex)

## 默认配置项 {#defaults}

通过 [`muu.setDefaults(settings)`]({{ '/cookbook/configuration/' | prepend: site.baseurl | prepend: site.url }}#method-setDefaults-setter) 进行设置：

{% highlight js %}
muu.setDefaults({
  ajax: {
    /* ... */
  }
});
{% endhighlight %}

可用配置项如下——

### `ajax.RESTful` {#defaults-RESTful}

AJAX 请求是否倾向 RESTful。

#### 默认行为

默认值为 `true`，框架内部对保存对话框中的表单数据及数据列表中的删除操作进行处理时采用 RESTful 方式。

### `ajax.waitingText` {#defaults-waitingText}

保存数据时的等待文本。

#### 默认行为

默认值为 `"数据保存中，请耐心等待..."`。

### `ajax.serverErrorText` {#defaults-serverErrorText}

服务器端发生错误时的提示文本。

#### 默认行为

默认值为 `"服务器开小差啦～"`。

### `ajax.errorHandler(evt, req, settings, err)` {#defaults-errorHandler}

请求失败时的处理函数。

#### 默认行为

当 HTTP 状态码为 `5xx` 时系统弹窗提示 [`defaults.ajax.serverErrorText`](#defaults-serverErrorText) 所定义的文本，当状态码为 `4xx` 时提示服务器返回的信息。

#### 参数

1. `evt`（jQuery Event）：经过 jQuery 封装的事件对象；
2. `req`（jQuery XHR）：经过 jQuery 封装的 XHR 对象；
3. `settings`（Plain Object）：发送请求时的设置；
4. `err`（String）：请求错误的文本。

### `ajax.responseHandler(res, callback)` {#defaults-responseHandler}

处理请求的返回结果。

#### 默认行为

支持 RESTful 形式和普通形式的返回值。

所谓「RESTful」形式，即通过 HTTP 状态码来判断请求是否成功，再根据返回内容来决定是否调用 `callback()` 进行下一步处理。若返回的是非空字符串，则用 `muu.alert(res)` 弹出，否则调用 `callback(res)`。

普通形式的请求需要返回一个 JSON：

{% highlight json %}
{
  "success": true,
  "data": {},
  "message": ""
}
{% endhighlight %}

根据 `res.success` 来判断这个请求是否「成功」，是则调用 `callback(res.data)`，否则 `muu.alert(res.message)`。

#### 参数

1. `res`（Plain Object）：服务端返回的数据；
2. `callback`（Function）：请求「成功」时的回调。

## `.ajax.get()` {#ajax-get}

用 GET 方式发起 HTTP 请求。

### `.ajax.get(url, callback)` {#ajax-get-without-params}

无参数查询数据。适用于获取全部数据的数据列表。

#### 参数

1. `url`（String）：数据源地址；
2. `callback`（Function）：请求「成功」时的回调。

#### 返回值

（jQuery XHR）：经过 jQuery 封装的 XHR 对象。

#### 示例

{% highlight js %}
muu.ajax.get("/provinces.json", function( result ) {
  /* ... */
});
{% endhighlight %}

### `.ajax.get(url, params, callback)` {#ajax-get-general}

带参数查询数据。适用于按条件筛选的数据列表和查看详情。

#### 参数

1. `url`（String）：数据源地址；
2. `params`（Plain Object / String / HTML DOM / jQuery Object）：查询参数，可以是键值对、查询字符串、表单 DOM 或表单   jQuery 对象；
3. `callback`（Function）：请求「成功」时的回调。

#### 返回值

（jQuery XHR）：经过 jQuery 封装的 XHR 对象。

#### 示例

{% highlight js %}
muu.ajax.get("/cities.json", {province: 1}, function( result ) {
  /* ... */
});
{% endhighlight %}

## `.ajax.post()` {#ajax-post}

用 POST 方式发起 HTTP 请求。

### `.ajax.post(url, params, callback, isJson)` {#ajax-post-jsonify}

保存数据。适用于「新增」操作。

#### 参数

1. `url`（String）：数据源地址；
2. `params`（Plain Object / String / HTML DOM / jQuery Object）：要保存的数据，可以是键值对、查询字符串、表单 DOM 或表单 jQuery 对象；
3. `callback`（Function）：请求「成功」时的回调；
4. `isJson`（Boolean）：若值为 `true`，发起一个 `application/json` 的请求，否则为 `application/x-www-form-urlencoded`，**建议只在传递复杂数据时设置为 `true`**。

#### 返回值

（jQuery XHR）：经过 jQuery 封装的 XHR 对象。

#### 示例

{% highlight html %}
<form class="js-savePersonInfo">
  <div class="form-group">
    <label>姓名</label>
    <input class="form-control" type="text" name="name" value="">
  </div>
  <div class="form-group">
    <label>性别</label>
    <select name="gender" class="form-control">
      <option value="1">男</option>
      <option value="0">女</option>
    </select>
  </div>
  <button class="btn btn-primary" type="submit">保存</button>
</form>
{% endhighlight %}
{% highlight js %}
$(".js-savePersonInfo").on("submit", function() {
  muu.ajax.post("/users.json", this, function() {
    /* ... */
  });

  return false;
});
{% endhighlight %}

## `.ajax.put()` {#ajax-put}

用 PUT 方式发起 HTTP 请求。

### `.ajax.put(url, params, callback, isJson)` {#ajax-put-jsonify}

修改数据。适用于「编辑」操作。

#### 参数

1. `url`（String）：数据源地址；
2. `params`（Plain Object / String / HTML DOM / jQuery Object）：要修改的数据，可以是键值对、查询字符串、表单 DOM 或表单 jQuery 对象；
3. `callback`（Function）：请求「成功」时的回调；
4. `isJson`（Boolean）：若值为 `true`，发起一个 `application/json` 的请求，否则为 `application/x-www-form-urlencoded`，**建议只在传递复杂数据时设置为 `true`**。

#### 返回值

（jQuery XHR）：经过 jQuery 封装的 XHR 对象。

#### 示例

{% highlight js %}
$(".js-savePersonInfo").on("submit", function() {
  muu.ajax.put("/users.json", {user: 1, name: "欧雷"}, function() {
    /* ... */
  });

  return false;
});
{% endhighlight %}

## `.ajax.delete()` {#ajax-delete}

用 DELETE 方式发起 HTTP 请求。

### `.ajax.delete(url, params, callback)` {#ajax-delete-general}

删除数据。适用于「删除」操作。

#### 参数

1. `url`（String）：数据源地址；
2. `params`（Plain Object / String / HTML DOM / jQuery Object）：查询参数，可以是键值对、查询字符串、表单 DOM 或表单 jQuery 对象；
3. `callback`（Function）：请求「成功」时的回调。

#### 返回值

（jQuery XHR）：经过 jQuery 封装的 XHR 对象。

#### 示例

{% highlight js %}
$(".js-deleteUser").on("click", function() {
  if ( confirm("确定要删除「欧雷」？") ) {
    muu.ajax.delete("/users.json", {user: 1}, function() {
      /* ... */
    });
  }

  return false;
});
{% endhighlight %}

## `.socket.init()` {#socket-init}

创建一个 WebSocket 连接。

### `.socket.init(url)` {#socket-init-default}

根据指定的地址创建一个 WebSocket 连接。

#### 参数

1. `url`（String）：用于进行通信的连接地址。

#### 返回值

（Object）：WebSocket 实例对象。

#### 示例

{% highlight js %}
muu.socket.init("//127.0.0.1:8080/websocket/example");
{% endhighlight %}

### `.socket.init(opts)` {#socket-init-complex}

用指定的配置创建一个 WebSocket 连接。

#### 参数

1. `opts`（Plain Object）：用于创建 WebSocket 连接的配置项。

下面为 `opts` 的结构及默认值：

{% highlight js %}
{
  url: "",                      // 连接地址，必需
  interval: 0,                  // 保持连接处于活跃状态的时间间隔，需大于 0
  closeBeforeUnload: true,      // 是否在页面卸载时关闭连接
  onOpen: function() {},        // 打开连接时的事件
  onClose: function() {},       // 关闭连接时的事件
  onMessage: function() {},     // 收到消息时的事件
  onError: function() {}        // 连接出错时的事件
}
{% endhighlight %}

#### 返回值

（Object）：WebSocket 实例对象。

#### 示例

{% highlight js %}
muu.socket.init({
  url: "//127.0.0.1:8080/websocket/example",
  interval: 30000,
  onMessage: function( evt ) {
    // 在浏览器控制台中打印出收到的消息
    console.log(JSON.parse(evt.data));
  }
});
{% endhighlight %}
