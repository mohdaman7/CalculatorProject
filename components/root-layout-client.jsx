'use client'

import { useServiceWorker } from "@/hooks/use-service-worker"

export default function RootLayoutClient({ children }) {
  useServiceWorker()

  return <>{children}</>
}
