import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { sortData,useStyles } from "../../../util";
import {Link} from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import numeral from "numeral";
import "./table.css";

export default function TableTracker() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const countries = useSelector(state => state.tracker.dataCountries);
  const countriesSorted = sortData(countries);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const classes = useStyles();

  const handleInput = (e) => {
    setSearch(e.target.value);
  }

  const filteredCountries = countriesSorted.filter(item => {
    return item.country.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <Paper className="table_paper">
      <TableContainer >
        <AppBar 
        className="table_appbar"
        position="static">
          <Toolbar>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{root:classes.inputRoot,input:classes.inputInput}}
                inputProps={{'aria-label':'search'}}
                onChange={handleInput}
              />
            </div>
          </Toolbar>
        </AppBar>
        <Table stickyHeader aria-label="sticky table" >
          <TableRow style={{ backgroundColor: "pink" }}>
            <TableCell style={{ fontWeight: "bold" }} align="center">Country</TableCell>
            <TableCell style={{ fontWeight: "bold" }} align="left">Flags</TableCell>
            <TableCell style={{ fontWeight: "bold" }} align="left">Cases</TableCell>
            <TableCell style={{ fontWeight: "bold" }} align="left">Recoverd</TableCell>
            <TableCell style={{ fontWeight: "bold" }} align="left">Deaths</TableCell>
          </TableRow>
          <TableBody>
            {filteredCountries.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(({ country, cases, deaths, recovered, countryInfo }) => (
              <TableRow key={countryInfo._id}>
                <TableCell align="center">
                  <Link
                  to={`/detail/${country}`}
                  >{country}</Link>
                </TableCell>
                <TableCell align="left">
                  <img style={{ width: "25px" }} src={countryInfo.flag} alt="" />
                </TableCell>
                <TableCell align="left">
                  {numeral(cases).format("0,0")}
                </TableCell>
                <TableCell align="left">
                  {numeral(recovered).format("0,0")}
                </TableCell>
                <TableCell align="left">
                  {numeral(deaths).format("0,0")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 25, 100]}
        component="div"
        count={countries.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
