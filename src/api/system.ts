export const loginAdmin = (data: ApiUser.LoginParam) => {
  return makeRequest({ method: 'post', url: '/login', data })
}
