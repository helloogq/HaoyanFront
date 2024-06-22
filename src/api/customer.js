import request from '@/utils/request'

export function getCustomerList(query) {
  return request({
    url: 'api/admin/customer',
    method: 'get',
    params: query
  })
}

export function createCustomer(data) {
  return request({
    url: 'api/admin/customer',
    method: 'post',
    data
  })
}

export function updateCustomer(data) {
  return request({
    url: 'api/admin/customer/' + data.id,
    method: 'put',
    data
  })
}

export function deleteCustomer(id) {
  return request({
    url: 'api/admin/customer/' + id,
    method: 'delete'
  })
}
