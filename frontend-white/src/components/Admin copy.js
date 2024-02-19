import { useState, useEffect } from "react"
import { useQuery, useMutation, useQueryClient, QueryClient } from '@tanstack/react-query'
import { createCategory } from '../requests'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

const Admin = ({ categories, queryClient }) => {
    const [categoryName, setCategoryName] = useState('')
    const [subOne, setSubOne] = useState(categories.map(e => { return { name: '' } }))
    const [subTwo, setSubTwo] = useState(categories.flatMap(e => e.SubOne).map(b => { return { name: '' } }))

    console.log(categories)

    const newCategoryMutation = useMutation(createCategory, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] })
        },
    })

    const sendCategory = async () => {
        newCategoryMutation.mutate({ name: categoryName })
        setCategoryName('')
    }

    const sendCategorySubOne = async (i, sub) => {
        newCategoryMutation.mutate({ name: subOne[i].name, SubOneId: sub })
        setSubOne(categories.map(e => { return { name: '' } }))
    }

    const sendCategorySubTwo = async (i, sub) => {
        newCategoryMutation.mutate({ name: subTwo[i].name, SubTwoId: sub })
    }

    const changeField = (target, i) => {
        const values = [...subOne]
        values[i].name = target.value
        setSubOne(values)
    }

    const changeSubTwo = (target, i) => {
        const values = [...subTwo]
        values[i].name = target.value
        setSubTwo(values)
    }

    return (
        <>
            <TextField value={categoryName} onChange={({ target }) => setCategoryName(target.value)} id="outlined-basic" label="New Category" variant="outlined" />
            <Button variant="text" onClick={sendCategory}>Create Category</Button>
            <br />


            <Table sx={{ maxWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {categories.map((category, i) =>
                        <>

                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {category?.name}
                                </TableCell>
                                <TableCell align="right">
                                    <TextField value={subOne[i]?.name} onChange={({ target }) => changeField(target, i)} id="outlined-basic" label="New Category" variant="outlined" />
                                </TableCell>
                                <TableCell align="right">
                                    <Button variant="text" onClick={() => sendCategorySubOne(i, category.id)}>Create SubOne-Category</Button>
                                </TableCell>
                            </TableRow>

                            <Table size="small" aria-label="purchases" sx={{ marginLeft: 2 }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell align="right"></TableCell>
                                        <TableCell align="right"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {category.SubOne.map((subCategory, i) => (
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                {subCategory.name}
                                            </TableCell>
                                            <TableCell align="right">
                                                <TextField value={subTwo[i]?.name} onChange={({ target }) => changeSubTwo(target, i)} id="outlined-basic" label="New Category" variant="outlined" />
                                            </TableCell>
                                            <TableCell align="right">
                                                <Button variant="text" onClick={() => sendCategorySubTwo(i, subCategory.id)}>Create SubTwo-Category</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                        </>
                    )}
                </TableBody>
            </Table>


        </>
    )
}

export default Admin