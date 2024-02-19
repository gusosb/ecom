import { useState } from "react"
import { useMutation } from '@tanstack/react-query'
import { addReview } from '../requests'
import { useParams } from "react-router-dom"

import { styled } from '@mui/system'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Rating from '@mui/material/Rating'
import { TextareaAutosize } from '@mui/base/TextareaAutosize'
import productPlaceholder from '../images/6872_100-Whey-Gold-Std-912-g-Vanilla-Ice-Cream_0922.webp'


const blue = {
  100: '#DAECFF',
  200: '#b6daff',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
};

const StyledTextarea = styled(TextareaAutosize)(
  ({ theme }) => `
  width: 320px;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 12px;
  border-radius: 12px 12px 0 12px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: #fbdd7e;
    box-shadow: 0 0 0 3px #fbdd7e;
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);

const Review = ({ categories, queryClient, baseUrl }) => {

  const { itemid, orderid } = useParams();

  console.log(itemid);


  const [isReviewed, setIsReviewed] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const itemToReview = categories.flatMap(a => a.SubOne.flatMap(b => b.SubTwo.flatMap(c => {
    if (c.items.find(d => d.id === parseInt(itemid))) {
      return { ...c.items.find(d => d.id === parseInt(itemid)), subTwo: c.id, subOne: b.id, top: a.id };
    }
    return [];
  })
  ))[0];

  console.log(itemToReview);

  const newReviewMutation = useMutation(addReview, {
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['categories'] }) },
  })

  const sendReview = () => {
    newReviewMutation.mutate({ id: parseInt(itemid), comment, rating, orderId: orderid })
    setIsReviewed(true)
  }


  return (
    <>
      <Grid container display='flex' justifyContent='center'>
        {isReviewed ? <>Tack för din recension!</>
          :
          <>
            <Grid item xs={12} display='center' justifyContent='center'>
              <h3 style={{ marginTop: 0 }}> {itemToReview.name}</h3>
            </Grid>

            <Grid item xs={12} display='center' justifyContent='center'>
              <img style={{ maxHeight: '300px', maxWidth: '100%', objectFit: 'contain' }} src={baseUrl + itemToReview.images[0].path} />
            </Grid>
            <Grid item xs={12} display='center' justifyContent='center' mt={1}>
              <Rating name="select-rating" value={rating} onChange={(e, newValue) => setRating(newValue)} />
            </Grid>
            <Grid item xs={12} display='center' justifyContent='center' mt={1}>
              <StyledTextarea
                maxRows={4}
                aria-label="review-description"
                placeholder="Berätta gärna vad tyckte du om produkten..."
                value={comment}
                onChange={({ target }) => setComment(target.value)}
              />
            </Grid>

            <Grid item xs={12} display='center' justifyContent='center' mt={1}>
              <Button sx={{ height: '100%' }} fullWidth variant="contained" color="primary" disableElevation onClick={sendReview}>skicka recension</Button>
            </Grid>
          </>
        }
      </Grid>
    </>
  )
}

export default Review