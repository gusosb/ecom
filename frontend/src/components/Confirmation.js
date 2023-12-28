import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { useQuery } from '@tanstack/react-query'
import { confirmOrder } from '../requests'
import { klarnaHtml } from '../helpers'

import Grid from '@mui/material/Grid'

const Confirmation = () => {

    const { order_id } = useParams()

    const result = useQuery(['confirm', { order_id }], confirmOrder, {
        refetchOnWindowFocus: false
    })

    const html_snippet = result.data?.html_snippet

    useEffect(() => {
        if (html_snippet) localStorage.removeItem('ecom-localSessionID')
    }, [html_snippet])

    return (
        <>
            <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                <Grid item xs={12} style={{ maxWidth: 1200, height: '100%' }} sx={{ m: 20, mt: 0, mb: 0 }}>
                    {html_snippet &&
                        <iframe
                            title='klarnaCheckout'
                            className='iframe'
                            srcDoc={klarnaHtml(html_snippet)}
                            frameBorder='0'
                            scrolling='no'
                        />
                    }
                </Grid>
            </Grid>
        </>
    )
}

export default Confirmation