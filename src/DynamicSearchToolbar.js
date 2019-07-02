import React from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import SearchField from './search/SearchField'
import DynamicSearchActionsButton from './DynamicSearchActionsButton'

const useStyles = makeStyles(theme => ({
  root: {
    background: 'rgba(255,255,255,.6)'
  },
  actions: {
    '& > *': {
      margin: [[0, theme.spacing(1)]]
    }
  },
  search: {
    margin: theme.spacing(1),
    flex: 1
  }
}))

const DynamicSearchToolbar = (
  {
    selectedRows,
    actions,
    onSearch,
    ...props
  }
) => {
  const classes = useStyles(props)
  const subActions = actions.slice(1)

  return (
    <Toolbar className={classes.root}>
      <div className={classes.actions}>
        {actions[0] && React.cloneElement(actions[0], {
          component: Button,
          variant: 'contained',
          color: 'primary',
          rows: selectedRows,
          onClick: () => {}
        })}
        {subActions.length && (
          <DynamicSearchActionsButton actions={subActions} selectedRows={selectedRows} />
        )}
      </div>
      <div className={classes.search}>
        <SearchField
          onSearch={onSearch}
        />
      </div>
    </Toolbar>
  )
}

export default DynamicSearchToolbar
