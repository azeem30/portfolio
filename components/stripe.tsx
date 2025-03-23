"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import type { StripeElementsOptions } from "@stripe/stripe-js"

interface StripeProps {
  children: React.ReactNode
  options: StripeElementsOptions
  className?: string
}

export function Stripe({ children, options, className }: StripeProps) {
  const [stripePromise, setStripePromise] = useState(null)

  useEffect(() => {
    // This would normally use an environment variable
    setStripePromise(loadStripe("pk_test_placeholder"))
  }, [])

  return (
    <div className={className}>
      {stripePromise && (
        <Elements stripe={stripePromise} options={options}>
          {children}
        </Elements>
      )}
    </div>
  )
}

