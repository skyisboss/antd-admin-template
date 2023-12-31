import Mock from 'mockjs'

Mock.setup({
  timeout: 2500, // 设置延迟响应，模拟向后端请求数据
})

Mock.mock('/admin/api/login', 'post', opt => {
  const body = JSON.parse(opt.body)
  const res = {
    err: 0,
    msg: 'success',
    success: true,
    data: {},
  }
  if (body.username !== 'admin' || body.password !== '123456') {
    res.err = 1
    res.msg = '账号或密码不正确'
    res.success = false
    return res
  }
  if (body.authcode !== '1234') {
    res.err = 1
    res.msg = '验证码不正确'
    res.success = false
    return res
  }
  res.err = 0
  res.data = {
    token: 'user-token',
    username: 'admin',
  }
  return res
})

/************首页 */
Mock.mock('/admin/api/home/count', 'post', opt => {
  const res = {
    err: 0,
    msg: 'success',
    success: true,
    data: {
      total_amount: 100,
      total_order: 100,
      total_user: 100,
    },
  }
  return res
})
Mock.mock('/admin/api/home/record', 'post', opt => {
  const list = Mock.mock({
    'list|5': [
      {
        'id|+1': 1,
        tx: '@string("lower", 12)',
        from: '@string("lower", 32)',
        to: '@string("lower", 32)',
        amount: 100,
        type: '@pick([0,1])',
        created_at: Date.now(),
      },
    ],
  })
  const res = {
    err: 0,
    msg: 'success',
    success: true,
    rows: list.list,
  }
  return res
})

/************商户 */
Mock.mock(/\/admin\/api\/user\/[list|search]+$/, 'post', opt => {
  console.log('opt', opt)
  const list = Mock.mock({
    'list|10': [
      {
        'id|+1': 1,
        'key|+1': 1,
        app_name: '@string("lower", 12)',
        web_hook: '@url("https")',
        payment: '@name()',
        app_status: '@pick([0,1])',
        payment_status: '@pick([0,1])',
        created_at: Date.now(),
      },
    ],
  })
  const res = {
    err: 0,
    msg: 'success',
    data: {},
    success: true,
    rows: list.list,
    total: 100,
  }
  return res
})

Mock.mock(/\/admin\/api\/user\/edit|\/add+$/, 'post', opt => {
  const res = {
    err: 0,
    msg: 'success',
    success: true,
    data: {},
  }
  return res
})

// 订单
Mock.mock(/\/admin\/api\/order\/[list|search]+$/, 'post', opt => {
  console.log('opt', opt)
  const list = Mock.mock({
    'list|10': [
      {
        'id|+1': 1,
        'key|+1': 1,
        from_address: '@string("lower", 12)',
        to_address: '@string("lower", 12)',
        tx_id: '@string("lower", 12)',
        product_id: '@string("lower", 12)',
        amount: 1000,
        symbol: 'ETH',
        handle_status: '@pick([0,1])',
        handle_time: Date.now(),
        created_at: Date.now(),
      },
    ],
  })
  return {
    err: 0,
    msg: 'success',
    data: {},
    success: true,
    rows: list.list,
    total: 100,
  }
})

// 地址
Mock.mock(/\/admin\/api\/address\/[list|search]+$/, 'post', opt => {
  console.log('opt', opt)

  const list = Mock.mock({
    'list|10': [
      {
        'id|+1': 1,
        'key|+1': 1,
        address: '@string("lower", 12)',
        symbol: 'ETH',
        use_tag: '@pick([0,1])',
        created_at: Date.now(),
      },
    ],
  })
  return {
    err: 0,
    msg: 'success',
    data: {},
    success: true,
    rows: list.list,
    total: 100,
  }
})

// logs
Mock.mock('/admin/api/logs/list', 'post', opt => {
  console.log('opt', opt)
  const list = Mock.mock({
    'list|10': [
      {
        'id|+1': 1,
        ip: '@ip',
        username: '@string("lower", 6)',
        type: '@pick([0,1])',
        params: '@sentence(5)',
        created_at: Date.now(),
      },
    ],
  })
  const res = {
    err: 0,
    msg: 'success',
    data: {},
    success: true,
    rows: list.list,
    total: 100,
  }
  return res
})
