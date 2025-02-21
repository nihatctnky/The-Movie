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
        onRemoveFromFavorites(movie.id, movie.title)
    };

    return (
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
