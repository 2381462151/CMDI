import request from '@/utils/request'
// 查询数据详细
export function getConfig(data) {
  return request({
    url: '/system/sh_config/Config' + data,
    method: 'get'
  })
}
export function listMenu(query) {
  return request({
    url: '/system/sh_config/list',
    method: 'get',
    params: query
  })
}
// 修改配置
export function updateConfig(data) {
  return request({
    url: '/system/sh_config/Config',
    method: 'put',
    data: data
  })
}

// 修改配置
export function updatesingleEditMenu(data) {
  return request({
    url: '/system/singleEditMenu',
    method: 'put',
    data: data
  })
}
// 查询参数列表
// export function listConfig(query) {
//   return request({
//     url: '/system/config/list',
//     method: 'get',
//     params: query
//   })
// }
// export function delConfig(configId) {
//   return request({
//     url: '/system/config/' + configId,
//     method: 'delete'
//   })
// }
export function deleteHints(idsToDelete) {
  return request({
    url: '/system/config/' + idsToDelete,
    method: 'delete'
  })
}

// 根据参数键名查询参数值
export function getConfigKey(configKey) {
  return request({
    url: '/system/config/configKey/' + configKey,
    method: 'get'
  })
}
export function listHints() {
  return request({
    url: '/system/config/listHints',
    method: 'get'
  })
}
export function listHintFile() {
  return request({
    url: '/system/config/listHintFile',
    method: 'get'
  })
}
// 新增参数配置
export function addConfig(data) {
  return request({
    url: '/system/config',
    method: 'post',
    data: data
  })
}
export function HintfileUpload(data) {
  return request({
    url: '/system/HintfileUpload',
    method: 'post',
    data: data
  })
}

export function addHint(data) {
  return request({
    url: '/system/Hint',
    method: 'post',
    data: data
  })
}

// 删除参数配置
export function delConfig(configId) {
  return request({
    url: '/system/config/' + configId,
    method: 'delete'
  })
}

// 刷新参数缓存
export function refreshCache() {
  return request({
    url: '/system/config/refreshCache',
    method: 'delete'
  })
}
