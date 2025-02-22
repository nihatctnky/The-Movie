import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Detail from './pages/Detail';
import { FC, useState } from 'react';
import Header from './components/Header';

// App bileşeni
const App: FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Arama fonksiyonu
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <Router>
      <Header onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<Home searchQuery={searchQuery} />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/movie/:id" element={<Detail />} />
      </Routes>
    </Router>
  );
};

export default App;
