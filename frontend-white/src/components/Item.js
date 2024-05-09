import { useParams, useOutletContext } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useWindowSize, CustomAccordion, VariantSelector, convertTaxRate, useCountryCurrency } from '../helpers';

import ItemMobile from './ItemMobile';
import Markdown from 'react-markdown';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


const Item = ({ cart, setCart, categories, format, baseUrl, handleRemindMe }) => {

    const { itemid } = useParams();

    const [setCartOpen] = useOutletContext();
    const items = categories.flatMap(e => e.items);
    const selectedItem = items.find(e => e.id === parseInt(itemid)) || [];

    console.log('selectedItem', selectedItem);


    const [variant, setVariant] = useState(selectedItem && selectedItem?.variants?.find(e => e.sellable > 0)?.id);
    const [showVariants, setShowVariants] = useState(false);
    const [reminderEmail, setReminderEmail] = useState('');
    const [openReminder, setOpenReminder] = useState(false);

    const emailFieldRef = useRef(null);

    useEffect(() => {
        if (!variant) setVariant(selectedItem && selectedItem?.variants?.find(e => e.sellable > 0)?.id);
    }, [selectedItem]);

    console.log('variant', variant);

    useEffect(() => {
        if (openReminder && emailFieldRef.current) emailFieldRef.current.focus();
    }, [openReminder]);

    const addToCart = () => {
        const values = { ...cart };
        values[variant] = { ...selectedItem, quantity: 1 };
        setCart(values);
        setCartOpen(true);
    };

    const windowSize = useWindowSize();
    const [expanded, setExpanded] = useState(false);

    const { selectedCurrency } = useCountryCurrency();


    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    if (!windowSize.width) return <>Loading...</>;

    if (windowSize.width < 800)
        return <ItemMobile
            variant={variant} selectedItem={selectedItem} setVariant={setVariant}
            format={format} addToCart={addToCart} expanded={expanded}
            handleAccordionChange={handleAccordionChange} baseUrl={baseUrl}
            selectedCurrency={selectedCurrency}
        />



    return (
        <>
            <Grid container>
                <Grid item xs={12} md={6}>
                    {selectedItem?.images?.map(image =>
                        <img src={baseUrl + image.path} alt="Product" style={{ width: '100%', height: 'auto', display: 'block' }} preload />
                    )}
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{
                        position: 'sticky',
                        top: '15vh',
                        minHeight: 500,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        overflow: 'auto'
                    }}>
                        <Grid container sx={{
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Grid item width={590} mx={4}>

                                <Typography variant="h5" gutterBottom style={{ textTransform: 'uppercase' }}>{selectedItem.name}</Typography>
                                {/* <Typography variant="subtitle1" gutterBottom>{selectedItem.brand}</Typography> */}
                                {/* <Typography variant="body1" gutterBottom style={{ textTransform: 'uppercase' }}>handvävd</Typography> */}
                                {/* <Typography variant="body2" gutterBottom>The nail color elevates your look.</Typography> */}
                                {/* <Typography variant="body1" gutterBottom>LONG-TERM</Typography> */}
                                {/* <Typography variant="body2" gutterBottom>beskrivnig beskrivnig, beskrivnig, beskrivnig,beskrivnig beskrivnig beskrivnig, beskrivnig, beskrivnig ...</Typography> */}

                                <Markdown
                                    components={{
                                        p: ({ node, ...props }) => <Typography fontSize={15} variant="body1" gutterBottom {...props} />,
                                        h1: ({ node, ...props }) => <Typography variant="body2" gutterBottom {...props} />,
                                    }}
                                >
                                    {selectedItem.description}
                                </Markdown>


                                {selectedItem.variants?.length > 1 &&
                                    <Box marginTop={3} marginBottom={1}>
                                        <VariantSelector
                                            showVariants={showVariants}
                                            setShowVariants={setShowVariants}
                                            variant={variant}
                                            setVariant={setVariant}
                                            variants={selectedItem.variants.filter(e => e.sellable > 0)}
                                        />
                                    </Box>
                                }

                                <Button
                                    sx={{
                                        mt: 2,
                                        backgroundColor: '#000',
                                        color: '#fff',
                                        '&:hover': {
                                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                        },
                                        padding: '12px',
                                        borderRadius: '1',
                                    }}
                                    variant="contained"
                                    fullWidth
                                    onClick={selectedItem?.variants?.find(e => e.id === variant)?.sellable > 0 ? addToCart : () => setOpenReminder(true)}
                                >
                                    {selectedItem?.variants?.find(e => e.id === variant)?.sellable > 0 ? 'BUY' : 'REMIND ME'} – {selectedCurrency === 'SEK' ? format(selectedItem.price_sek * (1 + convertTaxRate(selectedItem.vatRateSE)) / 100) : format(selectedItem.price_eur / 100)} {selectedCurrency}
                                </Button>

                                <Modal open={openReminder} onClose={() => setOpenReminder(false)} keepMounted>
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            bgcolor: 'background.paper',
                                            boxShadow: 24,
                                            p: 4,
                                            textAlign: 'center', // Center the content horizontally
                                            width: '80%', // Set the width of the content
                                            maxWidth: 400, // Limit the maximum width of the content
                                            borderRadius: '6px' // Add border radius for a rounded appearance
                                        }}
                                    >
                                        <IconButton
                                            sx={{
                                                position: 'absolute',
                                                top: '8px',
                                                right: '8px',
                                                color: 'text.secondary',
                                            }}
                                            onClick={() => setOpenReminder(false)}
                                        >
                                            <CloseIcon />
                                        </IconButton>

                                        <TextField inputRef={emailFieldRef} value={reminderEmail} type='email' onChange={({ target }) => setReminderEmail(target.value)} id="reminder-email" label="EMAIL" variant="standard" fullWidth sx={{ mb: 2 }} />

                                        <Button
                                            sx={{
                                                mt: 2,
                                                backgroundColor: '#000',
                                                color: '#fff',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                                },
                                                padding: '12px',
                                                borderRadius: '1',
                                            }}
                                            fullWidth
                                            onClick={() => handleRemindMe({ email: reminderEmail, variantId: variant?.id })}
                                        >
                                            REMIND ME
                                        </Button>
                                    </Box>
                                </Modal>
                                <Box paddingTop={2}>

                                    <CustomAccordion
                                        first={true}
                                        title='DETAILS'
                                        expanded={expanded === 'DETAILS'}
                                        handleChange={() => handleAccordionChange('DETAILS')}
                                    >
                                        <Typography>{selectedItem.details}</Typography>
                                    </CustomAccordion>
                                    <CustomAccordion
                                        title="SIZE & FIT"
                                        expanded={expanded === 'SIZE & FIT'}
                                        handleChange={() => handleAccordionChange('SIZE & FIT')}
                                    >
                                        <Typography>{selectedItem.sizefit}</Typography>
                                    </CustomAccordion>

                                    <CustomAccordion
                                        title="CARE"
                                        last={true}
                                        expanded={expanded === 'CARE'}
                                        handleChange={() => handleAccordionChange('CARE')}
                                    >
                                        <Typography>{selectedItem.care}</Typography>
                                    </CustomAccordion>

                                    {/* 
                                    <CustomAccordion
                                        last={true}
                                        title="INGREDIENTS"
                                        expanded={expanded === 'INGREDIENTS'}
                                        handleChange={() => handleAccordionChange('INGREDIENTS')}
                                    >
                                        <Typography>List of ingredients...</Typography>
                                    </CustomAccordion> */}
                                </Box>



                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}

export default Item;