import { BellOutlined, ExclamationCircleFilled, TranslationOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Badge, Dropdown, Layout, Modal } from 'antd'
interface Props extends WithClassName {}

const HeaderView = memo((props: Props) => {
  const { className } = props
  const store = useUserStore()
  const navigate = useNavigate()

  const { confirm } = Modal
  const items = [
    {
      key: '1',
      label: '个人设置',
    },
    {
      type: 'divider',
    },
    {
      key: '3',
      label: '注销登录',
      onClick: () =>
        confirm({
          title: '确定退出登录吗?',
          icon: <ExclamationCircleFilled />,
          onOk() {
            store.setLogout()
            navigate('/login')
          },
          onCancel() {},
        }),
    },
  ] as any

  return (
    <Layout.Header className={className}>
      <div className="logo">贝壳支付系统</div>
      <div className="topbar flex justify-end space-x-4">
        <div className="item">
          <TranslationOutlined />
        </div>
        <div className="item">
          <Badge size="small" count={5}>
            <BellOutlined style={{ color: '#fff' }} />
          </Badge>
        </div>

        <div className="item">
          <Dropdown menu={{ items }} placement="bottom">
            <div className="flex items-center space-x-1">
              <Avatar icon={<UserOutlined />} size="small" style={{ backgroundColor: '#87d068' }} />
              <span>admin</span>
            </div>
          </Dropdown>
        </div>
      </div>
    </Layout.Header>
  )
})

const Header = styled(HeaderView)`
  .item {
    cursor: pointer;
    padding: 0 12px;
    &:hover {
      background: #252a3d;
    }
  }
`

Header.displayName = 'Header'
HeaderView.displayName = 'HeaderView'

export default Header
