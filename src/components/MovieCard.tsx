import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../redux/movieReducer/types';
import { baseImgURL } from '../utils/constants';



interface MovieCardProps {
    movie: Movie;
    onFavoriteClick: (movie: Movie) => void;
}

const MovieCard: FC<MovieCardProps> = ({ movie, onFavoriteClick }) => {
    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
        const isMovieFavorite = savedFavorites.some((fav: Movie) => fav.id === movie.id);
        setIsFavorite(isMovieFavorite);
    }, [movie.id]);

    const handleFavoriteClick = () => {
        onFavoriteClick(movie);
        setIsFavorite(!isFavorite);
    };

    return (
        <li className="bg-white rounded-lg shadow-lg p-4 flex flex-col h-full">
            <Link to={`/movie/${movie.id}`}>
                <img
                    src={movie.backdrop_path ? baseImgURL + movie.backdrop_path : "/default_banner.jpg"}
                    alt={movie.title}
                    className="w-full h-56 object-cover rounded"
                />
                <h3 className="text-xl font-semibold mt-2 text-black">{movie.title}</h3>
            </Link>
            <p className="text-gray-600 text-sm mt-2 flex-grow">{movie.overview.slice(0,300)}...</p>
            <div className="mt-4 flex justify-center">
                <button
                    onClick={handleFavoriteClick}
                    className={`py-2 px-4 rounded ${isFavorite ? 'bg-green-600' : 'bg-red-600'} text-white`}
                >
                    {isFavorite ? 'Favorilere Eklendi' : 'Favorilere Ekle'}
                </button>
            </div>
        </li>
    );
};

export default MovieCard;
