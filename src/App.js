import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Grid, Paper } from '@mui/material';
import { AppBar, Toolbar , CircularProgress } from '@mui/material';
// import  products from "./scrapdata.js"
import axios from 'axios'
// Sample product data

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


useEffect(() => {
 
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:7001/products'); // Make a GET request to your API endpoint
      console.log(response.data)
      setSearchResults(response.data); // Update the searchResults state with the fetched data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Call the fetchData function to fetch the data when the component mounts
  fetchData();
}, []);

  // Function to handle search
  const handleSearch = () => {
    // Making an API request to  backend to search for products with the searchTerm
    // Update searchResults with the fetched data
    // For simplicity,  using the sample products data here
    const filteredResults = searchResults.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  useEffect(() => {
    // Load initial data when the application is loaded
    handleSearch();
  }, []);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Web Scraping App</Typography>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: '20px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            
            <TextField
              fullWidth
              variant="outlined"
              label="Search Products"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleSearch}>
              Search
            </Button>
          </Grid>
          <Grid item xs={12}>
          {isLoading ? ( // Render loading spinner conditionally
              <CircularProgress />
            ) : (
            searchResults.map((product) => (
              <Paper key={product.id} elevation={3} style={{ padding: '20px', marginBottom: '10px' }}>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <img src={product.image} alt={product.title} style={{ width: '100%' }} />
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="h6">{product.title}</Typography>
                    <Typography>Rating: {product.rating}</Typography>
                    <Typography>Price: ${product.price}</Typography>
                    <Typography>Final Price: ${product.finalPrice}</Typography>
                  </Grid>
                </Grid>
              </Paper>
            )))}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default App;
