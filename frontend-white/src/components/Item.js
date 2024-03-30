import { useParams, useOutletContext } from "react-router-dom";
import { useState } from "react";
import { useWindowSize, CustomAccordion, VariantSelector, convertTaxRate } from '../helpers';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ItemMobile from './ItemMobile';
import Markdown from 'react-markdown';


const Item = ({ cart, setCart, categories, format, baseUrl }) => {

    const { itemid } = useParams();

    const [setCartOpen] = useOutletContext();
    const items = categories.flatMap(e => e.items);
    const selectedItem = items.find(e => e.id === parseInt(itemid));
    console.log(selectedItem);

    const [variant, setVariant] = useState(selectedItem && selectedItem.variants.find(e => e.sellable > 0)?.id);
    const [showVariants, setShowVariants] = useState(false);

    const addToCart = () => {
        const values = { ...cart };
        values[variant] = { ...selectedItem, quantity: 1 };
        setCart(values);
        setCartOpen(true);
    }

    const windowSize = useWindowSize()
    const [expanded, setExpanded] = useState(false);

    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    if (!windowSize.width) return <>Loading...</>

    if (windowSize.width < 800)
        return <ItemMobile
            variant={variant} selectedItem={selectedItem} setVariant={setVariant}
            format={format} addToCart={addToCart} expanded={expanded}
            handleAccordionChange={handleAccordionChange} baseUrl={baseUrl}
        />



    return (
        <>
            <Grid container>
                <Grid item xs={12} md={6}>
                    {selectedItem.images.map(image =>
                        <img src={baseUrl + image.path} alt="Product" style={{ width: '100%', height: 'auto', display: 'block' }} />
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


                                {selectedItem.variants.length > 1 &&
                                    <Box marginTop={3} marginBottom={1}>
                                        <VariantSelector
                                            showVariants={showVariants}
                                            setShowVariants={setShowVariants}
                                            variant={variant}
                                            setVariant={setVariant}
                                            variants={selectedItem.variants}
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
                                    onClick={addToCart}
                                >
                                    Köp – {format(selectedItem.price * (1 + convertTaxRate(selectedItem.vatRateSE)) / 100)} SEK
                                </Button>


                                <Box paddingTop={2}>

                                    <CustomAccordion
                                        first={true}
                                        last={true}
                                        title="BESKRIVNING"
                                        expanded={expanded === 'BESKRIVNING'}
                                        handleChange={() => handleAccordionChange('BESKRIVNING')}
                                    >
                                        <Typography>{selectedItem.specification}</Typography>
                                    </CustomAccordion>
                                    {/* 
                                    <CustomAccordion
                                        title="HOW TO USE"
                                        expanded={expanded === 'HOW TO USE'}
                                        handleChange={() => handleAccordionChange('HOW TO USE')}
                                    >
                                        <Typography>Instructions on how to use the product...</Typography>
                                    </CustomAccordion>

                                    <CustomAccordion
                                        title="SUSTAINABILITY"
                                        expanded={expanded === 'SUSTAINABILITY'}
                                        handleChange={() => handleAccordionChange('SUSTAINABILITY')}
                                    >
                                        <Typography>Sustainability information...</Typography>
                                    </CustomAccordion>

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