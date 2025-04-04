import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { updateFormData } from '../../redux/actions/formActions';
import {
  Container,
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Button,
  FormHelperText,
} from '@mui/material';

interface Category {
  id: number;
  name: string;
}

interface FormInputs {
  category: string;
  difficulty: string;
  type: string;
  amount: string;
}

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [categories, setCategories] = useState<Category[]>([]);


  const { control, handleSubmit, formState: { errors } } = useForm<FormInputs>({
    defaultValues: {
      category: '',
      difficulty: '',
      type: '',
      amount: ''
    }
  });




  React.useEffect(() => {
    async function fetchCategories() {
      const res = await fetch('https://opentdb.com/api_category.php');
      const data = await res.json();
      setCategories(data.trivia_categories);
    }
    fetchCategories();
  }, []);
  

  const onSubmit = (data: FormInputs) => {
    dispatch(updateFormData(data));
    navigate('/question');
  };

  return (
    <>
      <Container maxWidth="sm">
        <Box sx={{ mt: 5, mb: 3, textAlign: 'center' }}>
          <Typography variant="h3" gutterBottom>
            Quiz App
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <FormControl 
              fullWidth 
              error={!!errors.category}
              sx={{ mb: 3 }}
            >
              <Controller
                name="category"
                control={control}
                rules={{ required: 'Please select a category' }}
                render={({ field }) => (
                  <Select
                    {...field}
                    displayEmpty
                  >
                    <MenuItem value="" disabled>
                      Select Category
                    </MenuItem>
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id.toString()}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.category && (
                <FormHelperText>{errors.category.message}</FormHelperText>
              )}
            </FormControl>

            <FormControl 
              fullWidth 
              error={!!errors.difficulty}
              sx={{ mb: 3 }}
            >
              <Controller
                name="difficulty"
                control={control}
                rules={{ required: 'Please select difficulty' }}
                render={({ field }) => (
                  <Select
                    {...field}
                    displayEmpty
                  >
                    <MenuItem value="" disabled>
                      Difficulty
                    </MenuItem>
                    <MenuItem value="easy">Easy</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="hard">Hard</MenuItem>
                  </Select>
                )}
              />
              {errors.difficulty && (
                <FormHelperText>{errors.difficulty.message}</FormHelperText>
              )}
            </FormControl>

            <FormControl 
              fullWidth 
              error={!!errors.type}
              sx={{ mb: 3 }}
            >
              <Controller
                name="type"
                control={control}
                rules={{ required: 'Please select type' }}
                render={({ field }) => (
                  <Select
                    {...field}
                    displayEmpty
                  >
                    <MenuItem value="" disabled>
                        Type
                    </MenuItem>
                    <MenuItem value="multiple">Multiple Choice</MenuItem>
                    <MenuItem value="boolean">True/False</MenuItem>
                  </Select>
                )}
              />
              {errors.type && (
                <FormHelperText>{errors.type.message}</FormHelperText>
              )}
            </FormControl>

            <FormControl 
              fullWidth 
              error={!!errors.amount}
              sx={{ mb: 3 }}
            >
              <Controller
                name="amount"
                control={control}
                rules={{ 
                  required: 'Please enter amount of questions',
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    placeholder="Amount of Question"
                    fullWidth
                  />
                )}
              />
              {errors.amount && (
                <FormHelperText>{errors.amount.message}</FormHelperText>
              )}
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{ 
                mt: 2,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 'bold'
              }}
            >
              GET STARTED
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Dashboard;