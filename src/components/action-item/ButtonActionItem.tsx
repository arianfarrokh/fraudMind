import React from 'react'
import { GridActionsCellItem, GridActionsCellItemProps } from '@mui/x-data-grid/components'
// import NextLink from 'next/link'
// import { Link } from '@mui/material'

type Props = GridActionsCellItemProps & {
  href: string
}

const ButtonActionItem: React.FC<Props> = ({ ...props }) => {
  return (
    // <Link href={href} component={NextLink} underline="none" color="inherit">
      <GridActionsCellItem {...props} />
    // </Link>
  )
}

export default ButtonActionItem
