
import './App.css';
import Header from './components/header';
import MainContent from './components/mainContent';
import Footer  from './components/footer';

function App() {
 
  return (
    <div className="page">
      <Header />
      <main className="content">
          <MainContent />
      </main>
      <Footer />
    </div>
  );
}

export default App;
