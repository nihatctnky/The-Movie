import { FC } from 'react';
import { Link } from 'react-router-dom';

interface Movie {
    id: number;
    title: string;
    description: string;
    image: string;
}

interface FavoriteItemProps {
    movie: Movie;
    onRemoveFromFavorites: (movieId: number, movieTitle: string) => void;
}

const FavoriteItem: FC<FavoriteItemProps> = ({ movie, onRemoveFromFavorites }) => {
    const handleRemove = () => {
        onRemoveFromFavorites(movie.id, movie.title);
    };

    return (
        <li key={movie.id} className="bg-white p-4 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
            <Link to={`/movie/${movie.id}`} className="block text-center">
                <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-48 h-64 object-cover rounded-lg mb-4 mx-auto"
                    onError={(e) => {
                        console.log("Resim yüklenemedi, varsayılan resim gösterilecek.");
                        e.currentTarget.src = '/images/default.jpg';
                    }}
                />
                <h3 className="text-xl font-semibold text-gray-800">{movie.title}</h3>
                <p className="text-gray-600 text-sm mt-2">{movie.description}</p>
            </Link>
            <div className="flex justify-center mt-4">
                <button
                    onClick={handleRemove}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                    Favorilerden Çıkar
                </button>
            </div>
        </li>
    );
};

export default FavoriteItem;
