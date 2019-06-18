import React from 'react'
import Button from '@material-ui/core/Button'

const DynamicSearchAction = (
  {
    component: Component = Button,
    onClick,
    onAction,
    ...other
  }
) => {
  return (
    <Component
      onClick={() => {
        onClick()
        onAction()
      }}
      {...other}
    />
  )
}

DynamicSearchAction.defaultProps = {
  disabled: false
}

export default DynamicSearchAction
