import React, { useState } from 'react'
import Collapse from '@kunukn/react-collapse'

import Title from '~app/components/ui/Title'
import ChevronDown from '~app/components/ui/icons/ChevronDown'
import {
  Container,
  Content,
  ScheduleVehiculeAction,
} from './styles'
import { vehiculeProps } from '~app/utils/props'
import Scheduler from './Scheduler'
import { jumpTo } from '~app/utils/utils'

const SchedulerContainer = ({ vehiculeData }) => {
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false)

  const openScheduler = () => {
    setIsSchedulerOpen(!isSchedulerOpen)
    setTimeout(() => jumpTo('book-this-vehicule', 10), 400)
  }

  return (
    <Container className="box-shadow">
      <ScheduleVehiculeAction onClick={openScheduler}>
        <Title
          textAlign="center"
          min={2.2}
          max={2.2}
          id="book-this-vehicule"
        >
          Book this Vehicule
        </Title>
        <ChevronDown className={isSchedulerOpen ? 'opened' : 'closed'} />
      </ScheduleVehiculeAction>
      <Collapse isOpen={isSchedulerOpen}>
        <Content>
          <Scheduler
            vehiculeData={vehiculeData}
            isSchedulerOpen={isSchedulerOpen}
            closeScheduler={() => setIsSchedulerOpen(false)}
          />
        </Content>
      </Collapse>
    </Container>
  )
}

SchedulerContainer.propTypes = {
  vehiculeData: vehiculeProps.isRequired,
}

export default SchedulerContainer
