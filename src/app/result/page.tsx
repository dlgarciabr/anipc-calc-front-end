"use client"

import dynamic from "next/dynamic";

const Result = () => (<>resultado</>)

export default dynamic(() => Promise.resolve(Result), {
  ssr: false
});