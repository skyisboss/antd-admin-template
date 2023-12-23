import { Button, Form, Input } from 'antd'

interface Props extends WithClassName {}

const AccountView = memo((props: Props) => {
  const { className } = props
  const [form] = Form.useForm()
  const formItems = [
    {
      label: '输入旧密码',
      name: 'min_available_address',
      rule: [{ required: true, message: '请输入旧密码' }],
    },
    {
      label: '输入新密码',
      name: 'min_available_address',
      rule: [{ required: true, message: '请输入新密码' }],
    },
    {
      label: '输入安全码',
      name: 'min_available_address',
      rule: [{ required: true, message: '请输入输入安全码' }],
    },
  ]
  return (
    <div className={className} style={{ width: '800px' }}>
      <Form form={form} layout="vertical" labelAlign="left" size="large" wrapperCol={{ span: 24 }}>
        {formItems.map((x, i) => (
          <Form.Item key={i} label={x.label} name={x.name} rules={x.rule}>
            <Input placeholder={x.label} />
          </Form.Item>
        ))}

        <Form.Item wrapperCol={{ span: 24, offset: 10 }}>
          <Button type="primary">保存配置</Button>
        </Form.Item>
      </Form>
    </div>
  )
})

const Account = styled(AccountView)``

Account.displayName = 'Account'
AccountView.displayName = 'AccountView'

export default Account
