import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import {
  Avatar,
  Button,
  FormControl,
  InputLabel,
  ListItem,
  ListItemText,
  OutlinedInput,
  Modal,
} from "@mui/material";
import { Stack } from "@mui/system";
import moment from "moment";
import { DeleteAll, DeletOne } from "../../api/attendance";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "الإسم",
  },
  {
    id: "title",
    numeric: false,
    disablePadding: false,
    label: "المسمى الوظيفي",
  },
  {
    id: "salary",
    numeric: false,
    disablePadding: false,
    label: "السكن",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox"> */}
        {/* <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          /> */}
        {/* </TableCell> */}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            // align={headCell.numeric ? 'right' : 'left'}
            // padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Nutrition
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable({ employees: data, date: date }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //-------------
  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [idSelected, setIdSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  // eslint-disable-next-line
  const [dense, setDense] = React.useState(false);
  const [isloading, setIsloading] = React.useState(false);
  const [deleted, setDeleted] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  //naviagation here
  let navigate = useNavigate();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.name);
      setSelected(newSelecteds);
    }
    setSelected([]);
  };

  const handleClick = (event, { emp_name, emp_id }) => {
    const entry = { emp_name, emp_id };
    const selectedIndex = selected.findIndex(
      (item) => item.emp_id === entry.emp_id
    );
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, entry);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
    // id selected
    const idSelectedIndex = selected.findIndex(
      (item) => item.emp_id === emp_id
    );

    let newIdSelected = [];

    if (idSelectedIndex === -1) {
      newIdSelected = newIdSelected.concat(idSelected, emp_id);
    } else if (idSelectedIndex === 0) {
      newIdSelected = newIdSelected.concat(idSelected.slice(1));
    } else if (idSelectedIndex === selected.length - 1) {
      newIdSelected = newIdSelected.concat(idSelected.slice(0, -1));
    } else if (idSelectedIndex > 0) {
      newIdSelected = newIdSelected.concat(
        idSelected.slice(0, emp_id),
        idSelected.slice(emp_id + 1)
      );
    }
    setIdSelected(newIdSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const handleChangeDense = (event) => {
  //   setDense(event.target.checked);
  // };

  const isSelected = (emp_id) =>
    selected.findIndex((item) => item.emp_id === emp_id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  //   const deleteItem = async () => {
  //     setDeleteLoading(true);
  //     await Promise.all(
  //       selected.map(async ({ id }) => {
  //         await userDelete({
  //           variables: {
  //             userDeleteId: id,
  //           },
  //         });
  //       })
  //     );
  //     setDeleteLoading(false);
  //     handleClose();
  //     setSelected([])
  //   };

  //backend functions----------------------------

  //delete from the schedule
  const DeleteItem = () => {
    setIsloading(true);

    //call backend
    DeletOne(date, idSelected)
      .then((res) => {
        setIsloading(false);
        setErrMsg("");
        setDeleted(true);
        setTimeout(() => window.location.reload(), 900);
      })
      .catch((err) => {
        setIsloading(false);
        setDeleted(false);
        setErrMsg(err.respone.data);
      });
  };
  const DeleteSchedule = () => {
    setIsloading(true);

    //call backend
    DeleteAll(date)
      .then((res) => {
        setIsloading(false);
        setErrMsg("");
        setDeleted(true);
        setTimeout(() => window.location.reload(), 900);
      })
      .catch((err) => {
        setIsloading(false);
        setDeleted(false);
        setErrMsg(err.respone.data);
      });
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h1">
            حذف من قائمة الغياب
          </Typography>
          {isloading && <Loader />}
          {deleted && (
            <div className="alert alert-success">
              تم حذف من قائمة الغياب بنجاح
            </div>
          )}
          {errMsg && <div className="alert alert-danger">{errMsg}</div>}
          <Typography id="modal-modal-description" sx={{ mb: 1 }}>
            هل انت متأكد من حذف:
          </Typography>
          {selected.map(({ emp_name }) => (
            <Typography key={emp_name}>- {emp_name}</Typography>
          ))}
          <div className="mt-2" style={{ marginTop: "10px" }}>
            <Button
              variant="contained"
              disableElevation
              color="error"
              onClick={() => DeleteItem()}
            >
              Yes
            </Button>
            <Button
              variant="contained"
              disableElevation
              style={{ margin: "0 10px" }}
              onClick={handleClose}
            >
              No
            </Button>
          </div>
        </Box>
      </Modal>

      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h1">
            حذف قائمة الغياب
          </Typography>
          {isloading && <Loader />}
          {deleted && (
            <div className="alert alert-success">تم حذف قائمة الغياب بنجاح</div>
          )}
          {errMsg && <div className="alert alert-danger">{errMsg}</div>}
          <Typography id="modal-modal-description" sx={{ mb: 1 }}>
            <h5>هل انت متأكد من حذف جميع القائمة !!</h5>
          </Typography>
          <div className="mt-2" style={{ marginTop: "10px" }}>
            <Button
              variant="contained"
              disableElevation
              color="error"
              onClick={() => DeleteSchedule()}
            >
              Yes
            </Button>
            <Button
              variant="contained"
              disableElevation
              style={{ margin: "0 10px" }}
              onClick={handleClose2}
            >
              No
            </Button>
          </div>
        </Box>
      </Modal>

      <div>
        <IconButton
          aria-label="delete"
          onClick={handleOpen}
          disabled={selected.length === 0 ? true : false}
          className="mx-1"
        >
          <DeleteIcon />
        </IconButton>
        <button className="btn btn-danger" onClick={handleOpen2}>
          حذف قائمة الغياب
        </button>
      </div>

      <Box>
        <br />
        <Paper sx={{ mb: 2 }}>
          {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={data.length}
              />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                {stableSort(data, getComparator(order, orderBy))
                  // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.emp_id);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.emp_id}
                        selected={isItemSelected}
                      >
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          // padding="none"
                        >
                          <ListItem disablePadding>
                            <Avatar alt="user" src={`/images/${row.imgLink}`} />
                            <ListItemText
                              style={{ margin: "10px" }}
                              primary={row.emp_name}
                            />
                          </ListItem>
                        </TableCell>

                        <TableCell>{row.jobTitle}</TableCell>
                        <TableCell>{row.address}</TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            style={{ padding: "0", direction: "ltr", alignItems: "center" }}
          />
        </Paper>
      </Box>
    </>
  );
}
