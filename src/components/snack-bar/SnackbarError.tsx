import React from 'react'
import BaseSnackbar, { SnackbarMessageProps } from './BaseSnackbar'

const SnackbarError: React.FC<SnackbarMessageProps> = ({ message ,sx }) => {
  return <BaseSnackbar message={message} type="error" sx={sx} />
}

export default SnackbarError
