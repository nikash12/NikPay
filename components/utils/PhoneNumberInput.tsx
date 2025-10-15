"use client"
import { memo } from "react"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

interface PhoneNumberInputProps {
  value: string
  onChange: (value: string) => void
}

export const PhoneNumberInput = memo(({ value, onChange }: PhoneNumberInputProps) => {
  return (
    <div className="w-full [&_.PhoneInputCountrySelect]:text-blue-800">
      <PhoneInput
        placeholder="Enter phone number"
        defaultCountry="US"
        value={value}
        onChange={(value) => onChange(value ?? "")}
        className="w-full input-lg border-b-1  p-2"
      />
    </div>

  )
})
