<template>
  <div class="app-container">
    <div class="page-block">
      <div class="filter-container" style="margin-bottom: 10px">
        <el-input
          v-model="listQuery.customer_title"
          placeholder="客户名称"
          style="width: 200px"
          class="filter-item"
          @keyup.enter.native="handleFilter"
        />
        <el-button
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          @click="handleFilter"
        >
          搜索
        </el-button>
        <el-button
          class="filter-item"
          style="margin-left: 10px"
          type="primary"
          icon="el-icon-edit"
          @click="handleCreate"
        >
          创建订单
        </el-button>
      </div>
      <el-table
        :data="list"
        fit
        border
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column label="客户ID" width="100" prop="id" />
        <el-table-column label="客户名称" prop="customer_title" />
        <el-table-column label="总价" prop="total_price" />
        <el-table-column label="收货人" prop="delivery_address_name" />
        <el-table-column label="收货人电话" prop="delivery_address_phone" />
        <el-table-column label="收货人地址">
          <template slot-scope="{ row }">
            <span>{{ row.delivery_address_province }}</span>
            <span>{{ row.delivery_address_city }}</span>
            <span>{{ row.delivery_address_district }}</span>
            <span>{{ row.delivery_address_detail }}</span>
          </template>
        </el-table-column>
        <el-table-column label="订单状态" prop="status" />
        <el-table-column label="创建时间" prop="created_at" />
        <el-table-column label="更新时间" prop="updated_at" />
        <el-table-column label="操作" width="290">
          <template slot-scope="{ row }">
            <el-link type="primary" target="_blank" style="margin-right: 10px;" :href="'/#/invoice?id=' + row.id">打印送货单</el-link>
            <el-button
              type="primary"
              size="mini"
              @click="handleDetail(row)"
            >详情
            </el-button>
            <el-button
              type="primary"
              size="mini"
              style="margin-right: 5px"
              @click="handleEdit(row)"
            >编辑</el-button>
            <el-popconfirm
              title="这是一段内容确定删除吗？"
              @onConfirm="handleDelete(row)"
            >
              <el-button slot="reference" type="danger" size="mini">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div class="table-pagination">
        <el-pagination
          :total="total"
          :page-size="listQuery.limit"
          :current-page="listQuery.page"
          :page-count="listQuery.pageCount"
          :page-sizes="[10, 20, 30, 40]"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { deleteOrder, getOrderList } from '@/api/order'

export default {
  data() {
    return {
      list: null,
      listLoading: false,
      downloadLoading: false,
      total: 0,
      listQuery: {
        customer_title: '',
        page: 1,
        limit: 20
      },
      updateForm: {
        id: '',
        title: ''
      },
      dialogCreateFormVisible: false,
      dialogUpdateFormVisible: false,
      formLabelWidth: '120px'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getOrderList(this.listQuery).then((response) => {
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleEdit(row) {
      console.log(row)
      this.$router.push({ path: '/order/edit', query: { id: row.id }})
    },
    handleDelete(row) {
      deleteOrder(row.id).then((response) => {
        this.fetchData()
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.fetchData()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.fetchData()
    },
    handleDownload() {
      console.log('handleDownload')
    },
    handleCreate() {
      console.log('handleCreate')
      this.$router.push({ path: '/order/create' })
    },
    handleClear() {
      console.log('handleClear')
      this.listQuery.customer_title = ''
      this.fetchData()
    },
    handleDetail(row) {
      console.log(row)
      this.$router.push({ path: '/order/detail', query: { id: row.id }})
    }
  }
}
</script>
