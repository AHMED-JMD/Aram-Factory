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
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { Link } from "react-router-dom";
import {
  Avatar,
  Button,
  Divider,
  FormControl,
  InputAdornment,
  InputLabel,
  ListItem,
  ListItemText,
  OutlinedInput,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";
import { Stack } from "@mui/system";
import moment from "moment";
import Loader from "../Loader";
import { add } from "../../api/salaries";

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
    disablePadding: true,
    label: "الوظيفة",
  },
  {
    id: "salary",
    numeric: true,
    disablePadding: false,
    label: "الراتب",
  },
  {
    id: "plus",
    numeric: true,
    disablePadding: false,
    label: "الإضافي",
  },
  {
    id: "m17",
    numeric: true,
    disablePadding: false,
    label: "منحة رئاسية 2017",
  },
  {
    id: "m19",
    numeric: true,
    disablePadding: false,
    label: "منحة خاصة 2019",
  },
  {
    id: "m20",
    numeric: true,
    disablePadding: false,
    label: "منحة العام 2020",
  },
  {
    id: "m22",
    numeric: true,
    disablePadding: false,
    label: "منحة العام 2022",
  },
  {
    id: "mceo",
    numeric: true,
    disablePadding: false,
    label: "منحة المدير العام",
  },
  {
    id: "p",
    numeric: true,
    disablePadding: false,
    label: "خصم التأمين",
  },
  {
    id: "ss",
    numeric: true,
    disablePadding: false,
    label: "صافي المرتب",
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

export default function EnhancedTable({ employeeData: { data } }) {
  console.log(data);

  const [open, setOpen] = React.useState(false);
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [filteredData, setfilteredData] = React.useState([]);
  const [searchTxt, setSearchTxt] = React.useState("");
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  // eslint-disable-next-line
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [loading, setLoading] = React.useState(false);
  const [added, setAdded] = React.useState(false);

  const [errMsg, setErrMsg] = React.useState("");

  let date = moment(new Date()).format("DD/MM/YYYY");

  React.useEffect(() => {
    const dataFilter = data.filter((employee) =>
      employee.emp_name.includes(searchTxt)
    );
    setfilteredData(dataFilter);
  }, [data, searchTxt]);

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

  const handleClick = (event, { name, id }) => {
    const entry = { name, id };
    const selectedIndex = selected.findIndex((item) => item.id === entry.id);
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

  const isSelected = (id) =>
    selected.findIndex((item) => item.id === id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredData.length) : 0;

  const search = (text) => {
    setSearchTxt(text);
  };

  //backend function herer-------------------
  const handleSubmit = () => {
    setLoading(true);

    //call db
    add(date)
      .then((res) => {
        setLoading(false);
        setErrMsg("");
        setAdded(true);
        console.log(res.data);
      })
      .catch((err) => {
        setLoading(false);
        setErrMsg(err.response.data);
      });
  };
  let rowTotal = 0;

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete a user
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, mb: 1 }}>
            are you sure you want to delete:
          </Typography>
          {selected.map(({ name }) => (
            <Typography key={name}>- {name}</Typography>
          ))}
          <div className="mt-2" style={{ marginTop: "10px" }}>
            <Button
              variant="contained"
              disableElevation
              color="error"
              // onClick={() => deleteItem()}
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
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems={{ xs: "start", md: "center" }}
        justifyContent="space-between"
        spacing={1}
        mb={1}
      >
        <FormControl sx={{ width: "300px" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">بحث</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            onChange={(e) => search(e.target.value)}
            label="بحث"
          />
        </FormControl>
        <div>
          <Button
            variant="contained"
            aria-label="add new present table"
            size="small"
            href="/salaries/past-salaries"
            style={{ color: "#fff" }}
          >
            الكشوفات السابقة
          </Button>
          <Button
            variant="contained"
            aria-label="add new present table"
            // disabled={selected.length === 0 ? true : false}
            // onClick={}
            className="mx-2"
            size="small"
          >
            + كشف جديد
          </Button>
          <Button variant="contained" size="small" onClick={handleSubmit}>
            حفظ
          </Button>
        </div>
      </Stack>
      <Box>
        {loading && <Loader />}
        {added && (
          <div className="alert alert-success">تم اضافة كشف جديد بنجاح</div>
        )}
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
                rowCount={filteredData.length}
              />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                {stableSort(filteredData, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.emp_id);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    rowTotal =
                      row.salary +
                      row.grant.extra +
                      row.grant.grant17 +
                      row.grant.grant19 +
                      row.grant.grant20 +
                      row.grant.grant22 +
                      row.grant.grantGM -
                      row.grant.insurance;
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
                        {/* <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                            />
                          </TableCell> */}
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          // padding="none"
                        >
                          <ListItem disablePadding>
                            <Avatar alt="user" src={row.url} />
                            <ListItemText
                              style={{ margin: "10px" }}
                              primary={row.emp_name}
                            />
                          </ListItem>
                        </TableCell>

                        <TableCell>{row.jobTitle}</TableCell>
                        <TableCell>{row.salary}</TableCell>
                        <TableCell>{row.grant.extra}</TableCell>
                        <TableCell>{row.grant.grant17}</TableCell>
                        <TableCell>{row.grant.grant19}</TableCell>
                        <TableCell>{row.grant.grant20}</TableCell>
                        <TableCell>{row.grant.grant22}</TableCell>
                        <TableCell>{row.grant.grantGM}</TableCell>
                        <TableCell>{row.grant.insurance}</TableCell>
                        <TableCell>{rowTotal}</TableCell>
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
            count={filteredData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            style={{ padding: "0", direction: "ltr", alignItems: "center" }}
          />
        </Paper>
        <div className="d-flex flex-wrap justify-content-between">
          <h6 className="text-center">
            المجموع: <span>{rowTotal}</span> جنيه
          </h6>
          <h6 className="text-center">
            التاريخ: <span>{date}</span>
          </h6>
        </div>
      </Box>
    </>
  );
}
