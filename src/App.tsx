import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Detail from './pages/Detail';
import { FC, useState } from 'react';
import Header from './components/Header';
import { useSearchMoviesQuery } from './redux/movieReducer';

// App bileşeni
const App: FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { data: movies } = useSearchMoviesQuery(searchQuery);

  // Arama fonksiyonu
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const [selectedGenre, setSelectedGenre] = useState<
    | {
      id: number;
      name: string;
    }
  >({ id: 0, name: "" });

  return (
    <Router>
      <Header onSearch={handleSearch} setSelectedGenre={setSelectedGenre} />
      <Routes>
        <Route path="/" element={<Home movies={movies?.results} searchQuery={searchQuery} selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/movie/:id" element={<Detail />} />
      </Routes>
    </Router>
  );
};

export default App;
