"use client"

import { redirect } from "next/navigation";
import React from "react";

export default function Home() {

  React.useEffect(()=>{
    redirect('calculator');
  },[])
  
  return undefined;
}
