const app = getApp()
Page({
  data: {
    StatusBar: 45,
    CustomBar: 35,
    Custom: app.globalData.Custom,
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    list: [],
    load: true,
    list_index:0,
    goods_index:0,
    name_Bottom: "",
    detail_Bottom:"",
    price_Bottom_Total:0,
    price_Total:0,
    count_Total:0,
  },
  onLoad() {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    let list = [{
      id:0,
      name: '奶茶',
      goods:[
        { 
          list_index:0,
          name: 'AA奶茶',
          detail: '超级好喝的奶茶',
          status: '新品上市',
          price:'15.5',
          count:0,
          tprice:0,
        },{
          list_index: 0,
          name: 'BB奶茶',
          detail: '第二好喝的奶茶',
          status: '',
          price:'18',
          count: 0,
          tprice: 0,
        }
      ]
    },{
        id: 0,
        name: '小吃',
        goods: [
          { 
            list_index: 1,
            name: 'AA小吃',
            detail: '超级好吃的小吃',
            status: '新品上市',
            price:'20',
            count: 0,
            tprice: 0,
          }
        ]
    }
    ];
    this.setData({
      list: list,
      listCur: list[0]
    })
  },
  onReady() {
    wx.hideLoading()
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
  },
  VerticalMain(e) {
    let that = this;
    let list = this.data.list;
    let tabHeight = 0;
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].id);
        view.fields({
          size: true
        }, data => {
          list[i].top = tabHeight;
          tabHeight = tabHeight + data.height;
          list[i].bottom = tabHeight;
        }).exec();
      }
      that.setData({
        load: false,
        list: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: list[i].id
        })
        return false
      }
    }
  },
  showModal(e) {
    var list = this.data.list;
    this.setData({
      modalName: e.currentTarget.dataset.target,
      list_index:e.currentTarget.dataset.list_index,
      goods_index:e.currentTarget.dataset.index,
      name_Bottom: e.currentTarget.dataset.name,
      detail_Bottom: e.currentTarget.dataset.detail,
      price_Bottom_Total: list[e.currentTarget.dataset.list_index].goods[e.currentTarget.dataset.index].count * list[e.currentTarget.dataset.list_index].goods[e.currentTarget.dataset.index].price
    })
  },
  hideModal(e) {
    var list = this.data.list;
    var list_index = this.data.list_index;
    var goods_index = this.data.goods_index;
    list[list_index].goods[goods_index].count=0;
    var totalprice = 0;
    var totalcount = 0;
    for (let i = 0; i < list.length; i++) {
      for (let j = 0; j < list[i].goods.length; j++) {
        if (list[i].goods[j].count > 0) {
          totalprice += list[i].goods[j].tprice;
          totalcount += list[i].goods[j].count;
        }
      }
    }
    this.setData({
      list:list,
      price_Total: totalprice,
      count_Total: totalcount,
      modalName: null,
    })
  },
  addCount: function (e) {
    var list = this.data.list;
    var list_index= this.data.list_index;
    var goods_index=this.data.goods_index;
    if (list[list_index].goods[goods_index].count < 1000) {
      list[list_index].goods[goods_index].count++;
      list[list_index].goods[goods_index].tprice = list[list_index].goods[goods_index].count * list[list_index].goods[goods_index].price
    }
    this.setData({
      list:list,
      price_Bottom_Total: list[list_index].goods[goods_index].tprice
    });
  },
  delCount: function (e) {
    var list = this.data.list;
    var list_index = this.data.list_index;
    var goods_index = this.data.goods_index;
    if (list[list_index].goods[goods_index].count >= 1) {
      list[list_index].goods[goods_index].count--;
      list[list_index].goods[goods_index].tprice = list[list_index].goods[goods_index].count * list[list_index].goods[goods_index].price
    }
    this.setData({
      list: list,
      price_Bottom_Total: list[list_index].goods[goods_index].tprice
    });
  },
  addtoCart:function(e){
    var list = this.data.list;
    var totalprice=0;
    var totalcount=0;
    for(let i=0;i<list.length;i++){
      for(let j=0;j<list[i].goods.length;j++){
        if (list[i].goods[j].count>0){
        totalprice += list[i].goods[j].tprice;
        totalcount += list[i].goods[j].count;
        }
      }
    }
    this.setData({
      price_Total: totalprice,
      count_Total: totalcount,
      modalName: null,
    })
  },
  showModalCart(e) {
    this.setData({
      modalNameCart: e.currentTarget.dataset.target
    })
  },
  hideModalCart(e) {
    this.setData({
      modalNameCart: null
    })
  },
  addCountCart: function (e) {
    var list = this.data.list;
    var list_index = e.currentTarget.dataset.list_index;
    var goods_index = e.currentTarget.dataset.goods_index;
    var totalprice = 0;
    var totalcount = 0;
    if (list[list_index].goods[goods_index].count < 1000) {
      list[list_index].goods[goods_index].count++;
      list[list_index].goods[goods_index].tprice = list[list_index].goods[goods_index].count * list[list_index].goods[goods_index].price
    }
    for (let i = 0; i < list.length; i++) {
      for (let j = 0; j < list[i].goods.length; j++) {
        if (list[i].goods[j].count > 0) {
          totalprice += list[i].goods[j].tprice
          totalcount += list[i].goods[j].count;
        }
      }
    }
    this.setData({
      list: list,
      price_Total: totalprice,
      count_Total: totalcount,
    });
  },
  delCountCart: function (e) {
    var list = this.data.list;
    var list_index = e.currentTarget.dataset.list_index;
    var goods_index = e.currentTarget.dataset.goods_index;
    var totalprice = 0;
    var totalcount = 0;
    if (list[list_index].goods[goods_index].count >0) {
      list[list_index].goods[goods_index].count--;
      list[list_index].goods[goods_index].tprice = list[list_index].goods[goods_index].count * list[list_index].goods[goods_index].price
    }
    for (let i = 0; i < list.length; i++) {
      for (let j = 0; j < list[i].goods.length; j++) {
        if (list[i].goods[j].count > 0) {
          totalprice += list[i].goods[j].tprice
          totalcount += list[i].goods[j].count;
        }
      }
    }
    this.setData({
      list: list,
      price_Total: totalprice,
      count_Total: totalcount,
    });
  },
})