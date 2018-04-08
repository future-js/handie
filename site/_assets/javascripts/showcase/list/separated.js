(function() {
  var STATUS_TEXT = ["待付款", "进行中", "已完成", "作废"];
  var TRANSPORT_TEXT = ["大板车", "小板车"];

  var currentTime = moment(new Date());

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
        carrierName: "运好车有限公司",
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

  function initMainTableAndDialog() {
    muu.table.init({
      data: generateOrderData(222),
      sidePagination: "client",
      slim: true,
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
      }],
      operation: {
        actions: [{
          action: "edit"
        }, {
          text: "审核",
          action: "verify",
          icon: "check",
          isCoexisted: true
        }]
      }
    });
  }

  $(document).ready(function() {
    initMainTableAndDialog();
  });
})();
