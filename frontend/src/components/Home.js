import { useQuery } from '@tanstack/react-query'
import { getDesigners } from '../requests'
import { styled } from '@mui/material/styles'
import { useState } from 'react'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import placeholderLogo from './logoipsum-288.svg'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const margin = 10
const maxWidth = 1250
const minHeight = 39
const minHeight2 = 157

const Home = () => {

    const [value, setValue] = useState("")

    return (
        <>


            <Grid container backgroundColor='#25272e' justifyContent='center'>
                <Grid item xs={12} style={{ minHeight, maxWidth }} sx={{ m: margin, mt: 0, mb: 0 }}>
                    <Grid container>
                        <Grid item minHeight={minHeight} xs='auto'>
                            <Box display='flex' alignItems='center' height='100%'>
                                hej
                            </Box>
                        </Grid>
                        <Grid item xs minHeight={minHeight} display='flex' justifyContent='flex-end'>
                            <Box display='flex' alignItems='center' height='100%'>
                                Fri frakt vid 499:- / Snabba leveranser
                            </Box>
                        </Grid>


                    </Grid>
                </Grid>
            </Grid>

            <Grid container backgroundColor='#2e3037' justifyContent='center'>
                <Grid item xs={12} style={{ maxWidth }} sx={{ m: margin, mt: 0, mb: 0 }}>
                    <Grid container>

                        <Grid item xs={4} minHeight={minHeight2}>
                            <Box display='flex' alignItems='center' height='100%'>
                                <img src={placeholderLogo} />
                            </Box>
                        </Grid>

                        <Grid item xs={4}>
                            <Box display='flex' alignItems='center' height='100%'>
                                <TextField id="outlined-search" type="search" color='white' fullWidth
                                      variant="outlined"
                                      label={value ? " " : "Sök..."}
                                      InputLabelProps={{ shrink: false }}
                                      value={value}
                                      onChange={({ target }) => setValue(target.value)}
                                />
                            </Box>
                        </Grid>

                        <Grid item xs={4} display='flex' justifyContent='flex-end'>
                            <Box marginRight={2} display='flex' alignItems='center' height='100%' flexDirection='column' justifyContent='center'>
                                <IconButton>
                                    <PersonOutlineOutlinedIcon />
                                </IconButton>
                                Logga in
                            </Box>
                            <Box marginRight={2} display='flex' alignItems='center' height='100%' flexDirection='column' justifyContent='center'>
                                <IconButton>
                                    <PersonOutlineOutlinedIcon />
                                </IconButton>
                                Önskelista
                            </Box>
                            <Box display='flex' alignItems='center' height='100%' flexDirection='column' justifyContent='center'>
                                <IconButton>
                                    <PersonOutlineOutlinedIcon />
                                </IconButton>
                                Varukorg
                            </Box>
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>


        </>
    )
}

export default Home