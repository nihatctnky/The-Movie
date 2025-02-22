import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Movie {
    id: number;
    title: string;
    description: string;
    year: number;
    image: string;
    rating: number;
    viewCount: number;
    isTrending: boolean;
}

const Detail = () => {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<Movie | null>(null);

    useEffect(() => {
        if (id) {
            fetch("/movies.json")
                .then((response) => response.json())
                .then((data) => {
                    const movieData = data.films.find((film: Movie) => film.id === parseInt(id));
                    setMovie(movieData || null);
                })
                .catch((error) => {
                    console.error("Film verisi alınırken bir hata oluştu:", error);
                });
        }
    }, [id]);

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-black text-white min-h-screen p-6">
            <div className="text-center py-12">

                <h1 className="text-5xl font-extrabold mb-16 mt-4 text-shadow-lg ">{movie.title}</h1>

                {/* Film kartı */}
                <div className="mx-auto w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105">
                    <img
                        src={movie.image}
                        alt={movie.title}
                        className="mx-auto w-full h-auto mb-8 rounded-lg"
                        onError={(e) => e.currentTarget.src = '/images/default.jpg'}
                    />
                    <p className="mt-6 text-lg font-light">{movie.description}</p>
                    <div className="mt-6 text-xl font-semibold">
                        <p><strong>Year:</strong> {movie.year}</p>
                        <p><strong>Rating:</strong> {movie.rating}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail;
