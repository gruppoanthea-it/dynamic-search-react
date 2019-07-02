import React from 'react'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import Button from '@material-ui/core/Button'
import Popper from '@material-ui/core/Popper'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import { useTranslation } from 'react-i18next'

const DynamicSearchActionsButton = ({ actions, selectedRows, ...props }) => {
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef(null)
  const { t } = useTranslation('common')

  function handleMenuItemClick (event, index) {
    setOpen(false)
  }

  function handleToggle () {
    setOpen(prevOpen => !prevOpen)
  }

  function handleClose (event) {
    console.log(event.target)

    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    setOpen(false)
  }

  return (
    <React.Fragment>
      <Button
        variant='contained'
        color='default'
        onClick={handleToggle}
        ref={anchorRef}
      >
        {t('actions')}
        <ArrowDropDownIcon />
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        transition
        keepMounted
        style={{display: !open && 'none', zIndex: 2000}}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'
            }}
          >
            <Paper id='menu-list-grow'>
              <ClickAwayListener
                onClickAway={handleClose}
                mouseEvent={open && undefined} // IF open THEN default, ELSE none
                touchEvent={open && undefined} // IF open THEN default, ELSE none
              >
                <MenuList>
                  {actions.map(action => (
                    React.cloneElement(action, {
                      component: MenuItem,
                      rows: selectedRows,
                      onClick: handleMenuItemClick
                    })
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  )
}

export default DynamicSearchActionsButton
