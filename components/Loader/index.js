import Image from 'next/image';
import React from 'react';
import AppiStadiumLogo from '../../assets/img/AppiStadium-Logo-25.svg'

const Loader = () => {
    return (
        <div style={{width: 500, height: 600}}>
            <Image src={AppiStadiumLogo} alt="logo" className='animate-pulse'/>
        </div>
    );
};

export default Loader;
