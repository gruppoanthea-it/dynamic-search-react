import React, { Component } from 'react'
import DynamicSearchToolbar from './DynamicSearchToolbar'
import DynamicSearchGrid from './DynamicSearchGrid'

class DynamicSearchContent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: new Set()
    }
    this.gridRef = React.createRef()
  }

  forceUpdate (callback) {
    super.forceUpdate(callback)
    this.clearSelections()
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.gridRef.current) this.gridRef.current.forceUpdate()
  }

  isRowSelected = ({ rowIndex }) => {
    return this.state.selected.has(rowIndex)
  }

  onRowSelect = ({ rowIndex }) => {
    if (!this.props.multiline) {
      this.setState({ selected: new Set([rowIndex]) })
      return
    }

    const set = new Set(this.state.selected)

    if (set.has(rowIndex)) {
      set.delete(rowIndex)
    } else {
      set.add(rowIndex)
    }
    this.setState({ selected: set })
  }

  getSelectedRows () {
    return Array.from(this.state.selected)
  }

  clearSelections () {
    this.setState({ selected: new Set() })
  }

  render () {
    const {
      onRowsRendered,
      getDataRow,
      rowCount,

      title,
      rowHeight,
      columns,
      columnLabel,
      columnWidth,
      cellRenderer,
      height,
      multiline,

      actions,
      onSearch,
    } = this.props

    return (
      <div>
        <DynamicSearchToolbar
          selectedRows={
            this.getSelectedRows().map(selected => getDataRow({ index: selected }))
          }
          onSearch={onSearch}
          actions={actions}
        />
        <DynamicSearchGrid
          ref={this.gridRef}
          onRowsRendered={onRowsRendered}
          getDataRow={getDataRow}
          rowCount={rowCount}
          rowHeight={rowHeight}
          columns={columns}
          columnLabel={columnLabel}
          columnWidth={columnWidth}
          cellRenderer={cellRenderer}
          height={height}
          isSelected={this.isRowSelected}
          onSelect={this.onRowSelect}
        />
      </div>
    )
  }
}

export default DynamicSearchContent
