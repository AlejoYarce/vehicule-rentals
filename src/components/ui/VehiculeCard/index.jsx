import React, { useState } from 'react'
import { useRouter } from 'next/router'

import Title from '~app/components/ui/Title'
import ResponsiveImage from '~app/components/ui/ResponsiveImage'

import { vehiculeProps } from '~app/utils/props'
import {
  CardContainer,
  ContentContainer,
  ButtonAction,
  Color,
  ExtraInfo,
  ImageContainer,
  NotActiveContainer,
} from './styles'
import { ROUTES } from '~app/utils/constants'

const VehiculeCard = (props) => {
  const {
    id,
    model,
    color,
    images,
    location,
    status,
  } = props

  const [imageToshow, setImageToshow] = useState(0)
  const router = useRouter()

  const goToDetails = () => router.push(`${ROUTES.VEHICULE}/${id}`)

  return (
    <CardContainer className="box-shadow">
      {!status && <NotActiveContainer><span>Not Available</span></NotActiveContainer>}
      <div>
        <ImageContainer
          onMouseEnter={() => (images.length > 1 ? setImageToshow(1) : setImageToshow(0))}
          onMouseLeave={() => setImageToshow(0)}
          isOnlyOne
        >
          <ResponsiveImage publicId={images ? images[imageToshow] : undefined} maxWidth={880} />
        </ImageContainer>

        <ContentContainer>
          <Title
            capitalize
            min={1.6}
            max={2}
            marginBottom="0.5rem"
            textAlign="left"
          >
            {model}
          </Title>

          <ExtraInfo>
            <Color style={{ backgroundColor: color }} />
            <span>{location}</span>
          </ExtraInfo>
        </ContentContainer>
      </div>
      {status && <ButtonAction onClick={goToDetails}>Book Now</ButtonAction>}
    </CardContainer>
  )
}

VehiculeCard.propTypes = vehiculeProps.isRequired

export default VehiculeCard
