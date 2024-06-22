import request from '@/utils/request'

export function getProductList(query) {
  return request({
    url: 'api/admin/product',
    method: 'get',
    params: query
  })
}

export function createProduct(data) {
  return request({
    url: 'api/admin/product',
    method: 'post',
    data
  })
}

export function updateProduct(data) {
  return request({
    url: 'api/admin/product/' + data.id,
    method: 'put',
    data
  })
}

export function deleteProduct(id) {
  return request({
    url: 'api/admin/product/' + id,
    method: 'delete'
  })
}
