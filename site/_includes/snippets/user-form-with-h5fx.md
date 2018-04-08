{% highlight html %}
<form class="js-savePersonInfo">
  <div class="form-group">
    <label>姓名</label>
    <input class="form-control" type="text" name="name" value="" data-h5f-label="姓名" required>
  </div>
  <div class="form-group">
    <label>性别</label>
    <select name="gender" class="form-control" data-h5f-label="性别" required>
      <option value=""></option>
      <option value="1">男</option>
      <option value="0">女</option>
    </select>
  </div>
  <input type="hidden" name="user" value="">
  <button class="btn btn-primary" type="submit">保存</button>
</form>
{% endhighlight %}
