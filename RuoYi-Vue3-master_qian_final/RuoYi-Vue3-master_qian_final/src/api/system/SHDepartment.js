import request from '@/utils/request'

// 查询角色列表
export function listTotalDepartment(query) {
  return request({
    url: '/system/SHDepartment/listTotalDepartment',
    method: 'get',
    params: query
  })
}

export function listTotalEmployee(query) {
  return request({
    url: '/system/SHDepartment/listTotalEmployee',
    method: 'get',
    params: query
  })
}

export function listCurrentEmployee(query) {
  return request({
    url: '/system/SHDepartment/listCurrentEmployee',
    method: 'get',
    params: query
  })
}
