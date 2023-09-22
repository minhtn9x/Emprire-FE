import React, { Fragment } from "react"
import PropTypes from "prop-types"
import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  useFilters,
  useExpanded,
  usePagination,
} from "react-table"
import { Table, Row, Col, Button, Input } from "reactstrap"
import { Filter, DefaultColumnFilter, SelectColumnFilter } from "./filters"

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <Col sm={4}>
      <div className="search-box me-2 mb-2 d-inline-block search-table">
        <div className="position-relative">
          <label htmlFor="search-bar-0" className="search-label">
            <span id="search-bar-0-label" className="sr-only">
              Search this table
            </span>
            <input
              onChange={e => {
                setValue(e.target.value)
                onChange(e.target.value)
              }}
              id="search-bar-0"
              type="text"
              className="form-control"
              placeholder={`${count} dòng...`}
              value={value || ""}
            />
          </label>
          <i className="bx bx-search-alt search-icon"></i>
        </div>
      </div>
    </Col>
  )
}

const TableContainer = ({
  columns,
  data,
  isGlobalFilter,
  isAddOptions,
  isAddUserList,
  isAddBookingOptions,
  isCheckin,
  isAddNew,
  isCountCusToday,
  isAddFileExcel,
  handleBookingClick,
  handleOrderClicks,
  handleUserClick,
  handleAddNewClick,
  handleCheckInClick,
  handleAddFileExcelClick,
  countCusTody,
  customPageSize,
  className,
  customPageSizeOptions,
}) => {
  // const sortees = React.useMemo(
  //   () => [
  //     {
  //       id: "order.createdAt",
  //       desc: true,
  //     },
  //   ],
  //   []
  // )
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: {
        pageIndex: 0,
        pageSize: customPageSize,
        // sortBy: [
        //   {
        //     desc: true,
        //   },
        // ],
        // sortBy: sortees,
      },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination
  )

  const generateSortingIndicator = column => {
    return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""
  }

  const onChangeInSelect = event => {
    setPageSize(Number(event.target.value))
  }

  const onChangeInInput = event => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0
    gotoPage(page)
  }
  return (
    <Fragment>
      <Row className="mb-2">
        {/* <Col md={customPageSizeOptions ? 2 : 1}></Col> */}
        <Col sm={2}>
          <select
            className="form-select"
            value={pageSize}
            onChange={onChangeInSelect}
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Hiển thị {pageSize}
              </option>
            ))}
          </select>
        </Col>
        {isGlobalFilter && (
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        )}
        {isAddOptions && (
          <Col sm="7">
            <div className="text-sm-end">
              <Button
                type="button"
                color="success"
                className="btn-rounded  mb-2 me-2"
                onClick={handleOrderClicks}
              >
                <i className="mdi mdi-plus me-1" />
                Add New Order
              </Button>
            </div>
          </Col>
        )}
        {isAddUserList && (
          <Col sm="7">
            <div className="text-sm-end">
              <Button
                type="button"
                color="primary"
                className="btn mb-2 me-2"
                onClick={handleUserClick}
              >
                <i className="mdi mdi-plus-circle-outline me-1" />
                Create New User
              </Button>
            </div>
          </Col>
        )}
        {isAddNew && (
          <Col sm={6}>
            <div className="text-sm-end">
              <Button
                type="button"
                color="primary"
                className="btn-rounded mb-2 me-2"
                onClick={handleAddNewClick}
              >
                <i className="mdi mdi-plus me-1" />
                Tạo mới
              </Button>
              {isAddFileExcel && (
                <Button
                  type="button"
                  color="success"
                  className="mb-2"
                  onClick={handleAddFileExcelClick}
                >
                  <i className="mdi mdi-file-plus-outline me-1" />
                  Excel
                </Button>
              )}
            </div>
          </Col>
        )}
        {isCheckin && (
          <Col sm="7">
            <div className="text-sm-end">
              <Button
                type="button"
                color="success"
                onClick={handleCheckInClick}
              >
                <i className="mdi mdi-qrcode-scan me-1" />
                Quét mã Check-in
              </Button>
            </div>
          </Col>
        )}
        {isAddBookingOptions && (
          <Col sm="7">
            <div className="text-sm-end">
              <Button
                type="button"
                color="primary"
                className="btn mb-2 me-2"
                onClick={handleBookingClick}
              >
                <i className="mdi mdi-plus-circle-outline me-1" />
                Thêm đặt lịch
              </Button>
            </div>
          </Col>
        )}
        {isCountCusToday && (
          <Col sm="6">
            <div className="text-sm-end mt-3">
              {countCusTody > 0 && (
                <em>Hôm nay có {countCusTody} khách hàng mới</em>
              )}
            </div>
          </Col>
        )}
      </Row>

      <div className="table-responsive react-table">
        <Table bordered hover {...getTableProps()} className={className}>
          <thead className="table-light table-nowrap">
            {headerGroups.map(headerGroup => (
              <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th key={column.id}>
                    <div {...column.getSortByToggleProps()}>
                      {column.render("Header")}
                      {generateSortingIndicator(column)}
                    </div>
                    {/* <Filter column={column} /> */}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map(row => {
              prepareRow(row)
              return (
                <Fragment key={row.getRowProps().key}>
                  <tr>
                    {row.cells.map(cell => {
                      return (
                        <td key={cell.id} {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </td>
                      )
                    })}
                  </tr>
                </Fragment>
              )
            })}
          </tbody>
        </Table>
      </div>

      <Row className="justify-content-sm-end justify-content-center align-items-center">
        <Col className="col-sm-auto">
          <div className="d-flex gap-1">
            <Button
              color="primary"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              {"<<"}
            </Button>
            <Button
              color="primary"
              onClick={previousPage}
              disabled={!canPreviousPage}
            >
              {"<"}
            </Button>
          </div>
        </Col>
        <Col className="col-sm-auto">
          Trang{" "}
          <strong>
            {pageIndex + 1} / {pageOptions.length}
          </strong>
        </Col>
        {/* <Col className="col-sm-auto">
          <Input
            type="number"
            min={1}
            style={{ width: 70 }}
            max={pageOptions.length}
            defaultValue={pageIndex + 1}
            onChange={onChangeInInput}
          />
        </Col> */}

        <Col className="col-sm-auto">
          <div className="d-flex gap-1">
            <Button color="primary" onClick={nextPage} disabled={!canNextPage}>
              {">"}
            </Button>
            <Button
              color="primary"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </Button>
          </div>
        </Col>
      </Row>
    </Fragment>
  )
}

TableContainer.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
}

export default TableContainer
