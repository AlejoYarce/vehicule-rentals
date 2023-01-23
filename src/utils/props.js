import PropTypes from 'prop-types'

export const vehiculeProps = PropTypes.shape({
  id: PropTypes.string,
  model: PropTypes.string,
  queryModel: PropTypes.shape(),
  color: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.string),
  location: PropTypes.string,
  status: PropTypes.bool,
})

export const vehiculesDataProps = PropTypes.arrayOf(vehiculeProps)

export const childrenProps = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node,
])

export const userProps = PropTypes.shape({
  id: PropTypes.string,
  email: PropTypes.string,
  isAdmin: PropTypes.bool,
  status: PropTypes.bool,
})
