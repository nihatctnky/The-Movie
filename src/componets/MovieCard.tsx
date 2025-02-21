// components/MovieCard.tsx
import { FC } from 'react';
import { Link } from 'react-router-dom';

interface Movie {
    id: number;
    title: string;
    description: string;
    image: string;
}

interface MovieCardProps {
    movie: Movie;
    onFavoriteClick: (movieId: number) => void;
}

const MovieCard: FC<MovieCardProps> = ({ movie, onFavoriteClick }) => {
    return (
        <li key={movie.id} className="bg-white p-4 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
            <Link to={`/detail/${movie.id}`} className="block text-center">
                <img
                    src={`/${movie.image}`}
                    alt={movie.title}
                    className="w-full h-48 object-cover rounded-t-lg mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-700">{movie.title}</h3>
                <p className="text-gray-600 text-sm mt-2 line-clamp-3">{movie.description}</p>
            </Link>
            <div className="flex justify-center mt-4">
                <button
                    onClick={() => onFavoriteClick(movie.id)}
                    className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition-colors duration-300"
                >
                    Favorilere Ekle
                </button>
            </div>
        </li>
    );
};

export default MovieCard;
