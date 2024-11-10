import React from 'react';
import Hero from '../components/Hero';
import Matches from './Matches';
import Connections from './Connections';
import Pending from './PendingConn';
const Home = ()=>{
    return(
        <div>
            <div id="home"> <Hero /> </div>
            {/* <div id="matches"> <Matches /> </div>
            <div id="connections"> <Connections /> </div>
            <div id="pending"> <Pending /> </div> */}
            
        </div>
    )
}

export default Home;