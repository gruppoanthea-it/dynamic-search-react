import React from 'react'
import DynamicSearchAction from '../DynamicSearchAction'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import { useTranslation } from "react-i18next"

const DynamicSearchActionDelete = ({ rows, onDelete, disabled, ...props }) => {
  const [open, setOpen] = React.useState(false)
  const { t } = useTranslation('common')

  function handleClickOpen () {
    setOpen(true)
  }

  function handleClose () {
    setOpen(false)
  }

  function handleConfirm () {
    onDelete(rows)
    handleClose()
  }

  return (
    <>
      <DynamicSearchAction
        onAction={handleClickOpen}
        disabled={rows.length < 1 || (disabled && disabled(rows))}
        {...props}
      >
        {t('delete')}
      </DynamicSearchAction>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Sei sicuro di voler eliminare questi elementi?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Questa azione non potrà essere annullata
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Annulla
          </Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            Continua
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DynamicSearchActionDelete
