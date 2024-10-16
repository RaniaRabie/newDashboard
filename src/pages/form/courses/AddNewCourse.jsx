// AddNewCourse.jsx
import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Grid, Box, CircularProgress, Typography } from '@mui/material';
import axios from 'axios'; // If using axios

const AddNewCourse = () => {
  const [course, setCourse] = useState({
    title: '',
    description: '',
    category: '',
    duration: '',
    image: null,
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);  // State for loading indicator

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://api.example.com/categories'); // Replace with your API URL
        setCategories(response.data); // Assuming the API returns an array of categories
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };



  const handleSubmit = () => {
    console.log('Course Data:', course);
    // Logic to add course goes here, e.g., API call
  };

  return (
    <Box sx={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <Typography sx={{mt:8}}> ADD NEW COURCE</Typography>
      <Grid container spacing={3}>
        {/* Course Title */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Course Title"
            name="title"
            variant="outlined"
            value={course.title}
            onChange={handleInputChange}
            sx={{mt:3}}
          />
        </Grid>

        {/* Course Description */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Course Description"
            name="description"
            variant="outlined"
            multiline
            rows={4}
            value={course.description}
            onChange={handleInputChange}
          />
        </Grid>

        {/* Course Category */}
        <Grid item xs={12}>
          {loading ? (
            <CircularProgress />
          ) : (
            <TextField
              fullWidth
              select
              label="Course Category"
              name="category"
              value={course.category}
              onChange={handleInputChange}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>
          )}
        </Grid>

        {/* Submit and Cancel Buttons */}
        <Grid item xs={12} sx={{ textAlign: 'right' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ marginRight: '10px' }}
          >
            Add Course
          </Button>
          
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddNewCourse;
