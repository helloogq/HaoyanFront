<template>
  <div class="app-container">
    <div class="page-block">
      <el-form ref="ruleForm" :rules="rules" :model="form" label-width="100px">
        <el-form-item>
          <el-radio-group v-model="customer_type" @input="handleCustomerTypeChange">
            <el-radio-button label="已建档客户" />
            <el-radio-button label="未建档客户" />
          </el-radio-group>
        </el-form-item>
        <el-row>
          <el-col :span="6">
            <el-form-item label="客户公司:" prop="customer_title">
              <el-select
                v-if="customer_type === '已建档客户'"
                v-model="form.customer_title"
                value-key=""
                clearable
                filterable
                remote
                reserve-keyword
                placeholder="请输入关键词"
                :remote-method="remoteMethod"
                @focus="handleCustomerFocus"
                @change="handleCustomerChange"
              >
                <el-option
                  v-for="item in customerList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-input v-else v-model="form.customer_title" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="收货人姓名:" prop="delivery_address_name">
              <el-input v-model="form.delivery_address_name" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联系电话:">
              <el-input v-model="form.delivery_address_phone" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="送货方式:">
              <el-select v-model="form.delivery_method" placeholder="请选择活动区域">
                <el-option label="送货上门" value="0" />
                <el-option label="自提" value="1" />
                <el-option label="快递物流" value="2" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="送货地址:">
          <el-row>
            <el-col :span="10">

              <el-select v-model="form.delivery_address_province_id" placeholder="请选择省份" @change="handleProvinceChange">
                <el-option
                  v-for="item in provinceList"
                  :key="item.area_id"
                  :label="item.name"
                  :value="item.area_id"
                />
              </el-select>

              <el-select v-model="form.delivery_address_city_id" placeholder="请选择城市" @change="handleCityChange">
                <el-option
                  v-for="item in cityList"
                  :key="item.area_id"
                  :label="item.name"
                  :value="item.area_id"
                />
              </el-select>

              <el-select v-model="form.delivery_address_district_id" placeholder="请选择区县" @change="handleDistrictChange">
                <el-option
                  v-for="item in districtList"
                  :key="item.area_id"
                  :label="item.name"
                  :value="item.area_id"
                />
              </el-select>
            </el-col>
            <el-col :span="14">
              <el-input v-model="form.delivery_address_detail" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="送货日期:">
          <el-date-picker v-model="form.delivery_date" format="yyyy-MM-dd hh:mm:ss" value-format="yyyy-MM-dd hh:mm:ss" type="date" placeholder="选择日期" />
        </el-form-item>
        <el-form-item label="订单备注:">
          <el-input v-model="form.remark" type="textarea" />
        </el-form-item>
        <el-form-item label="">
          <el-button icon="el-icon-plus" style="margin-bottom: 5px;" @click="addProduct">添加产品</el-button>
          <div class="page-block">
            <el-table :data="form.products" show-summary style="width: 100%">
              <el-table-column type="index" width="50" />
              <el-table-column prop="title" label="产品名称" />
              <el-table-column prop="specification" label="产品规格" />
              <el-table-column prop="unit" label="单位" />
              <el-table-column min-width="50px" label="数量">
                <template slot-scope="{row}">
                  <el-input v-model="row.quantity" type="number" class="edit-input" size="small" />
                </template>
              </el-table-column>
              <el-table-column min-width="50px" label="单价（元）">
                <template slot-scope="{row}">
                  <el-input v-model="row.price" type="number" class="edit-input" size="small" />
                </template>
              </el-table-column>
              <el-table-column label="产品总价（元）">
                <template slot-scope="{row}">
                  {{ row.total_price = row.quantity * row.price }}
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="{row}">
                  <el-button type="primary" size="mini" icon="el-icon-delete" @click="handleDelete(row)" />
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-dialog title="产品列表" :visible.sync="dialogProductListTableVisible">
      <el-input
        v-model="listQuery.title"
        placeholder="商品名称"
        style="width: 200px;
        margin-right: 5px;"
        class="filter-item"
      />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-table :data="productList">
        <el-table-column property="title" label="产品名称" width="150" />
        <el-table-column property="specification" label="产品规格" width="200" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleAdd(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="listQuery.page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="listQuery.limit"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-dialog>
  </div>
</template>

<script>

import { getProductList } from '@/api/product'
import { createOrder } from '@/api/order'
import { getCustomerList } from '@/api/customer'
import { getArea } from '@/api/area'

export default {
  data() {
    return {
      rules: {
        customer_title: [{ required: true, message: '请选择客户', trigger: 'change' }],
        products: [{ required: true, message: '请选择产品', trigger: 'change' }]
      },
      customerList: [],
      productList: null,
      listLoading: false,
      downloadLoading: false,
      total: 0,
      customer_type: '已建档客户',
      listQuery: {
        title: '',
        page: 1,
        limit: 10
      },
      dialogProductListTableVisible: false,
      provinceList: [],
      cityList: [],
      districtList: [],
      form: {
        products: [],
        customer_id: 0,
        customer_title: '',
        delivery_date: this.$moment().format('YYYY-MM-DD HH:mm:ss'),
        delivery_remark: '',
        delivery_address_name: '',
        delivery_address_phone: '',
        delivery_address_remark: '',
        delivery_address_province: '',
        delivery_address_province_id: '',
        delivery_address_city: '',
        delivery_address_city_id: '',
        delivery_address_district_id: '',
        delivery_address_district: '',
        delivery_address_detail: '',
        remark: '',
        total_price: 0,
        status: 0,
        payment_method: 0,
        payment_status: 0
      }
    }
  },
  mounted() {
    this.getProvince()
  },
  methods: {
    onSubmit() {
      console.log('submit!')
      this.$refs['ruleForm'].validate((valid) => {
        console.log(valid)
        if (valid) {
          this.form.total_price = this.form.products.reduce((total, item) => {
            return total + (item.price * item.quantity)
          }, 0)
          console.log(this.form)
          createOrder(this.form).then(response => {
            console.log(response)
            if (response.code === 20000) {
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
              this.$router.push({ path: '/order/list' })
            } else {
              this.$notify({
                title: '失败',
                message: '创建失败',
                type: 'error',
                duration: 2000
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getProvince() {
      getArea({ parent_id: 0 }).then(response => {
        this.provinceList = response.data
      })
    },
    handleCustomerFocus(str) {
      console.log(str)
      this.getCustomerList({})
    },
    handleProvinceChange(value) {
      this.form.delivery_address_city_id = null
      this.form.delivery_address_city = ''
      this.form.delivery_address_district_id = null
      this.form.delivery_address_district = ''
      this.cityList = []
      this.districtList = []
      this.provinceList.forEach(item => {
        if (item.area_id === value) {
          this.form.delivery_address_province = item.name
        }
      })
      this.getCity(value)
    },
    handleCityChange() {
      this.cityList.forEach(item => {
        if (item.area_id === this.form.delivery_address_city_id) {
          this.form.delivery_address_city = item.name
        }
      })
      this.getDistrict(this.form.delivery_address_city_id)
    },
    handleDistrictChange() {
      this.districtList.forEach(item => {
        if (item.area_id === this.form.delivery_address_district_id) {
          this.form.delivery_address_district = item.name
        }
      })
    },
    getCity(province_id) {
      getArea({ parent_id: province_id }).then(response => {
        this.cityList = response.data
      })
    },
    getDistrict(city_id) {
      getArea({ parent_id: city_id }).then(response => {
        console.log(response)
        this.districtList = response.data
      })
    },
    handleDeliveryAddressChange() {
      this.form.delivery_address_province = this.delivery_address[0]
      this.form.delivery_address_city = this.delivery_address[1]
      this.form.delivery_address_district = this.delivery_address[2]
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getProductList()
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    handleAdd(row) {
      console.log(row)
      this.form.products.push(row)
    },
    handleDelete(row) {
      const index = this.form.products.indexOf(row)
      this.form.products.splice(index, 1)
    },
    addProduct() {
      this.dialogProductListTableVisible = true
      this.getProductList()
    },
    getProductList() {
      this.listLoading = true
      getProductList(this.listQuery).then(response => {
        this.productList = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
    },
    querySearchAsync(queryString, cb) {
      getCustomerList({ title: queryString }).then(response => {
        const customerList = response.data.data
        for (let i = 0; i < customerList.length; i++) {
          customerList[i].value = customerList[i].title
        }
        cb(customerList)
      })
    },
    handleSelect(item) {
      this.form.customer_id = item.id
      this.form.customer_title = item.title
    },
    handleInputChange(item) {
      console.log(item)
    },
    handleInputClear() {
      this.form.customer_id = 0
    },
    handleCustomerTypeChange() {
      if (this.customer_type === '未建档客户') {
        this.form.customer_id = 0
        this.form.customer_title = ''
      }
    },
    handleCustomerChange(value) {
    },
    remoteMethod(str) {
      this.getCustomerList({ title: str })
    },
    getCustomerList(query) {
      getCustomerList(query).then(response => {
        this.customerList = response.data.data
        this.customerList.forEach(item => {
          item.value = item.title
        })
      })
    }
  }
}
</script>
