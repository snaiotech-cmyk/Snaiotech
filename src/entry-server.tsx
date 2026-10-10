import { renderToString } from 'react-dom/server'
import App, { type Page } from './App'

export function render(page: Page = 'home') {
  return renderToString(<App initialPage={page} />)
}

export { type Page } from './App'
