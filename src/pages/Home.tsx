

import Header from './../componets/Header';

const Home = () => {
    return (
        <div>
            <Header />
            <main className="container mx-auto p-4 ">
                <h2 className="text-3xl font-bold mb-4">Featured Movies</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <div className="bg-gray-800 p-4 rounded-lg">
                        <img
                            src="Atatürk.png"
                            alt="Atatürk"
                            className="w-full object-cover mb-4 rounded"
                            style={{ height: '600px' }} // Burada custom yükseklik veriyoruz
                        />
                        <h3 className="text-xl text-white hover:text-yellow-500">Atatürk</h3>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg">
                        <img src="Mortal.png" alt="Mortal" className="w-full  object-cover mb-4 rounded"
                            style={{ height: '600px' }} />
                        <h3 className="text-xl text-white hover:text-yellow-500">Mortal Kombat</h3>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg">
                        <img src="sticker.png" alt="sticker" className="w-full h-854 object-cover mb-4 rounded"
                            style={{ height: '600px' }} />
                        <h3 className="text-xl text-white hover:text-yellow-500">Transporter</h3>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg">
                        <img src="images.png" alt="images" className="w-full h-854 object-cover mb-4 rounded"
                            style={{ height: '600px' }} />
                        <h3 className="text-xl text-white hover:text-yellow-500">Hogar</h3>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;
