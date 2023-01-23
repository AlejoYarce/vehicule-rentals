import { some } from 'lodash'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types'

import { addDocument } from '~app/lib/firebase/api'
import { COLLECTIONS } from '~app/utils/constants'
import Button from '../ui/Button'
import Checkbox from '../ui/Checkbox'
import FormField from '../ui/FormField'
import {
  CreatorContainer,
  FormContainer,
  FormContainerRow,
  ImagesContainer,
} from './styles'
import { vehiculeProps } from '~app/utils/props'
import Title from '../ui/Title'
import CloudinaryWidget from '../ui/CloudinaryWidget'
import ColorPicker from '../ui/ColorPicker'
import { useResize } from '~app/components/hooks/useResize'
import { getQuerableString } from '~app/utils/utils'

const VehiculeCreator = ({ goBack, vehiculeSelected = {} }) => {
  const { isMobile } = useResize()
  const [fieldsData, setFieldsData] = useState({
    model: { value: vehiculeSelected.model || '', valid: vehiculeSelected.model || false },
    color: { value: vehiculeSelected.color || undefined, valid: vehiculeSelected.color || false },
    images: { value: vehiculeSelected.images || [], valid: vehiculeSelected.images || true },
    location: { value: vehiculeSelected.location || '', valid: vehiculeSelected.location || false },
    status: { value: vehiculeSelected.status || null, valid: vehiculeSelected.status || true },
  })
  const [isValidForm, setIsValidForm] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const onfieldChange = (name, value, valid) => {
    const newFieldsData = {
      ...fieldsData,
      [name]: { value, valid },
    }

    setFieldsData(newFieldsData)
    setIsValidForm(!some(newFieldsData, ['valid', false]))
    setErrorMessage('')
    setShowLoading(false)
  }

  const onAddEditVehicule = async () => {
    if (isValidForm) {
      setShowLoading(true)
      setErrorMessage('')

      const model = fieldsData.model.value
      const color = fieldsData.color.value
      const images = fieldsData.images.value
      const location = fieldsData?.location?.value?.toLowerCase() || ''
      const status = fieldsData.status.value

      const vehiculeData = {
        model,
        queryModel: getQuerableString(model),
        color,
        images,
        location,
        status,
        createdAt: new Date(),
      }
      const id = vehiculeSelected ? vehiculeSelected.id : undefined
      const newId = await addDocument(COLLECTIONS.VEHICULES, vehiculeData, id)

      await addDocument(COLLECTIONS.META, { [location]: true }, 'locations')
      await addDocument(COLLECTIONS.META, { [color]: true }, 'colors')

      setShowLoading(false)
      toast.success(id ? 'Vehicule Edited!' : 'Vehicule Created', {
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      })

      goBack({
        id: newId,
        model,
        color,
        images,
        location,
        status,
      })
    }
  }

  return (
    <CreatorContainer>
      <Title min={2} max={2.4} marginTop="2rem">
        {vehiculeSelected && vehiculeSelected.id ? 'Edit Vehicule' : 'Create Vehicule'}
      </Title>
      <FormContainer>
        <FormContainerRow>
          <FormField
            type="text"
            name="model"
            label="Model"
            placeholder="Model"
            onfieldChange={onfieldChange}
            value={fieldsData.model.value}
            showHint={!!fieldsData.model.value && !fieldsData.model.valid}
            hint="Enter a valid text"
            customWidth={isMobile ? '100%' : '48%'}
            required
          />
          <FormField
            type="text"
            name="location"
            label="Location"
            placeholder="Location"
            onfieldChange={onfieldChange}
            value={fieldsData.location.value}
            showHint={!!fieldsData.location.value && !fieldsData.location.valid}
            hint="Enter a valid text"
            customWidth={isMobile ? '100%' : '48%'}
            required
          />
        </FormContainerRow>
        <FormContainerRow>
          <ColorPicker
            color={fieldsData.color.value}
            onColorChanged={(value) => onfieldChange('color', value, true)}
          />
          <Checkbox
            name="status"
            label="Active"
            fontSize="1.6rem"
            fontWeight="700"
            onChange={onfieldChange}
            value={fieldsData.status.value}
            customWidth={isMobile ? '100%' : '48%'}
          />
        </FormContainerRow>
        <ImagesContainer>
          <CloudinaryWidget
            id="images"
            images={fieldsData?.images?.value || []}
            limit={10}
            updateImagesList={(newImages) => onfieldChange('images', newImages, true)}
            maxWidth={300}
          />
        </ImagesContainer>
        <Button
          callback={onAddEditVehicule}
          disabled={!isValidForm || showLoading || !!errorMessage}
          showLoader={showLoading}
        >
          {vehiculeSelected && vehiculeSelected.id ? 'Edit' : 'Create'}
        </Button>
      </FormContainer>
    </CreatorContainer>
  )
}

VehiculeCreator.propTypes = {
  goBack: PropTypes.func.isRequired,
  vehiculeSelected: vehiculeProps,
}

VehiculeCreator.defaultProps = {
  vehiculeSelected: {},
}

export default VehiculeCreator
