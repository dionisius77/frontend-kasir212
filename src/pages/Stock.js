import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { IconButton } from '@material-ui/core';
import { CenterFocusWeakTwoTone } from '@material-ui/icons';
import CreateIcon from '@material-ui/icons/Create';


const base_url = 'http://localhost:3003';

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

function InputStock(
  KodeBarang,
  NamaBarang,
  Harga,
  Qty,
  TransaksiDate,
  ExpiredDate) {
  return {  
    KodeBarang,
    NamaBarang,
    Harga,
    Qty,
    TransaksiDate,
    ExpiredDate};
}

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

// const useStyles = makeStyles({
//   table: {
//     minWidth: 700,
//   },
// });

export default function Stock() {
  const [data, setData] = useState([]);
  const [newFetch, setNewFetch] = useState(true);
  const [KodeBarangBaru, setKodeBarangBaru] = useState("")
  const [NamaBarangBaru, setNamaBarangBaru] = useState("")
  const [HargaBaru, setHargaBaru] = useState("")
  const [QtyBaru, setQtyBaru] = useState("")
  const [TransaksiDateBaru, setTransaksiDateBaru] = useState("")
  const [ExpiredDateBaru, setExpiredDateBaru] = useState("")
  const [SelectedKodeBarang, setSelectedKodeBarang] = useState(0)
  const [tampilInput, setTampilInput] = useState(false)
  const [tampilEdit, setTampilEdit] = useState(false);
  // const classes = useStyles();

  useEffect(() => {
    panggilData();
  }, [newFetch]);

  const panggilData = async () => {
    let option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    await fetch(base_url + '/stock', option).then(res => res.json()).then(data => {
      setData(data.invocationResult);
      console.log(data.invocationResult);
    });
  }
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 2
  })
 

  return (
    <div> 
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
          <StyledTableCell align="center">Kode</StyledTableCell>
              <StyledTableCell align="center">Nama</StyledTableCell>
              <StyledTableCell align="center">Harga</StyledTableCell>
              <StyledTableCell align="center">Qty</StyledTableCell>
              <StyledTableCell align="center">Transaksi</StyledTableCell>
              <StyledTableCell align="center">Expired</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
        {data.length >0 && data.map((row) => (
            <StyledTableRow key={row.kode_barang}>
              <StyledTableCell component="th" scope="row">{row.kode_barang}</StyledTableCell>
                <StyledTableCell align="right">{row.nama_barang}</StyledTableCell>
                <StyledTableCell align="right">{formatter.format(row.harga)}</StyledTableCell>
                <StyledTableCell align="right">{row.qty}</StyledTableCell>
                <StyledTableCell align="right">{row.transaksi_date}</StyledTableCell>
                <StyledTableCell align="center">{row.expired_date}</StyledTableCell>
             
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>


    </div>
    );
  }
    