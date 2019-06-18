// @flow

import * as React from 'react'
import { AutoSizer, Grid, ScrollSync } from 'react-virtualized'
import { withStyles } from '@material-ui/core/styles'
import HeaderCell, { headerCellHeight } from './HeaderCell'
import LeftRadioCell, { leftCellWidth } from './LeftRadioCell'
import scrollbarSize from 'dom-helpers/util/scrollbarSize'

type CellRendererParams = {
  column: string,
  dataRow: any,
  columnIndex: number,
  rowIndex: number,
  props: any,
}

type Props = {
  getDataRow: ({ index: number }) => any,
  columns: Array<string>,

  cellRenderer: (CellRendererParams) => React.Node,
  onRowsRendered: ({ startIndex: number, stopIndex: number }) => void,
  columnLabel: (column: string) => string,

  rowCount: number,
  columnWidth: number | ({ column: string }) => number,
  rowHeight: number | ({ column: string }) => number,

  overscanColumnCount: number,
  overscanRowCount: number,
  height: number,

  // formComponent: React.ComponentType<FormProps>,
  onSelect: () => {},
  // onSort: () => {},
  masterDetail: boolean,

  classes: any,
};

type State = {}

const styles = theme => ({
  GridRow: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
  },
  GridColumn: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 auto',
  },
  LeftSideGridContainer: {
    flex: '0 0 75px',
    zIndex: 10,
  },
  LeftSideGrid: {
    overflow: 'hidden !important',
  },
  HeaderGrid: {
    width: '100%',
    overflow: 'hidden !important',
  },
  BodyGrid: {
    width: '100%',
  },
  cell: {
    borderBottom: [[1, 'solid', theme.palette.divider]],
    borderRight: [[1, 'solid', theme.palette.divider]],
    cursor: 'pointer'
  }
})

class DynamicSearchGrid extends React.PureComponent<Props, State> {
  static defaultProps = {
    overscanColumnCount: 10,
    overscanRowCount: 20,
    masterDetail: false,
    multiline: false,
    height: 300,
  }

  renderBodyCell: Function
  renderHeaderCell: Function
  renderLeftSideCell: Function
  renderLeftHeaderCell: Function
  onSectionRendered: Function
  getColumnWidth: Function
  onCellClick: Function
  bodyGridRef: React.ElementRef<Grid>

  //$FlowFixMe
  constructor (props) {
    super(props)

    this.state = {}

    this.bodyGridRef = React.createRef()
    this.leftColumnGridRef = React.createRef()

    this.renderBodyCell = this.renderBodyCell.bind(this)
    this.renderHeaderCell = this.renderHeaderCell.bind(this)
    this.renderLeftSideCell = this.renderLeftSideCell.bind(this)
    this.renderLeftHeaderCell = this.renderLeftHeaderCell.bind(this)
    this.onSectionRendered = this.onSectionRendered.bind(this)
    this.getColumnWidth = this.getColumnWidth.bind(this)
    this.onCellClick = this.onCellClick.bind(this)
  }

  /* START Grid updating */

  forceUpdateGrid () {
    if (this.bodyGridRef.current) this.bodyGridRef.current.forceUpdate()
    if (this.leftColumnGridRef.current) this.leftColumnGridRef.current.forceUpdate()
  }

  componentDidUpdate () {
    this.forceUpdateGrid()
  }

  /* END Grid updating */

  /* START Various getters */

  getColumn (columnIndex) {
    return this.props.columns[columnIndex - 1]
  }

  getColumnWidth ({ index }) {
    if (index < 1) {
      return leftCellWidth
    }

    const { columnWidth } = this.props
    if (typeof columnWidth === 'number') {
      return columnWidth
    }

    const column = this.getColumn(index)
    return columnWidth({ column })
  }

  /* END Various getters */

  /* START Cell rendering */
  selectableCell({ rowIndex }) {
    const { isSelected } = this.props
    const selected = isSelected({ rowIndex })

    return {
      onClick: this.onCellClick,
      selected,
      'data-row-index': rowIndex,
    }
  }

  onCellClick (event) {
    const rowIndex = Number(event.currentTarget.dataset.rowIndex)
    const { onSelect } = this.props
    onSelect({ rowIndex })
  }

  renderBodyCell ({ columnIndex, key, rowIndex, style }) {
    if (columnIndex < 1) {
      return false
    }

    const { cellRenderer, getDataRow, classes, isSelected } = this.props
    const column = this.getColumn(columnIndex)
    const dataRow = getDataRow({ index: rowIndex })
    const selected = isSelected({ rowIndex })

    const props = {
      key,
      style,
      className: classes.cell,
      ...this.selectableCell({ rowIndex }),
    }

    return cellRenderer({ column, dataRow, columnIndex, rowIndex, props })
  }

  renderLeftSideCell ({ columnIndex, key, rowIndex, style }) {
    const { multiline, classes } = this.props

    return (
      <LeftRadioCell
        key={key}
        style={style}
        className={classes.cell}
        multiline={multiline}
        {...this.selectableCell({rowIndex})}
      />
    )
  }

  renderHeaderCell ({ columnIndex, key, rowIndex, style }) {
    if (columnIndex < 1) {
      return
    }

    const { columnLabel, classes } = this.props
    const label = columnLabel(this.getColumn(columnIndex))

    return (
      <HeaderCell key={key} style={style} className={classes.cell}>
        {label}
      </HeaderCell>
    )
  }

  // noinspection JSMethodCanBeStatic
  renderLeftHeaderCell ({ columnIndex, key, style, label }) {
    const { classes } = this.props

    return (
      <HeaderCell key={key} style={style} className={classes.cell}/>
    )
  }

  /* END Cell rendering */

  /**
   * Renaming onSectionRendered with onRowsRendered
   */
  onSectionRendered ({ rowStartIndex, rowStopIndex }) {
    this.props.onRowsRendered({
      startIndex: rowStartIndex,
      stopIndex: rowStopIndex
    })
  }

  render () {
    const {
      onSelect,
      columns,
      rowCount,
      rowHeight,
      multiline,
      masterDetail,
      overscanColumnCount,
      overscanRowCount,
      height,
      classes
    } = this.props

    const firstRowHeight = headerCellHeight
    const columnCount = columns.length + 1

    if (multiline && masterDetail) {
      console.error('multiline and masterDetail not supported together.')
      return false
    }

    const firstColumnWidth = this.getColumnWidth({ index: 0 })
    const scrollbarSizeCalculated = scrollbarSize()

    return <ScrollSync>
      {({
          clientHeight,
          clientWidth,
          onScroll,
          scrollHeight,
          scrollLeft,
          scrollTop,
          scrollWidth,
        }) => (
        <div className={classes.GridRow}>

          {/* FIRST TOP LEFT CELL */}
          <div
            className={classes.LeftSideGridContainer}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
            }}>
            <Grid
              cellRenderer={this.renderLeftHeaderCell}
              width={firstColumnWidth}
              height={firstRowHeight}
              rowHeight={firstRowHeight}
              columnWidth={firstColumnWidth}
              rowCount={1}
              columnCount={1}
            />
          </div>

          {/* FIRST COLUMN */}
          <div
            className={classes.LeftSideGridContainer}
            style={{
              position: 'absolute',
              left: 0,
              top: firstRowHeight,
            }}>
            <Grid
              ref={this.leftColumnGridRef}
              className={classes.LeftSideGrid}
              overscanColumnCount={overscanColumnCount}
              overscanRowCount={overscanRowCount}
              cellRenderer={this.renderLeftSideCell}
              columnWidth={firstColumnWidth}
              columnCount={1}
              height={height - scrollbarSizeCalculated}
              rowHeight={rowHeight}
              rowCount={rowCount}
              scrollTop={scrollTop}
              width={firstColumnWidth}
            />
          </div>

          <div className={classes.GridColumn}>
            <AutoSizer disableHeight>
              {({ width }) => (
                <div>

                  {/* FIRST ROW */}
                  <div
                    style={{
                      height: firstRowHeight,
                      width: width - scrollbarSizeCalculated,
                    }}>
                    <Grid
                      className={classes.HeaderGrid}
                      columnWidth={this.getColumnWidth}
                      columnCount={columnCount}
                      height={firstRowHeight}
                      overscanColumnCount={overscanColumnCount}
                      cellRenderer={this.renderHeaderCell}
                      rowHeight={firstRowHeight}
                      rowCount={1}
                      scrollLeft={scrollLeft}
                      width={width - scrollbarSizeCalculated}
                    />
                  </div>

                  {/* TABLE CONTENT */}
                  <div
                    style={{
                      height,
                      width,
                    }}>
                    <Grid
                      ref={this.bodyGridRef}
                      className={classes.BodyGrid}
                      onSectionRendered={this.onSectionRendered}
                      columnWidth={this.getColumnWidth}
                      columnCount={columnCount}
                      height={height}
                      onScroll={onScroll}
                      overscanColumnCount={overscanColumnCount}
                      overscanRowCount={overscanRowCount}
                      cellRenderer={this.renderBodyCell}
                      rowHeight={rowHeight}
                      rowCount={rowCount}
                      width={width}
                    />
                  </div>

                </div>
              )}
            </AutoSizer>
          </div>
        </div>
      )}
    </ScrollSync>
  }
}

type StyleProps = {
  classes: any,
}

const DynamicSearchGridStyled: React.Component<$Diff<Props, StyleProps>> = withStyles(styles)(DynamicSearchGrid)
export default DynamicSearchGridStyled
