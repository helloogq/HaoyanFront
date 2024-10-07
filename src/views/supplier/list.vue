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
          添加供应商
        </el-button>
      </div>
      <el-table :data="list" fit border highlight-current-row style="width: 100%">
        <el-table-column label="供应商ID" width="100" prop="id" />
        <el-table-column label="供应商名称" prop="title" />
        <el-table-column label="创建时间" prop="created_at" />
        <el-table-column label="更新时间" prop="updated_at" />
        <el-table-column label="操作" width="250">
          <template slot-scope="{row}">
            <el-button type="primary" size="mini" style="margin-right: 5px;" @click="handleDetail(row)">详情</el-button>
            <el-button type="primary" size="mini" style="margin-right: 5px;" @click="handleUpdate(row)">编辑</el-button>
            <el-popconfirm title="这是一段内容确定删除吗？" style="margin-right: 5px;" @onConfirm="handleDelete(row)">
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
      <el-dialog title="添加供应商" :visible.sync="dialogCreateFormVisible">
        <el-form :model="form">
          <el-form-item label="供应商名称" :label-width="formLabelWidth">
            <el-input v-model="form.title" autocomplete="off" />
          </el-form-item>
          <el-form-item label="供应商联系人" :label-width="formLabelWidth">
            <el-input v-model="form.contact" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item label="供应商联系号码" :label-width="formLabelWidth">
            <el-input v-model="form.contact_phone" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item label="供应商联系地址" :label-width="formLabelWidth">
            <el-input v-model="form.contact_address" type="text" autocomplete="off" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogCreateFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveCreateForm">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="编辑供应商" :visible.sync="dialogUpdateFormVisible">
        <el-form :model="updateForm">
          <el-form-item label="供应商名称" :label-width="formLabelWidth">
            <el-input v-model="updateForm.title" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item label="供应商联系人" :label-width="formLabelWidth">
            <el-input v-model="updateForm.contact" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item label="供应商联系号码" :label-width="formLabelWidth">
            <el-input v-model="updateForm.contact_phone" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item label="供应商联系地址" :label-width="formLabelWidth">
            <el-input v-model="updateForm.contact_address" type="text" autocomplete="off" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogUpdateFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveUpdateForm">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getCustomerList, createCustomer, updateCustomer, deleteCustomer } from '@/api/customer'

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
        limit: 20,
        is_supplier: 1
      },
      form: {
        title: '',
        contact: '',
        contact_phone: '',
        contact_address: '',
        is_supplier: 1
      },
      updateForm: {
        id: '',
        title: '',
        contact: '',
        contact_phone: '',
        contact_address: '',
        is_supplier: 1
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
      getCustomerList(this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleUpdate(row) {
      console.log(row)
      this.updateForm.id = row.id
      this.updateForm.title = row.title
      this.updateForm.contact = row.contact
      this.updateForm.contact_phone = row.contact_phone
      this.updateForm.contact_address = row.contact_address
      this.dialogUpdateFormVisible = true
    },
    saveUpdateForm() {
      console.log('saveUpdateForm')
      updateCustomer(this.updateForm).then(response => {
        console.log(response)
        this.dialogUpdateFormVisible = false
        this.fetchData()
      })
    },
    handleDelete(row) {
      deleteCustomer(row.id).then(response => {
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
      this.dialogCreateFormVisible = true
      this.form = {
        title: ''
      }
    },
    saveCreateForm() {
      createCustomer(this.form).then(response => {
        this.dialogCreateFormVisible = false
        this.fetchData()
      })
    }
  }
}
</script>
