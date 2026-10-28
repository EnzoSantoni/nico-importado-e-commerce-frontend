import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router} from 'react-router'
import { OrderProvider } from './context/OrderContext.jsx'
import UserProvider from './context/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
        <UserProvider>
          <OrderProvider>
            <App />
          </OrderProvider>
        </UserProvider>
    </Router>
  </StrictMode>,
)
