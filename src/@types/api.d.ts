declare namespace ApiUser {
  interface LoginParam {
    username?: string
    password?: string
    authcode?: string
    remember?: string
  }
}

declare namespace ApiType {
  interface HomeCounts {
    total_amount: number
    total_order: number
    total_user: number
  }

  interface HomeRecordItem {
    id: number
    tx: string
    from: string
    to: string
    amount: number
    type: number
    created_at: number
  }

  interface UserListItem {
    id: number
    key: number
    app_name: string
    web_hook: string
    payment: string
    app_status: number
    payment_status: number
    created_at: number
  }

  interface OrderItem {
    id: number
    key: number
    from_address: string
    to_address: string
    tx_id: string
    product_id: string
    symbol: string
    amount: number
    handle_status: number
    handle_time: number
    created_at: number
  }

  interface AddressItem {
    id: number
    key: number
    symbol: string
    address: string
    use_tag: number
    created_at: number
  }

  interface LogsItem {
    id: number
    ip: string
    username: string
    type: number
    params: string
    created_at: number
  }
}
