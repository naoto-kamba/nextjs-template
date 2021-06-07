import React, { useState } from 'react'
import { useRouter } from 'next/router'

const Login = () => {
  const router = useRouter()
  const [error, setError] = React.useState({ isError: false, message: '' })
  const [credentials, setCredentials] = useState({ userId: '', password: '' })
  const onUserIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, userId: event.target.value })
  }
  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, password: event.target.value })
  }
  const onLoginClick = async () => {
    const result = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (result.status === 200) {
      router.push('/user-top')
    } else if (result.status === 401) {
      setError({
        isError: true,
        message: 'ユーザIDとパスワードの組み合わせが間違っています。',
      })
    }
  }
  return (
    <div>
      {error.isError && <div>{error.message}</div>}
      <div>
        <span>ユーザID:</span>
        <input
          type="text"
          value={credentials.userId}
          onChange={onUserIdChange}
        />
      </div>
      <div>
        <span>パスワード:</span>
        <input
          type="password"
          value={credentials.password}
          onChange={onPasswordChange}
        />
      </div>
      <button onClick={onLoginClick}>ログイン</button>
    </div>
  )
}

export default Login
