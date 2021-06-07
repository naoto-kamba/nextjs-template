import React from 'react'
const UserTop = () => {
  const [userInfo, setUserInfo] = React.useState({ userId: '', email: '' })
  const [error, setError] = React.useState({ isError: false, message: '' })
  React.useEffect(() => {
    ;(async () => {
      const result = await fetch('/api/login')
      if (result.status === 200) {
        setUserInfo(await result.json())
      } else {
        setError({
          isError: true,
          message: 'ユーザ情報の取得に失敗しました。',
        })
      }
    })()
  }, [])
  if (error.isError) {
    return <div>{error.message}</div>
  } else {
    return (
      <div>
        <div>
          <span>ユーザID:</span>
          <span>{userInfo.userId}</span>
        </div>
        <div>
          <span>メールアドレス:</span>
          <span>{userInfo.email}</span>
        </div>
      </div>
    )
  }
}

export default UserTop
