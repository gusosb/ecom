import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { createUser } from '../requests';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Register = ({ setToken, notify, errorMessage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  const navigate = useNavigate();

  const createUserMutation = useMutation(createUser, {
    onSuccess: ({ token }) => {
      setToken(token);
      localStorage.setItem('gustaflund-bunny-racer', token);
      navigate('/');
    }
  });

  const submit = async (event) => {
    event.preventDefault();
    if (!email || !password || !password2 || password !== password2) return;

    createUserMutation.mutate({ email, password });
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 5
          }}
        >
          <Typography component="h1" variant="h5">
            Registrera konto
          </Typography>
          <Box component="form" onSubmit={submit} noValidate sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  value={email}
                  onChange={({ target }) => setEmail(target.value)}
                  label="Epostadress"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="firstname"
                  fullWidth
                  value={firstname}
                  onChange={({ target }) => setFirstname(target.value)}
                  label="Förnamn"
                  name="firstname"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="lastname"
                  fullWidth
                  value={lastname}
                  onChange={({ target }) => setLastname(target.value)}
                  label="Efternamn"
                  name="lastname"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Lösenord"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  error={password2 !== '' && password !== password2 ? true : false}
                  name="password2"
                  label="Bekräfta Lösenord"
                  helperText={
                    password2 !== '' && password !== password2 ? 'Lösenorden stämmer inte.' : ''
                  }
                  type="password"
                  id="password2"
                  autoComplete="current-password"
                  value={password2}
                  onChange={({ target }) => setPassword2(target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 1, mb: 2 }}>
                  Registrera konto
                </Button>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs>
                <Link to="/" variant="body2" style={{ color: 'black' }}>
                  Glömt lösenord
                </Link>
              </Grid>
              <Grid item sx={{ ml: 5 }}>
                <Link to="/login" variant="body2" style={{ color: 'black' }}>
                  Har du redan ett konto? Logga in
                </Link>
              </Grid>
            </Grid>
          </Box>
          <br />
          <Typography variant="h6" sx={{ color: '#E5202E' }}>
            {errorMessage}
          </Typography>
        </Box>
      </Container>
    </>
  );
};
export default Register;
