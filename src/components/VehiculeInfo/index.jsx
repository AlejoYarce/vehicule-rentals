import React from 'react'

import { DetailsInfoContainer } from './styles'
import { vehiculeProps } from '~app/utils/props'
import Header from './Header'
import SchedulerContainer from '~app/components/SchedulerContainer'

const VehiculeInfo = ({ vehiculeData }) => (
  <DetailsInfoContainer>
    <Header vehiculeData={vehiculeData} />
    <SchedulerContainer vehiculeData={vehiculeData} />
  </DetailsInfoContainer>
)

VehiculeInfo.propTypes = {
  vehiculeData: vehiculeProps.isRequired,
}

export default VehiculeInfo
