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

function createData(
  NIK,
  Nama,
  JenisKelamin,
  Agama,
  Jabatan,
  Password) {
  return {
    NIK,
    Nama,
    JenisKelamin,
    Agama,
    Jabatan,
    Password
  };
}

const rows = [
  createData('Ganja', 26, 6, 66, 76, 666),
  createData('Frozen yoghurt', 159, 6.0, 24, 4, 12),
  createData('Ice cream sandwich', 237, 9, 37, 4, 23),
  createData('Eclair', 262, 16, 24, 6, 12),
  createData('Cupcake', 305, 3, 67, 4, 26),
  createData('Gingerbread', 356, 16, 49, 3, 17),
];




export default function User() {
  const [data, setData] = useState([]);
  const [newFetch, setNewFetch] = useState(true);
  const [NIKBaru, setNIKBaru] = useState("")
  const [NamaBaru, setNamaBaru] = useState("")
  const [JenisKelaminBaru, setJenisKelaminBaru] = useState("")
  const [JabatanBaru, setJabatanBaru] = useState("")
  const [PasswordBaru, setPasswordBaru] = useState("")
  const [AgamaBaru, setAgamaBaru] = useState("")
  const [selectedNIK, setSelectedNIK] = useState(0)
  const [tampilInput, setTampilInput] = useState(false)
  const [tampilEdit, setTampilEdit] = useState(false);
 

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
    await fetch(base_url + '/user', option).then(res => res.json()).then(data => {
      setData(data.invocationResult);
      console.log(data.invocationResult);
    });
  }
  const onCLickCreate = function (NIK) {
    setTampilEdit(true);
    setSelectedNIK(NIK);
    console.log("clicked create", NIK);
  }
  const onSaveEdit = function () {
    setTampilEdit(false);
    console.log(PasswordBaru,JabatanBaru,selectedNIK);
    let option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "NIK": selectedNIK,
        "jabatan": JabatanBaru,
        "password": PasswordBaru
      })
    }
    fetch(base_url + '/changeUser', option).then(res => res.json()).then(response => {
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
        "NIK": NIKBaru,
        "nama": NamaBaru,
        "jenis_kelamin": JenisKelaminBaru,
        "agama": AgamaBaru,
        "jabatan": JabatanBaru,
        "password": PasswordBaru
      })
    }
    fetch(base_url + '/inputUser', option).then(res => res.json()).then(response => {
      panggilData();
      setTampilInput(false)
    });
  }
  const onNIKChange = function (element) {
    console.log(element.target.value);
    setNIKBaru(element.target.value)
  }
  const onNamaChange = function (element) {
    console.log(element.target.value);
    setNamaBaru(element.target.value)
  }
  const onJenisKelaminChange = function (element) {
    console.log(element.target.value);
    setJenisKelaminBaru(element.target.value)
  }
  const onAgamaChange = function (element) {
    console.log(element.target.value);
    setAgamaBaru(element.target.value)
  }
  const onJabatanChange = function (element) {
    console.log(element.target.value);
    setJabatanBaru(element.target.value)
  }
  const onPasswordChange = function (element) {
    console.log(element.target.value);
    setPasswordBaru(element.target.value)
  }
  const onOpenInput = function () {
    setTampilInput(true)
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table  aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">NIK</StyledTableCell>
              <StyledTableCell align="center">Nama</StyledTableCell>
              <StyledTableCell align="center">Jenis Kelamin</StyledTableCell>
              <StyledTableCell align="center">agama</StyledTableCell>
              <StyledTableCell align="center">Jabatan</StyledTableCell>
              <StyledTableCell align="center">Password</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length >0 && data.map((row) => (
              <StyledTableRow key={row.NIK}>
                <StyledTableCell component="th" scope="row">{row.NIK}</StyledTableCell>
                <StyledTableCell align="right">{row.nama}</StyledTableCell>
                <StyledTableCell align="right">{row.jenis_kelamin}</StyledTableCell>
                <StyledTableCell align="right">{row.agama}</StyledTableCell>
                <StyledTableCell align="right">{row.jabatan}</StyledTableCell>
                <StyledTableCell align="center">{row.password}</StyledTableCell>
                <StyledTableCell align="center"> <IconButton onClick={function () {
                  onCLickCreate(row.NIK)
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
          <input id="PasswordBaru" placeholder="PasswordBaru" type="number" onChange={function (element) {
            onPasswordChange(element)
          }} />
           <input id="JabatanBaru" placeholder="JabatanBaru" text="text" onChange={function (element) {
            onJabatanChange(element)
          }} />
          
          <button onClick={function () {
            onSaveEdit()
          }} > IYZI  </button>
        </div>}
      <button onClick={function () {
        onOpenInput()
      }}> Add Data </button>
      {tampilInput &&
        <div style={{ display: 'flex', flexDirection: 'column', width: 200, height: 150, justifyContent: 'space-between', alignitems: 'center', marginLeft: 70, marginTop: 50 }}>
          <input id="NIK" placeholder="NIK" type="number" onChange={function (element) {
            onNIKChange(element)
          }} />
          <input id="Nama" placeholder="Nama" text="text" onChange={function (element) {
            onNamaChange(element)
          }} />
          <input id="Jenis Kelamin" placeholder="Jenis Kelamin" text="text" onChange={function (element) {
            onJenisKelaminChange(element)
          }} />
          <input id="agama" placeholder="agama" type="texts" onChange={function (element) {
            onAgamaChange(element)
          }} />
          <input id="Jabatan" placeholder="Jabatan" text="text" onChange={function (element) {
            onJabatanChange(element)
          }} />
          <input id="Password" placeholder="Password" text="text" onChange={function (element) {
            onPasswordChange(element)
          }} />
          <button onClick={function () {
            onSaveInput()
          }} > input </button>
        </div>}
    </div>
  );
}


