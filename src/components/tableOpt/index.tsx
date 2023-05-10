import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Switch from '@mui/material/Switch';
import { Order } from '../../constants';
import { DataCanais } from '../../services';
import { getComparator, stableSort } from '../../utils';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import EnhancedTableHead from '../EnhancedTableHead';
import EnhancedTableToolbar from '../EnhancedTableToolBar';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import CheckOpt from '../checkOpt';

export default function EnhancedTable() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof DataCanais>('CpfCnpj');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [canais, setCanais] = useState<DataCanais[]>([]);

  const fetchCanais = async () => {
    const response = await axios.get('http://localhost:3001/canais');
    setCanais(response.data);
  }

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof DataCanais,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    
    if (event.target.checked) {
      const newSelected = canais.map((n) => n.CpfCnpj);

      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, cpf_cnpj: string) => {
    const selectedIndex = selected.indexOf(cpf_cnpj);
    let newSelected: readonly string[] = [];
    
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, cpf_cnpj);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - canais.length) : 0;
    const [visibleRows, setVisibleRows] = useState(canais);

  const handleSearch = (searchVal: React.ChangeEvent<HTMLInputElement>) => {
    const value = searchVal.target.value.toString();
    if(value === '') {
      fetchCanais();
    }else{
      const filteredRows = visibleRows.filter((row: any) => {
        return row.CpfCnpj.toString().includes(value) || row.Telefone.toString().includes(value);
      })
      setVisibleRows(filteredRows);
      setCanais(filteredRows);
    }
    
  }

  const handleChangeInOut = (event: React.ChangeEvent<HTMLInputElement>) => {
    const elIn = event.target.ariaLabel === 'opt-in';
    const elOut = event.target.ariaLabel === 'opt-out';
    const elValue = event.target.checked;
    // console.log("====================================");
    // console.log('elin', elIn);
    // console.log('elout', elOut);
    // console.log('elvalue', elValue);
    if(elIn && elValue){
      const filteredRows = visibleRows.filter((row: any) => {
        return row.inOptInOut === true;
      })
      setVisibleRows(filteredRows);
      setCanais(filteredRows);
    }else if(elOut && elValue){
      const filteredRows = visibleRows.filter((row: any) => {
        return row.inOptInOut === false;
      })
      setVisibleRows(filteredRows);
      setCanais(filteredRows);
    }else{
      fetchCanais();
    }
  }

  const handleCheckOut = (elIn: any, elOut:any, elVal:any) => {
    
    if(elIn && elVal){
      const filteredRows = visibleRows.filter((row: any) => {
        return row.inOptInOut === true;
      })
      setVisibleRows(filteredRows);
      setCanais(filteredRows);
    }else if(elOut && elVal){
      const filteredRows = visibleRows.filter((row: any) => {
        return row.inOptInOut === false;
      })
      setVisibleRows(filteredRows);
      setCanais(filteredRows);
    }else{
      fetchCanais();
    }

  }

  useEffect(() => {
    fetchCanais();
  }, []);
  
  useEffect(() => {
    
    setVisibleRows(stableSort(canais, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    ));
  }, [canais, order, orderBy, page, rowsPerPage]);
  
  return (
    <Box sx={{ width: '100%' }}>

      <Grid2 container spacing={2}>
        
        <Grid2 xs={6} md={4}>
          <Stack spacing={2} sx={{ width: 400 }}>
            <TextField onChange={handleSearch} />
          </Stack>
        </Grid2>

        {/* <Grid2 xs={6} md={4}>
          <FormControl variant="standard">
            <FormControlLabel control={
              <Checkbox
              onChange={handleChangeInOut} 
              inputProps={{'aria-label': 'opt-in'}} />} label="OPT IN" />
            <FormControlLabel control={
              <Checkbox
              onChange={handleChangeInOut} 
              inputProps={{'aria-label': 'opt-out'}} />} label="OPT OUT" />
          </FormControl>
        </Grid2> */}
        <CheckOpt handleCheckOut={handleCheckOut} />
      </Grid2>

      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={canais.length}
            />
            <TableBody>
              {visibleRows.map((canal, index) => {
                const isItemSelected = isSelected(canal.CpfCnpj);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, canal.CpfCnpj)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={canal.CpfCnpj}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {canal.CpfCnpj}
                    </TableCell>
                    <TableCell align="right">{canal.Telefone}</TableCell>
                    <TableCell align="right">{canal.dataAtualizacao}</TableCell>
                    <TableCell align="right">{canal.dataCriacao}</TableCell>
                    <TableCell align="right">{canal.SistemaOrigem}</TableCell>
                    <TableCell align="right">{canal.inOptInOut ? "true": "false"}</TableCell>
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
          count={canais.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}