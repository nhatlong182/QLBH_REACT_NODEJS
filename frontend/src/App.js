
import { BrowserRouter } from 'react-router-dom';
import Header from './components/header.js'
import Main from './components/main.js'
import Footer from './components/footer.js'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="grid-container" style={{ minHeight: '110vh', paddingTop: '6vh'}}>
        <Main />
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App
