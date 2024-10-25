import React from 'react';

const Hero = () => {
    return (
        <div>
            <div className='flex justify-between mx-8'>
                <div className='flex flex-col gap-8 justify-center items-center'>
                    <h1 className='text-6xl'>Connect. Collaborate. Code</h1>
                    <h3 className='text-2xl'>Join now and start building impactful projects with the perfect partners!</h3>
                </div>
                <div>
                    <img src='/home.jpg' alt="not found" className='w-76 h-96' />
                </div>
            </div>
        </div>
    )
}

export default Hero;