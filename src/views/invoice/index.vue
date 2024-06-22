<template>
  <div class="delivery-container">
    <table style="width: 100%; min-height: 25px; line-height: 25px; text-align: center; border-collapse: collapse;">
      <tr>
        <td width="125px" style="font-size: 80px;border-color: white;" rowspan="3">HY</td>
        <td width="450px" style="border-color: white;font-size: 24px;" colspan="5">佛山市顺德区浩研研磨材料有限公司</td>
        <td style="border-color: white;text-align: left;"></td>
        <td width="210px" style="border-color: white;text-align: left;">NO:20240618001</td>
      </tr>
      <tr>
        <td colspan="5" style="border-color: white;"></td>
        <td style="border-color: white;text-align: left;"></td>
        <td style="border-color: white;text-align: left;">订单编号:{{ order.order_no }}</td>
      </tr>
      <tr>
        <td colspan="5" style="border-color: white;font-size: 24px;">送货单</td>
        <td colspan="2" style="border-color: white;"></td>
      </tr>
      <tr>
        <td style="text-align: left;border-right-color: white;border-left-color: white; border-top-color: white;" colspan="6">购货单位: {{ order.customer_title }}</td>
        <td style="border-right-color: white;border-left-color: white; border-top-color: white;"></td>
        <td style="text-align: left; border-right-color: white;border-left-color: white; border-top-color: white;">日期: {{ order.delivery_date }}</td>
      </tr>
      <tr style="height: 25px;">
        <td>货品名称</td>
        <td>规格</td>
        <td>单位</td>
        <td>数量</td>
        <td>单价</td>
        <td>金额</td>
        <td>物料编码</td>
        <td>备注</td>
      </tr>
      <!--eslint-disable-next-line-->
      <tr v-for="item in order.products" style="height: 25px;">
        <td>{{ item.title }}</td>
        <td>{{ item.specification }}</td>
        <td>{{ item.unit }}</td>
        <td>{{ item.quantity }}</td>
        <td>{{ item.price }}</td>
        <td>{{ item.total_price }}</td>
        <td></td>
        <td>{{ item.remark }}</td>
      </tr>
      <tr style="height: 25px;">
        <td>合计金额大写:</td>
        <td colspan="3">壹万壹仟</td>
        <td>小计</td>
        <td>11000</td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 25px;">
        <td>备注:</td>
        <td colspan="6">含税价</td>
        <td></td>
      </tr>
      <tr style="text-align: left; height: 25px;">
        <td colspan="8" style="border-color: white;">
          <span style="margin-right: 30px;">收款方式:</span>
          <span style="margin-right: 30px;">货到现金  <input type="checkbox"></span>
          <span style="margin-right: 30px;">协议月结  <input type="checkbox"></span>
          <span style="margin-right: 30px;">月底结  <input type="checkbox"></span>
          <span style="margin-right: 30px;">签收作未付款  <input type="checkbox"></span>
          <span style="margin-right: 30px;">其他  <input type="checkbox"></span>
        </td>
      </tr>
      <tr style="text-align: left;">
        <td colspan="8" style="border-color: white;">注: 以上货品签收妥，如有异议，十五日内提出，否则不得退货</td>
      </tr>
      <tr style="text-align: left;">
        <td colspan="8" style="border-color: white;">地址: 佛山市顺德区大良凤翔路凤翔商业广场45号8号铺</td>
      </tr>
      <tr style="text-align: left;">
        <td colspan="8" style="border-color: white;">电话: 13928227943 /13929127527  传真: 0757-22202026</td>
      </tr>
      <tr style="text-align: left;">
        <td colspan="8" style="border-color: white;">
          <span style="margin-right: 60px;">制单: 赖小莲</span>
          <span style="margin-right: 60px;">业务员: 欧均芹</span>
          <span style="margin-right: 120px;">经手人:</span>
          <span>收货单位及经手:</span>
        </td>
      </tr>
      <tr style="text-align: left;">
        <td colspan="8" style="border-color: white;">
          <span style="margin-right: 60px;">白色: 存根联</span>
          <span style="margin-right: 60px;">黄色: 顾客联</span>
          <span style="margin-right: 60px;">红色: 收款联</span>
          <span style="margin-right: 60px;">蓝色: 财务联</span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
/** eslint-disable */
import { getOrderDetail } from '@/api/order'
export default {
  data() {
    return {
      id: this.$route.query.id,
      order: {}
    }
  },
  mounted() {
    this.getOrderDetail()
  },
  methods: {
    getOrderDetail() {
      getOrderDetail(this.id).then(res => {
        this.order = res.data
        if (this.order.products.length < 5) {
          for (let i = this.order.products.length; i < 5; i++) {
            this.order.products.push({})
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.delivery-container {
  width: 241mm;
  border: 1px solid #000;
  box-sizing: border-box;
  margin: 0 auto;
  padding: 0.594cm;
  box-sizing: border-box;
}
table,table tr th, table tr td { border:1px solid black; }
</style>
