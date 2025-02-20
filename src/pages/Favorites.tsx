import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './../componets/Header';

interface Movie {
    id: number;
    title: string;
    description: string;
    year: number;
    image: string;
}

const Favorites = () => {
    const [favorites, setFavorites] = useState<Movie[]>([]);

    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setFavorites(savedFavorites); // localStorage'dan favorileri al
    }, []);

    const removeFromFavorites = (movieId: number) => {
        const updatedFavorites = favorites.filter((movie) => movie.id !== movieId);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Favorileri güncelle
    };

    if (favorites.length === 0) {
        return (
            <div className="bg-black text-white min-h-screen">
                <Header />
                <div className="text-center py-8">
                    <h1 className="text-4xl font-bold">Favoriler</h1>
                    <p className="text-white mt-4">Henüz favori film eklemediniz!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-black text-white min-h-screen">
            <Header />
            <div className="container mx-auto text-center py-8">
                <h1 className="text-4xl font-bold text-white p-6">Favori Filmler</h1>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 container mx-auto">
                {favorites.map((movie) => (
                    <li key={movie.id} className="bg-white p-4 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
                        <Link to={`/detail/${movie.id}`} className="block text-center">
                            <img
                                src={`/${movie.image}`}
                                alt={movie.title}
                                className="w-full h-48 object-cover rounded-t-lg mb-4"
                            />
                            <h3 className="text-xl font-semibold text-gray-700">{movie.title}</h3>
                            <p className="text-gray-600 text-sm mt-2">{movie.description}</p>
                        </Link>
                        <div className="flex justify-center mt-4">
                            <button
                                onClick={() => removeFromFavorites(movie.id)}
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                            >
                                Favorilerden Çıkar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Favorites;
