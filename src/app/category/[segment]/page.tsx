"use client";

import { useParams } from "next/navigation";

const Page = () => {
  
  const params = useParams();
  console.log(params.id);
  
  
  return (
    <div>{params.id}</div>
  )
}

export default Page;




