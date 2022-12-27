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
import MultipleDatesPicker from "@ambiot/material-ui-multiple-dates-picker";
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
import Loader from "../Loader";
import moment from "moment";
import { absent, multiAbsent, nwMonth } from "../../api/attendance";
import { useNavigate } from "react-router-dom";

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
    label: "الإسم رباعي",
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
    label: "الراتب",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "الغياب",
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

export default function EnhancedTable({
  data: { employees: data },
  isLoading,
}) {
  const [deleteLoading, setDeleteLoading] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open3, setOpen3] = React.useState(false);
  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => setOpen3(false);

  const [open4, setOpen4] = React.useState(false);
  const handleOpen4 = () => setOpen4(true);
  const handleClose4 = () => setOpen4(false);

  const [filteredData, setFilteredData] = React.useState([]);
  const [searchTxt, setSearchTxt] = React.useState("");
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [idSelected, setIdSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  // eslint-disable-next-line
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [loaded, setLoaded] = React.useState(false);
  const [absence, setAbsence] = React.useState(false);
  const [newM, setNewM] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState("");
  const [dates, setDates] = React.useState([]);

  let date = moment(new Date()).format("YYYY-MM-DD");
  //naviagation here
  let navigate = useNavigate();

  React.useEffect(() => {
    var hasNumber = /\d/;
    const dataFilter = data?.filter((employee) => {
      if (hasNumber.test(searchTxt)) {
        return String(employee.emp_id).includes(searchTxt);
      } else {
        return employee.emp_name.includes(searchTxt);
      }
    });
    setFilteredData(dataFilter);
  }, [data, searchTxt]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = filteredData.map((n) => n.name);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredData.length) : 0;

  const search = (text) => {
    setSearchTxt(text);
  };

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
  const handlAbsent = () => {
    setLoaded(true);

    //call backend
    absent(idSelected, date)
      .then((res) => {
        setLoaded(false);
        setAbsence(true);
        setTimeout(() => navigate("/"), 500);
      })
      .catch((err) => {
        setLoaded(false);
        setAbsence(false);
        setErrMsg(err.response.data);
        setTimeout(() => window.location.reload(), 900);
      });
  };
  const MultipleAbsent = () => {
    setLoaded(true);

    //call backend
    multiAbsent(idSelected, dates)
      .then((res) => {
        setLoaded(false);
        setAbsence(true);
        console.log(res);
        setTimeout(() => navigate("/present-schedule/records"), 900);
      })
      .catch((err) => {
        setLoaded(false);
        setAbsence(false);
        setErrMsg(err.response.data);
        setTimeout(() => window.location.reload(), 900);
      });
  };
  const handleNwMonth = () => {
    setLoaded(true);

    //call db
    nwMonth()
      .then((res) => {
        setLoaded(false);
        setNewM(true);
        setTimeout(() => window.location.reload(), 1000);
      })
      .catch((err) => {
        setLoaded(false);
        setNewM(false);
        setErrMsg(err.response.data);
      });
  };

  if (isLoading || loaded) {
    return <Loader />;
  }
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
            قائمة الغياب
          </Typography>
          {absence && (
            <div className="alert alert-success">تم تسجيل الغياب بنجاح</div>
          )}
          {errMsg && <div className="alert alert-danger">{errMsg}</div>}
          <Typography id="modal-modal-description" sx={{ mb: 1 }}>
            تأكيد قائمة الغياب:
          </Typography>
          {selected.map(({ emp_name }) => (
            <Typography key={emp_name}>- {emp_name}</Typography>
          ))}
          <div className="mt-2" style={{ marginTop: "10px" }}>
            <Button
              variant="contained"
              disableElevation
              onClick={() => handlAbsent()}
            >
              نعم
            </Button>
            <Button
              variant="contained"
              disableElevation
              color="error"
              style={{ margin: "0 10px" }}
              onClick={handleClose}
            >
              لا
            </Button>
          </div>
        </Box>
      </Modal>

      <Modal
        open={open4}
        onClose={handleClose4}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {newM && (
            <div className="alert alert-success">
              تم تفعيل بداية الشهر بنجاح
            </div>
          )}
          <Typography id="modal-modal-title" variant="h6" component="h1">
            تفعيل الشهر الجديد
          </Typography>

          <Typography id="modal-modal-description" sx={{ mb: 1 }}>
            هل انت متأكد من رغبتك في تفعيل بداية الشهر
          </Typography>

          <div className="mt-2" style={{ marginTop: "10px" }}>
            <Button
              variant="contained"
              disableElevation
              onClick={() => handleNwMonth()}
            >
              نعم
            </Button>
            <Button
              variant="contained"
              disableElevation
              color="error"
              style={{ margin: "0 10px" }}
              onClick={handleClose4}
            >
              لا
            </Button>
          </div>
        </Box>
      </Modal>

      <Modal
        open={open3}
        onClose={handleClose3}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h1">
            الغياب المتعدد
          </Typography>
          {absence && (
            <div className="alert alert-success">تم تسجيل الغياب بنجاح</div>
          )}
          {errMsg && <div className="alert alert-danger">{errMsg}</div>}
          <Typography id="modal-modal-description" sx={{ mb: 1 }}>
            اسم الموظف
          </Typography>
          {selected.map(({ emp_name }) => (
            <Typography key={emp_name}>- {emp_name}</Typography>
          ))}

          <div className="text-center mt-3 mb-3">
            <Button
              variant="contained"
              disableElevation
              onClick={() => setOpen2(true)}
            >
              تواريخ الغياب
            </Button>
          </div>

          <div className="mt-2" style={{ marginTop: "10px" }}>
            <Button
              variant="contained"
              disableElevation
              onClick={() => MultipleAbsent()}
            >
              نعم
            </Button>

            <Button
              variant="contained"
              disableElevation
              color="error"
              style={{ margin: "0 10px" }}
              onClick={handleClose3}
            >
              لا
            </Button>
          </div>
        </Box>
      </Modal>

      <MultipleDatesPicker
        open={open2}
        selectedDates={[]}
        onCancel={() => setOpen2(false)}
        onSubmit={(dates) => {
          setDates(dates);
          setOpen2(false);
        }}
      />

      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems={{ xs: "start", md: "center" }}
        justifyContent="space-between"
        spacing={1}
        mb={1}
      >
        <div>
          {/* <TextField label="Search input" variant="outlined" fullWidth />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton> */}
          <FormControl sx={{ width: "300px" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">بحث</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              onChange={(e) => search(e.target.value)}
              label="بحث"
            />
          </FormControl>
        </div>
        <div>
          <Button variant="contained" size="small" onClick={handleOpen3}>
            غياب متعدد
          </Button>

          <Button
            variant="contained"
            size="small"
            className="mx-2"
            onClick={handleOpen4}
          >
            شهر جديد
          </Button>
          <Button variant="contained" size="small" onClick={handleOpen}>
            حفظ
          </Button>
        </div>
      </Stack>

      <Box>
        <br />
        <h5 className="">التاريخ: {date}</h5>
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
                        <TableCell>
                          <span>{row.salary} جنيه</span>
                        </TableCell>
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>
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
      </Box>
    </>
  );
}
