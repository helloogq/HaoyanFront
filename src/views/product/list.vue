<template>
  <div class="app-container">
    <div class="page-block">
      <div class="filter-container" style="margin-bottom: 10px;">
        <el-input
          v-model="listQuery.title"
          placeholder="商品名称"
          style="width: 200px;margin-right: 5px;"
          class="filter-item"
          @keyup.enter.native="handleFilter"
        />
        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
          搜索
        </el-button>
        <el-button
          class="filter-item"
          style="margin-left: 10px;"
          type="primary"
          icon="el-icon-edit"
          @click="handleCreate"
        >
          添加
        </el-button>
      </div>
      <el-table :data="list" fit border highlight-current-row style="width: 100%">
        <el-table-column label="商品ID" width="100" prop="id" />
        <el-table-column label="商品名称" prop="title" />
        <el-table-column label="产品规格" prop="specification" />
        <el-table-column label="产品单位" prop="unit" />
        <el-table-column label="商品价格 (元)" prop="price" />
        <el-table-column label="商品重量 (Kg)" prop="weight" />
        <el-table-column label="商品库存" prop="stock" />
        <el-table-column label="创建时间" prop="created_at" />
        <el-table-column label="更新时间" prop="updated_at" />
        <el-table-column label="操作" width="180">
          <template slot-scope="{row}">
            <el-button type="primary" size="mini" style="margin-right: 5px;" @click="handleUpdate(row)">编辑</el-button>
            <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="handleDelete(row)">
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
    <el-dialog title="添加产品" :visible.sync="dialogCreateFormVisible">
      <el-form :model="form">
        <el-form-item label="产品名称" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off" />
        </el-form-item>
        <el-form-item label="产品规格" :label-width="formLabelWidth">
          <el-input v-model="form.specification" autocomplete="off" />
        </el-form-item>
        <el-form-item label="产品单位" :label-width="formLabelWidth">
          <el-input v-model="form.unit" autocomplete="off" />
        </el-form-item>
        <el-form-item label="产品价格 (元)" :label-width="formLabelWidth">
          <el-input v-model="form.price" type="number" autocomplete="off" />
        </el-form-item>
        <el-form-item label="产品重量 (kg)" type="number" :label-width="formLabelWidth">
          <el-input v-model="form.weight" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCreateFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveCreateForm">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑产品" :visible.sync="dialogUpdateFormVisible">
      <el-form :model="updateForm">
        <el-form-item label="产品名称" :label-width="formLabelWidth">
          <el-input v-model="updateForm.title" autocomplete="off" />
        </el-form-item>
        <el-form-item label="产品规格" :label-width="formLabelWidth">
          <el-input v-model="updateForm.specification" autocomplete="off" />
        </el-form-item>
        <el-form-item label="产品单位" :label-width="formLabelWidth">
          <el-input v-model="updateForm.unit" autocomplete="off" />
        </el-form-item>
        <el-form-item label="产品价格 (元)" :label-width="formLabelWidth">
          <el-input v-model="updateForm.price" type="number" autocomplete="off" />
        </el-form-item>
        <el-form-item label="产品重量 (kg)" type="number" :label-width="formLabelWidth">
          <el-input v-model="updateForm.weight" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdateFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveUpdateForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getProductList, createProduct, updateProduct, deleteProduct } from '@/api/product'

export default {
  data() {
    return {
      list: null,
      listLoading: false,
      downloadLoading: false,
      total: 0,
      listQuery: {
        title: '',
        page: 1,
        limit: 20
      },
      form: {
        title: '',
        price: '',
        weight: '',
        unit: 'kg',
        specification: ''
      },
      updateForm: {
        id: '',
        title: '',
        price: '',
        weight: '',
        unit: 'kg',
        specification: ''
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
      getProductList(this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleUpdate(row) {
      console.log(row)
      this.updateForm.id = row.id
      this.updateForm.title = row.title
      this.updateForm.price = row.price
      this.updateForm.weight = row.weight
      this.updateForm.unit = row.unit
      this.updateForm.specification = row.specification
      this.dialogUpdateFormVisible = true
    },
    saveUpdateForm() {
      console.log('saveUpdateForm')
      updateProduct(this.updateForm).then(response => {
        console.log(response)
        this.dialogUpdateFormVisible = false
        this.fetchData()
      })
    },
    handleDelete(row) {
      deleteProduct(row.id).then(response => {
        this.fetchData()
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.fetchData()
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.listQuery.limit = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      // 切换页码时，重新发送请求获取对应页码的数据
      this.listQuery.page = val
      this.fetchData()
    },
    handleDownload() {
      console.log('handleDownload')
    },
    handleCreate() {
      this.dialogCreateFormVisible = true
      this.form = {
        title: '',
        price: '',
        weight: ''
      }
    },
    saveCreateForm() {
      createProduct(this.form).then(response => {
        console.log(response)
        this.dialogCreateFormVisible = false
        this.fetchData()
      })
    }
  }
}
</script>
