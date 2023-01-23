import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import PropTypes from 'prop-types'

import Title from '../ui/Title'
import { useResize } from '~app/components/hooks/useResize'
import Loader from '../ui/Loader'
import { capitalize, formatDate } from '~app/utils/utils'

const UsersAndVehicules = ({ id, queryCallback, title }) => {
  const { isMobile } = useResize()
  const [showLoading, setShowLoading] = useState(false)
  const [usersAndVehiculesList, setUsersAndVehiculesList] = useState([])

  const getUsersAndVehicules = async () => {
    setShowLoading(true)

    const result = await queryCallback(id)
    setUsersAndVehiculesList(result)

    setShowLoading(false)
  }

  useEffect(() => {
    if (id) {
      getUsersAndVehicules()
    }
  }, [id])

  const columns = [
    {
      name: 'Model',
      selector: (row) => row.vehicule.model,
      sortable: true,
      cell: (row) => capitalize(row.vehicule.model),
    },
    {
      name: 'Email',
      selector: (row) => row.user.email,
      sortable: true,
    },
    {
      name: 'Reservation',
      selector: (row) => row.start,
      center: !isMobile,
      cell: (row) => {
        const start = formatDate(row.start.toDate(), isMobile ? 'MM/DD/YY' : 'MM/DD/YYYY')
        const end = formatDate(row.end.toDate(), isMobile ? 'MM/DD/YY' : 'MM/DD/YYYY')
        return `${start} to ${end}`
      },
    },
  ]

  return (
    <div>
      <Title min={2} max={2.4} marginTop="2rem" marginBottom="2rem">
        {title}
      </Title>
      {
        showLoading
          ? <Loader />
          : (
            <DataTable
              columns={columns}
              data={usersAndVehiculesList}
              highlightOnHover
              noHeader
              striped
            />
          )
      }
    </div>
  )
}

UsersAndVehicules.propTypes = {
  id: PropTypes.string.isRequired,
  queryCallback: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}

export default UsersAndVehicules
