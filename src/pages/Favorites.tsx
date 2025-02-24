import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FavoriteItem from '../components/FavoriteItem';
import { Movie } from '../redux/movieReducer/types';


const Favorites = () => {
    const [favorites, setFavorites] = useState<Movie[]>([]);

    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setFavorites(savedFavorites);
    }, []);

    const removeFromFavorites = (movieId: number, movieTitle: string) => {

        const updatedFavorites = favorites.filter((movie) => movie.id !== movieId);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

        toast.success(`${movieTitle} favorilerden çıkarıldı!`, {
            position: 'top-right',
            autoClose: 3000,
            style: { backgroundColor: 'black', color: 'red' },
        });
    };

    return (
        <div className="bg-black text-white min-h-screen">

            <div className="container mx-auto text-center py-8">
                <h1 className="text-4xl font-bold text-white p-6 mb-14">
                    {favorites.length === 0 ? 'Favoriler' : 'Favori Filmler'}
                </h1>
                {favorites.length === 0 ? (
                    <p className="text-white mt-4">Henüz favori film eklemediniz!</p>
                ) : (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 container mx-auto">
                        {favorites.map((movie) => (
                            <FavoriteItem
                                key={movie.id}
                                movie={movie}
                                onRemoveFromFavorites={removeFromFavorites}
                            />
                        ))}
                    </ul>
                )}
            </div>


            <ToastContainer />
        </div>
    );
};

export default Favorites;
