// src/pages/Courses/aws/cloud-basics/lesson2.jsx
import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import BusinessIcon from "@mui/icons-material/Business";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import SecurityIcon from "@mui/icons-material/Security";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

export const meta = {
  title: "AWS Basics – Lesson 2: Public vs Private Cloud",
  description:
    "Understanding Cloud Deployment Models: Public, Private, and Hybrid Clouds explained with simple analogies.",
  difficulty: "Beginner",
  duration: "45 min",
  tags: [["aws"], ["cloud-deployment"], ["architectures"]],
  updated: "2026-02-19",
  thumbnail: "/assets/aws/cloud-basics/lesson2.png",
};

const DeploymentCard = ({ title, icon, analogy, pros, cons, color }) => (
  <Box className={`p-6 rounded-xl border border-${color}-500/30 bg-${color}-900/10 h-full`}>
    <Box className="flex items-center gap-3 mb-4">
      {icon}
      <Typography variant="h6" className={`font-bold text-${color}-400`}>{title}</Typography>
    </Box>
    <Box className="bg-gray-900/50 p-3 rounded-lg border border-gray-700 mb-4">
      <Typography variant="subtitle2" className="text-gray-400 uppercase text-xs mb-1">Analogy</Typography>
      <Typography className="text-white font-medium flex items-center gap-2">
        {analogy.icon} {analogy.text}
      </Typography>
    </Box>
    <div className="space-y-4 text-sm">
      <div>
        <span className="text-green-400 font-bold block mb-1">✅ Pros:</span>
        <ul className="list-disc pl-4 text-gray-300 space-y-1">
            {pros.map((p, i) => <li key={i}>{p}</li>)}
        </ul>
      </div>
      <div>
        <span className="text-red-400 font-bold block mb-1">❌ Cons:</span>
         <ul className="list-disc pl-4 text-gray-300 space-y-1">
            {cons.map((c, i) => <li key={i}>{c}</li>)}
        </ul>
      </div>
    </div>
  </Box>
);

function Lesson2() {
  return (
    <div className="lesson-container max-w-5xl mx-auto">
      {/* ================= HEADER ================= */}
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-6">
        Cloud Deployment Models
      </h1>
      
      <p className="text-lg text-gray-300 mb-8 leading-relaxed">
        Simple-a sollanum na, <strong>Deployment Model</strong> decides "Where" your servers are running and "Who" owns them.
        Is it shared like a bus? Or private like a car?
      </p>

      {/* ================= SECTION 1: Public Cloud ================= */}
      <Box className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4 border-l-4 border-blue-500 pl-4">1. Public Cloud (AWS, Azure, GCP)</h2>
        <p className="text-gray-300 mb-4">
          The cloud provider (AWS) owns the hardware. You share it with other companies (Tenants).
        </p>
        
        <Box className="flex flex-col md:flex-row gap-6 mt-6">
            <Box className="flex-1">
                 <DeploymentCard 
                    title="Public Cloud" 
                    color="blue"
                    icon={<CloudQueueIcon fontSize="large" className="text-blue-400" />}
                    analogy={{ icon: <DirectionsBusIcon className="text-yellow-400"/>, text: "Public Bus (Share Auto)" }}
                    pros={["Cost is very Low", "No Maintenance", "Unlimited Scalability"]}
                    cons={["Less Control over hardware", "Shared Security Responsibility"]}
                 />
            </Box>
            <Box className="flex-1 flex flex-col justify-center text-gray-400 italic bg-gray-900/50 p-6 rounded-lg border-l-2 border-yellow-500">
               <Typography>
                  💡 <strong>Tanglish Explanation:</strong> 
                  Idhu oru <strong>Public Bus</strong> maari. Ticket edutha yaaru vena polam. Cheap & Best. 
                  But bus route/timing laam driver (AWS) kaila thaan irukku. Namma just travel panrom (Use panrom).
               </Typography>
               <br/>
               <Typography>
                  <strong>Examples:</strong> Netflix, Instagram, Swiggy (All run on Public Cloud).
               </Typography>
            </Box>
        </Box>
      </Box>

      {/* ================= SECTION 2: Private Cloud ================= */}
      <Box className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4 border-l-4 border-purple-500 pl-4">2. Private Cloud (On-Premise)</h2>
        <p className="text-gray-300 mb-4">
          Infrastructure is exclusively used by one single organization. It can be physically located at your company's on-site data center.
        </p>

        <Box className="flex flex-col md:flex-row gap-6 mt-6">
            <Box className="flex-1">
                 <DeploymentCard 
                    title="Private Cloud" 
                    color="purple"
                    icon={<BusinessIcon fontSize="large" className="text-purple-400" />}
                    analogy={{ icon: <DirectionsCarIcon className="text-purple-400"/>, text: "Own Car (Personal)" }}
                    pros={["Full Control", "High Security", "Customizable"]}
                    cons={["Very Expensive", "You manage maintenance", "Hard to Scale"]}
                 />
            </Box>
            <Box className="flex-1 flex flex-col justify-center text-gray-400 italic bg-gray-900/50 p-6 rounded-lg border-l-2 border-yellow-500">
               <Typography>
                  💡 <strong>Tanglish Explanation:</strong> 
                  Idhu <strong>Own Car</strong> maari. Neenga thaan Driver, neenga thaan Mechanic. 
                  Yenga vena pogalam, full freedom. But car vaangra cost + petrol + repair ellam unga selavu.
               </Typography>
               <br/>
               <Typography>
                  <strong>Used By:</strong> Banks (HDFC, SBI), Military, Govt Projects (For high security).
               </Typography>
            </Box>
        </Box>
      </Box>

      {/* ================= SECTION 3: Hybrid Cloud ================= */}
      <Box className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4 border-l-4 border-green-500 pl-4">3. Hybrid Cloud (Best of Both)</h2>
        <p className="text-gray-300 mb-6">
            Combines Public and Private clouds, bound together by technology that allows data and applications to be shared between them.
        </p>
        
        <Box className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-8 rounded-2xl border border-dashed border-gray-600 flex flex-col items-center">
            <Box className="flex items-center gap-8 mb-6">
                <Box className="text-center opacity-50"><CloudQueueIcon sx={{ fontSize: 60 }} className="text-blue-400 block mx-auto"/> Public</Box>
                <SwapHorizIcon sx={{ fontSize: 40 }} className="text-white animate-pulse" />
                <Box className="text-center opacity-50"><BusinessIcon sx={{ fontSize: 60 }} className="text-purple-400 block mx-auto"/> Private</Box>
            </Box>
            <Typography variant="h6" className="text-white font-bold mb-2">Hybrid Cloud Architecture</Typography>
            <Typography className="text-gray-400 text-center max-w-lg mb-4">
                Keep sensitive data (Customer Personal Info) in <strong>Private Cloud</strong>.<br/>
                Run the website front-end on <strong>Public AWS</strong> for speed.
            </Typography>
             <Box className="text-gray-400 italic bg-gray-900/80 p-4 rounded-lg border border-yellow-500/30 w-full text-center">
                  💡 <strong>Simile:</strong> Oru vaadagai car (Rental) eduthu long trip poringa. 
                  Local city la unga own bike use panreenga. Thevaikku yetha maari mix panni use panrathu thaan Hybrid.
            </Box>
        </Box>
      </Box>

      {/* ================= SUMMARY ================= */}
      <Box className="bg-gray-800 p-6 rounded-xl border-l-4 border-cyan-500">
        <h3 className="text-xl font-bold text-white mb-4">Quick Summary</h3>
        <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
                <Typography className="text-blue-400 font-bold">Public Cloud</Typography>
                <Typography className="text-gray-400 text-sm">Shared, Cheap (AWS, Azure).</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
                <Typography className="text-purple-400 font-bold">Private Cloud</Typography>
                <Typography className="text-gray-400 text-sm">Dedicated, Secure, Costly.</Typography>
            </Grid>
             <Grid item xs={12} md={4}>
                <Typography className="text-green-400 font-bold">Hybrid Cloud</Typography>
                <Typography className="text-gray-400 text-sm">Mix of both (Flexibility).</Typography>
            </Grid>
        </Grid>
      </Box>

    </div>
  );
}

export default Lesson2;
