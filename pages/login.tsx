import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { FormLabel, InputPassword, InputText } from '../components/forms'

const Login = () => {
  const router = useRouter()
  const [error, setError] = React.useState({ isError: false, message: '' })
  const [credentials, setCredentials] = useState({ userId: '', password: '' })
  const onUserIdChange = (value: string) => {
    setCredentials({ ...credentials, userId: value })
  }
  const onPasswordChange = (value: string) => {
    setCredentials({ ...credentials, password: value })
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
      <div className="flex justify-center text-4xl mt-6 mb-10">
        電子決裁システム
      </div>
      <div className="flex justify-center">
        <div className="w-full max-w-xs bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {error.isError && <div className="text-red-700">{error.message}</div>}
          <div className="mb-4">
            <FormLabel for="username">ユーザID</FormLabel>
            <InputText
              id="username"
              value={credentials.userId}
              onChange={onUserIdChange}
            />
          </div>
          <div className="mb-6">
            <FormLabel for="password">パスワード:</FormLabel>
            <InputPassword
              id="password"
              value={credentials.password}
              onChange={onPasswordChange}
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={onLoginClick}
          >
            ログイン
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
