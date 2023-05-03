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
import ListSubheader from '@mui/material/ListSubheader'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import DraftsIcon from '@mui/icons-material/Drafts'
import SendIcon from '@mui/icons-material/Send'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import StarBorder from '@mui/icons-material/StarBorder'

const Admin = ({ categories, queryClient }) => {
    const [categoryName, setCategoryName] = useState('')
    const [subOne, setSubOne] = useState(categories.map(e => { return { open: false } }))
    const [subTwo, setSubTwo] = useState(categories.flatMap(e => e.SubOne).map(b => { return { name: '' } }))
    const [openTop, setOpenTop] = useState(categories.map(e => { return { open: false } }))
    const [openSub, setOpenSub] = useState(categories.flatMap(e => e.SubOne).map(b => { return { open: false } }))

    const [open, setOpen] = useState('')

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

    const handleClick = (i, values, level) => {
        const vals = [...values]
        vals[i].open = !vals[i].open
        switch (level) {
            case 'openTop':
                setOpenTop(vals);
                break;
            case 'openSub':
                setOpenSub(vals);
                break;
        }
    }

    return (

        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">Categories</ListSubheader>
            }>
            {categories.map((category, i) =>
                <>
                    <ListItemButton onClick={() => handleClick(i, openTop, 'openTop')}>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary={category.name} />
                        {openTop[i].open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openTop[i].open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {category.SubOne.map((subCategory, i) =>


                                <ListItemButton onClick={() => handleClick(i, openSub, 'openSub')} sx={{ pl: 4 }}>
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={subCategory.name} />
                                    {openSub[i].open ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>
                            )}
                        </List>
                    </Collapse>
                </>
            )}
        </List>


    )
}

export default Admin