import React from 'react';
import Banner from './Banner';
import UpcomingMarathon from './UpcomingMarathon';
import TipsSection from './TipsSection';
import HallOfFame from './HallOfFame';
import Marathons from '../Marathons/Marathons';
import MarathonCards from './MarathonCards';

const Home = () => {

    const marathonPromise = fetch('https://marathon-server-omega.vercel.app/upcomingMarathon').then(res => res.json())

    return (
        <div className='max-w-7xl'>
             <div className="w-full min-h-screen flex items-center justify-center">
                <Banner />
            </div>
            <MarathonCards></MarathonCards>
            <UpcomingMarathon marathonPromise={marathonPromise}></UpcomingMarathon>
            <TipsSection></TipsSection>
            <HallOfFame></HallOfFame>
        </div>
    );
};

export default Home;