import dynamic from 'next/dynamic'

export { NextLink } from './next-link'
export { FooterComponent } from './footer'
export { HeaderComponent } from './header'
export { MediaComponent } from './media'

// Pages Component's
export * as Labs from './pages/labs'

// Without SSR
export const AppProvider = {
  Dialog: dynamic(() => import('./base/dialog'), { ssr: false }),
  Loader: dynamic(() => import('./base/loader'), { ssr: false }),
  Modal: dynamic(() => import('./base/modal'), { ssr: false }),
  Notice: dynamic(() => import('./base/notice'), { ssr: false })
}
