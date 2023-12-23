import PageTitle from '@/components/PageTitle'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Divider, Radio, Table, Tag } from 'antd'
import Search from 'antd/es/input/Search'
import { ColumnsType } from 'antd/es/table'

interface Props extends WithClassName {}

const AddressView = memo((props: Props) => {
  const { className } = props
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [searchPage, setSearchPage] = useState(1)
  const [status, setStatus] = useState(0)
  const [dataList, setDataList] = useState<ApiType.AddressItem[]>([])

  const columns: ColumnsType<ApiType.AddressItem> = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '地址',
      dataIndex: 'address',
    },
    {
      title: '币种',
      dataIndex: 'symbol',
    },
    {
      title: '状态',
      dataIndex: 'use_tag',
      render: (_, record) => {
        const text = options.find(x => x.value === record.use_tag)
        return <Tag color="orange">{text?.label}</Tag>
      },
    },
    {
      title: '时间',
      dataIndex: 'created_at',
    },
    {
      title: '操作',
      dataIndex: 'actions',
      render: (_, record) => <a onClick={() => {}}>分配</a>,
    },
  ]
  const options = [
    { label: '全部', value: 0 },
    { label: '已使用', value: 1 },
    { label: '未使用', value: 2 },
  ]

  const { run: runList, loading: loading1 } = useRequest(param => getAddressList(param), {
    refreshDeps: [page, status],
    manual: true,
    onSuccess(res) {
      setDataList(res?.rows ?? [])
      setTotal(res?.total ?? 0)
    },
  })

  const loading = loading1

  useEffect(() => {
    runList({ page, status })
  }, [page, status])

  return (
    <div className={className}>
      <div>
        <PageTitle total={total} />
        <div className="flex justify-between">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              // setEdit(undefined)
              // setDrawer(true)
            }}
          >
            创建地址
          </Button>
          <div className="flex space-x-8">
            <Radio.Group
              options={options}
              onChange={e => {
                setStatus(Number(e.target.value))
                // runUserList({ page, status: Number(e.target.value) })
              }}
              defaultValue={0}
              optionType="button"
              className="flex-none"
            />

            <Search
              className={className}
              placeholder="搜索内容"
              onSearch={value => {
                const search = value.trim()
                if (search) {
                  // runSearch({ search, status, page: 1, pageSize: 999 })
                } else {
                  // runUserList({ page: 1, status })
                }
              }}
              allowClear
              enterButton
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

const Address = styled(AddressView)``

Address.displayName = 'Address'
AddressView.displayName = 'AddressView'

export default Address
