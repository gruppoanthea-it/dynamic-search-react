import React from 'react'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'

const SearchField = (
  {
    onSearch,
    ...props
  }
) => {
  return (
    <form
      onSubmit={event => {
        event.preventDefault()
        onSearch(event.target['search'].value)
      }}
    >
      <TextField
        margin="dense"
        variant="outlined"
        label=''
        name='search'
        type='text'
        autoFocus
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon/>
            </InputAdornment>
          ),
        }}
        {...props}
      />
    </form>
  )
}

export default SearchField
