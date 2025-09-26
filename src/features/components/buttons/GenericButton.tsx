'use client'
import React from 'react'
import { useSessionStore } from '@/stores/session/sessionStore'
type GenericButtonProps = { url: string }

function GenericButton({ url }: GenericButtonProps) {

    const { testPost } = useSessionStore() 
//   const handleTest = async () => {
//     try {
//       const response = await axios.post(url)
//       console.log("Este es el response de la API: ", response)
//     } catch (error) {
//       console.error(error)
//     }
//   }

  const handleTest = async () => {
    try {
      const response = await testPost()
      console.log("Desde el componente Generic button ",response)
    } catch (error) {
      console.log("Entre al catch error en el componente")
      console.log("Este es el error: ", error)
    }
  }

  return (
    <div>
      <button onClick={handleTest}>Test</button>
    </div>
  )
}

export default GenericButton