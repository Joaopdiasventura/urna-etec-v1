import { HeaderComponent } from './components/header'
import { InputComponent } from './components/input'
import { PageProvider } from './contexts/page'

export function App(): JSX.Element {
  return (
    <PageProvider>
      <HeaderComponent/>
      <InputComponent/>
    </PageProvider>
  )
}
