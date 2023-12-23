export const getLogsList = (data: { type: number; page: number }) => {
  return makeRequest<ApiType.LogsItem, 'list'>({ method: 'post', url: '/logs/list', data })
}
