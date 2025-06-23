import React from 'react';
import Banner from './Banner';
import UpcomingMarathon from './UpcomingMarathon';
import TipsSection from './TipsSection';
import HallOfFame from './HallOfFame';
import Marathons from '../Marathons/Marathons';

const Home = () => {

    const marathonPromise = fetch('http://localhost:3000/upcomingMarathon').then(res => res.json())

    return (
        <div className='max-w-7xl'>
            <Banner></Banner>
            <UpcomingMarathon marathonPromise={marathonPromise}></UpcomingMarathon>
            <TipsSection></TipsSection>
            <HallOfFame></HallOfFame>
        </div>
    );
};

export default Home;