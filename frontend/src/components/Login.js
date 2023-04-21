import { useState, useEffect } from "react"
import { useNavigate, Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { loginUser } from '../requests'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

const Login = ({ setToken, notify, errorMessage }) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const navigate = useNavigate()

  const loginUserMutation = useMutation(loginUser, {
    onSuccess: ({ token }) => {
      setToken(token)
      localStorage.setItem('ecom', token)
      navigate('/')
    },
  })


  const submit = async (event) => {
    if (!email || !password) {
      return
    }
    event.preventDefault()
    loginUserMutation.mutate({ email, password })

  }

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 5,
          }}
        >

          <Typography component="h1" variant="h5">
            Logga in
          </Typography>

          <Box noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
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
            <TextField
              margin="normal"
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={submit}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/forgotpass" variant="body2">
                  Glömt lösenord
                </Link>
              </Grid>
              <Grid item sx={{ ml: 5 }}>
                <Link to="/register" variant="body2">
                  Har du inget konto? Registrera dig
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
  )
}
export default Login