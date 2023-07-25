import { useEffect, useState } from "react"


export const useResize = () => {

    const [ancho, setAncho] = useState(window.innerWidth)

    useEffect(() => {
      
        const handleResize = () => {
            setAncho(window.innerWidth)
        }
    
        window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }, [])
    

  return { ancho }
}