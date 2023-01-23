import React from 'react'
import axios from 'axios'
import { get } from 'lodash'
import PropTypes from 'prop-types'

import { PageWrapper } from '~app/styles/Layout'
import PageHead from '~app/components/PageHead'
import Navbar from '~app/components/ui/Navbar'
import VehiculesPage from '~app/components/VehiculesPage'
import { vehiculesDataProps } from '~app/utils/props'
import { getProtocol } from '~app/utils/utils'

const Home = ({ vehiculesData, meta }) => (
  <PageWrapper>
    <PageHead title="Vehicule Rentals.co - Home Page" />
    <Navbar />
    <VehiculesPage vehiculesData={vehiculesData} meta={meta} />
  </PageWrapper>
)

Home.propTypes = {
  vehiculesData: vehiculesDataProps.isRequired,
  meta: PropTypes.arrayOf(PropTypes.shape()).isRequired,
}

export default Home

export async function getServerSideProps(props) {
  const { req: { headers } } = props
  const host = getProtocol(headers.host)

  const result = await axios.get(`${host || 'http://localhost:3000'}/api/get-vehicules`)
  const vehiculesData = get(result, 'data.vehicules', [])

  const metaResult = await axios.get(`${host || 'http://localhost:3000'}/api/get-meta`)
  const meta = get(metaResult, 'data.meta', [])

  return {
    props: {
      vehiculesData,
      meta,
    },
  }
}
