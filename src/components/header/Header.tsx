import React from 'react';
import { Button } from "@/components/ui/button";
import { Film, Search, Moon } from 'lucide-react';


const Header = () => {
  return (
    <div className='fixed top-0 w-screen h-[59px] flex flex-row items-center justify-between px-[4%] ---- bg-[#FFFFFF] border-solid border-[1px] border-gray-300 '>
        <div className="flex flex-row text-[#4338CA] gap-2 ">
            <Film />
            <h4 className='italic font-bold' >Movie Z</h4>
        </div>
        <div className='flex gap-3'>
        <Button variant="outline" className='w-9 h-9' > <Search className='text-black'/> </Button>
        <Button variant="outline" className='w-9 h-9'> <Moon /> </Button>
        </div>
    </div>
  )
}

export default Header