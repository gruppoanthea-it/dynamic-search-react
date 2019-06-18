import React from 'react'
import DynamicSearchAction from '../DynamicSearchAction'
import { useTranslation } from "react-i18next"
import FormDialog from './FormDialog'

const DynamicSearchActionEdit = (
  {
    rows,
    disabled,
    formComponent,
    onSubmit,
    ...props
  }
) => {
  const [open, setOpen] = React.useState(false)
  const { t } = useTranslation('common')

  function handleClickOpen () {
    setOpen(true)
  }

  function handleClose () {
    setOpen(false)
  }

  function handleSubmit (values) {
    onSubmit(rows[0]._id, values)
    handleClose()
  }

  return (
    <>
      <DynamicSearchAction
        onAction={handleClickOpen}
        disabled={rows.length !== 1 || (disabled && disabled(rows))}
        {...props}
      >
        {t('edit')}
      </DynamicSearchAction>
      <FormDialog
        title={t('edit')}
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
        formComponent={formComponent}
        initialValues={rows[0]}
      />
    </>
  )
}

export default DynamicSearchActionEdit
