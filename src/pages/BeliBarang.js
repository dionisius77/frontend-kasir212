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
import { Create } from '@material-ui/icons';
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
  KodeTransaksiBaru,
  Debit,
  Credit,
  Deskripsi,
  TransaksiDate) {
  return {  
    KodeTransaksiBaru,
    Debit,
    Credit,
    Deskripsi,
    TransaksiDate};
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
  const [KodeTransaksiBaru, setKodeTransaksiBaru] = useState("")
  const [DebitBaru, setDebitBaru] = useState("")
  const [CreditBaru, setCreditBaru] = useState("")
  const [TransaksiDateBaru, setTransaksiDateBaru] = useState("")
  const [DeskripsiBaru, setDeskripsiBaru] = useState("")
  const [SelectedKodeTransaksi, setSelectedKodeTransaksi] = useState(0)
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
    await fetch(base_url + '/accounting', option).then(res => res.json()).then(data => {
      setData(data.invocationResult);
      console.log(data.invocationResult);
    });
  }
  const onCLickCreate = function (kode_transaki) {
    setTampilEdit(true);
    setSelectedKodeTransaksi(kode_transaki);
    console.log("clicked create", kode_transaki);
  }
  const onSaveEdit = function () {
    setTampilEdit(false);
    console.log(DebitBaru,CreditBaru,SelectedKodeTransaksi);
    let option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "kode_transaki": SelectedKodeTransaksi,
        "debit": DebitBaru,
        "credit": CreditBaru,
        "deskripsi":DeskripsiBaru,
        "transaksi_date":TransaksiDateBaru
      })
    }
    fetch(base_url + '/changeAccounting', option).then(res => res.json()).then(response => {
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
        "kode_transaki": KodeTransaksiBaru,
        "debit": DebitBaru,
        "credit": CreditBaru,
        "deskripsi":DeskripsiBaru,
        "transaksi_date":TransaksiDateBaru
      })
    }
    fetch(base_url + '/inputAccounting', option).then(res => res.json()).then(response => {
      panggilData();
      setTampilInput(false)
    });
  }
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 2
  })
  
  const onKodeTransaksiChange = function (element) {
    console.log(element.target.value);
    setKodeTransaksiBaru(element.target.value)
  }
  const onDebitChange = function (element) {
    console.log(element.target.value);
    setDebitBaru(element.target.value)
  }
  const onCreditChange = function (element) {
    console.log(element.target.value);
    setCreditBaru(element.target.value)
  }
  const onDeskripsiChange = function (element) {
    console.log(element.target.value);
    setDeskripsiBaru(element.target.value)
  }
  const onTransaksiDateChange = function (element) {
    console.log(element.target.value);
    setTransaksiDateBaru(element.target.value)
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
              <StyledTableCell align="center">Debit</StyledTableCell>
              <StyledTableCell align="center">Credit</StyledTableCell>
              <StyledTableCell align="center">Deskripsi</StyledTableCell>
              <StyledTableCell align="center">Transaksi</StyledTableCell>
              <StyledTableCell align="center">Edit</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {data.length >0 && data.map((row) => (
            <StyledTableRow key={row.kode_transaki}>
              <StyledTableCell component="th" scope="row">{row.kode_transaki}</StyledTableCell>
                <StyledTableCell align="right">{formatter.format(row.debit)}</StyledTableCell>
                <StyledTableCell align="right">{formatter.format(row.credit)}</StyledTableCell>
                <StyledTableCell align="right">{row.deskripsi}</StyledTableCell>
                <StyledTableCell align="right">{row.transaksi_date}</StyledTableCell>
                <StyledTableCell align="center"> <IconButton onClick={function () {
                  onCLickCreate(row.kode_transaki)
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
          <input id="" placeholder="DebitBaru" type="number" onChange={function (element) {
            onDebitChange(element)
          }} />
           <input id="HargaBaru" placeholder="CreditBaru" type="number" onChange={function (element) {
            onCreditChange(element)
          }} />
          <input id="DeskripsiBaru" placeholder="DeskripsiBaru" type="text" onChange={function (element) {
            onDeskripsiChange(element)
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
  <input id="Kode Transaksi" placeholder="Kode Transaksi" type="number" onChange={function (element) {
    onKodeTransaksiChange(element)
  }} />
  <input id="Debit" placeholder="Debit" text="text" onChange={function (element) {
    onDebitChange(element)
  }} />
  <input id="Credit" placeholder="Credit" type="number" onChange={function (element) {
      onCreditChange(element)
    }} />
    <input id="Deskirpsi" placeholder="Deskripsi" type="name" onChange={function (element) {
      onDeskripsiChange(element)
    }} />
    <input id="Transaksi Date" placeholder="Transaksi Date" type="date" onChange={function (element) {
      onTransaksiDateChange(element)
    }} />
    <button onClick={function () {
      onSaveInput()
    }} > input </button>
    </div>}
    </div>
    );
  }
    