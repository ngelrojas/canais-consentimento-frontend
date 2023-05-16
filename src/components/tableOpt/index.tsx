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
import { Order, MSG_TABLE_FILTER } from '../../constants';
import { DataCanais } from '../../services';
import { getComparator, stableSort } from '../../utils';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import EnhancedTableHead from '../EnhancedTableHead';
import EnhancedTableToolbar from '../EnhancedTableToolBar';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { AiOutlineSearch } from 'react-icons/ai';
import CheckOpt from '../checkOpt';
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";
import { useFilterCanais } from '../../hooks';

export default function EnhancedTable() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof DataCanais>('CpfCnpj');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  let dataInicio = '2023-01-01T03:00:00.000Z';
  let dataFim = '2023-03-01T03:00:00.000Z';
  const filter = `dataInicio=${dataInicio}&dataFim=${dataFim}`
  
  const filterCanais = useFilterCanais(filter);
  let content: any = [];
  // const { content } = filterCanais ? filterCanais.data?.dados : [];
  console.log("filterCanais: ", filterCanais);
  // TODO: statement "if" is tempory
  if (filterCanais){

    content = filterCanais;
  }else{
    content = []
  }

  const [canais, setCanais] = useState<DataCanais[]>([]);

  const fetchCanais = async () => {
    const response = await axios.get('http://localhost:3001/search');
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
    console.log("HERE DATA FROM API OPT", content);
  }, []);
  
  useEffect(() => {
    
    setVisibleRows(stableSort(canais, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    ));
  }, [canais, order, orderBy, page, rowsPerPage]);
  
  return (
    <Box sx={{ width: '100%' }}>

      <Box sx={{flexGrow: 1}}>
        <Grid2 container spacing={2}>

            <Grid2 xs={8} md={8}>
              <Toolbar sx={{paddingLeft: '30%!important', paddingRight: '0%!important'}}>
                  <FormControl sx={{width: '100%'}} variant='standard'>
                    <TextField
                      id='opt-search'
                      label={MSG_TABLE_FILTER.search}
                      size='small'
                      onChange={handleSearch} 
                      InputProps={{
                        endAdornment: <AiOutlineSearch size={25} />
                      }} 
                      />
                  </FormControl>
              </Toolbar>
            </Grid2>

            <Grid2 xs={4} md={4}>
              <CheckOpt handleCheckOut={handleCheckOut} />
            </Grid2>

        </Grid2>
      </Box>

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
                    <TableCell align="right">{canal.inOptInOut ? <MdRadioButtonChecked />: <MdRadioButtonUnchecked />}</TableCell>
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
        label={MSG_TABLE_FILTER.dense}
      />
    </Box>
  );
}