import { Box, Button } from '@mui/material'
import TextField from '@mui/material/TextField/TextField'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/types';
import { updateUser } from '../../redux/actions/leaderBoardActions';
import { useNavigate } from 'react-router-dom';

function FinalScore() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const score = useSelector((state: RootState) => state.leaderboard.score);

  function addUser() {
    const user = {
      id: Date.now(),
      firstName: 'tony' + Date.now(),
      lastName: 'tony' + Date.now(),
      email: 'tony' + Date.now() + '@gmail.com',
      score
    }
    dispatch(updateUser(user));
    navigate('/leaderboard')
  }
 
  return (
    <>
      <h1>Final Score: {score}</h1>
      <br />

      <TextField label="First Name" variant="outlined" fullWidth />
      <br /><br />
      <TextField label="Last Name" variant="outlined" fullWidth />
      <br /><br />
      <TextField label="Email" variant="outlined" fullWidth />

      <Box sx={{ textAlign: 'right', mt: 2 }}>
        <Button 
          variant="contained" 
          onClick={addUser}
        >
          Submit
        </Button>
      </Box>
    </>
  )
}

export default FinalScore