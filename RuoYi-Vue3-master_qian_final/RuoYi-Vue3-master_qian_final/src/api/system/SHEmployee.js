import request from '@/utils/request'

// 查询角色列表
// export function listPerson(query) {
//   return request({
//     url: '/system/SHPerson/listPerson',
//     method: 'get',
//     params: query
//   })
// }

export function listTotalEmployee(query) {
  return request({
    url: '/system/SHPerson/listTotalEmployee',
    method: 'get',
    params: query
  })
}


export function listCurrentEmployee(query) {
  return request({
    url: '/system/SHPerson/listCurrentEmployee',
    method: 'get',
    params: query
  })
}
