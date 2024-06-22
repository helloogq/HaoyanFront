import request from '@/utils/request'

export function getOrderList(query) {
  return request({
    url: 'api/admin/order',
    method: 'get',
    params: query
  })
}

// 获取订单详情
export function getOrderDetail(id) {
  return request({
    url: 'api/admin/order/' + id,
    method: 'get'
  })
}

export function createOrder(data) {
  return request({
    url: 'api/admin/order',
    method: 'post',
    data
  })
}

export function updateOrder(data) {
  return request({
    url: 'api/admin/order/' + data.id,
    method: 'put',
    data
  })
}

export function deleteOrder(id) {
  return request({
    url: 'api/admin/order/' + id,
    method: 'delete'
  })
}
