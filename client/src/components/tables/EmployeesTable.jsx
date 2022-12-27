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
import DeleteIcon from "@mui/icons-material/Delete";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import ArchiveIcon from "@mui/icons-material/Archive";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  ListItem,
  ListItemText,
  OutlinedInput,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Stack } from "@mui/system";
import { deleteEmployee } from "../../api/employee";
import Loader from "../Loader";
import moment from "moment";
import { borrow } from "../../api/borrow";
import { warning } from "../../api/warning";
import { add } from "../../api/archive";
import { useReactToPrint } from "react-to-print";

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
    id: "check",
    numeric: false,
    disablePadding: true,
    label: "",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "الإسم رباعي",
  },
  {
    id: "id",
    numeric: false,
    disablePadding: false,
    label: "الرقم التعريفي",
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
    label: "الراتب الاساسي",
  },
  {
    id: "net_salary",
    numeric: false,
    disablePadding: false,
    label: "الراتب",
  },
  {
    id: "phone",
    numeric: true,
    disablePadding: false,
    label: "الانذارات",
  },
  {
    id: "dateofbirth",
    numeric: false,
    disablePadding: false,
    label: "الغياب في الشهر",
  },
  {
    id: "address",
    numeric: false,
    disablePadding: false,
    label: "الغياب في السنة",
  },
  {
    id: "edit",
    numeric: false,
    disablePadding: false,
    label: "عرض/تعديل",
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
        <TableCell padding="checkbox">
          {/* <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          /> */}
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            // align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? "none" : "normal"}
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

export default function EnhancedTable({ employeeData: data }) {
  console.log(data);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const [open3, setOpen3] = React.useState(false);
  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => setOpen3(false);

  const [filteredData, setfilteredData] = React.useState([]);
  const [searchTxt, setSearchTxt] = React.useState("");
  const [amount, setAmount] = React.useState(0);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [idSelected, setIdSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  // eslint-disable-next-line
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [isLoading, setIsLoading] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [deleted, setDeleted] = React.useState(false);
  const [deducted, setDeducted] = React.useState(false);
  const [warned, setWarned] = React.useState(false);
  const [archeived, setArcheived] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState("");

  let date = moment(new Date()).format("YYYY/MM/DD");

  //navigation variable
  // let navigate = useNavigate();

  React.useEffect(() => {
    var hasNumber = /\d/; 
    const dataFilter = data?.filter((employee) => {   
    if(hasNumber.test(searchTxt)){
      return String(employee.emp_id).includes(searchTxt);
    } else{
      return  employee.emp_name.includes(searchTxt);
    } 
  });
    setfilteredData(dataFilter);
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

  const handleClick = (event, { emp_name, emp_id, warnings }) => {
    const entry = { emp_name, emp_id, warnings };
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
    // idSelected
    // const idEntry = {emp_id};
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

  //printing functions goes herer-----------------------------
  const componentRef = React.useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  //backend functions---------------------------------------
  const Archive = () => {
    setLoading(true);

    //call to db
    add(idSelected)
      .then((res) => {
        setLoading(false);
        setArcheived(true);
        setTimeout(() => window.location.reload(), 1000);
      })
      .catch((err) => {
        setLoading(false);
        setArcheived(false);
        setErrMsg(err.response.data);
      });
  };
  const deleteItem = () => {
    setIsLoading(true);
    //call db
    deleteEmployee(idSelected)
      .then((res) => {
        setIsLoading(false);
        setDeleted(true);
        setErrMsg("");
        setTimeout(() => window.location.reload(), 1000);
      })
      .catch((err) => {
        setIsLoading(false);
        setDeleted(false);
        setErrMsg(err.response.data);
      });
  };
  const DeductItem = () => {
    setIsLoading(true);

    //call db
    borrow(idSelected, amount, date)
      .then((res) => {
        setIsLoading(false);
        setDeducted(true);
        setErrMsg("");
        setTimeout(() => window.location.reload(), 1000);
      })
      .catch((err) => {
        setIsLoading(false);
        setDeducted(false);
        setErrMsg(err.response.data);
      });
  };
  const WarnItem = () => {
    setIsLoading(true);

    //call db
    warning(idSelected)
      .then((res) => {
        setIsLoading(false);
        setWarned(true);
        setErrMsg("");
        setTimeout(() => window.location.reload(), 1000);
      })
      .catch((err) => {
        setIsLoading(false);
        setWarned(false);
        setErrMsg(err.response.data);
        setTimeout(() => window.location.reload(), 1000);
      });
  };

  if (loading) {
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
            حذف موظف
          </Typography>
          {isLoading && <Loader />}
          {deleted && (
            <div className="alert alert-success">تم حذف الموظف بنجاح</div>
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
              onClick={() => deleteItem()}
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
        open={open2}
        onClose={handleClose2}
        aria-labelledby="add-new-salary-cut"
        aria-describedby="add-new-salary-cut"
      >
        <Box sx={style}>
          <Typography id="cut-title" variant="h6" component="h1">
            السلفيات
          </Typography>
          {isLoading && <Loader />}
          {deducted && (
            <div className="alert alert-success">تم خصم القيمة بنجاح</div>
          )}
          {errMsg && <div className="alert alert-danger">{errMsg}</div>}
          {selected.map(({ emp_name, emp_id }) => (
            <Typography key={emp_id}>- {emp_name}</Typography>
          ))}
          <FormControl fullWidth sx={{ m: 1 }} variant="standard">
            <InputLabel htmlFor="standard-adornment-amount">القيمة</InputLabel>
            <Input
              id="standard-adornment-amount"
              onChange={(e) => setAmount(e.target.value)}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
            />
          </FormControl>
          <div className="mt-2" style={{ marginTop: "10px" }}>
            <Button
              variant="contained"
              disableElevation
              onClick={() => DeductItem()}
            >
              موافق
            </Button>
            <Button
              variant="contained"
              disableElevation
              color="error"
              style={{ margin: "0 10px" }}
              onClick={handleClose2}
            >
              إلغاء
            </Button>
          </div>
        </Box>
      </Modal>

      <Modal
        open={open3}
        onClose={handleClose3}
        aria-labelledby="archive"
        aria-describedby="archive"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h1">
            إنذار موظف
          </Typography>
          {isLoading && <Loader />}
          {warned && (
            <div className="alert alert-success">تم انذار الموظف بنجاح</div>
          )}
          {errMsg && <div className="alert alert-danger">{errMsg}</div>}

          {selected.map(({ emp_name, emp_id, warnings }) => (
            <>
              <Typography id="modal-modal-description" sx={{ mb: 1 }}>
                {warnings < 2
                  ? "هل انت متأكد من إنذار:"
                  : "تحذير هل انت متأكد من فصل:"}
              </Typography>
              <Typography className="mb-2" key={emp_id}>
                - {emp_name}
              </Typography>
            </>
          ))}
          <div className="mt-2" style={{ marginTop: "10px" }}>
            <Button
              variant="contained"
              disableElevation
              onClick={() => WarnItem()}
            >
              موافق
            </Button>
            <Button
              variant="contained"
              disableElevation
              color="error"
              style={{ margin: "0 10px" }}
              onClick={handleClose3}
            >
              إلغاء
            </Button>
          </div>
        </Box>
      </Modal>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "start", sm: "center" }}
        justifyContent="space-between"
        spacing={1}
        mb={1}
      >
        <div className="d-flex align-items-center">
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
          <button className="btn btn-secondary btn-sm" onClick={handlePrint}>
            الطباعة
          </button>

          <IconButton
            aria-label="delete"
            onClick={handleOpen}
            disabled={selected.length === 0 ? true : false}
            className="mx-1"
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            aria-label="archive"
            onClick={Archive}
            disabled={selected.length === 0 ? true : false}
            className="mx-1"
          >
            <ArchiveIcon />
          </IconButton>
          <IconButton
            aria-label="archive"
            onClick={handleOpen3}
            disabled={selected.length === 0 ? true : false}
            className="mx-1"
          >
            <DoDisturbOnIcon />
          </IconButton>
          <Button
            variant="contained"
            size="small"
            className="mx-1"
            onClick={handleOpen2}
            disabled={selected.length === 0 ? true : false}
          >
            + سلفية
          </Button>
          <Button
            variant="contained"
            size="small"
            className="mx-1"
            href="/dismissed-employees"
            style={{ color: "#fff" }}
          >
            المفصولين{" "}
          </Button>
          <Button
            variant="contained"
            size="small"
            className="mx-1"
            href="/archieve"
            style={{ color: "#fff" }}
          >
            الأرشيف
          </Button>
          <Button
            href="/add-employees"
            size="small"
            variant="contained"
            style={{ color: "#fff" }}
          >
            + موظف جديد
          </Button>
        </div>
      </Stack>
      <Box ref={componentRef} className="print-direction">
        <div className="mt-3 text-center before-print print-yes">
          <h5>بيانات الموظفين</h5>
        </div>
        {archeived && (
          <div className="alert alert-success">تمت الارشفة بنجاح</div>
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
                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        className={
                          row.warnings >= 2 ? "alert alert-danger" : ""
                        }
                        key={row.emp_id}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            className="print-none"
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        ></TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          <ListItem disablePadding>
                            <Avatar
                              className="print-none"
                              alt="user"
                              src={`/images/${row.imgLink}`}
                            />
                            <ListItemText
                              style={{ margin: "10px" }}
                              primary={row.emp_name}
                            />
                          </ListItem>
                        </TableCell>
                        <TableCell>{row.emp_id}</TableCell>
                        <TableCell>{row.jobTitle}</TableCell>
                        <TableCell>
                          <span>{row.start_salary} جنيه</span>
                        </TableCell>
                        <TableCell>
                          <span>{row.salary} جنيه</span>
                        </TableCell>
                        <TableCell>{row.warnings}</TableCell>
                        <TableCell>{row.attendee_count_M}</TableCell>
                        <TableCell>{row.attendee_count_Y}</TableCell>
                        <TableCell>
                          <Link
                            className="edit-btn"
                            to={`/employees/${row.emp_id}`}
                          >
                            <IconButton>
                              <VisibilityIcon />
                            </IconButton>
                          </Link>
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
            className="print-none"
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
