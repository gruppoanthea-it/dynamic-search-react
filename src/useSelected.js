import { useState } from 'react'

// TODO This is UNUSED

export function useSelected () {
  const [selected, changeSelected] = useState(new Set())

  function isRowSelected ({ rowIndex }) {
    return selected.has(rowIndex)
  }

  function onRowSelect ({ rowIndex }) {
    const set = new Set(selected)
    if (set.has(rowIndex)) {
      set.delete(rowIndex)
    } else {
      set.add(rowIndex)
    }
    changeSelected(set)
  }

  function clearSelections () {
    changeSelected(new Set())
  }

  return {
    selectedRows: Array.from(selected),
    isRowSelected,
    onRowSelect,
    clearSelections
  }
}
