import PageTitle from '@/components/PageTitle'
import { Menu } from 'antd'
import System from './System'
import Account from './Account'

interface Props extends WithClassName {}

const menuData = [
  { key: 'system', label: '系统参数' },
  { key: 'account', label: '账号设置' },
  // { key: 'symbol', label: '币种设置' },
  // { key: 'task', label: '任务设置' },
]
const SettingView = memo((props: Props) => {
  const { className } = props
  const [menu, setMenu] = useState(['system'])
  return (
    <div className={className}>
      <PageTitle />

      <div className="flex bg-white py-4">
        <div>
          <Menu
            className="menu"
            mode="inline"
            defaultSelectedKeys={menu}
            selectedKeys={menu}
            style={{ width: '200px', height: '100%', borderRight: 0 }}
            items={menuData}
            onSelect={v => {
              const _menu = menuData.find(x => x.key === v.key)
              if (_menu?.key) {
                setMenu([_menu.key])
              }
            }}
          />
        </div>
        <div className="flex-1 p-4">
          {menu[0] === 'system' && <System />}
          {menu[0] === 'account' && <Account />}
        </div>
      </div>
    </div>
  )
})

const Setting = styled(SettingView)`
  .ant-menu {
    border-right: 1px solid #ececec !important;
  }
  .ant-menu-item {
    width: 100%;
    border-radius: 0;
    position: relative;
    margin: 0;
    &.ant-menu-item-selected {
      .ant-menu-title-content {
        &:after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          border-right: 3px solid #1890ff;
        }
      }
    }
  }
`

Setting.displayName = 'Setting'
SettingView.displayName = 'SettingView'

export default Setting
