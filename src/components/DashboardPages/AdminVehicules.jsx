import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { useRouter } from 'next/router'
import { get } from 'lodash'
import { toast } from 'react-toastify'

import Title from '~app/components/ui/Title'
import { useResize } from '~app/components/hooks/useResize'
import {
  ActionsContainer,
  ChildContainer,
  ColorPreview,
  DashboardPagesContainer,
  DataContainer,
  ImageContainer,
  ManageContainer,
} from './styles'
import Loader from '~app/components/ui/Loader'
import ResponsiveImage from '~app/components/ui/ResponsiveImage'
import { capitalize } from '~app/utils/utils'
import Button from '~app/components/ui/Button'
import X from '~app/components/ui/icons/X'
import {
  deleteDocument, getAgendaByVehicule, getDocuments,
} from '~app/lib/firebase/api'
import { COLLECTIONS, ROUTES } from '~app/utils/constants'
import Confirmation from '~app/components/ui/Modal/Confirmation'
import { theme } from '~app/styles/theme'
import { PageContainer } from '~app/styles/Layout'
import CheckedCircle from '../ui/icons/CheckedCircle'
import Edit from '../ui/icons/Edit'
import VehiculeCreator from './VehiculeCreator'
import UserIcon from '../ui/icons/UserIcon'
import UsersAndVehicules from './UsersAndVehicules'

const AdminVehicules = () => {
  const { isMobile } = useResize()
  const router = useRouter()
  const [showLoading, setShowLoading] = useState(true)
  const [vehicules, setVehicules] = useState([])
  const [vehiculeSelected, setVehiculeSelected] = useState()
  const [showButtonLoading, setShowButtonLoading] = useState(false)
  const [showDeleteVehicule, setShowDeleteVehicule] = useState(false)
  const [showVehiculeCreator, setShowVehiculeCreator] = useState(false)
  const [showUsersAndVehicules, setShowUsersAndVehicules] = useState(false)

  const setInitState = () => {
    setVehiculeSelected()
    setShowButtonLoading(false)
    setShowDeleteVehicule(false)
    setShowVehiculeCreator(false)
    setShowUsersAndVehicules(false)
  }

  const loadVehicules = async () => {
    setShowLoading(true)

    const result = await getDocuments(COLLECTIONS.VEHICULES)

    setVehicules(result)
    setShowLoading(false)
  }

  useEffect(() => {
    loadVehicules()
  }, [])

  const openUsersAndVehicules = (row) => {
    setVehiculeSelected(row)
    setShowUsersAndVehicules(true)
  }

  const openVehiculeCreator = (row) => {
    setVehiculeSelected(row)
    setShowVehiculeCreator(true)
  }

  const openDeleteVehicule = (row) => {
    setVehiculeSelected(row)
    setShowDeleteVehicule(true)
  }

  const deleteVehicule = async () => {
    setShowButtonLoading(true)

    await deleteDocument(COLLECTIONS.VEHICULES, vehiculeSelected.id)

    const actualVehicules = [...vehicules].filter((item) => item.id !== vehiculeSelected.id)
    setVehicules(actualVehicules)

    setInitState()
    toast.success('Vehicule Deleted!', {
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    })
  }

  const columns = [
    {
      name: '',
      selector: (row) => row.images,
      width: '15rem',
      hide: 550,
      // eslint-disable-next-line react/no-unstable-nested-components
      cell: (row) => (
        <ImageContainer onClick={() => router.push(`${ROUTES.VEHICULE}/${row.id}`)}>
          <ResponsiveImage publicId={get(row, 'images[0]', undefined)} maxWidth={200} />
        </ImageContainer>
      ),
    },
    {
      name: 'Model',
      selector: (row) => row.model,
      width: isMobile ? '15rem' : '22rem',
      sortable: true,
      cell: (row) => capitalize(row.model),
    },
    {
      name: 'Color',
      selector: (row) => row.color,
      width: isMobile ? '5.5rem' : '12rem',
      sortable: true,
      // eslint-disable-next-line react/no-unstable-nested-components
      cell: (row) => <ColorPreview color={row.color} />,
    },
    {
      name: 'Active',
      selector: (row) => row.status,
      width: isMobile ? '4.9rem' : '12rem',
      // hide: 768,
      // eslint-disable-next-line react/no-unstable-nested-components
      cell: (row) => row.status && <CheckedCircle />,
    },
    {
      name: 'Actions',
      width: isMobile ? '10rem' : '12rem',
      center: true,
      // eslint-disable-next-line react/no-unstable-nested-components
      cell: (row) => (
        <ActionsContainer>
          <Button callback={() => openUsersAndVehicules(row)} icon>
            <UserIcon />
          </Button>
          <Button callback={() => openVehiculeCreator(row)} icon>
            <Edit />
          </Button>
          <Button callback={() => openDeleteVehicule(row)} className="delete" icon>
            <X />
          </Button>
        </ActionsContainer>
      ),
    },
  ]

  const onGoBack = (newData) => {
    setShowVehiculeCreator(false)
    setShowUsersAndVehicules(false)

    if (newData) {
      const {
        id, model, color, images, location, status,
      } = newData
      if (vehiculeSelected && vehiculeSelected.id) {
        const actualVehicules = [...vehicules].map((item) => {
          if (item.id === vehiculeSelected.id) {
            return {
              ...item,
              model,
              color,
              images,
              location,
              status,
            }
          }

          return item
        })
        setVehicules(actualVehicules)
      } else {
        const actualVehicules = [...vehicules]
        actualVehicules.unshift({
          id,
          model,
          color,
          images,
          location,
          status,
        })
        setVehicules(actualVehicules)
      }
    }
  }

  return (
    <PageContainer>
      <DashboardPagesContainer>
        <DataContainer>
          <ManageContainer>
            <Title min={2.8} max={3.2}>Manage Vehicules</Title>
            <Button
              callback={
                showVehiculeCreator || showUsersAndVehicules ? onGoBack : openVehiculeCreator
              }
              strokedColor={theme.colors.primary.endeavour}
              customWidth="5rem"
              stroked={!showVehiculeCreator && !showUsersAndVehicules}
              icon={showVehiculeCreator || showUsersAndVehicules}
            >
              <X
                className={showVehiculeCreator || showUsersAndVehicules ? 'x-sign' : 'plus-sign'}
              />
            </Button>
          </ManageContainer>
          {
            showLoading
              ? <Loader />
              : (
                <ChildContainer className="box-shadow">
                  {showVehiculeCreator && (
                    <VehiculeCreator goBack={onGoBack} vehiculeSelected={vehiculeSelected} />
                  )}
                  {showUsersAndVehicules && (
                    <UsersAndVehicules
                      id={vehiculeSelected?.id}
                      queryCallback={getAgendaByVehicule}
                      title="Users by this Vehicule"
                    />
                  )}
                  {!showVehiculeCreator && !showUsersAndVehicules && (
                    <DataTable
                      columns={columns}
                      data={vehicules}
                      highlightOnHover
                      noHeader
                      striped
                    />
                  )}
                </ChildContainer>
              )
          }
          {
            showDeleteVehicule && (
              <Confirmation
                type="danger"
                showConfirmation={showDeleteVehicule}
                noLabel="No"
                yesLabel="Confirm"
                yesColor={theme.colors.primary.carnation}
                showLoader={showButtonLoading}
                onClose={setInitState}
                onYes={deleteVehicule}
                overrideIcon={<X />}
                buttonsMarginTop="2rem"
              >
                <Title
                  marginBottom="1.2rem"
                  textAlign="center"
                  min={2}
                  max={2}
                >
                  Want to delete this vehicule?
                </Title>
              </Confirmation>
            )
          }
        </DataContainer>
      </DashboardPagesContainer>
      <script async src="https://widget.cloudinary.com/v2.0/global/all.js" />
    </PageContainer>
  )
}

export default AdminVehicules
