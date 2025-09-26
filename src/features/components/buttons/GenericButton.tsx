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

  return (
    <div>
      <button onClick={testPost}>Test</button>
    </div>
  )
}

export default GenericButton