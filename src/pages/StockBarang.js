import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { CenterFocusWeakTwoTone } from '@material-ui/icons';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
    width: 500,
    textAlign: 'center'
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(
  nama,
    kode,
    harga,
     qty,
      expired,
        transaksi ) {
  return {
    nama,
      kode,
       harga,
        qty,
         expired,
          transaksi };
}

const rows = [
  createData('Ganja', 26, 6 , 66, 76, 666),
  createData('Frozen yoghurt', 159, 6.0, 24, 4, 12),
  createData('Ice cream sandwich', 237, 9, 37, 4, 23),
  createData('Eclair', 262, 16, 24, 6, 12),
  createData('Cupcake', 305, 3, 67, 4, 26),
  createData('Gingerbread', 356, 16, 49, 3, 17),
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function StockBarang() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Nama Barang</StyledTableCell>
            <StyledTableCell align="center">Kode Barang</StyledTableCell>
            <StyledTableCell align="center">Harga</StyledTableCell>
            <StyledTableCell align="center">Qty</StyledTableCell>
            <StyledTableCell align="center">Expired</StyledTableCell>
            <StyledTableCell align="center">Tanggal Transaksi</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.nama}>
              <StyledTableCell component="th" scope="row">
                {row.nama}
              </StyledTableCell>
              <StyledTableCell align="right">{row.nama}</StyledTableCell>
              <StyledTableCell align="right">{row.kode}</StyledTableCell>
              <StyledTableCell align="right">{row.harga}</StyledTableCell>
              <StyledTableCell align="right">{row.qty}</StyledTableCell>
              <StyledTableCell align="center">{row.expired}</StyledTableCell>
           
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
