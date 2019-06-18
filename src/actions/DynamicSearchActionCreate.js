import React from 'react'
import DynamicSearchAction from '../DynamicSearchAction'
import { useTranslation } from 'react-i18next'
import FormDialog from './FormDialog'

const DynamicSearchActionCreate = (
  {
    rows,
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
    console.log(values)
    onSubmit(values)
    handleClose()
  }

  return (
    <>
      <DynamicSearchAction
        onAction={handleClickOpen}
        {...props}
      >
        {t('create')}
      </DynamicSearchAction>
      <FormDialog
        title={t('create')}
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
        formComponent={formComponent}
      />
    </>
  )
}

export default DynamicSearchActionCreate
