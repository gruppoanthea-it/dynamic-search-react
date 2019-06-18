import React from 'react'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    margin: 0,
    padding: [[theme.spacing(1), theme.spacing(2)]]
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(0),
    color: theme.palette.grey[500]
  }
})

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <IconButton aria-label='Close' className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(1)
  }
}))(MuiDialogContent)

const FormDialog = ({ title, open, formComponent: FormComponent, initialValues, onClose, onSubmit }) => {
  return (
    <Dialog
      open={open}
      fullWidth
      // maxWidth={'md'}
    >
      <DialogTitle
        onClose={onClose}>
        {title}
      </DialogTitle>
      <FormComponent
        onSubmit={onSubmit}
        onCancel={onClose}
        initialValues={initialValues}
      />
    </Dialog>
  )
}

export default FormDialog
