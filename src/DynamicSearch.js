import React, { useState } from 'react'
import DynamicSearchContent from './DynamicSearchContent'

type Props = {
  loaderComponent: any,
  title: any,
  rowHeight: any,
  columns: any,
  columnWidth: any,
  columnLabel: any,
  cellRenderer: any,
  height: any,
}

const DynamicSearch = React.forwardRef((
  {
    loaderComponent: LoaderComponent,
    title,
    rowHeight,
    columns,
    columnLabel,
    columnWidth,
    cellRenderer,
    multiline,
    height,
    actions
  }: Props, ref
) => {
  const [search, onSearch] = useState(null)
  const [order, onOrder] = useState(null)

  return (
    <LoaderComponent
      ref={ref}
      search={search}
      order={[]}
    >
      {({ onRowsRendered, registerChild, getDataRow, rowCount }) => {
        return (
          <DynamicSearchContent
            ref={registerChild}
            onRowsRendered={onRowsRendered}
            getDataRow={getDataRow}
            rowCount={rowCount}
            title={title}
            rowHeight={rowHeight}
            columns={columns}
            columnLabel={columnLabel}
            columnWidth={columnWidth}
            cellRenderer={cellRenderer}
            height={height}
            multiline={multiline}

            actions={actions}
            onSearch={onSearch}
          />
        )
      }}
    </LoaderComponent>
  )
})

DynamicSearch.defaultProps = {
  multiline: false
}

export default DynamicSearch
