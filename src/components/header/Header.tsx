"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Film, Search, Moon, Sun } from 'lucide-react';
import { useTheme } from "next-themes";



const Header = () => {
  const { setTheme, theme } = useTheme();
  return (
    <div className='sticky top-0 w-screen h-[59px] flex flex-row items-center justify-between px-[5%] sm:px-[12%] z-10 bg-white dark:bg-black ----  border-solid border-[1px] border-gray-300 '>
        <div className="flex flex-row text-[#4338CA] gap-2 ">
            <Film />
            <h4 className='italic font-bold' >Movie Z</h4>
        </div>
        <div className='flex gap-3'>
          <div className='flex gap-3'>
            <Select >
              <SelectTrigger className="w-[180px] h-9 sm:flex hidden">
                <SelectValue placeholder="Genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Genres</SelectLabel>
                  <SelectItem value="action">Action</SelectItem>
                  <SelectItem value="adventure">Adventure</SelectItem>
                  <SelectItem value="animation">Animation</SelectItem>
                  <SelectItem value="biography">Biography</SelectItem>
                  <SelectItem value="comedy">Comedy</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Input placeholder='Search' className='h-9 sm:flex hidden' />
          </div>
          <Button 
            variant="outline" 
            className='w-9 h-9 sm:hidden flex' > 
            <Search /> 
          </Button>
          {theme === "dark" ? (
            <Button 
              variant="outline" 
              className='w-9 h-9' 
              onClick={() => setTheme("light")}> 
              <Sun  />
            </Button>
          ) : (
            <Button 
              variant="outline" 
              className='w-9 h-9' 
              onClick={() => setTheme("dark")}> 
              <Moon />
            </Button>
          )}
      
        </div>
    </div>
  )
}

export default Header

// mobile responsive deer search button darah uyd deerees 