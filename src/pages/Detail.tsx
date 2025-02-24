import { useParams } from 'react-router-dom';
import { useGetMovieDetailsQuery } from '../redux/movieReducer';
import { baseImgURL } from '../utils/constants';
import { Actor } from '../redux/movieReducer/types';
import Comment from '../components/Comment';

const Detail = () => {
    const { id } = useParams<{ id: string }>();
    if (!id) {
        return <div>No movie found</div>;  // id'nin mevcut olup olmadığını kontrol et
    }

    const { data: movie, isLoading, error } = useGetMovieDetailsQuery(id);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {String(error)}</div>;
    }

    if (!movie) {
        return <div>No movie found</div>;
    }

    return (
        <div className="bg-black text-white min-h-screen p-6">
            <div className="text-center py-6">
                <h1 className="text-5xl font-extrabold mb-16 mt-4 text-shadow-lg ">{movie.title}</h1>
                <div className='max-w-[60vw] mx-auto'>
                    <img
                        src={movie.backdrop_path ? baseImgURL + movie.backdrop_path : "/default_banner.jpg"}
                        alt={movie.title}
                        className="mx-auto w-full h-auto mb-8 rounded-lg"
                        onError={(e) => e.currentTarget.src = '/images/default.jpg'}
                    />
                </div>
                <div className="mx-auto max-w-[80vw] p-6 bg-gray-800 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105">
                    <p className="mt-6 text-lg font-light">{movie.overview}</p>
                    <div className="mt-6 text-xl font-semibold">
                        <p><strong>Yıl:</strong> {movie.release_date}</p>
                        <p><strong>İnceleme:</strong> {movie.vote_average}</p>
                    </div>
                </div>
                <div className='max-w-[80vw] mx-auto p-16'>
                    <h1 className='text-center'>Oyuncular</h1>
                    <div className='flex overflow-scroll scroll justify-between p-8 gap-4'>
                        {
                            movie.credits.cast.slice(0, 10).map((actor: Actor) => (
                                <div className='flex w-[200px] flex-none flex-col border-white border-2 rounded-md'>
                                    <img src={baseImgURL + actor.profile_path} alt="" />
                                    <p>{actor.name}</p>
                                    <p className='text-slate-400'>{actor.character}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div>
                    <Comment />
                </div>
            </div>
        </div>
    );
};

export default Detail;
