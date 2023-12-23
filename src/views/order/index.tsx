import PageTitle from '@/components/PageTitle'
import { Divider, Radio, Table, Tag } from 'antd'
import Search from 'antd/es/input/Search'
import { ColumnsType } from 'antd/es/table'

interface Props extends WithClassName {}

const OrderView = memo((props: Props) => {
  const { className } = props
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [searchPage, setSearchPage] = useState(1)
  const [status, setStatus] = useState(0)
  const [dataList, setDataList] = useState<ApiType.OrderItem[]>([])

  const columns: ColumnsType<ApiType.OrderItem> = [
    {
      title: '订单',
      dataIndex: 'tx_id',
      render: (_, record) => {
        return (
          <div className="flex flex-col flex-auto">
            <div>{record.tx_id}</div>
            <div>{friendlyTime(record.created_at)}</div>
          </div>
        )
      },
    },
    {
      title: '交易',
      dataIndex: 'tx_info',
      render: (_, record) => {
        return (
          <div className="flex flex-col flex-auto">
            <div>从: {record.from_address}</div>
            <div>到: {record.to_address}</div>
          </div>
        )
      },
    },
    {
      title: '金额',
      dataIndex: 'amount',
      render: (_, record) => {
        return (
          <div className="flex flex-col flex-auto">
            <div>{record.symbol}</div>
            <div>{record.amount}</div>
          </div>
        )
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (_, record) => {
        return (
          <div className="flex flex-col flex-auto">
            <div>
              <Tag color="orange">处理中</Tag>
            </div>
            <div>1970/52/07 17:06</div>
          </div>
        )
      },
    },
    {
      title: '操作',
      dataIndex: 'actions',
      render: (_, record) => <a onClick={() => {}}>编辑</a>,
    },
  ]

  const { run: runList, loading: loading1 } = useRequest(param => getOrderList(param), {
    refreshDeps: [page, status],
    manual: true,
    onSuccess(res) {
      setDataList(res?.rows ?? [])
      setTotal(res?.total ?? 0)
    },
  })

  const { run: runSearch, loading: loading2 } = useRequest(param => searchOrderList(param), {
    manual: true,
    onSuccess(res) {
      setDataList(res?.rows ?? [])
      setTotal(res?.total ?? 0)
    },
  })

  const loading = loading1 || loading2

  useEffect(() => {
    runList({ page, status })
  }, [page, status])

  const options = [
    { label: '全部', value: 0 },
    { label: '待处理', value: 1 },
    { label: '处理中', value: 2 },
    { label: '已完成', value: 3 },
  ]

  return (
    <div className={className}>
      <div>
        <PageTitle total={total} />
        <div className="flex justify-between">
          <Radio.Group
            disabled={loading}
            options={options}
            onChange={e => {
              setStatus(Number(e.target.value))
            }}
            defaultValue={0}
            optionType="button"
            className="flex-none"
          />

          <div>
            <Search
              className={className}
              placeholder="搜索内容"
              onSearch={value => {
                const search = value.trim()
                if (search) {
                  runSearch({ search, status, page: searchPage })
                } else {
                  setSearchPage(1)
                  runList({ page: 1, status })
                }
              }}
              allowClear
              enterButton
              disabled={loading}
            />
          </div>
        </div>
      </div>
      <Divider />

      <Table
        loading={loading}
        columns={columns}
        dataSource={dataList}
        pagination={{
          total: total ?? 0,
          defaultCurrent: page,
          onChange(page) {
            setPage(page)
          },
        }}
      />
    </div>
  )
})

const Order = styled(OrderView)``

Order.displayName = 'Order'
OrderView.displayName = 'OrderView'

export default Order
