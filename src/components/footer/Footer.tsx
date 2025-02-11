import React from 'react';
import { Film, Mail, Phone} from 'lucide-react';

const Footer = () => {
  return (
    <div className='w-full h-full py-[40px] bg-[#4338CA] text-white flex justify-center'>
      <div className='max-w-[1280px] w-full px-[5%] 2xl:px-0 flex flex-col sm:flex-row gap-7 sm:justify-between'>
        <div className='flex flex-col gap-3'>
          <div className='flex flex-row'>
            <Film />
            <h4 className='italic font-bold'>Movie Z</h4>
          </div>
          <h5>© 2024 Movie Z. All Rights Reserved.</h5>
        </div>
        <div className='flex flex-row justify-between gap-[10%]'>
          <div className='flex flex-col gap-3'>
            <h5>Contact Information</h5>
            <div className='flex flex-row items-center gap-2'>
              <Mail />
              <div className='flex flex-col'>
                <h5>Email:</h5>
                <h5>support@movieZ.com</h5>
              </div>
            </div>
            <div className='flex flex-row items-center gap-2'>
              <Phone />
              <div className='flex flex-col'>
                <h5>Phone:</h5>
                <h5>+976 (11) 123-4567</h5>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-3 '>
          Follow us
            <div className='flex flex-col md:flex-row gap-3'>
              <h5>Facebook</h5>
              <h5>Instagram</h5>
              <h5>Twitter</h5>
              <h5>Youtube</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer