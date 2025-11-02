import React from 'react'
import Link from 'next/link'
import { Fab, FabProps } from '@mui/material'
import { IoIosAddCircle } from "react-icons/io"
import { useThemeContext } from '@/theme/ThemeContext'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AddNewButton: React.FC<FabProps> = ({ color = 'secondary', href, ...rest }) => {
  const { mode } = useThemeContext()

  const getColor = (light: string, dark: string) =>
    mode === 'light' ? `var(${light})` : `var(${dark})`

  const hoverStyle = {
    bgcolor: mode === 'light' ? 'var(--color-yellow)': 'var(--color-hover-black)' ,
    color: mode === 'light' ? 'var(--color-black)' :'var(--color-yellow)' ,
  }

  return (
    <Fab
      LinkComponent={Link}
      href={href ?? 'new'}
      sx={{
        bgcolor: getColor( '--color-charcoal','--color-yellow'),
        color: getColor('--color-yellow','--color-charcoal' ),
        "&:hover": hoverStyle,
        transition: 'all 0.3s ease',
      }}
      {...rest}
    >
      <IoIosAddCircle fontSize="30px" />
    </Fab>
  )
}

export default AddNewButton
