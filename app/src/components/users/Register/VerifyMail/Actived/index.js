import React from 'react'
import {Card, Steps} from 'antd'
import stepsConfig from '../../steps.json'
import {Link} from 'react-router'
import QueueAnim from 'rc-queue-anim'
import config from '../index.json'

const Step = Steps.Step
const Actived = () => {
  const {title, successful, back} = config.actived[0]
  const {steps} = stepsConfig
  return (
    <Card className="verify-mail">
      <QueueAnim type="bottom">
        <div className="verify-mail-header">
          <h1 className="verify-mail-header-title">{title}</h1>
        </div>
        <Steps
          current={2}
          className="verify-mail-header-steps"
          key="verify-mail-header-steps"
        >
          <Step title={steps[0].title}/>
          <Step title={steps[1].title}/>
          <Step title={steps[2].title}/>
        </Steps>
        <p className="h-title" key="verify-mail-p-2">
          {successful}
          <Link to="/">{back}</Link>
        </p>
      </QueueAnim>
    </Card>
  )
}

export default Actived
