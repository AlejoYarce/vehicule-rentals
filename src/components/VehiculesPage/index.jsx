import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { VehiculesDataContainer, VehiculesPageContainer } from './styles'
import { PageContainer } from '~app/styles/Layout'
import SideFilters from '~app/components/SideFilters'
import VehiculeCard from '~app/components/ui/VehiculeCard'
import { vehiculesDataProps } from '~app/utils/props'
import { getVehiculesByParams } from '~app/lib/firebase/api'
import Loader from '../ui/Loader'

const VehiculesPage = ({ vehiculesData, meta }) => {
  const [vehicules, setVehicules] = useState(vehiculesData)
  const [showLoading, setShowLoading] = useState(false)

  const filterVehicules = async (data) => {
    setShowLoading(true)

    const result = await getVehiculesByParams(data)

    setShowLoading(false)
    setVehicules(result)
  }

  const resetVehiculesList = () => setVehicules(vehiculesData)

  return (
    <PageContainer>
      <VehiculesPageContainer>
        <SideFilters
          meta={meta}
          filterVehicules={filterVehicules}
          resetVehiculesList={resetVehiculesList}
        />
        {
          showLoading
            ? <Loader />
            : (
              <VehiculesDataContainer>
                {vehicules.map((vehicule, idx) => (
                  <VehiculeCard key={idx} {...vehicule} />
                ))}
              </VehiculesDataContainer>
            )
        }
      </VehiculesPageContainer>
    </PageContainer>
  )
}

VehiculesPage.propTypes = {
  vehiculesData: vehiculesDataProps.isRequired,
  meta: PropTypes.arrayOf(PropTypes.shape()).isRequired,
}

export default VehiculesPage
