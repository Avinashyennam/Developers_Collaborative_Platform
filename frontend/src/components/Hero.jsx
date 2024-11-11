import React from 'react';

const Hero = () => {

    const styles = {
        backgroundImage: "url(/bg.jpg)",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '90vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

    return (
        <div style={styles}>
            <div className='flex flex-col justify-center items-center gap-10 mx-8 text-white'>
                <div className='flex flex-col gap-8 justify-center items-center'>
                    <h1 className='text-7xl font-bold'>Connect. Collaborate. Code</h1>
                    <h3 className='text-2xl'>Join now and start building impactful projects with the perfect partners!</h3>
                </div>
                {/* <p>
                        Join Collab, the ultimate platform for developers to showcase their skills, collaborate on projects,
                        and grow together.<br></br> Discover new opportunities and enhance your coding journey.
                    </p> */}
            </div>
        </div>
    )
}

export default Hero;