import React from 'react'
import axios from 'axios'
import { get } from 'lodash'

import { PageWrapper } from '~app/styles/Layout'
import PageHead from '~app/components/PageHead'
import Navbar from '~app/components/ui/Navbar'
import { vehiculeProps } from '~app/utils/props'
import VehiculePage from '~app/components/VehiculePage'
import { getProtocol } from '~app/utils/utils'
import { ROUTES } from '~app/utils/constants'

const Vehicule = ({ vehiculeData }) => (
  <PageWrapper>
    <PageHead title="Vehicule Rentals.co - Vehicule Page" />
    <Navbar />
    <VehiculePage vehiculeData={vehiculeData} />
  </PageWrapper>
)

Vehicule.propTypes = {
  vehiculeData: vehiculeProps.isRequired,
}

export default Vehicule

export async function getServerSideProps(ctx) {
  const { params: { id }, req: { headers } } = ctx
  const host = getProtocol(headers.host)

  if (id) {
    const result = await axios.get(`${host || 'http://localhost:3000'}/api/get-vehicule?id=${id}`)
    const vehiculeData = get(result, 'data.vehicule', {})

    if (vehiculeData.status) {
      return {
        props: {
          vehiculeData,
        },
      }
    }

    ctx.res.writeHead(302, { Location: ROUTES.HOME })
    ctx.res.end()

    return {
      props: {},
    }
  }

  return {
    props: {},
  }
}
