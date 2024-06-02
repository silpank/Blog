import './App.css';
import Header from './Components/Header'; 
import Footer from './Components/Footer';
import Auth from './Components/Auth';
import { Routes, Route } from 'react-router-dom';
import PageNotFound from './Pages/PageNotFound';
import UserHome from './Components/UserHome';
import Post from './Components/Post'

function App() {
  return (
    <div className="App">
      <Header />
      <section>
        <Routes>
          <Route path='/' element={<Auth />} />
          <Route path='*' element={<PageNotFound />} />
          <Route path='/UserHome' element={<UserHome/>}/>
          <Route path='/post/:postId' element={<Post />}/>
        </Routes>
      </section>
      <Footer />
    </div>
  );
}

export default App;
