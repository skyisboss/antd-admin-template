import PageTitle from '@/components/PageTitle'
import { DownloadOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Divider, Drawer, Radio, Table, Tag } from 'antd'
import Search from 'antd/es/input/Search'
import { ColumnsType } from 'antd/es/table'
import EditForm from './EditForm'

interface Props extends WithClassName {}

const getColumns = (onClick: (v: ApiType.UserListItem) => void) => {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '商户名称',
      dataIndex: 'app_name',
    },
    {
      title: '回调地址',
      dataIndex: 'web_hook',
    },
    {
      title: '结算方式',
      dataIndex: 'payment',
    },
    {
      title: '添加时间',
      dataIndex: 'created_at',
      render: (_, record) => format(Number(record.created_at), 'yyyy/mm/dd HH:ii'),
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (_, record) => (record.app_status === 0 ? <Tag color="orange">禁用</Tag> : <Tag color="green">启用</Tag>),
    },
    {
      title: '操作',
      dataIndex: 'actions',
      render: (_, record) => <a onClick={() => onClick(record)}>编辑</a>,
    },
  ] as ColumnsType<ApiType.UserListItem>
}

const UserView = memo((props: Props) => {
  const { className } = props
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [status, setStatus] = useState(0)
  const [dataList, setDataList] = useState<ApiType.UserListItem[]>([])
  const [edit, setEdit] = useState<ApiType.UserListItem>()
  const [drawer, setDrawer] = useState(false)
  const columns = useMemo(
    () =>
      getColumns(v => {
        setEdit(v)
        setDrawer(true)
      }),
    [],
  )

  const { run: runUserList, loading } = useRequest(param => getUserList(param), {
    refreshDeps: [page, status],
    manual: true,
    onSuccess(res) {
      setDataList(res?.rows ?? [])
      setTotal(res?.total ?? 0)
    },
  })

  const { run: runSearch, loading: loading1 } = useRequest(param => searchUserList(param), {
    manual: true,
    onSuccess(res) {
      setDataList(res?.rows ?? [])
      setTotal(res?.total ?? 0)
    },
  })

  useEffect(() => {
    runUserList({ page, status })
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
              setEdit(undefined)
              setDrawer(true)
            }}
          >
            添加商户
          </Button>
          <div className="flex space-x-8">
            <Radio.Group
              options={[
                { label: '全部', value: '0' },
                { label: '已启用', value: '1' },
                { label: '已禁用', value: '2' },
              ]}
              onChange={e => {
                setStatus(Number(e.target.value))
                runUserList({ page, status: Number(e.target.value) })
              }}
              defaultValue="0"
              optionType="button"
              className="flex-none"
            />

            <Search
              className={className}
              placeholder="搜索内容"
              onSearch={value => {
                const search = value.trim()
                if (search) {
                  runSearch({ search, status, page: 1, pageSize: 999 })
                } else {
                  runUserList({ page: 1, status })
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
        loading={loading || loading1}
        columns={columns}
        dataSource={dataList}
        pagination={{
          total: total,
          defaultCurrent: page,
          onChange(page) {
            setPage(page)
          },
        }}
      />

      <Drawer
        title={edit?.id ? '编辑商户' : '添加商户'}
        placement={edit?.id ? 'right' : 'left'}
        closable={false}
        maskClosable={false}
        onClose={() => setEdit(undefined)}
        open={drawer}
        destroyOnClose={true}
        extra={<Button onClick={() => setDrawer(false)}>关闭</Button>}
      >
        <EditForm
          data={edit}
          close={() => {
            setDrawer(false)
          }}
        />
      </Drawer>
    </div>
  )
})

const User = styled(UserView)``

User.displayName = 'User'
UserView.displayName = 'UserView'

export default User
