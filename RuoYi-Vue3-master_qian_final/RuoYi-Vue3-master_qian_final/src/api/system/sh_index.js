import request from '@/utils/request'
// 查询数据详细
export function submitDataToBackend(formValues, tableData, fileList) {
  const formData = new FormData();
  formData.append('formValues', JSON.stringify(formValues));
  formData.append('tableData', JSON.stringify(tableData));
  fileList.forEach(file => formData.append('files', file.raw, file.name));

  return request({
    url: '/system/sh_submit/submit',
    method: 'post',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' }
  });
}

// 使用示例
export function approveToBackend(formValues, externalId) {
  // 创建一个对象并填充数据
  const payload = {
    formValues: formValues,
    externalId: externalId
  };

  // 发送请求
  return request({
    url: '/system/sh_submit/approve',
    method: 'post',
    data: payload, // 直接传递对象，axios 会自动将其序列化为 JSON
    // headers: { 'Content-Type': 'application/json' } // 指定 Content-Type 为 application/json
  });
}
// 使用示例
export function rejectToBackend(formValues, externalId) {
  // 创建一个对象并填充数据
  const payload = {
    formValues: formValues,
    externalId: externalId
  };

  // 发送请求
  return request({
    url: '/system/sh_submit/reject', // 假设这是你的后端 API URL
    method: 'post',
    data: payload, // 直接传递对象，axios 会自动将其序列化为 JSON
    // headers: { 'Content-Type': 'application/json' } // 指定 Content-Type 为 application/json
  });
}

export function fetchSH_submitTableData(data) {
  return request({
    url: '/system/sh_submit/fetchSH_submitTableData' + data,
    method: 'get'
  })
}
export function getapplicationInstructionsByMenuId(data) {
  return request({
    url: '/system/sh_submit/InstructionsByMenuId' + data,
    method: 'get'
  })
}
export function getPersonDepartmentName() {
  return request({
    url: '/system/sh_submit/PersonDepartmentName',
    method: 'get'
  })
}
export function getConfig(data) {
  return request({
    url: '/system/sh_config/Config' + data,
    method: 'get'
  })
}
export function listMenu() {
  return request({
    url: '/system/sh_index/list',
    method: 'get',
    // params: query
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
export function listConfig(query) {
  return request({
    url: '/system/config/list',
    method: 'get',
    params: query
  })
}



// 根据参数键名查询参数值
export function getConfigKey(configKey) {
  return request({
    url: '/system/config/configKey/' + configKey,
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
