import PageTitle from '@/components/PageTitle'
import { Avatar, Button, Card, Segmented, Spin } from 'antd'
import MyDatePicker from '@/components/date-picker'
import zh_CN from 'antd/es/date-picker/locale/zh_CN'
import { UserOutlined } from '@ant-design/icons'
import Empty from '@/components/empty'

interface Props extends WithClassName {}

const rangeDays = [
  { label: '今日', value: [startOfToday(), startOfToday()] },
  { label: '昨日', value: [subDays(startOfToday(), 1), startOfToday()] },
  { label: '本周', value: [subDays(startOfToday(), 7), startOfToday()] },
  { label: '本月', value: [subDays(startOfToday(), 30), startOfToday()] },
]
const HomeView = memo((props: Props) => {
  const { className } = props
  const [counts, setCounts] = useState<ApiType.HomeCounts>()
  const [recordList, setRecordList] = useState<ApiType.HomeRecordItem[]>([])
  const [selectDay, setSelectDay] = useState(0)

  const { run, loading } = useRequest(data => getCounts(data), {
    manual: true,
    onSuccess(res) {
      if (res?.success) {
        setCounts(res?.data)
      }
    },
  })

  const { run: runRecords, loading: loading2 } = useRequest((param: { type: number }) => getRecords(param), {
    manual: true,
    onSuccess(res) {
      if (res?.success) {
        setRecordList(res?.rows ?? [])
      }
    },
  })

  const handleFilterDate = (day: number) => {
    const date = rangeDays.find((_x, i) => i === day)

    if (date) {
      setSelectDay(day)
      const [start, end] = date.value
      run({ start, end })
    }
  }

  useEffect(() => {
    handleFilterDate(0)
    runRecords({ type: 0 })
  }, [])

  return (
    <div className={className}>
      <div>
        <PageTitle />
        <div className="flex justify-between mb-4">
          <h3>数据统计</h3>
          <div className="flex space-x-4">
            <Segmented
              options={rangeDays.map(x => x.label)}
              onChange={val => {
                rangeDays.forEach((x, index) => {
                  if (x.label === val) {
                    handleFilterDate(index)
                  }
                })
              }}
            />
            <MyDatePicker.RangePicker
              locale={zh_CN as any}
              allowClear={false}
              inputReadOnly={true}
              defaultValue={rangeDays[selectDay].value as any}
              disabledDate={current => current && current > startOfToday()}
              onChange={e => run({ start: e?.[0], end: e?.[1] })}
            />
          </div>
        </div>

        <div className="flex space-x-8">
          <Card className="flex flex-1">
            <h3 className="title text-gray-500 mb-2">交易金额</h3>
            <h1>
              {!loading && '$ '}
              {loading ? <Spin /> : counts?.total_amount ?? 0}
            </h1>
          </Card>
          <Card className="flex flex-1">
            <h3 className="title text-gray-500 mb-2">订单数量</h3>
            <h1>{loading ? <Spin /> : counts?.total_order ?? 0}</h1>
          </Card>
          <Card className="flex flex-1">
            <h3 className="title text-gray-500 mb-2">商户数量</h3>
            <h1>{loading ? <Spin /> : counts?.total_user ?? 0}</h1>
          </Card>
        </div>
      </div>

      <div className="mt-12">
        <div className="flex items-center justify-between">
          <h3>最近记录</h3>
          <Segmented
            options={['全部', '转入', '转出']}
            onChange={val => {
              ;['全部', '转入', '转出'].forEach((x, index) => {
                if (x === val) {
                  runRecords({ type: index })
                }
              })
            }}
          />
        </div>
        <Card className="mt-4">
          {loading2 ? (
            <Spin />
          ) : recordList.length === 0 ? (
            <Empty />
          ) : (
            recordList.map((item, index) => (
              <div className="flex r-item hover:bg-gray-50" key={index}>
                <div className="flex flex-1 items-center space-x-4">
                  <Avatar icon={<UserOutlined />} />
                  <div className="flex flex-col">
                    <h4>{item.tx}</h4>
                    <div className="text-gray-400">{friendlyTime(item.created_at)}</div>
                  </div>
                </div>
                <div className="flex flex-col flex-1 ml-14">
                  <div>
                    从 <span className="text-blue-500">{item.from}</span>
                  </div>
                  <div>
                    到 <span className="text-blue-500">{item.to}</span>
                  </div>
                </div>
                <div className="flex justify-end items-center flex-1">
                  <Button.Group>
                    {item?.type === 1 ? (
                      <Button type="primary" danger>
                        转入
                      </Button>
                    ) : (
                      <Button type="primary">转出</Button>
                    )}
                    <Button>{item.amount} Eth</Button>
                  </Button.Group>
                </div>
              </div>
            ))
          )}
        </Card>
      </div>
    </div>
  )
})

const Home = styled(HomeView)`
  .r-item {
    padding: 16px 8px;
    border-bottom: 1px solid rgba(5, 5, 5, 0.06);
    &:last-of-type {
      border-bottom: 0;
    }
  }
`

Home.displayName = 'Home'
HomeView.displayName = 'HomeView'

export default Home
