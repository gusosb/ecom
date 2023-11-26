import { useEffect, useState } from "react"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { initSession, confirmOrder, updateOrder } from "../requests"
import { klarnaHtml } from '../helpers'

import { useWindowSize } from '../helpers'


import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp'
import RemoveCircleSharpIcon from '@mui/icons-material/RemoveCircleSharp'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Paper from '@mui/material/Paper'
import Select from '@mui/material/Select'
import DeleteIcon from '@mui/icons-material/Delete'

import productPlaceholder from '../images/6872_100-Whey-Gold-Std-912-g-Vanilla-Ice-Cream_0922.webp'
import CheckoutMobile from "./CheckoutMobile"


const Checkout = ({ cart, totalSumInCart, removeFromCart, changeVariantQuantity, format }) => {
    const localSessionID = localStorage.getItem('ecom-localSessionID')
    const [html_snippet, setHtml_snippet] = useState('')
    const [iframeHeight, setIframeHeight] = useState('800px')


    let order_tax_amount = 0
    const order_lines = Object.keys(cart).map(e => {
        const total_tax_amount = (cart[e].vatRateSE / 10000) * cart[e].price * cart[e].quantity
        order_tax_amount += total_tax_amount
        return {
            type: 'physical',
            name: cart[e].name,
            quantity: cart[e].quantity,
            quantity_unit: 'pcs',
            unit_price: cart[e].price * (1 + (cart[e].vatRateSE / 10000)),
            tax_rate: cart[e].vatRateSE,
            total_amount: cart[e].quantity * cart[e].price * (1 + (cart[e].vatRateSE / 10000)),
            total_tax_amount,
            product_url: `${window.location.origin}/product/${cart[e].id}`,
            reference: e
        }
    })
    console.log(order_lines);

    const newSessionMutation = useMutation(initSession, {
        onSuccess: (response) => {
            setHtml_snippet(response.html_snippet)
            localStorage.setItem('ecom-localSessionID', response.order_id)
        },
    })

    const fetchExistingSessionMutation = useMutation(confirmOrder, {
        onSuccess: (response) => {
            setHtml_snippet(response.html_snippet)
            localStorage.setItem('ecom-localSessionID', response.order_id)
        },
        onError: (error) => {
            console.log(error.response)
            newSessionMutation.mutate({ locale: navigator.language, order_amount: totalSumInCart, order_lines, order_tax_amount })
        }
    })

    const updateExistingOrderMutation = useMutation(updateOrder, {
        onSuccess: (response) => {
            setHtml_snippet(response.html_snippet)
            let iframe = document.getElementById('klarna-checkout')
            iframe.setAttribute('srcdoc', klarnaHtml(response.html_snippet))
        },
    })

    const updateVariables = {
        locale: navigator.language, order_amount: totalSumInCart, order_lines, order_tax_amount, order_id: localSessionID
    }

    useEffect(() => {
        if (!localSessionID) {
            newSessionMutation.mutate({ locale: navigator.language, order_amount: totalSumInCart, order_lines, order_tax_amount })
        } else {
            fetchExistingSessionMutation.mutate({ queryKey: ['', { order_id: localSessionID }] })
            updateExistingOrderMutation.mutate(updateVariables)
        }
    }, [localSessionID])

    useEffect(() => {
        // => update order
        updateExistingOrderMutation.mutate(updateVariables)
    }, [cart])

    useEffect(() => {
        let iframe = document.getElementById('klarna-checkout')
        if (iframe) {
            setTimeout(() => {
                setIframeHeight(iframe.contentWindow?.document.body.scrollHeight + 350 + 'px');
            }, 1500);
        }
    }, [html_snippet])



    const windowSize = useWindowSize()

    if (windowSize.width < 800) return <CheckoutMobile cart={cart} removeFromCart={removeFromCart} changeVariantQuantity={changeVariantQuantity}
        format={format} html_snippet={html_snippet} />

    return (
        <Grid container display='flex' justifyContent='center'>
            <Grid item xs={12} style={{ maxWidth: 900, height: '100%' }} sx={{ m: 20, mt: 0, mb: 0 }}>
                <h1>Kassa</h1>

                <Grid container spacing={2}>
                    {Object.keys(cart).map((key, i) => {
                        const itemVariant = cart[key].variants?.find(e => e.id === parseInt(key))
                        return <>
                            {i === 0 &&
                                <Grid item xs={12}>
                                    <Grid container>
                                        <Grid xs={1}>
                                        </Grid>
                                        <Grid xs>
                                            Produkt
                                        </Grid>
                                        <Grid xs>

                                        </Grid>
                                        <Grid xs={2} alignSelf='center' textAlign='center'>
                                            Antal
                                        </Grid>
                                        <Grid xs={2} alignSelf='center' textAlign='center'>
                                            Pris
                                        </Grid>
                                        <Grid xs={2} alignSelf='center' textAlign='center'>
                                            Summa
                                        </Grid>
                                    </Grid>
                                </Grid>
                            }
                            <Grid item xs={12}>
                                <Grid container component={Paper}>
                                    <Grid xs={1} alignSelf='center' textAlign='center'>
                                        <IconButton disableFocusRipple disableRipple onClick={() => removeFromCart(key)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Grid>
                                    <Grid xs='auto' alignSelf='center'>
                                        <img style={{ maxHeight: '150px', maxWidth: '100%', objectFit: 'contain' }} src={productPlaceholder} />
                                    </Grid>
                                    <Grid xs alignSelf='center'>
                                        <b>
                                            {cart[key].name} - {itemVariant.name}
                                        </b>
                                    </Grid>
                                    <Grid xs={2} alignSelf='center' textAlign='center'>
                                        <IconButton onClick={() => changeVariantQuantity(-1, key)} color="primary" aria-label="increment-product">
                                            <RemoveCircleSharpIcon style={{ fontSize: '34px' }} />
                                        </IconButton>
                                        {cart[key].quantity}
                                        <IconButton onClick={() => changeVariantQuantity(1, key)} color="primary" aria-label="dimunition-product">
                                            <AddCircleSharpIcon style={{ fontSize: '34px' }} />
                                        </IconButton>
                                    </Grid>
                                    <Grid xs={2} alignSelf='center' textAlign='center'>
                                        {format(cart[key].price * (1 + (cart[key].vatRateSE / 10000)) / 100)} kr
                                    </Grid>
                                    <Grid xs={2} alignSelf='center' textAlign='center'>
                                        <b> {format(cart[key].quantity * cart[key].price * (1 + (cart[key].vatRateSE / 10000)) / 100)} kr</b>
                                    </Grid>
                                </Grid>
                            </Grid>

                            {i === Object.keys(cart).length - 1 &&
                                <Grid item xs={12} textAlign='end'>
                                    <h3>Att betala: {format(totalSumInCart / 100)} kr </h3>
                                </Grid>
                            }
                        </>
                    })}
                </Grid>

            </Grid>
            <Grid display='flex' item xs={12} style={{ maxWidth: 1000, height: '100%' }} sx={{ m: 20, mt: 0, mb: 0 }}>
                <iframe
                    title='klarnaCheckout'
                    id='klarna-checkout'
                    className='iframe'
                    srcDoc={klarnaHtml(html_snippet)}
                    style={{ width: '100%', height: iframeHeight }}
                    frameBorder='0'
                    scrolling='no'
                    allowfullscreen=''
                />
            </Grid>
        </Grid>
    )
}

export default Checkout