import { Button, Checkbox, Collapse, Divider, Input, Radio, Switch } from 'antd'
import Form from 'antd/es/form'

interface Props extends WithClassName {}
interface FormItemType {
  label: string
  name: string
  rule: any[]
}

const SystemView = memo((props: Props) => {
  const { className } = props
  const [form] = Form.useForm()

  const formItems = [
    {
      label: 'USDT-ERC20 以太坊网络',
      switch: true,
      key: 'erc20',
      inputs: [
        {
          label: '最小确认区块',
          name: 'min_confirm',
          rule: [{ required: true, type: 'number', message: '输入最小确认区块' }],
        },
        {
          label: '最小可用地址',
          name: 'min_address',
          rule: [{ required: true, type: 'number', message: '输入最小可用地址' }],
        },
        {
          label: '循环检测时间',
          name: 'interval_time',
          rule: [{ required: true, type: 'number', message: '输入循环检测时间' }],
        },
        {
          label: '手续费方式',
          name: 'withdraw_fee_type',
          type: 'radio',
          options: [
            { label: '百分比', value: '1' },
            { label: '每笔', value: '2' },
          ],
          rule: [{ required: true, type: 'number', message: '' }],
        },
        {
          label: '结算手续费',
          name: 'withdraw_fee',
          rule: [{ required: true, type: 'number', message: '输入结算手续费' }],
        },
        {
          label: '最小结算金额',
          name: 'min_withdraw',
          rule: [{ required: true, type: 'number', message: '输入最小结算金额' }],
        },
      ],
    },
    {
      label: 'USDT-TRC20 TRX网络',
      switch: true,
      key: 'trc20',
      inputs: [
        {
          label: '最小确认区块',
          name: 'min_confirm',
          rule: [{ required: true, type: 'number', message: '输入最小确认区块' }],
        },
        {
          label: '最小可用地址',
          name: 'min_address',
          rule: [{ required: true, type: 'number', message: '输入最小可用地址' }],
        },
        {
          label: '循环检测时间',
          name: 'interval_time',
          rule: [{ required: true, type: 'number', message: '输入循环检测时间' }],
        },
      ],
    },
    {
      label: 'USDT-BEP20 币安网络',
      switch: true,
      key: 'bep20',
      inputs: [
        {
          label: '最小确认区块',
          name: 'min_confirm',
          rule: [{ required: true, type: 'number', message: '输入最小确认区块' }],
        },
        {
          label: '最小可用地址',
          name: 'min_address',
          rule: [{ required: true, type: 'number', message: '输入最小可用地址' }],
        },
        {
          label: '循环检测时间',
          name: 'interval_time',
          rule: [{ required: true, type: 'number', message: '输入循环检测时间' }],
        },
      ],
    },
  ]

  const handleSubmit = (values: any) => {
    console.log(values)
  }
  return (
    <div className={className}>
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        labelAlign="left"
        size="large"
        style={{ width: '800px' }}
      >
        <Collapse accordion defaultActiveKey={[0]} onChange={() => {}}>
          {formItems.map((item, index) => (
            <Collapse.Panel
              key={index}
              header={item.label}
              extra={
                <div
                  onClick={event => {
                    event.stopPropagation()
                  }}
                >
                  <Switch checkedChildren="启用" unCheckedChildren="停止" defaultChecked={item.switch} />
                </div>
              }
            >
              {item.inputs.map((x, index) => (
                <Form.Item key={item.key + index} label={x.label} name={item.key + x.name} rules={x.rule as any}>
                  {x?.type === 'radio' ? (
                    <Radio.Group onChange={() => {}} defaultValue="1">
                      {x?.options.map((y, index) => (
                        <Radio key={index} value={y.value}>
                          {y.label}
                        </Radio>
                      ))}
                    </Radio.Group>
                  ) : (
                    <Input placeholder={`输入${x.label}`} />
                  )}
                </Form.Item>
              ))}

              <Form.Item className="flex justify-center">
                <Button type="primary" htmlType="submit">
                  保存配置
                </Button>
              </Form.Item>
            </Collapse.Panel>
          ))}
        </Collapse>
      </Form>
    </div>
  )
})

const System = styled(SystemView)`
  display: flex;
  /* justify-content: center; */
`

System.displayName = 'System'
SystemView.displayName = 'SystemView'

export default System
