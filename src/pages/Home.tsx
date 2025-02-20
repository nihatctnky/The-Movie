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

const Home = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch('/movies.json')
            .then((response) => response.json())
            .then((data) => {
                setMovies(data.films);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Veri yüklenirken hata oluştu: ', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="text-center text-lg">Yükleniyor...</div>;
    }

    const handleFavoriteClick = (movieId: number) => {

        alert(`Movie ${movieId} favorilere eklendi!`);
    };

    return (
        <div className="bg-black text-white min-h-screen">
            <Header />
            <div className="text-center py-12 ">
                <h1 className="text-4xl font-bold">
                    <span className="text-red-600">Film</span>
                    <span className="text-white"> Listesi</span>
                </h1>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
                {movies.map((movie) => (
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
                                onClick={() => handleFavoriteClick(movie.id)}
                                className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition-colors duration-300"
                            >
                                Favorilere Ekle
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
