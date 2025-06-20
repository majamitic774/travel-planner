import React, { useEffect, useState } from 'react'

const requestUrl = 'http://localhost:8000/message'
const errorMessage = 'Error'

const App = () => {

  const [message, setMessage] = useState('')

  const fetchMessage = async () => {

    try {

      const response = await fetch(requestUrl)

      if (!response.ok) return setMessage(errorMessage)

      const data = await response.json()

      setMessage(data.message)
    } catch {

      setMessage(errorMessage)
    }
  }

  useEffect(() => {

    fetchMessage()
  }, [])

  return <div>{message}</div>
}

export default App
