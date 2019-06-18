import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import clsx from 'clsx'

export const simpleCellHeight = 29

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(0.5),
    background: theme.palette.common.white,
  },
  selected: {
    background: theme.palette.primary.main,
    color: theme.palette.getContrastText(theme.palette.primary.main)
  },
}))

const SimpleCell = ({ className, children, selected, align, ...props }) => {
  const classes = useStyles(props)

  return (
    <div
      {...props}
      className={clsx(
        classes.root,
        {
          [classes.selected]: selected
        },
        className
      )}
    >
      <Typography variant='body2' align={align}>{children}</Typography>
    </div>
  )
}

SimpleCell.height = simpleCellHeight

export default SimpleCell
