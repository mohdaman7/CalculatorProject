// Hook to register and manage service worker
'use client'

import { useEffect } from 'react'

export function useServiceWorker() {
  useEffect(() => {
    // Only register in production and if browser supports service workers
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('Service Worker registered:', registration)

            // Check for updates periodically
            setInterval(() => {
              registration.update()
            }, 60000) // Check every 60 seconds

            // Listen for new service worker
            registration.addEventListener('updatefound', () => {
              const newWorker = registration.installing
              newWorker?.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New service worker is ready, notify user
                  console.log('New service worker available. App will update on next visit.')
                  // Optional: Show toast notification to user about update
                }
              })
            })
          })
          .catch((error) => {
            console.log('Service Worker registration failed:', error)
          })
      })
    }
  }, [])
}
