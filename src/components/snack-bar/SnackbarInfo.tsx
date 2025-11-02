import React from 'react'
import BaseSnackbar, { SnackbarMessageProps } from './BaseSnackbar'

const SnackbarInfo: React.FC<SnackbarMessageProps> = ({ message , sx }) => {
  return <BaseSnackbar message={message} type="info" sx={sx}/>
}

export default SnackbarInfo
