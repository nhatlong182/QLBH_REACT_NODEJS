
import { BrowserRouter } from 'react-router-dom';
import Header from './components/header.js'
import Main from './components/main.js'
import Footer from './components/footer.js'


function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <Header />
        <Main />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App
