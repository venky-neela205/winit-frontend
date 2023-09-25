import {BrowserRouter, Routes, Route} from 'react-router-dom'

import AddRoute from './components/AddRoute' 
import MainRoute from './components/MainRoute'

const App = () => {
  return(
    <BrowserRouter>
    <Routes>
      <Route exact path='/' Component={AddRoute} />
      <Route exact path='/mainRoute' Component={MainRoute} />
    </Routes>
  </BrowserRouter>
  )
}

export default App;