import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Collapse from '@kunukn/react-collapse'
import { noop } from 'lodash'

import Radio from '~app/components/ui/Radio'
import ChevronDown from '~app/components/ui/icons/ChevronDown'
import Button from '~app/components/ui/Button'
import FormField from '~app/components/ui/FormField'

import {
  ButtonContainer,
  ColorFilter,
  FilterRow,
  FilterRowAction,
  FiltersContainer,
  OptionsContainer,
} from './styles'

const FiltersForm = ({
  meta, filterVehicules, resetVehiculesList, closeFilters,
}) => {
  const initFieldsData = {
    model: { value: '' },
    color: { value: '' },
    location: { value: '' },
  }

  const [showModel, setShowModel] = useState(false)
  const [showColor, setShowColor] = useState(false)
  const [showLocation, setShowLocation] = useState(false)
  const [fieldsData, setFieldsData] = useState(initFieldsData)
  const [cleanFiltersButton, showCleanFiltersButton] = useState(false)
  const [hasColors, setHasColors] = useState(true)
  const [colorsToFilter, setColorsToFilter] = useState([])
  const [hasLocations, setHasLocations] = useState(true)
  const [locationsToFilter, setLocationsToFilter] = useState([])

  useEffect(() => {
    const mapData = (array) => {
      const result = []
      Object.keys(array).forEach((key) => {
        if (key !== 'id') {
          result.push(key)
        }
      })

      return result
    }

    const colors = meta.find((item) => item.id === 'colors')
    if (colors) {
      setHasColors(true)
      const newColors = mapData(colors)
      setColorsToFilter(newColors)
    }

    const locations = meta.find((item) => item.id === 'locations')
    if (locations) {
      setHasLocations(true)
      const newLocations = mapData(locations)
      setLocationsToFilter(newLocations)
    }
  }, [])

  const filterOnChange = async (newFieldsData) => {
    await filterVehicules(newFieldsData)
    closeFilters()
  }

  const onfieldChange = (name, value, valid) => {
    const newFieldsData = {
      ...fieldsData,
      [name]: { value, valid },
    }

    setFieldsData(newFieldsData)
    showCleanFiltersButton(true)
    filterOnChange(newFieldsData)
  }

  const resetAction = () => {
    setFieldsData(initFieldsData)

    setShowColor(false)
    setShowModel(false)
    setShowLocation(false)
    showCleanFiltersButton(false)

    resetVehiculesList()
    closeFilters()
  }

  return (
    <FiltersContainer className="box-shadow">
      <FilterRow>
        <FilterRowAction onClick={() => setShowModel(!showModel)}>
          Model
          <ChevronDown className={showModel ? 'opened' : 'closed'} />
        </FilterRowAction>

        <Collapse isOpen={showModel}>
          <OptionsContainer>
            <FormField
              type="text"
              name="model"
              placeholder="Search a model"
              value={fieldsData.model.value}
              onfieldChange={onfieldChange}
            />
          </OptionsContainer>
        </Collapse>
      </FilterRow>
      {hasColors && (
        <FilterRow>
          <FilterRowAction onClick={() => setShowColor(!showColor)}>
            Color
            <ChevronDown className={showColor ? 'opened' : 'closed'} />
          </FilterRowAction>

          <Collapse isOpen={showColor}>
            <OptionsContainer>
              {colorsToFilter.map((color, idx) => (
                <Radio
                  id={color}
                  key={`color-${idx}`}
                  name="color"
                  label={<ColorFilter color={color} />}
                  onChange={(e) => onfieldChange('color', e?.target?.value)}
                  initialValue={color}
                  checked={fieldsData.color.value}
                />
              ))}
            </OptionsContainer>
          </Collapse>
        </FilterRow>
      )}
      {hasLocations && (
        <FilterRow>
          <FilterRowAction onClick={() => setShowLocation(!showLocation)}>
            Location
            <ChevronDown className={showLocation ? 'opened' : 'closed'} />
          </FilterRowAction>

          <Collapse isOpen={showLocation}>
            <OptionsContainer>
              {locationsToFilter.map((location, idx) => (
                <Radio
                  id={location}
                  key={`location-${idx}`}
                  name="location"
                  label={location}
                  onChange={(e) => onfieldChange('location', e?.target?.value)}
                  initialValue={location}
                  checked={fieldsData.location.value}
                />
              ))}
            </OptionsContainer>
          </Collapse>
        </FilterRow>
      )}

      {cleanFiltersButton && (
        <ButtonContainer>
          <Button callback={() => resetAction()}>Clear Filters</Button>
        </ButtonContainer>
      )}
    </FiltersContainer>
  )
}

FiltersForm.propTypes = {
  meta: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  resetVehiculesList: PropTypes.func.isRequired,
  filterVehicules: PropTypes.func.isRequired,
  closeFilters: PropTypes.func,
}

FiltersForm.defaultProps = {
  closeFilters: noop,
}

export default FiltersForm
