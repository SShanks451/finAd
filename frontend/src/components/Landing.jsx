"use client";
import FlipWords from "../muiComponents/flipwords";
import { LampContainer } from "../muiComponents/Lamp";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Flip() {
  const words = ["Find Best Collabs", "Influence Score", "Best Influencers", "Best brands", "AI-Generated Endorsements", "AI-based Comparisons"];

  return (
    <div className="text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
      <text className="font-semibold text-5xl text-black">
        Fin <span className="text-yellow-400">Ad</span>: A platform for
      </text>
      <br />
      <FlipWords words={words} /> <br />
    </div>
  );
}

const FlipWordsDemo = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen">
      <LampContainer className="flex flex-col min-h-screen ">
        <div className="flex-grow flex items-center justify-center">
          <motion.h1
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: -20 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className=" mb-10 bg-gradient-to-br from-white to-white py-4 bg-clip-text text-center text-4xl tracking-tight text-transparent md:text-7xl"
          >
            <Flip />
          </motion.h1>
        </div>
      </LampContainer>
      <div className="absolute bottom-48 left-0 right-0 flex justify-center space-x-32  py-4">
        <button
          className="relative inline-flex w-28 h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          onClick={() => {
            navigate("/customertype");
          }}
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            Register ?
          </span>
        </button>
        <button
          className="relative inline-flex w-28 h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          onClick={() => {
            navigate("/signin");
          }}
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            Sign in
          </span>
        </button>
      </div>
    </div>
  );
};

export default FlipWordsDemo;
