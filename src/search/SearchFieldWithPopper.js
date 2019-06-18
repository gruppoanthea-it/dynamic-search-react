import React from 'react'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'

const SearchFieldWithPopper = (
  {
    field, // { name, value, onChange, onBlur }
    form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    label,
    inputType: type,
    ...props
  }
) => {
  const [containerEl, setContainerEl] = React.useState(null)
  const [popperEl, setPopperEl] = React.useState(null)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [open, setOpen] = React.useState(false)

  function handleFocus (event) {
    setOpen(true)
  }

  function handleBlur (event) {
    const canClose = !(
      containerEl.contains(event.relatedTarget) ||
      popperEl.contains(event.relatedTarget)
    )

    if (canClose) {
      setOpen(true)
    }
  }

  const id = open ? 'simple-popper' : null

  return (
    <div
      ref={setContainerEl}
      tabIndex={-1}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <TextField
        ref={setAnchorEl}
        margin="dense"
        variant="outlined"
        {...field}
        label={label}
        type={type}
        autoFocus
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon/>
            </InputAdornment>
          ),
        }}
        {...props}
      />
      <Popper
        ref={setPopperEl}
        open={open}
        anchorEl={anchorEl}
        placement="bottom"
        modifiers={{
          flip: {
            enabled: true,
          },
          preventOverflow: {
            enabled: true,
            boundariesElement: 'scrollParent',
          },
          arrow: {
            enabled: false,
          },
        }}
      >
        <Paper tabIndex={-1}>
          <TextField label='ASD'/>
        </Paper>
      </Popper>
    </div>
  )
}

export default SearchFieldWithPopper
