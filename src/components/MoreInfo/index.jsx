import React from 'react'

import { MoreInfoContainer, WhiteCardContainer } from './styles'
import Availability from '~app/components/Availability'

const MoreInfo = () => (
  <MoreInfoContainer>
    <WhiteCardContainer className="box-shadow">
      <Availability />
    </WhiteCardContainer>
  </MoreInfoContainer>
)

export default MoreInfo
