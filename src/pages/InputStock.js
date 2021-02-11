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
  const onCLickCreate = function (kode_barang) {
    setTampilEdit(true);
    setSelectedKodeBarang(kode_barang);
    console.log("clicked create", kode_barang);
  }
  const onSaveEdit = function () {
    setTampilEdit(false);
    console.log(QtyBaru,HargaBaru,SelectedKodeBarang);
    let option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "kode_barang": SelectedKodeBarang,
        "harga": HargaBaru,
        "qty": QtyBaru,
        "nama_barang":NamaBarangBaru
      })
    }
    fetch(base_url + '/changeStock', option).then(res => res.json()).then(response => {
      panggilData();
    });
  }
  const onSaveInput = function () {
    setTampilEdit(false);
    console.log("input",);
    let option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "kode_barang": KodeBarangBaru,
        "nama_barang": NamaBarangBaru,
        "harga":HargaBaru,
        "qty":QtyBaru,
        "transaksi_date":TransaksiDateBaru,
        "expired_date":ExpiredDateBaru
      })
    }
    fetch(base_url + '/inputStock', option).then(res => res.json()).then(response => {
      panggilData();
      setTampilInput(false)
    });
  }
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 2
  })
  const onKodeBarangChange = function (element) {
    console.log(element.target.value);
    setKodeBarangBaru(element.target.value)
  }
  const onNamaBarangChange = function (element) {
    console.log(element.target.value);
    setNamaBarangBaru(element.target.value)
  }
  const onHargaChange = function (element) {
    console.log(element.target.value);
    setHargaBaru(element.target.value)
  }
  const onQtyChange = function (element) {
    console.log(element.target.value);
    setQtyBaru(element.target.value)
  }
  const onTransaksiDateChange = function (element) {
    console.log(element.target.value);
    setTransaksiDateBaru(element.target.value)
  }
  const onExpiredDateChange = function (element) {
    console.log(element.target.value);
    setExpiredDateBaru(element.target.value)
  }
  const onOpenInput = function () {
    setTampilInput(true)
  }

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
              <StyledTableCell align="center">Edit</StyledTableCell>
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
                <StyledTableCell align="center"> <IconButton onClick={function () {
                  onCLickCreate(row.kode_barang)
                }} color="inherit" componenent="span">
                  <CreateIcon />
                </IconButton>
                </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    {tampilEdit &&
        <div>
          <input id="QtyBaru" placeholder="QtyBaru" type="number" onChange={function (element) {
            onQtyChange(element)
          }} />
           <input id="HargaBaru" placeholder="HargaBaru" type="number" onChange={function (element) {
            onHargaChange(element)
          }} />
          <input id="NamaBarangBaru" placeholder="NamaBarangBaru" type="text" onChange={function (element) {
            onNamaBarangChange(element)
          }} />
          
          <button onClick={function () {
            onSaveEdit()
          }} > Dani De Bang  </button>
        </div>}
<button onClick={function () {
  onOpenInput ()
}}> Add Data tee hee </button>
{tampilInput &&
  <div style={{ display: 'flex', flexDirection: 'column', width: 200, height: 150, justifyContent: 'space-between', alignitems: 'center', marginLeft: 70, marginTop: 50 }}>
  <input id="Kode Barang" placeholder="Kode Barang" type="number" onChange={function (element) {
    onKodeBarangChange(element)
  }} />
  <input id="Nama Barang" placeholder="Nama Barang" text="text" onChange={function (element) {
    onNamaBarangChange(element)
  }} />
  <input id="Harga" placeholder="Harga" type="number" onChange={function (element) {
      onHargaChange(element)
    }} />
    <input id="Qty" placeholder="Qty" type="number" onChange={function (element) {
      onQtyChange(element)
    }} />
    <input id="Transaksi Date" placeholder="Transaksi Date" type="date" onChange={function (element) {
      onTransaksiDateChange(element)
    }} />
    <input id="Expired Date" placeholder="Expired Date" type="date" onChange={function (element) {
      onExpiredDateChange(element)
    }} />
    <button onClick={function () {
      onSaveInput()
    }} > input </button>
    </div>}
    </div>
    );
  }
    