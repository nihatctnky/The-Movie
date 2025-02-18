

const Favorites = () => {
    return (
        <div className="p-4">
            <h1 className="text-4xl font-bold mb-6 ">Your Favorites</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                    <img
                        src="xyx.png"

                        className="w-full object-cover rounded mb-4"
                        style={{ height: '600px' }}
                    />
                    <h3 className="text-xl text-white hover:text-yellow-500">Aman CalLed Ove</h3>
                    <p className="text-gray-400 hover:text-yellow-500">Description of the favorite movie.</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                    <img
                        src="xyz.png"

                        className="w-full h-64 object-cover rounded mb-4"
                        style={{ height: '600px' }}
                    />
                    <h3 className="text-xl text-white hover:text-yellow-500">Shadow Bone</h3>
                    <p className="text-gray-400 hover:text-yellow-500">Description of the favorite movie.</p>
                </div>

            </div>
        </div>
    );
};

export default Favorites;
