<template>
  <div class="app-container">
    <h1>订单详情</h1>
    <div v-if="orderDetail">
      <h2>订单客户：{{ orderDetail.customer_title }}</h2>
      <h2>订单号：{{ orderDetail.order_no }}</h2>
      <h2>订单金额：{{ orderDetail.total_price }}</h2>
      <h2>订单状态：{{ orderDetail.status }}</h2>
      <h2>订单地址：{{ orderDetail.delivery_address_prvince }}{{ orderDetail.delivery_address_city }}{{ orderDetail.delivery_address_district }} {{ orderDetail.delivery_address_detail }}</h2>
      <!-- 其他订单信息 -->

      <!-- 订单商品列表 -->
      <h2>订单商品列表</h2>
      <ul>
        <li v-for="item in orderDetail.order_items" :key="item.id">
          {{ item.product_title }} - {{ item.price }} x {{ item.quantity }}
        </li>
      </ul>
      <!-- 其他订单商品信息 -->

      <!-- 订单操作按钮 -->
      <div v-if="orderDetail.status === '待付款'">
        <el-button type="primary" @click="handlePay">立即付款</el-button>
      </div>
      <div v-if="orderDetail.status === '待发货'">
        <el-button type="primary" @click="handleDeliver">立即发货</el-button>
      </div>
      <div v-if="orderDetail.status === '待收货'">
        <el-button type="primary" @click="handleReceive">确认收货</el-button>
      </div>
    </div>
    <div v-else>
      <h2>加载中...</h2>
    </div>
  </div>
</template>

<script>

import { getOrderDetail } from '@/api/order'

export default {
  data() {
    return {
      orderDetail: null,
      id: 0
    }
  },
  mounted() {
    // 获取网址参数
    this.id = this.$route.query.id
    // 调用接口获取订单详情
    this.getOrderDetail()
  },
  methods: {
    getOrderDetail() {
      // 调用接口获取订单详情
      getOrderDetail(this.id).then(response => {
        this.orderDetail = response.data
      })
    }
  }
}
</script>
