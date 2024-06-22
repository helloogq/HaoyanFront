import request from '@/utils/request'

// 获取省市区
export function getArea(params) {
  return request({
    url: '/api/admin/area',
    method: 'get',
    params
  })
}
