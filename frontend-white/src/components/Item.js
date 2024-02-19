import { useParams, useOutletContext } from "react-router-dom";
import { useState } from "react";
import { useWindowSize, CustomAccordion, VariantSelector } from '../helpers';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ItemMobile from './ItemMobile';


const Item = ({ cart, setCart, categories, format, baseUrl }) => {

    const { itemid } = useParams();

    const [setCartOpen] = useOutletContext();
    const items = categories.flatMap(e => e.items);
    const selectedItem = items.find(e => e.id === parseInt(itemid));
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
            handleAccordionChange={handleAccordionChange}
        />



    return (
        <>
            <Grid container>
                <Grid item xs={12} md={6}>
                    <img src="https://cdn.obayaty.com/images/vid8gs32/production/194bd93cc43196a619ddb524c45497b93e71cbda-2560x3200.jpg?w=1920&fit=max&auto=format" alt="Product" style={{ width: '100%', height: 'auto', display: 'block' }} />
                    <img src="https://cdn.obayaty.com/images/vid8gs32/production/ba000ab42fc5d3ce6595ed00b4b847355e80270a-2560x3200.jpg?w=1920&fit=max&auto=format" alt="Product" style={{ width: '100%', height: 'auto', display: 'block' }} />
                    <img src="https://cdn.obayaty.com/images/vid8gs32/production/63584b29f138662363584009b9193018d263e01b-2560x3200.jpg?w=1920&fit=max&auto=format" alt="Product" style={{ width: '100%', height: 'auto', display: 'block' }} />
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
                            <Grid item>

                                <Typography variant="h5" gutterBottom>NAIL COLOUR</Typography>
                                <Typography variant="subtitle1" gutterBottom>Violet Dusk</Typography>
                                <Typography variant="body1" gutterBottom>INSTANT</Typography>
                                <Typography variant="body2" gutterBottom>The nail color elevates your look.</Typography>
                                <Typography variant="body1" gutterBottom>LONG-TERM</Typography>
                                <Typography variant="body2" gutterBottom>Obayaty’s blend of bioceramics and hexanal is a caring complex to help promote healthier nails.</Typography>



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
                                            backgroundColor: 'rgba(0, 0, 0, 0.8)', // Slightly lighter black on hover
                                        },
                                        padding: '12px',
                                        borderRadius: '1',
                                    }}
                                    variant="contained"
                                    fullWidth
                                    onClick={addToCart}
                                >
                                    Buy – {format(selectedItem.price * (1 + (selectedItem.vatRateSE / 100)) / 100)} SEK
                                </Button>


                                <Box paddingTop={2}>

                                    <CustomAccordion
                                        first={true}
                                        title="DESCRIPTION"
                                        expanded={expanded === 'DESCRIPTION'}
                                        handleChange={() => handleAccordionChange('DESCRIPTION')}
                                    >
                                        <Typography>Some description here...</Typography>
                                    </CustomAccordion>

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
                                    </CustomAccordion>
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