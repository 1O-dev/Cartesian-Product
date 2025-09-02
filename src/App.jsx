/* eslint-disable no-unused-vars */
import {useEffect, useMemo, useState } from "react";
import { IoMdCopy , IoLogoGithub } from "react-icons/io";
import { IoCheckmarkOutline } from "react-icons/io5";

const App = () => {
  const [x, setX] = useState("1,2,3");
  const [y, setY] = useState("4,5,6");
  const [xTwo, setXTwo] = useState(false);
  const [result, SetResult] = useState("");
  const [copied,setCopied] = useState(false)

  useEffect(() => {
    if (xTwo && x !== y) {
      setY(x);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [xTwo, x]);

  const handleCalc = useMemo( () => {
    if ( //check for any additional comas to prevent making a 0 using the split method
      x.includes(",,") ||
      y.includes(",,") ||
      x.trim().endsWith(",") ||
      y.trim().endsWith(",")
    ){
      SetResult("Syntax Error : Don't duplicate comas or end the set with it")
      return;
    }
      
    let xArr = x.split(",").map(Number);
    let yArr = y.split(",").map(Number);

    if ( 
      xArr.includes(NaN) ||
      yArr.includes(NaN)
    ) {
      SetResult("Syntax Error : Don't add text");
      return;
    }
    if ( //check for any duplicated  items
      xArr.length !== new Set(xArr).size ||
      yArr.length !== new Set(yArr).size
    ) {
      SetResult("Syntax Error : Don't duplicate items in the set");
      return;
    }
    console.log(xArr, yArr);

    let resultArr = []
    
    for(let xPoint of xArr){
      for(let yPoint of yArr){
        resultArr.push(`(${xPoint},${yPoint})`)
      }
    }
    console.log(resultArr)
    SetResult(resultArr.join(" , "))

  },[x,y]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true)
      setTimeout(()=>setCopied(false), 1500);
    } catch (err) {
      console.error("FALIUER :" + err);
    }
  };

  return (
    <div className="flex flex-col items-center py-4 px-6 bg-zinc-300 h-screen gap-y-4 ">
      <h1 className="text-3xl font-semibold lg:text-4xl">
        Cartesian{" "}
        <span className="text-red-800 font-curves text-5xl lg:text-6xl">
          Product
        </span>
      </h1>

      <div className="h-fit bg-gray-500 w-[80vw] rounded-lg text-white py-2 px-5 space-y-3 md:w-150 lg:scale-110 lg:my-2.5">
        <span className="opacity-70 text-red-300 text-[11px] md:text-[13.5px]">
          split between the numbers with a coma ","
        </span>
        <div className="flex items-center gap-3 ">
          <span className="font-curves text-6xl">x </span> ={" "}
          <span className="scale-160">{"{"}</span>{" "}
          <input
            type="text"
            className="w-[80%] border-1 outline-0 p-2 rounded-md"
            value={x}
            onChange={(e) => setX(e.target.value)}
          />{" "}
          <span className="scale-160">{"}"}</span>
        </div>
        <div className="flex items-center gap-3 ">
          <span className="font-curves text-6xl">y</span> ={" "}
          <span className="scale-160">{"{"}</span>{" "}
          <input
            type="text"
            className="w-[80%] border-1 outline-0 p-2 rounded-md disabled:border-red-950 disabled:cursor-not-allowed disabled:text-gray-400"
            value={y}
            onChange={(e) => setY(e.target.value)}
            disabled={xTwo}
          />{" "}
          <span className="scale-160">{"}"}</span>
        </div>
        <div className="w-full grid">
          <button
            className={`${
              xTwo && "bg-blue-400"
            } rounded-lg border-1 border-blue-400 transition-all cursor-pointer`}
            onClick={() => setXTwo(!xTwo)}
          >
            {" "}
            <span className="font-curves text-4xl">x </span>
            <sup>2</sup>
          </button>
        </div>
        <div className="bg-zinc-100 gap-2 min-h-18 max-h-40 w-full p-1 text-black rounded-lg flex flex-col-reverse justify-between">
          <button onClick={handleCopy} className="cursor-pointer bg-blue-300 w-full rounded-md border-1 border-blue-300 min-h-8 flex justify-center items-center gap-1 ">
            {copied ? "Copied" : "Copy"}
            {copied ? <IoCheckmarkOutline className="scale-110 text-green-700"/> : <IoMdCopy className="scale-110" />}
          </button>
          <p className="overflow-x-auto text-center">{result}</p>
        </div>
      </div>
      <h1 className="flex items-center gap-3" >Made by Omar Mokhtar <a href="https://github.com/1O-dev/Cartesian-Product" target="_blank"><IoLogoGithub className="scale-150"/></a></h1>
    </div>
  );
};

export default App;
