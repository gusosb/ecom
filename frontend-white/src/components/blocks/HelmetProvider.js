import { Helmet } from 'react-helmet-async';

const HelmetProvider = () => {
    return (
        <Helmet>
            <title>GUSTAF LUND</title>
            <meta name="description" content="Explore premium Scandinavian knitwear and men's clothing at GUSTAF LUND. Discover high-quality, timeless designs crafted from luxurious materials like cashmere. Elevate your style with our collection." />
            <meta name="keywords" content="GUSTAF LUND, Scandinavian design, premium knitwear, men's clothing, cashmere, luxury fashion, timeless style" />
            <meta name="author" content="GUSTAF LUND" />
            <link rel="canonical" href="https://www.gustaflund.com/" />
        </Helmet>
    )
}

export default HelmetProvider;