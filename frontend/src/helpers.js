import { useState, useEffect } from 'react'


export const useWindowSize = () => {
   const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
   })
   useEffect(() => {
      // Handler to call on window resize
      const handleResize = () => {
         // Set window width/height to state
         setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
         })
      }
      // Add event listener
      window.addEventListener("resize", handleResize)
      // Call handler right away so state gets updated with initial window size
      handleResize()
      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize)
   }, []) // Empty array ensures that effect is only run on mount
   return windowSize
}

export const contactUs = [
   { name: 'Kontakt', link: '/contact-us' },
   { name: 'Vanliga frågor', link: '/faq' },
];

export const customerService = [
   { name: 'Allmänna villkor', link: '/general-terms' },
   { name: 'Retur', link: '/returns' },
   { name: 'Betalningsvillkor', link: '/payment-terms' },
   { name: 'Integritetspolcy', link: '/' },
   { name: 'Leveransvillkor', link: '/delivery-terms' },
   { name: 'Ångerrätt, retur och byten', link: '/return-terms' },
];

export const information = [
   { name: 'Om Surdegsbutiken', link: '/about' },
   { name: 'Presentkort', link: '/giftcards' },
];