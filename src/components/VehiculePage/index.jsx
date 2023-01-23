import React from 'react'

import { vehiculeProps } from '~app/utils/props'
import MoreInfo from '~app/components/MoreInfo'
import VehiculeInfo from '~app/components/VehiculeInfo'
import {
  VehiculePageContainer,
  Banner,
  VehiculePageContent,
} from './styles'

const VehiculePage = ({ vehiculeData }) => (
  <>
    <Banner />
    <VehiculePageContainer>
      <VehiculePageContent>
        <MoreInfo />
        <VehiculeInfo vehiculeData={vehiculeData} />
      </VehiculePageContent>
    </VehiculePageContainer>
  </>
)

VehiculePage.propTypes = {
  vehiculeData: vehiculeProps.isRequired,
}

export default VehiculePage
