'use client'
import { useTranslation } from '@/providers/translation'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import React from 'react'
import { IoSave } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

type Props = {
  disabled: boolean
}

const FormActionButtons: React.FC<Props> = ({ disabled }) => {
  const { t } = useTranslation('form')
  const router = useRouter()

  return (
    <React.Fragment>
      <Button
        variant="contained"
        color="error"
        endIcon={<IoMdClose />}
        onClick={() => {
          router.back()
        }}
      >
        {t('form', 'close')}
      </Button>
      <Button
        type="submit"
        form="form"
        variant="contained"
        color="success"
        endIcon={<IoSave />}
        disabled={disabled}
      >
        {t('form', 'save')}
      </Button>
    </React.Fragment>
  )
}

export default FormActionButtons
