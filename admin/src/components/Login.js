import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../requests';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const loginUserMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: ({ token }) => {
      setToken(token);
      localStorage.setItem('gustaflund-bunny-racer-admin', token);
      navigate('/');
    }
  });

  const submit = async (event) => {
    if (!email || !password) return;

    event.preventDefault();
    loginUserMutation.mutate({ email, password });
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
            LOGIN
          </Typography>

          <Box noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <Button type="submit" fullWidth variant="contained" onClick={submit} sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/forgotpass" variant="body2" style={{ color: 'black' }}>
                  Forgotten password
                </Link>
              </Grid>
              <Grid item sx={{ ml: 5 }}>
                <Link to="/register" variant="body2" style={{ color: 'black' }}>
                  No account? Register
                </Link>
              </Grid>
            </Grid>
          </Box>
          <br />
        </Box>
      </Container>
    </>
  );
};
export default Login;
