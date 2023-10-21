import React from 'react'
import './PageShell.css'


export { PageShell }

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <React.StrictMode>
      {/* <PageContextProvider pageContext={pageContext}> */}
      {children}
      {/* </PageContextProvider> */}
    </React.StrictMode>
  )
}
