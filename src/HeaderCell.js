import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import clsx from 'clsx'

export const headerCellHeight = 29;

const useStyles = makeStyles(theme => ({
  root: {
    ...theme.typography.subtitle2,
    padding: theme.spacing(0.5),
    background: theme.palette.background.default,
  },
}))

const HeaderCell = ({className, ...props}) => {
  const classes = useStyles(props)

  return (
    <div {...props} className={clsx(classes.root, className)} />
  )
}

export default HeaderCell
