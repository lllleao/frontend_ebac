import GlobalStyle from './globalStyle'
import { BrowserRouter } from 'react-router-dom'
import Rotas from './routes'

function App() {
    return (
        <BrowserRouter>
            <GlobalStyle />
            <Rotas />
        </BrowserRouter>
    )
}

export default App
