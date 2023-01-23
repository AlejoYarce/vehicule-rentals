/* eslint-disable no-plusplus */
import moment from 'moment'

export const patterns = {
  email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
  text: /^[a-zA-Z áÁéÉíÍóÓúÚüÜ ñ Ñ]+$/,
  alfaNumeric: /^(.|\s)*[a-zA-Z]+(.|\s)*$/,
}

export const jumpTo = (id, offset = 70) => {
  const $el = document.getElementById(id)
  const bodyRect = document.body.getBoundingClientRect().top
  const elementRect = ($el
    && $el.getBoundingClientRect()
    && $el.getBoundingClientRect().top) || 0
  const elementPosition = elementRect - bodyRect
  const offsetPosition = elementPosition - offset

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  })
}

export const formatDate = (date, format) => moment(date).format(format)

export const getProtocol = (url) => {
  if (url.indexOf('3000') > -1) {
    return `http://${url}`
  }

  return `https://${url}`
}

export const capitalize = (string = '') => {
  const split = string.split(' ')
  if (split.length > 1) {
    const capitalized = split.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    return capitalized.join(' ')
  }

  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const getQuerableString = (string) => {
  if (string) {
    const lowString = string.toLowerCase()
    const result = {}

    for (let i = 1; i < lowString.length + 1; i++) {
      result[lowString.substring(0, i)] = true
    }

    lowString.split(' ').forEach((word) => {
      for (let i = 1; i < word.length + 1; i++) {
        result[word.substring(0, i)] = true
      }
    })

    return result
  }

  return {}
}
