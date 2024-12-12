import request from '@/utils/request'

// 查询角色列表
// export function listPerson(query) {
//   return request({
//     url: '/system/SHPerson/listPerson',
//     method: 'get',
//     params: query
//   })
// }

export function listTask(query) {
  return request({
    url: '/system/SHMyApplication/listTask',
    method: 'get',
    params: query
  })
}


export function revokeTask(query) {
  return request({
    url: '/system/SHMyApplication/revokeTask',
    method: 'get',
    params: query
  })
}
