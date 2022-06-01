
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../assets/Loader.gif";
import { getCity, deleteCity } from "../utils/ApiRoute";
import axios from "axios";
import { getData, sortData } from "../Redux/Country/action";
import { Link, useNavigate } from "react-router-dom";
import { countries } from "./AddCountry";

const columns = [
    {id : "id", label : "id" , minWidth : 40},
    { id: 'country', label: 'Country', minWidth: 80},
    { id : "city", label : "City", minWidth : 80},
    {
        id: 'population',
        label: 'Population',
        minWidth: 80,
        format: (value) => value.toLocaleString('en-US'),
    },
    {id : "edit", label : "Edit", minWidth : 80},
    {id : "delete", label : "Delete", minWidth : 80}
];


export const Home = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterText, setFilterText] = useState("");
  const [loader, setLoader] = useState(false);
  console.log('filterText:', filterText)
  const dispatch = useDispatch();
  const store = useSelector((store) => store);
  
  // console.log('store:', store)

  useEffect(() => {

    dispatch(getData());

  },[]);


  // const getData = async () => {
  //   const data = await axios.get(getCity);
  //   console.log('data:', data)
  // }
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleLoader = () => {
    const id = setTimeout(() => {
      setLoader(false);
    },2000)
    // clearInterval(id);
    return;
  }

  const handleDelete = async (id) => {
    // console.log('id:', id)

    const data = await axios.delete(`${deleteCity}/${id}`);
    dispatch(getData());

  }

  return (
    <>
    {loader === true ? 
    <>
    <div style={{width : "70vw", margin : "2vw auto auto auto", height : "30vw", border : "0px solid", display : "flex"}}>
      <img style = {{
        width: "100%",
        height : "100%"
      }} src={Loader} alt="" />
    </div>
    </> 
      :  
    <>
      <FormControl sx={{ m: 1, minWidth: 80, display : "grid", gridTemplateColumns : "10% 20%", justifyContent : "space-between" }}>
        <InputLabel id="demo-simple-select-autowidth-label">SORT</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          onChange = {(event) => {
            dispatch(sortData(event.target.value))
          }}
          autoWidth
          label="Sort"
        >
          <MenuItem value="all">
            <em>Sort Population</em>
          </MenuItem>

          <MenuItem value="asc">Asending</MenuItem>
          <MenuItem value="desc">Desending</MenuItem>
        </Select>

          <Autocomplete
          id="country-select-demo"
          sx={{ width: "100%", border : "0px solid" }}
          options={countries}
          autoHighlight
          getOptionLabel={(option) => option.label}
          renderOption={(props, option) => (
              <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
              <img
                  loading="lazy"
                  width="20"
                  src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                  srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                  alt=""
              />
              {option.label} ({option.code}) +{option.phone}
              </Box>
          )}
          renderInput={(params) => (
              <TextField
              name = "country"
              {...params}
              onChange = {(event) => {
                setFilterText(event.target.value);
              }}
              label="Filter by country name"
              sx={{border : "0px solid", color : "Yellow"}}
              inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password', // disable autocomplete and autofill
              }}
              />
          )}
          />
      </FormControl>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, border : "0px solid", textAlign : "center" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {store.allData.allData.filter(data => data.country.includes(filterText))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {

                // console.log('row:', row)
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      // console.log('column:', column)
                      // console.log('column.id:', column.id)
                      const value = column.id === "delete" ? "Delete" : column.id === "edit" ? "Edit" : column.id === "population" ? Number(row[column.id]) : row[column.id];
                      // console.log('value:', value)
                      // console.log('value:',typeof value)
                      return (
                        
                        <>
                          {value === "Edit" ? 
                            <Link to={`/update/${row.id}`} style={{border : "0px solid", textAlign : "center", textDecoration : "none"}}>
                              <TableCell key={column.id} style={{border : "0px solid", textAlign : "center", width : "1%"}}>
                                {column.format && typeof value === 'number'
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            </Link>
                            :
                            value === "Delete" ? 
                            <TableCell onClick={() => {
                              setLoader(true);
                              handleLoader();
                              handleDelete(row.id);
                            }} key={column.id} style={{border : "0px solid", textAlign : "center", cursor : "pointer"}}>
                              {column.format && typeof value === 'number'
                                ? column.format(value) 
                                : value}
                            </TableCell>
                            :
                            <TableCell key={column.id} style={{border : "0px solid", textAlign : "center"}}>
                              {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value}
                            </TableCell>
                          }
                        </>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={store.allData.allData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </Paper>
    </>
      }
    </>
  );
}
