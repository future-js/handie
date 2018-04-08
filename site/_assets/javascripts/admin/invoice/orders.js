(function() {
  var STATUS_TEXT = ["待付款", "进行中", "已完成", "作废"];
  var TRANSPORT_TEXT = ["大板车", "小板车"];

  var currentTime = moment(new Date());

  var select = {};

  function insertNewOptions($sel, data, keys) {
    data.forEach(function (d) {
      $sel.append("<option class=\"is-dynamic\" value=\"" + d[keys.value] + "\"" + ($sel.attr("data-value") === d[keys.value].toString() ? " selected" : "") + ">" + d[keys.text] + "</option>");
    });

    return $sel;
  }

  select.initAreaSelects = function ($form) {
    var $prv = $(".js-chooseProvince", $form);
    var provinces = [{"provinceId":1,"provinceName":"北京市","provinceSort":1,"remarks":"直辖市","status":1,"gmtCreate":1488273820000,"gmtModified":1488273820000},{"provinceId":2,"provinceName":"天津市","provinceSort":2,"remarks":"直辖市","status":1,"gmtCreate":1488273820000,"gmtModified":1488273820000},{"provinceId":3,"provinceName":"河北省","provinceSort":5,"remarks":"省份","status":1,"gmtCreate":1488273820000,"gmtModified":1488273820000},{"provinceId":4,"provinceName":"山西省","provinceSort":6,"remarks":"省份","status":1,"gmtCreate":1488273820000,"gmtModified":1488273820000},{"provinceId":5,"provinceName":"内蒙古自治区","provinceSort":32,"remarks":"自治区","status":1,"gmtCreate":1488273822000,"gmtModified":1488273822000},{"provinceId":6,"provinceName":"辽宁省","provinceSort":8,"remarks":"省份","status":1,"gmtCreate":1488273821000,"gmtModified":1488273821000},{"provinceId":7,"provinceName":"吉林省","provinceSort":9,"remarks":"省份","status":1,"gmtCreate":1488273821000,"gmtModified":1488273821000},{"provinceId":8,"provinceName":"黑龙江省","provinceSort":10,"remarks":"省份","status":1,"gmtCreate":1488273821000,"gmtModified":1488273821000},{"provinceId":9,"provinceName":"上海市","provinceSort":3,"remarks":"直辖市","status":1,"gmtCreate":1488273820000,"gmtModified":1488273820000},{"provinceId":10,"provinceName":"江苏省","provinceSort":11,"remarks":"省份","status":1,"gmtCreate":1488273821000,"gmtModified":1488273821000},{"provinceId":11,"provinceName":"浙江省","provinceSort":12,"remarks":"省份","status":1,"gmtCreate":1488273821000,"gmtModified":1488273821000},{"provinceId":12,"provinceName":"安徽省","provinceSort":13,"remarks":"省份","status":1,"gmtCreate":1488273821000,"gmtModified":1488273821000},{"provinceId":13,"provinceName":"福建省","provinceSort":14,"remarks":"省份","status":1,"gmtCreate":1488273821000,"gmtModified":1488273821000},{"provinceId":14,"provinceName":"江西省","provinceSort":15,"remarks":"省份","status":1,"gmtCreate":1488273821000,"gmtModified":1488273821000},{"provinceId":15,"provinceName":"山东省","provinceSort":16,"remarks":"省份","status":1,"gmtCreate":1488273821000,"gmtModified":1488273821000},{"provinceId":16,"provinceName":"河南省","provinceSort":17,"remarks":"省份","status":1,"gmtCreate":1488273821000,"gmtModified":1488273821000},{"provinceId":17,"provinceName":"湖北省","provinceSort":18,"remarks":"省份","status":1,"gmtCreate":1488273821000,"gmtModified":1488273821000},{"provinceId":18,"provinceName":"湖南省","provinceSort":19,"remarks":"省份","status":1,"gmtCreate":1488273821000,"gmtModified":1488273821000},{"provinceId":19,"provinceName":"广东省","provinceSort":20,"remarks":"省份","status":1,"gmtCreate":1488273821000,"gmtModified":1488273821000},{"provinceId":20,"provinceName":"海南省","provinceSort":24,"remarks":"省份","status":1,"gmtCreate":1488273822000,"gmtModified":1488273822000},{"provinceId":21,"provinceName":"广西壮族自治区","provinceSort":28,"remarks":"自治区","status":1,"gmtCreate":1488273822000,"gmtModified":1488273822000},{"provinceId":22,"provinceName":"甘肃省","provinceSort":21,"remarks":"省份","status":1,"gmtCreate":1488273822000,"gmtModified":1488273822000},{"provinceId":23,"provinceName":"陕西省","provinceSort":27,"remarks":"省份","status":1,"gmtCreate":1488273822000,"gmtModified":1488273822000},{"provinceId":24,"provinceName":"新疆维吾尔自治区","provinceSort":31,"remarks":"自治区","status":1,"gmtCreate":1488273822000,"gmtModified":1488273822000},{"provinceId":25,"provinceName":"青海省","provinceSort":26,"remarks":"省份","status":1,"gmtCreate":1488273822000,"gmtModified":1488273822000},{"provinceId":26,"provinceName":"宁夏回族自治区","provinceSort":30,"remarks":"自治区","status":1,"gmtCreate":1488273822000,"gmtModified":1488273822000},{"provinceId":27,"provinceName":"重庆市","provinceSort":4,"remarks":"直辖市","status":1,"gmtCreate":1488273820000,"gmtModified":1488273820000},{"provinceId":28,"provinceName":"四川省","provinceSort":22,"remarks":"省份","status":1,"gmtCreate":1488273822000,"gmtModified":1488273822000},{"provinceId":29,"provinceName":"贵州省","provinceSort":23,"remarks":"省份","status":1,"gmtCreate":1488273822000,"gmtModified":1488273822000},{"provinceId":30,"provinceName":"云南省","provinceSort":25,"remarks":"省份","status":1,"gmtCreate":1488273822000,"gmtModified":1488273822000},{"provinceId":31,"provinceName":"西藏自治区","provinceSort":29,"remarks":"自治区","status":1,"gmtCreate":1488273822000,"gmtModified":1488273822000},{"provinceId":32,"provinceName":"台湾省","provinceSort":7,"remarks":"省份","status":1,"gmtCreate":1488273820000,"gmtModified":1488273820000},{"provinceId":33,"provinceName":"澳门特别行政区","provinceSort":33,"remarks":"特别行政区","status":1,"gmtCreate":1488273822000,"gmtModified":1488273822000},{"provinceId":34,"provinceName":"香港特别行政区","provinceSort":34,"remarks":"特别行政区","status":1,"gmtCreate":1488273822000,"gmtModified":1488273822000}];

    $prv.each(function () {
      insertNewOptions($(this), provinces, { value: "provinceId", text: "provinceName" }).trigger("change");
    });

    $prv.on("change", function () {
      var _this = this;

      if ($(this).val() !== "") {
        (function () {
          var $sel = $(_this).siblings(".js-chooseCity");

          $(".is-dynamic", $sel).remove();

          muu.ajax.get("", { provinceId: $(_this).val() }, function (cities) {
            insertNewOptions($sel, cities, { value: "cityId", text: "cityName" }).trigger("change");
          });
        })();
      }
    });
  };

  select.initCarrierSearcher = function ($form) {
    $(".js-selectCarrier", $form).select2({
      minimumInputLength: 1,
      ajax: {
        url: "",
        dataType: "json",
        type: "get",
        delay: 250,
        data: function data(params) {
          return {
            query: params.term
          };
        },
        processResults: function processResults(res, params) {
          return {
            results: res.data.map(function (d) {
              d.id = d.carrierId;
              d.text = d.carrierName;

              return d;
            })
          };
        }
      }
    });
  };

  var CAR_CLS = {
    SPEC: "js-selectSpec",
    BRAND: "js-selectBrand",
    SERIES: "js-selectSeries",
    MODEL: "js-selectModel",
    OUTER: "js-selectOuter",
    INNER: "js-selectInner"
  };

  var carUtils = {};

  function getCarSelectors() {
    var excluded = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

    if ($.type(excluded) === "string") {
      excluded = [excluded];
    }

    return Object.keys(CAR_CLS).filter(function (k) {
      return !excluded.includes(CAR_CLS[k]);
    }).map(function (k) {
      return "." + CAR_CLS[k];
    }).join(",");
  }

  function getUrl(baseName) {
    return "";
  }

  function getCarOpts(cls, val) {
    var params = { spec: $("." + CAR_CLS.SPEC).val() };
    var $rs = undefined;
    var key = undefined;

    switch (cls.match(/(js\-[a-zA-Z]+)/)[1]) {
      case CAR_CLS.SPEC:
        key = "brand";
        $rs = $("." + CAR_CLS.BRAND);
        break;
      case CAR_CLS.BRAND:
        params.brandId = val;
        key = "series";
        $rs = $("." + CAR_CLS.SERIES);
        break;
      case CAR_CLS.SERIES:
        params.seriesId = val;
        key = "model";
        $rs = $("." + CAR_CLS.MODEL);
        break;
    }

    return {
      url: getUrl(key + "List"),
      valKey: key + "Id",
      txtKey: key + "Name",
      params: params,
      $rs: $rs
    };
  }

  function getRelatedIpt($sel, $form) {
    return $("[name='" + $sel.attr("name").replace("Id", "Name") + "']", $form);
  }

  function generateOpt(val, txt, extra) {
    var html = ["<option class=\"is-dynamic\" value=\"" + val + "\""];

    if (extra) {
      var attrs = Object.keys(extra).map(function (k) {
        return "data-" + k + "=\"" + extra[k] + "\"";
      });

      html.push(" " + attrs.join(" "));
    }

    html.push(">" + txt + "</option>");

    return html.join("");
  }

  function getOptsHtml(result, valKey, txtKey) {
    return result.map(function (d) {
      return generateOpt(d[valKey], d[txtKey], d.guidePrice ? { price: d.guidePrice.replace("万", "") } : null);
    }).join("");
  }

  function initCarSelects(optsGroup, params, $form) {
    $.each(optsGroup, function (idx, opts) {
      var $s = opts.$rs || $(opts.selector, $form);

      $(".is-dynamic", $s).remove();

      muu.ajax.get(opts.url, params, function (result) {
        $s.append(getOptsHtml(result, opts.valKey, opts.txtKey));

        if ($s.hasClass(CAR_CLS.MODEL) || $s.hasClass(CAR_CLS.OUTER) || $s.hasClass(CAR_CLS.INNER)) {
          var customText = undefined;

          if ($s.hasClass(CAR_CLS.MODEL)) {
            customText = "车型";
          } else if ($s.hasClass(CAR_CLS.OUTER)) {
            customText = "外观";
          } else if ($s.hasClass(CAR_CLS.INNER)) {
            customText = "内饰";
          }

          $s.append($(generateOpt("-1", "自定义" + customText)).addClass("is-custom"));
          $(".js-customize[data-from='" + $s.attr("name") + "']", $form).val("");
        }

        muu.select.change($s, $s.attr("data-refill"), function () {
          $s.removeAttr("data-refill");

          if ($s.val() === "-1") {
            var $ipt = getRelatedIpt($s, $form);

            $("[data-to='" + $ipt.attr("name") + "']", $form).val($ipt.val());
          }
        });
      });
    });
  }

  carUtils.initSelects = function ($form) {
    $(getCarSelectors(CAR_CLS.SPEC), $form).on("change", function () {
      var $sel = $(this);
      var $opt = $(":selected", $sel);
      var $cus = $("[data-from='" + $sel.attr("name") + "']", $form);

      getRelatedIpt($sel, $form).val($sel.val() === "" ? "" : $opt.text());

      if ($opt.hasClass("is-custom")) {
        $cus.addClass("is-visible");
      } else {
        $cus.removeClass("is-visible");
      }

      if ($sel.hasClass(CAR_CLS.MODEL)) {
        var $guidePrice = $("[name='guidePrice']", $form);

        $guidePrice.val($guidePrice.attr("data-refill") || $opt.attr("data-price") || "0");
      }
    });

    $(getCarSelectors([CAR_CLS.MODEL, CAR_CLS.OUTER, CAR_CLS.INNER]), $form).on("change", function () {
      var $s = $(this);
      var val = $s.val();

      if (val === "") {
        return;
      }

      var carOpts = getCarOpts($s.attr("class"), val);

      initCarSelects([carOpts].concat($s.hasClass(CAR_CLS.SERIES) ? [{
        url: getUrl("innerList"),
        selector: "." + CAR_CLS.INNER,
        valKey: "innerId",
        txtKey: "innerName"
      }, {
        url: getUrl("outerList"),
        selector: "." + CAR_CLS.OUTER,
        valKey: "outerId",
        txtKey: "outerName"
      }] : []), carOpts.params, $form);
    });
  };

  carUtils.serialize = function ($form, callback) {
    return $form.serializeArray().map(function (d) {
      if (["modelName", "innerName", "outerName"].includes(d.name)) {
        var $cus = $(".js-customize[data-to='" + d.name + "']", $form);

        if ($("[name='" + $cus.attr("data-from") + "']", $form).val() === "-1") {
          d.value = $cus.val();
        }
      }

      if ($.isFunction(callback)) {
        d.value = callback.apply(null, [d, $form]);
      }

      return d;
    });
  };

  function resetForm($form) {
    $form.trigger("reset");

    $("select", $form).each(function () {
      $("option[value='']", $(this)).prop("selected", true).siblings(".is-dynamic").remove();

      $(this).trigger("change");
    });
  }

  function flattenParams(arr) {
    var obj = {};

    arr.forEach(function (pair) {
      var n = pair.name;
      var v = pair.value;

      if ($.type(v) === "string") {
        v = $.trim(v);
      }

      obj[n] = n === "carUniques" ? formatCarUniques(v) : v;
    });

    return obj;
  }

  function formatCarUniques(val) {
    return $.isArray(val) ? val : $.trim(val) === "" ? [] : $.trim(val).split(/\s+/);
  }

  function validateFrameNumber($form) {
    var h5f = H5F.get($form);

    [{
      handler: function handler() {
        return formatCarUniques(this.value).length === $("[name='carNumber']", $form).val() * 1;
      },
      message: "车架号个数与数量不符"
    }, {
      handler: function handler() {
        return formatCarUniques(this.value).filter(function (num) {
          return !/^[A-Z0-9]{17}$/.test(num);
        }).length === 0;
      },
      message: "有车架号不符合规范"
    }].forEach(function (rule) {
      h5f.addValidation("carUniques", rule);
    });
  }

  function saveCarsInfo($form) {
    var $container = $form.closest(".CarSet-item.is-editing");
    var $newCarArea = $("<div class=\"CarSet-item\"></div>");
    var formData = carUtils.serialize($form);

    formData.push({
      name: "specName",
      value: $(".js-selectSpec :selected").text()
    });

    $(".row", $container).remove();
    $container.append(generateNewCarItem(flattenParams(formData))).removeClass("is-editing").addClass("Car").data("carData", formData);

    $container.parent().children(".CarSet-item:last").after($newCarArea);
    $newCarArea.addClass("is-editing").append($form);
    resetForm($form);
  }

  function generateNewCarItem(car) {
    var $item = $("<div class=\"row\"><div class=\"col-sm-10\"></div><div class=\"col-sm-2\"></div></div>");

    $(".col-sm-10", $item).append("<h3 class=\"Car-name\"></h3><p class=\"Car-prop\"></p><div class=\"Car-count\"></div>");
    $(".col-sm-2", $item).append("<button type=\"button\" class=\"btn btn-default btn-xs js-editCarItem\">编辑</button><button type=\"button\" class=\"btn btn-danger btn-xs js-deleteCarItem\">删除</button>");

    $(".Car-name", $item).text(car.modelName);
    $(".Car-prop", $item).append("<span>" + car.specName + "</span>").append("<span>" + car.outerName + "/" + car.innerName + "</span>");
    $(".Car-count", $item).append("<p>" + car.carNumber + "</p>").append("<ul>" + car.carUniques.map(function (c) {
      return "<li>" + c + "</li>";
    }).join("") + "</ul>");

    return $item;
  }

  function refillCarForm($item, $form) {
    $item.children(".row").hide();
    $item.removeClass("Car").addClass("is-editing").append($form);

    var $old = $item.siblings(".is-editing");

    if ($(".row", $old).size()) {
      $old.addClass("Car");
      $(".row", $old).show();
    } else {
      $old.remove();
    }

    $.each($item.data("carData"), function (idx, d) {
      var $f = $("[name='" + d.name + "']", $form);

      if ($f.is("select")) {
        $f.attr("data-refill", d.value);
      } else {
        $f.val($f.is("textarea") && Array.isArray(d.value) ? d.value.join("\n") : d.value);
      }
    });

    var $spec = $("[name='spec']", $form);

    muu.select.change($spec, $spec.attr("data-refill"), function () {
      $spec.removeAttr("data-refill");
    });
  }

  carUtils.initCarSet = function ($container) {
    var $form = $(".js-fillCarsInfo", $container);

    carUtils.initSelects($form);

    validateFrameNumber($form);

    $form.on("H5F:submit", function (evt, ins, submitEvt) {
      saveCarsInfo($(this));

      submitEvt.preventDefault();

      return false;
    });

    $container.on("click", ".js-editCarItem", function () {
      if (confirm("正在填写的车辆集合信息会被丢弃，是否仍要编辑选中车辆集合？")) {
        refillCarForm($(this).closest(".CarSet-item.Car"), $form);
      }

      return false;
    });

    $container.on("click", ".js-deleteCarItem", function () {
      $(this).closest(".CarSet-item.Car").remove();
    });

    $(".js-addNewCars", $container).on("click", function () {
      $form.trigger("submit");
    });
  };

  carUtils.formatVINs = formatCarUniques;

  function random( biggest ) {
    return Math.round(biggest - Math.random() * (biggest -  1));
  }

  function generateStatus() {
    return random(4);
  }

  function generateOrderNo() {
    return "YD" + currentTime.format("YYMMDD") + random(999999);
  }

  function generateBizOrderNo() {
    return "D" + currentTime.format("YYMMDD") + random(999999);
  }

  function generateCarCount() {
    return random(999);
  }

  function generateTransportType() {
    return random(2);
  }

  function generateOrderData( count ) {
    var items = [];
    var i = 0;
    var status;

    while( i < count ) {
      status = generateStatus();

      items.push({
        transportOrderId: i + 1,
        transportOrderNo: generateOrderNo(),
        orderCreateTime: currentTime.format(),
        bizOrderNo: generateBizOrderNo(),
        startCityName: "北京市东城区",
        destinationCityName: "天津市和平区",
        carCount: generateCarCount(),
        carrierName: "大头娃娃运输有限公司1",
        transportType: TRANSPORT_TEXT[generateTransportType() - 1],
        clientName: "欧雷流",
        clientContactName: "欧雷",
        status: status,
        statusName: STATUS_TEXT[status - 1],
        remarks: "小于 888 的随机数字：" + random(888)
      });
      i++;
    }

    return items;
  }

  /**
   * 初始化数据表格
   */
  function initDataTable() {
    muu.table.init({
      sidePagination: "client",
      pageSize: 10,
      columns: [{
        title: "运单号",
        field: "transportOrderNo"
      }, {
        title: "订单号",
        field: "bizOrderNo"
      }, {
        title: "下单时间",
        field: "orderCreateTime",
        formatter: function( val ) {
          return moment(val).format("YYYY-MM-DD HH:mm");
        }
      }, {
        title: "路线",
        field: "route",
        formatter: function( val, row ) {
          return "<div class=\"u-textCenter\">" + row.startCityName + "<br><i class=\"fa fa-long-arrow-down\"></i><br>" + row.destinationCityName + "</div>";
        }
      }, {
        title: "车辆数量",
        field: "carCount"
      }, {
        title: "承运商",
        field: "carrierName"
      }, {
        title: "运输类型",
        field: "transportType"
      }, {
        title: "客户",
        field: "clientName"
      }, {
        title: "联系人",
        field: "clientContactName"
      }, {
        title: "状态",
        field: "statusName"
      }, {
        title: "备注",
        field: "remarks"
      }, {
        title: "操作",
        field: "operation",
        formatter: function( val, row ) {
          var btns = [{
              text: "审核",
              action: "edit",
              icon: "check",
              isCoexisted: true
            }];

          return muu.generate.action(btns, true);
        }
      }],
      data: generateOrderData(222)
    });
  }

  function transformCarProps(props) {
    var newProps = {};
    var map = {
      spec: "carStandardId",
      specName: "carStandardName",
      carNumber: "carAmount",
      carUniques: "carUniqueList",
      guidePrice: "insuranceCarPrice"
    };

    props.forEach(function (p) {
      var k = p.name;
      var v = p.value;

      if (!["insuranceCarPrice", "guidePrice"].includes(k) && $.isNumeric(v)) {
        v = parseFloat(v);
      }

      if (map[k]) {
        newProps[map[k]] = k === "carUniques" ? carUtils.formatVINs(v) : v;
      } else {
        newProps[k.indexOf("inner") !== -1 || k.indexOf("outer") !== -1 ? k : "car" + k.charAt(0).toUpperCase() + k.slice(1)] = v;
      }
    });

    return newProps;
  }

  function getCommonParams() {
    return $(".js-selectRoute").serializeArray().concat([{
      name: "carInfoList",
      value: [].map.call($(".CarSet-item.Car"), function (el) {
        return transformCarProps($(el).data("carData"));
      })
    }]);
  }

  function getQueryPriceParams() {
    var pageNo = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
    var queryOuterCarrier = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

    return getCommonParams().concat([{
      name: "pageNo",
      value: pageNo
    }, {
      name: "pageSize",
      value: 20
    }, {
      name: "queryOuterCarrier",
      value: queryOuterCarrier
    }]);
  }

  function getNewBillParams() {
    var $transporter = $(".Transportation-transporters :checked");

    return getCommonParams().concat($(".js-fillDeliveryInfo").serializeArray(), [{
      name: "carrierId",
      value: $transporter.val()
    }, {
      name: "carrierSourceType",
      value: $transporter.attr("data-source")
    }]);
  }

  function serializeArray2Json(arr) {
    var result = {};

    arr.forEach(function (p) {
      result[p.name] = !["insuranceCarPrice", "guidePrice"].includes(p.name) && $.isNumeric(p.value) ? parseFloat(p.value) : p.value;
    });

    return result;
  }

  function generateTransporterItem(data) {
    var carrierId = data.carrierId || 0;
    var html = [];

    html.push("<li><input id=\"corp-" + carrierId + "\" type=\"radio\" name=\"transporter\" value=\"" + carrierId + "\" data-source=\"" + data.carrierSourceType + "\">");
    html.push("<label class=\"Transportation-transporter\" for=\"corp-" + carrierId + "\">");
    html.push("<h4>" + data.carrierName + "</h4>");
    html.push("<ul><li>运价：<span>" + data.transportFormPrice + "</span></li><li>保险费：<span>" + data.insurancePrice + "</span></li><li>提验车费：<span>" + data.examPrice + "</span></li></ul>");
    html.push("<p>总价：<span>" + data.totalPrice + "</span></p></li>");

    return html.join("");
  }

  function generateTransporterList() {
    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var hiddenCls = "u-hidden";
    var params = serializeArray2Json(getQueryPriceParams(opts.page, opts.outer));

    var $transporters = $(".Transportation-transporters");
    var $pager = $(".Transportation-pager");

    $transporters.empty();

    $("li", $pager).addClass("disabled");

    muu.ajax.post("", params, function (data, res) {
      $transporters.html(data.result.map(generateTransporterItem));

      $pager.data({
        currentPage: data.pageNo,
        queryOuter: res.extraInfo.queryOuterCarrier
      });

      $("li", $pager).removeClass("disabled");

      if (data.totalPage > 1) {
        $pager.removeClass(hiddenCls);
      } else {
        $pager.addClass(hiddenCls);
      }

      if (data.pageNo === 1) {
        $(".previous", $pager).addClass(hiddenCls);
      } else {
        $(".previous", $pager).removeClass(hiddenCls);
      }

      if (data.pageNo === data.totalPage) {
        $(".next", $pager).addClass(hiddenCls);
      } else {
        $(".next", $pager).removeClass(hiddenCls);
      }
    }, true);
  }

  function initTransportersStep() {
    var params = serializeArray2Json(getQueryPriceParams());
    var amount = 0;
    var carHtml = [];

    var $dest = $(".Transportation-destination");
    var $cars = $(".Transportation-cars");

    $("span:first-child", $dest).text(params.startLocationName);
    $("span:last-child", $dest).text(params.arriveLocationName);

    params.carInfoList.forEach(function (cars) {
      amount += parseFloat(cars.carAmount);
      carHtml.push("<li>" + cars.carStandardName + " " + cars.carBrandName + " " + cars.carModelName + " " + cars.insuranceCarPrice + "万元 " + cars.carAmount + "辆</li>");
    });

    $cars.html(carHtml.join(""));

    $("p", $dest).text("共 " + amount + " 辆，" + $.trim($(".js-selectRoute [name='transportTypeId']:checked").parent().text()));

    generateTransporterList();
  }

  function activateProcedureStep(idx) {
    var labelSel = ".Procedure-labels li";
    var stepSel = ".Procedure-step";
    var activeCls = "is-active";

    var $procedure = $(".Procedure");
    var $activeLabel = $(labelSel + "." + activeCls, $procedure);
    var $activeStep = $(stepSel + "." + activeCls, $procedure);
    var $targetLabel = $(labelSel + ":eq(" + idx + ")", $procedure);
    var $targetStep = $(stepSel + ":eq(" + idx + ")", $procedure);

    if ($targetLabel === $activeLabel && $targetStep === $activeStep) {
      return;
    }

    var overCls = "is-over";

    $activeLabel.removeClass(activeCls);
    $activeStep.removeClass(activeCls);

    $(labelSel + "." + overCls, $procedure).removeClass(overCls);
    $(labelSel + ":lt(" + idx + ")", $procedure).addClass(overCls);

    $targetLabel.addClass(activeCls);
    $targetStep.addClass(activeCls);
  }

  function getInvoiceRate() {
    return muu.calculate.minus($("[data-rate]", $(".js-addNewData")).attr("data-rate"), 1);
  }

  function calculateCharge(price, rate) {
    return Math.ceil(muu.calculate.multiply(price, rate));
  }

  function movePrevStep() {
    var stepSel = ".Procedure-step";
    var hiddenCls = "is-hidden";

    var $activeEl = $(stepSel + ".is-active");
    var $prevEl = $activeEl.prev(stepSel);

    activateProcedureStep($activeEl.index() - 1);

    $(".js-next").removeClass(hiddenCls);

    if ($prevEl.is(stepSel + ":first")) {
      enableNextBtn();
      $(this).addClass(hiddenCls);
    }

    if (!$prevEl.is(stepSel + ":last")) {
      $(".js-saveNewData").addClass(hiddenCls);
    }

    return false;
  }

  function moveNextStep() {
    var stepSel = ".Procedure-step";
    var hiddenCls = "is-hidden";

    var $activeEl = $(stepSel + ".is-active");
    var $nextEl = $activeEl.next(stepSel);

    var flag = $nextEl.attr("data-step");

    if (flag === "transporters") {
      disableNextBtn();
      initTransportersStep();
    } else if (flag === "delivery") {
      (function () {
        var $transporter = $(".Transportation-transporter", $nextEl);

        $transporter.html($(".Transportation-transporters :checked").siblings("label").html());

        var invoiceRate = getInvoiceRate();
        var newPrice = $("p span:first", $transporter).text() * 1;

        $("li span", $transporter).each(function () {
          var span = $(this);
          var increase = calculateCharge(span.text(), invoiceRate);

          newPrice = muu.calculate.plus(newPrice, increase);

          span.after("<span class=\"u-hidden\">+" + increase + "</span>");
        });

        $("p", $transporter).append("<span class=\"u-hidden\">" + newPrice + "</span>");
      })();
    }

    activateProcedureStep($activeEl.index() + 1);

    $(".js-prev").removeClass(hiddenCls);

    if ($nextEl.is(stepSel + ":last")) {
      $(this).addClass(hiddenCls);
      $(".js-saveNewData").removeClass(hiddenCls);
    }

    return false;
  }

  function isCityCompleted() {
    return $("[value!='']:selected", $(".js-chooseCity", $(".js-addNewData"))).size() === 2;
  }

  function enableNextBtn() {
    $(".js-next", $(".js-addNewData")).prop("disabled", false);
  }

  function disableNextBtn() {
    $(".js-next", $(".js-addNewData")).prop("disabled", true);
  }

  function initDeliveryForm($m) {
    var $form = $(".js-fillDeliveryInfo", $m);
    var $deliveryTransporter = $(".Procedure-step[data-step='delivery'] .Transportation-transporter");

    $(".js-setInvoiceRate").text(muu.calculate.multiply(getInvoiceRate(), 100) + "%");

    $(".js-saveNewData", $m).off("click").on("click", function () {
      $form.trigger("submit");

      return false;
    });

    $("[name='invoiceStatus']", $form).on("change", function () {
      if ($(this).val() === "1") {
        $("p span:first", $deliveryTransporter).addClass("is-deleted");
        $("li span:last-child, p span:last", $deliveryTransporter).removeClass("u-hidden");
      } else {
        $("p span:first", $deliveryTransporter).removeClass("is-deleted");
        $("li span:last-child, p span:last", $deliveryTransporter).addClass("u-hidden");
      }
    });

    $form.on("H5F:submit", function (evt, ins, submitEvt) {
      var params = serializeArray2Json(getNewBillParams());

      delete params.transportFormDateFacker;

      muu.ajax.waiting($(this));

      muu.ajax.post("", params, function (res) {
        muu.table.refresh();
        $m.modal("hide");
      }, true);

      submitEvt.preventDefault();

      return false;
    });

    $(".js-selectClient", $m).select2({
      minimumInputLength: 1,
      ajax: {
        url: "",
        dataType: "json",
        type: "get",
        delay: 250,
        data: function data(params) {
          return {
            companyName: params.term
          };
        },
        processResults: function processResults(res, params) {
          return {
            results: res.data.map(function (d) {
              d.id = d.clientCompanyId;
              d.text = d.clientCompanyName;

              return d;
            })
          };
        }
      }
    }).on("change", function () {
      $("[name='clientCompanyName']").val($(this).text());
    });

    muu.field.datepicker($(".js-pickDate"), { zIndex: 1500 });
  }

  function initNewDataDialog() {
    var $m = $(".js-addNewData");

    select.initAreaSelects($(".js-selectRoute"));
    carUtils.initCarSet($m);

    var h5f = H5F.get($(".js-fillCarsInfo", $m));

    $.each(h5f.fields, function (k, v) {
      if (["outerId", "innerId", "carUniques"].includes(k) && v.required === true) {
        h5f.fields[k].required = false;

        if (k === "carUniques") {
          h5f.fields[k].__validations = [];
        }
      }
    });

    [{
      handler: function handler() {
        return this.value.charAt(0) !== "0" || this.value === "0";
      },
      message: "所输数字不符合规范"
    }, {
      handler: function handler() {
        return (/^[0-9]+$/.test(this.value)
        );
      },
      message: "运价必须为整数"
    }].forEach(function (rule) {
      h5f.addValidation("carNumber", rule);
    });

    $(".js-prev", $m).on("click", movePrevStep);
    $(".js-next", $m).on("click", moveNextStep);

    $(".Transportation-pager a", $m).on("click", function () {
      var $a = $(this);
      var data = $a.closest(".Transportation-pager").data();

      generateTransporterList({
        page: $a.parent().hasClass("previous") ? data.currentPage - 1 : data.currentPage + 1,
        outer: data.queryOuter
      });

      return false;
    });

    $(".js-chooseCity", $m).on("change", function () {
      var $city = $(this);

      $city.siblings(":hidden").val("" + $(":selected", $city.siblings(".js-chooseProvince")).text() + $(":selected", $city).text());

      if (isCityCompleted()) {
        if ($(".CarSet-item.Car", $m).size()) {
          enableNextBtn();
        }
      } else {
        disableNextBtn();
      }
    });

    $m.on("hidden.bs.modal", function () {
      $("form", $m).trigger("reset");

      $("select", $m).each(function () {
        muu.select.change($(this));
      });

      $(".CarSet-item.Car", $m).remove();

      activateProcedureStep(0);

      var hiddenCls = "is-hidden";

      $(".js-next", $m).removeClass(hiddenCls);
      $(".js-prev, .js-saveNewData", $m).addClass(hiddenCls);
    });

    $m.on("click", ".js-editCarItem, .js-deleteCarItem", function () {
      if ($(".CarSet-item.Car", $m).size() === 0) {
        disableNextBtn();
      }
    });

    $m.on("change", ".Transportation-transporters :radio", function () {
      enableNextBtn();
    });

    $(".js-fillCarsInfo", $m).on("H5F:submit", function (evt, ins, submitEvt) {
      if (isCityCompleted()) {
        enableNextBtn();
      }

      submitEvt.preventDefault();

      return false;
    });

    initDeliveryForm($m);
  }

  $(document).ready(function() {
    initDataTable();
    initNewDataDialog();
  });
})();
