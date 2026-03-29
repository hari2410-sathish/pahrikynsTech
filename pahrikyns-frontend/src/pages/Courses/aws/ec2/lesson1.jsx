// src/pages/Courses/aws/cloud-basics/lesson1.jsx
import React from "react";
import { Box, Typography } from "@mui/material";
import StorageIcon from "@mui/icons-material/Storage";
import CloudIcon from "@mui/icons-material/Cloud";
import ComputerIcon from "@mui/icons-material/Computer";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

export const meta = {
  title: "AWS Basics – Lesson 1: AWS, Cloud & EC2",
  description:
    "Introduction to AWS, why we use it (vs On-Premise), and a deep dive into EC2 with visual diagrams.",
  difficulty: "Beginner",
  duration: "60 min",
  tags: [["aws"], ["ec2"], ["cloud-computing"]],
  updated: "2026-02-18",
  thumbnail: "/assets/aws/cloud-basics/lesson1.png",
};

/**
 * Diagram Component: On-Premise vs Cloud
 */
const VsDiagram = () => (
  <Box className="flex flex-col md:flex-row gap-8 my-8 justify-center items-stretch">
    {/* On-Premise */}
    <Box className="flex-1 bg-red-900/10 border border-red-500/30 p-6 rounded-xl flex flex-col items-center text-center">
      <Typography variant="h6" className="text-red-400 font-bold mb-4">🚫 On-Premise (Old Way)</Typography>
      <Box className="flex gap-2 mb-4">
        <StorageIcon className="text-gray-500 text-6xl" sx={{ fontSize: 60 }} />
        <StorageIcon className="text-gray-500 text-6xl" sx={{ fontSize: 60 }} />
      </Box>
      <ul className="text-gray-400 text-sm text-left list-none space-y-2">
        <li className="flex items-center gap-2"><CancelIcon fontSize="small" color="error" /> Buy Servers (High Cost)</li>
        <li className="flex items-center gap-2"><CancelIcon fontSize="small" color="error" /> Pay Maintenance</li>
        <li className="flex items-center gap-2"><CancelIcon fontSize="small" color="error" /> Can't Scale Quickly</li>
      </ul>
    </Box>

    {/* Cloud */}
    <Box className="flex-1 bg-green-900/10 border border-green-500/30 p-6 rounded-xl flex flex-col items-center text-center">
      <Typography variant="h6" className="text-green-400 font-bold mb-4">✅ AWS Cloud (New Way)</Typography>
      <Box className="relative mb-4">
        <CloudIcon className="text-blue-400 text-8xl" sx={{ fontSize: 100, opacity: 0.8 }} />
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-1">
          <StorageIcon className="text-white text-2xl" />
          <StorageIcon className="text-white text-2xl" />
        </Box>
      </Box>
      <ul className="text-gray-300 text-sm text-left list-none space-y-2">
        <li className="flex items-center gap-2"><CheckCircleIcon fontSize="small" color="success" /> Rent Servers (Low Cost)</li>
        <li className="flex items-center gap-2"><CheckCircleIcon fontSize="small" color="success" /> No Maintenance</li>
        <li className="flex items-center gap-2"><CheckCircleIcon fontSize="small" color="success" /> Scale in Minutes</li>
      </ul>
    </Box>
  </Box>
);

/**
 * Diagram Component: EC2 Instance
 */
const EC2Diagram = () => (
  <Box className="my-8 p-8 bg-blue-900/10 border border-blue-500/30 rounded-xl relative overflow-hidden">
    <Typography variant="h6" className="text-blue-300 font-bold mb-6 text-center">How EC2 Works</Typography>

    <Box className="flex flex-col md:flex-row items-center justify-center gap-8">
      {/* User */}
      <Box className="text-center">
        <ComputerIcon className="text-white mx-auto mb-2" sx={{ fontSize: 50 }} />
        <Typography className="text-gray-300">You (Developer)</Typography>
      </Box>

      <ArrowRightAltIcon className="text-gray-500 hidden md:block" sx={{ fontSize: 40 }} />

      {/* AWS Console */}
      <Box className="bg-gray-800 p-4 rounded-lg border border-gray-600 text-center w-40">
        <Typography className="text-orange-400 font-bold">AWS Console</Typography>
        <Typography variant="caption" className="text-gray-400">"Launch Instance"</Typography>
      </Box>

      <ArrowRightAltIcon className="text-gray-500 hidden md:block" sx={{ fontSize: 40 }} />

      {/* EC2 Instance */}
      <Box className="bg-[#0f172a] p-6 rounded-xl border border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.3)] text-center relative w-48">
        <Box className="absolute -top-3 -right-3 bg-green-500 text-black text-xs font-bold px-2 py-1 rounded-full">RUNNING</Box>
        <StorageIcon className="text-blue-400 mx-auto mb-2" sx={{ fontSize: 60 }} />
        <Typography className="text-white font-bold">EC2 Instance</Typography>
        <Typography variant="caption" className="text-gray-400 block mt-1">Virtual Server</Typography>
        <div className="mt-2 text-[10px] text-gray-500 font-mono">
          CPU: 2 vCPU<br />
          RAM: 4 GB<br />
          OS: Ubuntu
        </div>
      </Box>
    </Box>
  </Box>
);

function Lesson1() {
  return (
    <div className="lesson-container max-w-4xl mx-auto">
      {/* ================= HEADER ================= */}
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-6">
        What is AWS & EC2?
      </h1>

      <p className="text-lg text-gray-300 mb-8 leading-relaxed">
        Simple-a sollanum na, <strong>AWS (Amazon Web Services)</strong> oru online rental shop maari.
        Instead of buying expensive computers (Servers) for your business, you can "rent" them from Amazon over the internet.
      </p>

      {/* ================= SECTION 1: What is AWS ================= */}
      <Box className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4 border-l-4 border-blue-500 pl-4">1. What is AWS?</h2>
        <p className="text-gray-300 mb-4">
          AWS stands for <strong>Amazon Web Services</strong>. It is a secure cloud services platform, offering compute power,
          database storage, content delivery, and other functionality to help businesses scale and grow.
        </p>
        <p className="text-gray-400 italic bg-gray-900/50 p-4 rounded-lg border-l-2 border-yellow-500">
          💡 <strong>Tanglish Explanation:</strong> Veetla power cut aana inverter use pandrom. But periya factory kku nammala power generate panna mudiyathu, so we buy from EB (Electricity Board).
          Athe maari, chinna app ku laptop ok, but periya website (like Netflix, Hotstar) ku <strong>AWS Cloud</strong> la irunthu servers rent pannuvanga.
        </p>
      </Box>

      {/* ================= SECTION 2: Why AWS? (Diagram) ================= */}
      <Box className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4 border-l-4 border-green-500 pl-4">2. Why use AWS? (Vs Traditional)</h2>
        <p className="text-gray-300 mb-4">
          Before AWS, companies had to build their own "Data Centers". This was costly and slow.
          AWS changed this with the <strong>Pay-as-you-go</strong> model.
        </p>

        {/* DIAGRAM 1 */}
        <VsDiagram />

        <p className="text-gray-300 mt-4">
          <strong>Key Benefits:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-300">
          <li><strong>Cost:</strong> Pay only for what you use (Hourly/Per Second).</li>
          <li><strong>Speed:</strong> Launch thousands of servers in minutes.</li>
          <li><strong>Global:</strong> Deploy your app in USA, India, or Japan with one click.</li>
        </ul>
      </Box>

      {/* ================= SECTION 3: What is EC2? ================= */}
      <Box className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4 border-l-4 border-orange-500 pl-4">3. What is EC2?</h2>
        <p className="text-gray-300 mb-4">
          <strong>EC2 (Elastic Compute Cloud)</strong> is one of the most popular services in AWS.
          It basically provides <strong>Virtual Servers</strong> in the cloud.
        </p>
        <p className="text-gray-400 italic bg-gray-900/50 p-4 rounded-lg border-l-2 border-yellow-500 mb-6">
          💡 <strong>Simple Terms:</strong> EC2 is just a computer somewhere in Amazon's building.
          You can remotely control it. You can install Windows, Linux, run Python scripts, host a website, anything!
        </p>

        {/* DIAGRAM 2 */}
        <EC2Diagram />

        <h3 className="text-xl font-bold text-blue-300 mb-3 mt-6">Why is it called "Elastic"?</h3>
        <p className="text-gray-300">
          <strong>Elastic</strong> means flexible. 
           In Diwali sale, traffic increases {"->"} You can add 10 more EC2 servers instantly.
           Sale over {"->"} You can delete them instantly.
          Rubber band maari expand and shrink pannalam. That's why it's called <strong>Elastic Compute Cloud</strong>.
        </p>
      </Box>

      {/* ================= SECTION 4: Summary ================= */}
      <Box className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-6 rounded-xl border border-blue-500/20">
        <h2 className="text-xl font-bold text-white mb-2">Summary</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-300">
          <li><strong>AWS</strong> is a cloud provider (rents servers).</li>
          <li><strong>Cloud Computing</strong> saves money (No upfront cost).</li>
          <li><strong>EC2</strong> is a Virtual Server provided by AWS.</li>
          <li>It is <strong>Elastic</strong> (scalable) and <strong>Pay-as-you-go</strong>.</li>
        </ul>
      </Box>
    </div>
  );
}

export default Lesson1;
