import Image from 'next/image';
import React from 'react';
import AppiStadiumLogo from '../../assets/img/AppiStadium-Logo-25.svg'
const Loader = () => {
  return (
    <div className=' w-screen h-screen flex flex-col justify-center items-center'>
    <Image src={AppiStadiumLogo} alt="logo" width={'500%'} className='animate-pulse '/>
      
    </div>
  );
};

export default Loader;
