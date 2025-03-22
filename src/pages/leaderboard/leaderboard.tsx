import { CSVLink } from "react-csv";
import { useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { RootState } from '../../redux/types';
import Box from '@mui/material/Box/Box';
import Button from '@mui/material/Button/Button';

function Leaderboard() {
  const users = useSelector((state: RootState) => state.leaderboard.users);

  return (
    <>
      <h1 className="title">Leaderboard</h1>

      <Box sx={{ textAlign: 'right', mt: 2 }}>
        <CSVLink data={users}>
          <Button 
            variant="contained" 
          >
            Export CSV
          </Button>
        </CSVLink>
      </Box>

      <br />

      {users.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell align="right">Last Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {user.firstName}
                  </TableCell>
                  <TableCell align="right">{user.lastName}</TableCell>
                  <TableCell align="right">{user.email}</TableCell>
                  <TableCell align="right">{user.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div>Not user....</div>
      )}

      
    </>
  )
}

export default Leaderboard