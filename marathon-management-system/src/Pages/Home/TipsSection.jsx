import React from 'react';
import { FaRunning, FaAppleAlt, FaSpa } from 'react-icons/fa';

const TipsSection = () => {
    const tips = [
        {
            icon: <FaRunning className="text-3xl text-blue-600" />,
            title: "5K Beginner Plan",
            description: "Start small with a 4-week training plan designed for new runners. Gradually build up your stamina while avoiding injury."
        },
        {
            icon: <FaAppleAlt className="text-3xl text-green-600" />,
            title: "Pre-Run Nutrition",
            description: "Fuel up with healthy carbs and stay hydrated before your run. Avoid heavy meals right before running."
        },
        {
            icon: <FaSpa className="text-3xl text-purple-600" />,
            title: "Post-Run Recovery",
            description: "Cool down with light stretches and drink water to help your body recover. Foam rolling can ease muscle tightness."
        },
    ];

    return (
        <section className="bg-gray-50 py-10 px-4 md:px-10">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">🏃‍♂️ Training & Wellness Tips for Runners</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {tips.map((tip, index) => (
                        <div key={index} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition">
                            <div className="mb-4">{tip.icon}</div>
                            <h3 className="text-xl font-semibold mb-2 text-gray-700">{tip.title}</h3>
                            <p className="text-sm text-gray-600">{tip.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TipsSection;
