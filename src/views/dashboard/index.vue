<template>
  <div class="dashboard-container">
    <h1>欢迎来到后台管理系统</h1>
    <el-row>
      <el-col :span="8">
        <el-card>
          <div slot="header" class="clearfix">
            <span>系统信息</span>
          </div>
          <div>系统版本: 1.0.0</div>
          <div>当前时间: {{ new Date().toLocaleString() }}</div>
          <div>用户名: {{ $store.state.user.name }}</div>
          <div>用户角色: {{ $store.state.user.roles }}</div>
          <div>用户权限: {{ $store.state.user.permissions }}</div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div slot="header" class="clearfix">
            <span>商品信息</span>
          </div>
          <div>系统版本: 1.0.0</div>
          <div>当前时间: {{ new Date().toLocaleString() }}</div>
          <div>用户名: {{ $store.state.user.name }}</div>
          <div>用户角色: {{ $store.state.user.roles }}</div>
          <div>用户权限: {{ $store.state.user.permissions }}</div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div slot="header" class="clearfix">
            <span>入库信息</span>
          </div>
          <div>系统版本: 1.0.0</div>
          <div>当前时间: {{ new Date().toLocaleString() }}</div>
          <div>用户名: {{ $store.state.user.name }}</div>
          <div>用户角色: {{ $store.state.user.roles }}</div>
          <div>用户权限: {{ $store.state.user.permissions }}</div>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
