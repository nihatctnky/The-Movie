import { FC } from 'react';
import MovieCard from './MovieCard';
import { Movie } from '../redux/movieReducer/types';


interface MovieListProps {
    movies: Movie[];
    onFavoriteClick: (movie: Movie) => void;
}

const MovieList: FC<MovieListProps> = ({ movies, onFavoriteClick }) => {

    console.log(movies)
    return (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
            {movies?.length > 0 ? (
                movies.map((movie:Movie) => (
                    <MovieCard key={movie.id} movie={movie} onFavoriteClick={onFavoriteClick} />
                ))
            ) : (
                <p className="text-center text-white mt-4">Aramanıza uygun film bulunamadı.</p>
            )}
        </ul>
    );
};

export default MovieList;
