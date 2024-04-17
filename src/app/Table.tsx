import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Truck} from './types';

interface Props {
  trucks: Truck[];
}

export default function TrucksTable(props: Props) {
  return (
    <TableContainer component={Paper} sx={{marginTop: '50px'}}>
      <Table sx={{ minWidth: 400 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Distance</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Closing Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.trucks.map((row, i) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>
                {Math.round(row.distance * 100) / 100} Miles
              </TableCell>
              <TableCell>
                {row.applicant}
              </TableCell>
              <TableCell align="right">
                {row.endtime}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}