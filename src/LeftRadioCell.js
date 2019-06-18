import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Checkbox from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckboxChecked from '@material-ui/icons/CheckBox'
import RadioButton from '@material-ui/icons/RadioButtonUnchecked'
import RadioButtonChecked from '@material-ui/icons/RadioButtonChecked'

export const leftCellWidth = 30

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.background.default,
    borderBottom: [[1, 'solid', theme.palette.divider]],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
}))

const LeftRadioCell = ({ className, selected, multiline, ...props }) => {
  const classes = useStyles(props)
  const CheckComponent = multiline
    ? (selected ? RadioButtonChecked : RadioButton)
    : (selected ? CheckboxChecked : Checkbox)

  return (
    <div {...props} className={clsx(classes.root, className)}>
      <CheckComponent
        fontSize='small'
      />
    </div>
  )
}

export default LeftRadioCell
