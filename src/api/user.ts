// 商户列表
export const getUserList = (param: { page: number; pageSize?: number; status: number }) => {
  const data = { ...param, ...{ pageSize: param?.pageSize ?? 20 } }
  return makeRequest<ApiType.UserListItem, 'list'>({ method: 'post', url: '/user/list', data })
}

// 搜索商户
export const searchUserList = (data: { search: string; page: number; pageSize: number; status: number }) => {
  return makeRequest<ApiType.UserListItem, 'list'>({ method: 'post', url: '/user/search', data })
}

export const addUser = (data: any) => {
  return makeRequest({ method: 'post', url: '/user/add', data })
}

export const editUser = (data: any) => {
  return makeRequest({ method: 'post', url: '/user/edit', data })
}
