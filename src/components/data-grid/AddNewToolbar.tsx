import { useTranslation } from '@/providers/translation'
import { Tooltip } from '@mui/material'
import { Toolbar, ToolbarButton } from '@mui/x-data-grid'
import { FC } from 'react'
import AddIcon from '@mui/icons-material/Add'

type ToolbarProps = {
  onAddNewRecordClick: () => void
}

const AddNewToolbar: FC<ToolbarProps> = ({ onAddNewRecordClick }) => {
  const { t } = useTranslation('common')

  return (
    <Toolbar>
      <Tooltip title={t('common', 'add-new')}>
        <ToolbarButton onClick={onAddNewRecordClick}>
          <AddIcon fontSize="small" />
        </ToolbarButton>
      </Tooltip>
    </Toolbar>
  )
}

export default AddNewToolbar
