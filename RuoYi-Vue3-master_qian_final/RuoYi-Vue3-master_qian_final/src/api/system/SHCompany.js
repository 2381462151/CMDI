import request from '@/utils/request'

// 查询角色列表
export function listTotalDepartment(query) {
  return request({
    url: '/system/SHCompany/listTotalDepartment',
    method: 'get',
    params: query
  })
}

export function listTotalEmployee(query) {
  return request({
    url: '/system/SHCompany/listTotalEmployee',
    method: 'get',
    params: query
  })
}

export function listCurrentEmployee(query) {
  return request({
    url: '/system/SHCompany/listCurrentEmployee',
    method: 'get',
    params: query
  })
}
