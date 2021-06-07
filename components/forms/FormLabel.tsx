import React from 'react'

export const FormLabel = (props: {
  for?: string
  children: React.ReactNode
}) => {
  return (
    <label
      className="block text-gray-700 text-sm font-bold mb-2"
      htmlFor={props.for}
    >
      {props.children}
    </label>
  )
}
