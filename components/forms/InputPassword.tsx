import React from 'react'

export const InputPassword = (props: {
  id?: string
  value: string
  onChange: (value: string) => void
}) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(event.target.value)
  }

  return (
    <input
      id={props.id}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      type="password"
      value={props.value}
      onChange={onChange}
    />
  )
}
