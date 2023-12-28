import { useState, useEffect } from 'react'

export const klarnaHtml = (snippet) => {
   return snippet;
   return `
       <html>
       <head>
       </head>
       <body>
       <textarea style="display: none;" id="KCO">
                ${snippet}
        </textarea
          >
    
          <div id="my-checkout-container"></div>
    
          <!-- START - Dont edit -->
          <script type="text/javascript">
             const checkoutContainer = document.getElementById(
                "my-checkout-container"
             );
             checkoutContainer.innerHTML = document
                .getElementById("KCO")
                .value.replace(/\\"/g, '"')
                .replace(/\\n/g, "");
             const scriptsTags = checkoutContainer.getElementsByTagName("script");
             for (let i = 0; i < scriptsTags.length; i++) {
                const parentNode = scriptsTags[i].parentNode;
                const newScriptTag = document.createElement("script");
                newScriptTag.type = "text/javascript";
                newScriptTag.text = scriptsTags[i].text;
                parentNode.removeChild(scriptsTags[i]);
                parentNode.appendChild(newScriptTag);
             }
          </script>
          <!-- END -->
       </body>
    </html>
       `;
}


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
   { name: 'Kontakt', link: '/' },
   { name: 'Vanliga frågor', link: '/' },
]

export const customerService = [
   { name: 'Allmänna villkor', link: '/' },
   { name: 'Retur', link: '/' },
   { name: 'Betalningsvillkor', link: '/' },
   { name: 'Integritetspolcy', link: '/' },
   { name: 'Leveransvillkor', link: '/' },
   { name: 'Ångerrätt, retur och byten', link: '/' },
]

export const information = [
   { name: 'Om Surdegsbutiken', link: '/' },
   { name: 'Presentkort', link: '/' },
]