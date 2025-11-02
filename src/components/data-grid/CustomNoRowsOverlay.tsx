import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import ConstructionIcon from '@mui/icons-material/Construction'
import StyledGridOverlay from './styled'
import { useTranslation } from '@/providers/translation'
import { useThemeContext } from '@/theme/ThemeContext'

const CustomNoRowsOverlay: React.FC = () => {
  const { t } = useTranslation('common')
  const { mode } = useThemeContext();
  return (
    <StyledGridOverlay>
      <Stack
    
        justifyContent="center"
        alignItems="center"
        sx={{ height: '100%',scale:0.7 }}
      >
        {/* Animated Construction Icon */}
        <Box
          sx={{
            animation: 'bounce 2s infinite',
            scale:1,
            '& svg': {
              fontSize: 60,
              color: 'rgba(255,153,0,0.8)',
            },
          }}
        >
          <ConstructionIcon />
        </Box>

        <Typography
          variant="subtitle1"
          sx={{
            p:0,
            color: mode==="light"?'text.secondary': 'var(--color-yellow)',
            fontWeight: 500,
            fontSize: 20,
            textAlign: 'center',
          }}
        >
          {t('common', 'no-rows')}
        </Typography>
      </Stack>

      {/* Animation Keyframes */}
      <style>
        {`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
        `}
      </style>
    </StyledGridOverlay>
  )
}

export default CustomNoRowsOverlay
