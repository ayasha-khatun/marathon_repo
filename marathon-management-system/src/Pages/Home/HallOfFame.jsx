import React from 'react';
import { FaMedal } from 'react-icons/fa';

const HallOfFame = () => {
    const winners = [
        {
            name: "Arif Hossain",
            time: "2h 12m",
            event: "Dhaka Winter Marathon 2024",
            image: "https://i.ibb.co/BHQ7GjyC/ai-generated-8268599-1280.jpg"
        },
        {
            name: "Nusrat Jahan",
            time: "2h 28m",
            event: "Chittagong Marathon 2024",
            image: "https://i.ibb.co/FbP8xpSZ/sportswoman-8265224-1280.jpg"
        },
        {
            name: "Sajjad Karim",
            time: "2h 20m",
            event: "Sylhet Hill Run 2024",
            image: "https://i.ibb.co/60pdrHGW/athletics-4424264-1280.jpg"
        },
    ];

    return (
        <section className="bg-white py-10 px-4 md:px-10">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">🏆 Hall of Fame – Recent Winners</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {winners.map((winner, index) => (
                        <div key={index} className="bg-gray-100 rounded-lg shadow p-5 text-center">
                            <img src={winner.image} alt={winner.name} className="w-32 h-32 mx-auto rounded-full object-cover mb-4" />
                            <h3 className="text-xl font-semibold text-gray-700">{winner.name}</h3>
                            <p className="text-sm text-gray-600 italic">{winner.event}</p>
                            <p className="text-sm text-gray-500 mt-1"><FaMedal className="inline-block text-yellow-500 mr-1" /> Finish Time: {winner.time}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HallOfFame;
