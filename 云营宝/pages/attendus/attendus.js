// pages/attendus/attendus.js
const app = getApp();
const db = wx.cloud.database().collection('Inform');
var modalName = "";
var shop_name = "";
var shop_contact = "";
var shop_site = "";
var first_name = "";
var first_grossProfit = "";
var second_name = "";
var second_grossProfit = "";
var third_name = "";
var third_grossProfit = "";
var last_name = "";
var last_grossProfit = "";
var secondToLast_name = "";
var secondToLast_grossProfit = "";
var thirdToLast_name = "";
var thirdToLast_grossProfit = "";
var goodlist = [];
var Submit = ""
Page({
  data: {
    goodlist: [{
      id: "第一低",
      name: "",
      namefunc: "addLastName",
      grossprofit: "",
      grossprofitfunc: "addLastGrossProfit"
    }, {
      id: "第二低",
      name: "",
      namefunc: "addSecondToLastName",
      grossprofit: "",
      grossprofitfunc: "addSecondToLastGrossProfit",
    }, {
      id: "第三低",
      name: "",
      namefunc: "addThirdToLastName",
      grossprofit: "",
      grossprofitfunc: "addThirdToLastGrossProfit",
    }, {
      id: "第一高",
      name: "",
      namefunc: "addFirstName",
      grossprofit: "",
      grossprofitfunc: "addFirstGrossProfit",
    }, {
      id: "第二高",
      name: "",
      namefunc: "addSecondName",
      grossprofit: "",
      grossprofitfunc: "addSecondGrossProfit",
    }, {
      id: "第三高",
      name: "",
      namefunc: "addThirdName",
      grossprofit: "",
      grossprofitfunc: "addThirdGrossProfit",
    }],
    modalName: "",
    Submit: ""
  },
  addShopName: function(e) {
    console.log("店铺名称：", e.detail.value);
    shop_name = e.detail.value;
  },
  addShopContact: function(e) {
    console.log("联系方式：", e.detail.value);
    shop_contact = e.detail.value;
  },
  addShopSite: function(e) {
    console.log("店铺地址：", e.detail.value);
    shop_site = e.detail.value;
  },
  addFirstName: function(e) {
    console.log("毛利率第一商品的名称：", e.detail.value);
    first_name = e.detail.value;
  },
  addFirstGrossProfit: function(e) {
    console.log("毛利率第一商品的毛利率：", e.detail.value);
    first_grossProfit = e.detail.value;
  },
  addSecondName: function(e) {
    console.log("毛利率第二商品的名称：", e.detail.value);
    second_name = e.detail.value;
  },
  addSecondGrossProfit: function(e) {
    console.log("毛利率第二商品的毛利率：", e.detail.value);
    second_grossProfit = e.detail.value;
  },
  addThirdName: function(e) {
    console.log("毛利率第三商品的名称：", e.detail.value);
    third_name = e.detail.value;
  },
  addThirdGrossProfit: function(e) {
    console.log("毛利率第三商品的毛利率：", e.detail.value);
    third_grossProfit = e.detail.value;
  },
  addLastName: function(e) {
    console.log("毛利率第一低商品的名称：", e.detail.value);
    last_name = e.detail.value;
  },
  addLastGrossProfit: function(e) {
    console.log("毛利率第一低商品的毛利率：", e.detail.value);
    last_grossProfit = e.detail.value;
  },
  addSecondToLastName: function(e) {
    console.log("毛利率第二低商品的名称：", e.detail.value);
    secondToLast_name = e.detail.value;
  },
  addSecondToLastGrossProfit: function(e) {
    console.log("毛利率第二低商品的毛利率：", e.detail.value);
    secondToLast_grossProfit = e.detail.value;
  },
  addThirdToLastName: function(e) {
    console.log("毛利率第三低商品的名称：", e.detail.value);
    thirdToLast_name = e.detail.value;
  },
  addThirdToLastGrossProfit: function(e) {
    console.log("毛利率第三低商品的毛利率：", e.detail.value);
    thirdToLast_grossProfit = e.detail.value;
  },
  submit: function(e) {
    let that = this;
    db.add({ //db之前宏定义的 在这里指数据库中的Room表； add指 插入
      data: { // data 字段表示需新增的 JSON 数据       
        shop_name: shop_name,
        shop_contact: shop_contact,
        shop_site: shop_site,
        first_name: first_name,
        first_grossProfit: first_grossProfit,
        second_name: second_name,
        second_grossProfit: second_grossProfit,
        third_name: third_name,
        third_grossProfit: third_grossProfit,
        last_name: last_name,
        last_grossProfit: last_grossProfit,
        secondToLast_name: secondToLast_name,
        secondToLast_grossProfit: secondToLast_grossProfit,
        thirdToLast_name: thirdToLast_name,
        thirdToLast_grossProfit: thirdToLast_grossProfit,
      },
      success: function(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id       
        console.log("上传成功", res);
        that.setData({
          Submit: "上传成功",
          modalName: e.currentTarget.dataset.target,
        })
      },
      failure: function() {
        console.log("上传失败");
        that.setData({
          Submit: "上传失败。請重試一下哦",
          modalName: e.currentTarget.dataset.target,
        })
      }
    })
  },
  reset: function(e) {
    for (var i = 0; i < goodlist.length; i++) {
      var temp1 = "goodlist[" + i + "].name"
      this.setData({
        [temp1]: ""
      });
    }
    for (var i = 0; i < goodlist.length; i++) {
      var temp2 = "goodlist[" + i + "].grossprofit"
      this.setData({
        [temp2]: "",
      });
    }
    this.setData({
      shop_name: "",
      shop_contact: "",
      shop_site: "",
    });
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target,
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
})