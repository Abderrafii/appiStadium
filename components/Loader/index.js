import Image from 'next/image';
import React from 'react';
import AppiStadiumLogo from '../../assets/img/AppiStadium-Logo-25.svg';

const Loader = () => {
  return (
    <div className='w-56 h-56 bg-transparent flex justify-center items-center '>
      <Image src={AppiStadiumLogo} alt='logo' className='animate-pulse z-40 ' />
    </div>
  );
};

export default Loader;
