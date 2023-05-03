import { useQuery } from '@tanstack/react-query'
import { getDesigners } from '../requests'
import { styled } from '@mui/material/styles'
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom"

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import placeholderLogo from './logoipsum-288.svg'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

const Item = styled(Paper)(({ theme }) => ({
    /* backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff', */
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    /* color: theme.palette.text.secondary, */
}));

const margin = 10
const maxWidth = 1250
const minHeight = 39
const minHeight2 = 157

const Home = () => {

    const [searchText, setSearchText] = useState("")

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
                <Grid item xs={12} style={{ maxWidth, minHeight: minHeight2 }} sx={{ m: margin, mt: 0, mb: 0 }}>
                    <Grid container paddingTop={3}>

                        <Grid item xs={4}>
                            <Box display='flex' alignItems='center' height='100%'>
                                <img className='img' src={placeholderLogo} />
                            </Box>
                        </Grid>

                        <Grid item xs={4}>
                            <Box display='flex' alignItems='center' height='100%'>
                                <TextField id="outlined-search" type="search" color='white' fullWidth
                                    variant="outlined"
                                    label={searchText ? " " : "Sök..."}
                                    InputLabelProps={{ shrink: false }}
                                    value={searchText}
                                    onChange={({ target }) => setSearchText(target.value)}
                                />
                            </Box>
                        </Grid>

                        <Grid item xs={4} display='flex' justifyContent='flex-end'>

                            <Box marginRight={1} display='flex' alignItems='center' height='100%' flexDirection='column' justifyContent='center'>

                                <Button
                                    style={{ height: 50 }}
                                /* sx={{ '&:hover': { background: 'none', }, }} */
                                >
                                    <Grid container direction='column' display='flex' alignItems='center'>
                                        <PersonOutlineOutlinedIcon />
                                        LOGGA IN
                                    </Grid>
                                </Button>
                            </Box>

                            <Box marginRight={1} display='flex' alignItems='center' height='100%' flexDirection='column' justifyContent='center'>
                                <Button
                                    style={{ height: 50 }}
                                /* sx={{ '&:hover': { background: 'none', }, }} */
                                >
                                    <Grid container direction='column' display='flex' alignItems='center'>
                                        <PersonOutlineOutlinedIcon />
                                        LOGGA IN
                                    </Grid>
                                </Button>
                            </Box>
                            <Box display='flex' alignItems='center' height='100%' flexDirection='column' justifyContent='center'>
                                <Button
                                    style={{ height: 50 }}
                                /* sx={{ '&:hover': { background: 'none', }, }} */
                                >
                                    <Grid container direction='column' display='flex' alignItems='center'>
                                        <PersonOutlineOutlinedIcon />
                                        LOGGA IN
                                    </Grid>
                                </Button>
                            </Box>
                        </Grid>

                    </Grid>
                    <Grid container paddingTop={2}>
                        <Grid item xs={6}>
                            <Stack direction="row" spacing={1}>
                                <Button sx={{ textTransform: 'none' }} component={Link} to={"/"}>
                                    <Item
                                        style={{ textDecoration: 'none', color: 'white' }}
                                        sx={{ backgroundColor: 'transparent' }} elevation={0}>
                                        Startsida
                                    </Item>
                                </Button>
                                <Button sx={{ textTransform: 'none' }} component={Link} to={"/"}>
                                    <Item
                                        style={{ textDecoration: 'none', color: 'white' }}
                                        sx={{ backgroundColor: 'transparent' }} elevation={0}>
                                        Startsida
                                    </Item>
                                </Button>
                                <Button sx={{ textTransform: 'none' }} component={Link} to={"/"}>
                                    <Item
                                        style={{ textDecoration: 'none', color: 'white' }}
                                        sx={{ backgroundColor: 'transparent' }} elevation={0}>
                                        Startsida
                                    </Item>
                                </Button>
                            </Stack>

                        </Grid>
                        <Grid item xs display='flex' justifyContent='flex-end'>
                            hej

                        </Grid>
                    </Grid>
                </Grid>
            </Grid >


        </>
    )
}

export default Home