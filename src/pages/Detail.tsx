import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Movie {
    id: number;
    title: string;
    description: string;
    year: number;
    image: string;
}

const Detail = () => {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch('/movies.json')
            .then((response) => response.json())
            .then((data) => {
                const selectedMovie = data.films.find((film: Movie) => film.id === parseInt(id!));
                setMovie(selectedMovie || null);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Veri yüklenirken hata oluştu: ', error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div className="text-center text-lg">Yükleniyor...</div>;
    }

    if (!movie) {
        return <div className="text-center text-lg">Film bulunamadı.</div>;
    }

    return (
        <div className="bg-black text-white min-h-screen">
            <div className="max-w-screen-xl mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold text-center text-white mb-8">{movie.title}</h1>
                <div className="flex justify-center mb-8">
                    <img
                        src={`/${movie.image}`}
                        alt={movie.title}
                        className="max-w-lg h-auto object-cover rounded-lg shadow-lg"
                    />
                </div>
                <p className="text-white text-lg text-center mb-4">{movie.description}</p>
                <p className="text-white text-sm text-center">Yıl: {movie.year}</p>
            </div>
        </div>
    );
};

export default Detail;
