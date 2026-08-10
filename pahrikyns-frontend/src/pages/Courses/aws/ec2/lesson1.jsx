// src/pages/Courses/aws/cloud-basics/lesson1.jsx
import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import StorageIcon from "@mui/icons-material/Storage";
import CloudIcon from "@mui/icons-material/Cloud";
import ComputerIcon from "@mui/icons-material/Computer";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import LanguageIcon from "@mui/icons-material/Language";
import DnsIcon from "@mui/icons-material/Dns";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";

export const meta = {
  title: "Cloud Computing & AWS - Complete Overview",
  description: "A comprehensive visual guide to Cloud Computing, Service Models, Deployment Models, AWS Services, and the complete learning roadmap.",
  difficulty: "Beginner",
  duration: "45 min",
  tags: [["aws"], ["cloud-computing"], ["basics"]],
  updated: "2026-08-06",
  thumbnail: "/assets/aws/cloud-basics/overview.png",
};

const SectionHeader = ({ num, title, colorClass }) => (
  <Box className="mb-6 mt-12 border-b border-gray-700 pb-2">
    <Typography variant="h5" className={`font-bold ${colorClass}`}>
      {num}. {title}
    </Typography>
  </Box>
);

const WhatIsCloud = () => (
  <Box className="mb-8">
    <SectionHeader num="1" title="WHAT IS CLOUD?" colorClass="text-red-400" />
    <Box className="flex flex-col md:flex-row items-center gap-8 bg-gray-900/50 p-6 rounded-xl border border-gray-700">
      <Box className="flex-1">
        <ul className="list-disc pl-6 space-y-4 text-gray-300 text-lg">
          <li>Cloud is a network of remote servers hosted on the internet to store, manage, process data and run applications.</li>
          <li>We can access these services anytime, anywhere <span className="text-blue-400 font-bold border-b border-blue-400">on demand</span> and <span className="text-blue-400 font-bold border-b border-blue-400">pay only for what we use</span>.</li>
        </ul>
      </Box>
      <Box className="flex-1 flex justify-center">
        <Box className="relative">
          <CloudIcon className="text-blue-400" sx={{ fontSize: 160 }} />
          <Box className="flex justify-between absolute -bottom-10 left-0 right-0 w-[120%] -ml-[10%]">
             <Box className="text-center"><StorageIcon className="text-gray-400" /><Typography variant="caption" className="block text-gray-400">Servers</Typography></Box>
             <Box className="text-center"><DnsIcon className="text-gray-400" /><Typography variant="caption" className="block text-gray-400">Storage</Typography></Box>
             <Box className="text-center"><LanguageIcon className="text-gray-400" /><Typography variant="caption" className="block text-gray-400">Networking</Typography></Box>
          </Box>
        </Box>
      </Box>
    </Box>
  </Box>
);

const CloudServiceModels = () => (
  <Box className="mb-8">
    <SectionHeader num="2" title="CLOUD SERVICE MODELS" colorClass="text-red-400" />
    <Grid container spacing={4}>
      {/* IaaS */}
      <Grid item xs={12} md={4}>
        <Paper className="p-6 bg-[#0f172a] border border-blue-500/30 rounded-xl h-full shadow-[0_0_15px_rgba(59,130,246,0.1)]">
          <Typography variant="h6" className="text-blue-400 font-bold mb-2">IaaS - <span className="text-sm font-normal">Infrastructure as a Service</span></Typography>
          <ul className="list-disc pl-4 space-y-2 text-gray-300 text-sm">
            <li>Basic infrastructure like VM, Storage, Network, etc. provided by cloud.</li>
            <li><span className="text-gray-400 font-bold">Example:</span> AWS EC2, Azure VM, GCP Compute.</li>
            <li>We manage OS, Apps, Data.</li>
          </ul>
        </Paper>
      </Grid>
      {/* PaaS */}
      <Grid item xs={12} md={4}>
        <Paper className="p-6 bg-[#1e1b4b] border border-indigo-500/30 rounded-xl h-full shadow-[0_0_15px_rgba(99,102,241,0.1)]">
          <Typography variant="h6" className="text-indigo-400 font-bold mb-2">PaaS - <span className="text-sm font-normal">Platform as a Service</span></Typography>
          <ul className="list-disc pl-4 space-y-2 text-gray-300 text-sm">
            <li>Platform, runtime, database, middleware provided by cloud.</li>
            <li><span className="text-gray-400 font-bold">Example:</span> AWS Elastic Beanstalk, Azure App Service.</li>
            <li>We focus on code, cloud manages platform.</li>
          </ul>
        </Paper>
      </Grid>
      {/* SaaS */}
      <Grid item xs={12} md={4}>
        <Paper className="p-6 bg-[#2e1065] border border-purple-500/30 rounded-xl h-full shadow-[0_0_15px_rgba(168,85,247,0.1)]">
          <Typography variant="h6" className="text-purple-400 font-bold mb-2">SaaS - <span className="text-sm font-normal">Software as a Service</span></Typography>
          <ul className="list-disc pl-4 space-y-2 text-gray-300 text-sm">
            <li>Complete software provided by cloud over internet.</li>
            <li><span className="text-gray-400 font-bold">Example:</span> Gmail, Office 365, Salesforce.</li>
            <li>We just use, no management needed.</li>
          </ul>
        </Paper>
      </Grid>
    </Grid>
  </Box>
);

const MajorCloudProviders = () => (
  <Box className="mb-8">
    <SectionHeader num="3" title="MAJOR CLOUD PROVIDERS" colorClass="text-red-400" />
    <Grid container spacing={3}>
      {/* AWS */}
      <Grid item xs={12} md={4}>
        <Box className="border border-orange-500/30 bg-orange-900/10 p-5 rounded-xl h-full">
          <Typography variant="h5" className="text-orange-400 font-bold mb-4 text-center">aws</Typography>
          <ul className="list-disc pl-5 text-gray-300 text-sm space-y-2">
            <li>Amazon Web Services</li>
            <li>Most popular cloud</li>
            <li>200+ services</li>
            <li>Global Infrastructure</li>
            <li>Highly reliable & scalable</li>
          </ul>
        </Box>
      </Grid>
      {/* Azure */}
      <Grid item xs={12} md={4}>
        <Box className="border border-blue-500/30 bg-blue-900/10 p-5 rounded-xl h-full">
          <Typography variant="h5" className="text-blue-400 font-bold mb-4 text-center">Azure</Typography>
          <ul className="list-disc pl-5 text-gray-300 text-sm space-y-2">
            <li>Microsoft Azure</li>
            <li>Microsoft's Cloud</li>
            <li>Good for .NET, Windows</li>
            <li>Enterprise focused</li>
            <li>Hybrid cloud strong</li>
          </ul>
        </Box>
      </Grid>
      {/* Google Cloud */}
      <Grid item xs={12} md={4}>
        <Box className="border border-green-500/30 bg-green-900/10 p-5 rounded-xl h-full">
          <Typography variant="h5" className="text-green-400 font-bold mb-4 text-center">Google Cloud</Typography>
          <ul className="list-disc pl-5 text-gray-300 text-sm space-y-2">
            <li>Google Cloud Platform (GCP)</li>
            <li>Strong in Data, AI/ML</li>
            <li>BigQuery, Kubernetes</li>
            <li>Good pricing</li>
            <li>Developer friendly</li>
          </ul>
        </Box>
      </Grid>
    </Grid>
  </Box>
);

const CloudDeploymentModels = () => (
  <Box className="mb-8">
    <SectionHeader num="4" title="CLOUD DEPLOYMENT MODELS" colorClass="text-red-400" />
    <Box className="flex flex-col md:flex-row gap-8 items-center bg-gray-900/40 p-6 rounded-xl border border-gray-700">
      <Box className="flex-1 space-y-3">
        <Typography className="text-gray-300"><strong className="text-green-400">Public Cloud:</strong> Used by general public (AWS, Azure, GCP)</Typography>
        <Typography className="text-gray-300"><strong className="text-green-400">Private Cloud:</strong> Used by an organization only</Typography>
        <Typography className="text-gray-300"><strong className="text-green-400">Hybrid Cloud:</strong> Combination of Public + Private</Typography>
        <Typography className="text-gray-300"><strong className="text-green-400">Multi Cloud:</strong> Using multiple clouds together</Typography>
      </Box>
      <Box className="flex-1 flex justify-center items-center">
        <Box className="relative w-64 h-48 flex items-center justify-center">
          <CloudIcon className="text-blue-500 absolute top-0" sx={{ fontSize: 100 }} />
          <Typography className="absolute top-10 text-white font-bold text-xs z-10 text-center w-full">Hybrid<br/>Cloud</Typography>
          
          <Box className="absolute bottom-4 left-4 text-center">
             <CloudIcon className="text-blue-300" sx={{ fontSize: 60 }} />
             <Typography className="text-xs text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">Public</Typography>
          </Box>
          <Typography className="absolute bottom-8 left-1/2 transform -translate-x-1/2 font-bold text-xl">+</Typography>
          <Box className="absolute bottom-4 right-4 text-center">
             <CloudIcon className="text-green-400" sx={{ fontSize: 60 }} />
             <Typography className="text-xs text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">Private</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  </Box>
);

const HowCloudWorks = () => (
  <Box className="mb-8">
    <SectionHeader num="5" title="HOW CLOUD WORKS?" colorClass="text-red-400" />
    <Box className="bg-gray-900/50 p-6 rounded-xl border border-gray-700">
      <Box className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
        <Box className="text-center">
          <ComputerIcon className="text-blue-400 text-5xl mb-2" />
          <Typography className="text-gray-300 font-bold">User</Typography>
          <Typography variant="caption" className="text-gray-500">(You)</Typography>
        </Box>
        <ArrowRightAltIcon className="text-gray-500" sx={{ fontSize: 40 }} />
        <Box className="text-center">
          <LanguageIcon className="text-gray-400 text-5xl mb-2" />
          <Typography className="text-gray-300 font-bold">Internet</Typography>
        </Box>
        <ArrowRightAltIcon className="text-gray-500" sx={{ fontSize: 40 }} />
        <Box className="text-center bg-blue-900/20 border border-blue-500 p-4 rounded-xl relative">
          <CloudIcon className="text-blue-400 text-6xl mb-2 opacity-50 absolute top-2 left-1/2 transform -translate-x-1/2" />
          <Box className="relative z-10 mt-6">
            <Typography className="text-blue-300 font-bold mb-2">Cloud Provider</Typography>
            <Typography variant="caption" className="text-gray-400 block mb-2">(AWS / Azure / GCP)</Typography>
            <Box className="flex gap-2 justify-center">
               <StorageIcon fontSize="small" className="text-gray-300" />
               <DnsIcon fontSize="small" className="text-gray-300" />
               <ComputerIcon fontSize="small" className="text-gray-300" />
            </Box>
          </Box>
        </Box>
        <ArrowRightAltIcon className="text-gray-500" sx={{ fontSize: 40 }} />
        <Box className="text-center border border-gray-600 p-3 rounded-lg">
           <Typography className="text-green-400 font-bold">Services</Typography>
           <Typography variant="caption" className="text-gray-400 block">(Compute, Storage, Database)</Typography>
        </Box>
      </Box>
      <Box className="bg-gray-800/50 p-4 rounded-lg inline-block w-full text-center">
        <Typography className="text-gray-300 mb-1">✔️ You request a service</Typography>
        <Typography className="text-gray-300 mb-1">✔️ Cloud Provider process and provide</Typography>
        <Typography className="text-gray-300">✔️ You pay based on usage</Typography>
      </Box>
    </Box>
  </Box>
);

const AWSServicesList = () => (
  <Box className="mb-8">
    <SectionHeader num="6" title="AWS SERVICES - WHAT WE WILL LEARN (MAJOR LIST)" colorClass="text-red-400" />
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={4}>
        <Box className="mb-4">
          <Typography className="text-orange-400 font-bold border-b border-gray-700 pb-1 mb-2">Compute</Typography>
          <ul className="list-disc pl-5 text-gray-300 text-sm space-y-1">
            <li>EC2 (Virtual Server)</li>
            <li>Lambda (Serverless)</li>
            <li>ECS, EKS (Containers)</li>
            <li>Auto Scaling</li>
          </ul>
        </Box>
        <Box className="mb-4">
          <Typography className="text-green-400 font-bold border-b border-gray-700 pb-1 mb-2">Storage</Typography>
          <ul className="list-disc pl-5 text-gray-300 text-sm space-y-1">
            <li>S3 (Object Storage)</li>
            <li>EBS (Block Storage)</li>
            <li>Glacier (Backup)</li>
            <li>EFS (File Storage)</li>
          </ul>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Box className="mb-4">
          <Typography className="text-blue-400 font-bold border-b border-gray-700 pb-1 mb-2">Database</Typography>
          <ul className="list-disc pl-5 text-gray-300 text-sm space-y-1">
            <li>RDS (Managed DB)</li>
            <li>DynamoDB (NoSQL)</li>
            <li>Aurora (MySQL/PostgreSQL)</li>
            <li>ElastiCache (Redis/Memcached)</li>
          </ul>
        </Box>
        <Box className="mb-4">
          <Typography className="text-indigo-400 font-bold border-b border-gray-700 pb-1 mb-2">Networking</Typography>
          <ul className="list-disc pl-5 text-gray-300 text-sm space-y-1">
            <li>VPC (Virtual Private Cloud)</li>
            <li>Route 53 (DNS)</li>
            <li>CloudFront (CDN)</li>
            <li>Load Balancer (ALB/NLB)</li>
            <li>NAT Gateway</li>
          </ul>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Box className="mb-4">
          <Typography className="text-red-400 font-bold border-b border-gray-700 pb-1 mb-2">Security & Identity</Typography>
          <ul className="list-disc pl-5 text-gray-300 text-sm space-y-1">
            <li>IAM (Users & Roles)</li>
            <li>Security Groups</li>
            <li>KMS (Key Management)</li>
            <li>WAF (Web Firewall)</li>
          </ul>
        </Box>
        <Box className="mb-4">
          <Typography className="text-teal-400 font-bold border-b border-gray-700 pb-1 mb-2">Monitoring & Management</Typography>
          <ul className="list-disc pl-5 text-gray-300 text-sm space-y-1">
            <li>CloudWatch (Monitoring)</li>
            <li>CloudTrail (Audit Logs)</li>
            <li>Config (Resource Tracking)</li>
            <li>Systems Manager</li>
          </ul>
        </Box>
        <Box className="mb-4">
          <Typography className="text-purple-400 font-bold border-b border-gray-700 pb-1 mb-2">Developer Tools</Typography>
          <ul className="list-disc pl-5 text-gray-300 text-sm space-y-1">
            <li>CodeCommit (Git)</li>
            <li>CodeBuild (Build)</li>
            <li>CodeDeploy (Deploy)</li>
            <li>CodePipeline (CI/CD)</li>
          </ul>
        </Box>
        <Box className="mb-4">
          <Typography className="text-pink-400 font-bold border-b border-gray-700 pb-1 mb-2">Analytics & AI</Typography>
          <ul className="list-disc pl-5 text-gray-300 text-sm space-y-1">
            <li>Athena, Redshift</li>
            <li>QuickSight</li>
            <li>SageMaker (ML)</li>
          </ul>
        </Box>
      </Grid>
    </Grid>
  </Box>
);

const WhyUseCloud = () => (
  <Box className="mb-8">
    <SectionHeader num="7" title="WHY USE CLOUD? (Advantages)" colorClass="text-red-400" />
    <Box className="flex flex-col md:flex-row items-center gap-8 bg-gray-900/50 p-6 rounded-xl border border-gray-700">
      <Box className="flex-1">
        <ul className="list-none space-y-3 text-gray-300 text-md">
          <li className="flex items-center gap-2"><CheckCircleIcon className="text-green-500" fontSize="small" /> No Hardware cost</li>
          <li className="flex items-center gap-2"><CheckCircleIcon className="text-green-500" fontSize="small" /> Highly Available</li>
          <li className="flex items-center gap-2"><CheckCircleIcon className="text-green-500" fontSize="small" /> Scalable (Increase / Decrease)</li>
          <li className="flex items-center gap-2"><CheckCircleIcon className="text-green-500" fontSize="small" /> Pay as You Go</li>
          <li className="flex items-center gap-2"><CheckCircleIcon className="text-green-500" fontSize="small" /> Secure</li>
          <li className="flex items-center gap-2"><CheckCircleIcon className="text-green-500" fontSize="small" /> Global Access</li>
          <li className="flex items-center gap-2"><CheckCircleIcon className="text-green-500" fontSize="small" /> Backup & Recovery Easy</li>
        </ul>
      </Box>
      <Box className="flex-1 flex justify-center text-center relative pt-8 pb-4">
         <CloudIcon className="text-orange-400" sx={{ fontSize: 120 }} />
         <Typography className="absolute top-14 left-1/2 transform -translate-x-1/2 text-white font-bold text-xl">aws</Typography>
         <Box className="flex gap-6 mt-4 justify-center">
            <Box><ComputerIcon className="text-blue-400" /><Typography variant="caption" className="block text-gray-400">User</Typography></Box>
            <Box><ComputerIcon className="text-blue-400" /><Typography variant="caption" className="block text-gray-400">User</Typography></Box>
            <Box><ComputerIcon className="text-blue-400" /><Typography variant="caption" className="block text-gray-400">User</Typography></Box>
         </Box>
      </Box>
    </Box>
  </Box>
);

const AWSRoadmap = () => (
  <Box className="mb-8">
    <SectionHeader num="8" title="ROADMAP - WHAT WE WILL LEARN IN AWS" colorClass="text-red-400" />
    <Box className="bg-gray-900/50 p-6 rounded-xl border border-gray-700 flex flex-col md:flex-row items-center gap-8">
      <Box className="flex-1">
        <ol className="list-decimal pl-6 space-y-2 text-gray-300 text-sm font-mono">
          <li>AWS Basics & Console</li>
          <li>IAM, VPC, Security</li>
          <li>EC2, S3, RDS (Core Services)</li>
          <li>Networking (Route53, ALB, CloudFront)</li>
          <li>Monitoring (CloudWatch, CloudTrail)</li>
          <li>CI/CD with AWS (CodePipeline)</li>
          <li>Real-time Projects</li>
          <li>DevOps + AWS Integration</li>
        </ol>
      </Box>
      <Box className="flex-1 flex justify-center">
         <Box className="relative w-full max-w-[300px] h-[250px]">
            {/* Stairs */}
            <Box className="absolute bottom-0 left-0 w-1/4 h-[40px] bg-orange-900 border border-orange-500 flex items-center justify-center">
               <Typography variant="caption" className="text-orange-300 font-bold">Basics</Typography>
            </Box>
            <Box className="absolute bottom-[40px] left-1/4 w-1/4 h-[40px] bg-green-900 border border-green-500 flex items-center justify-center">
               <Typography variant="caption" className="text-green-300 font-bold">Core Svc.</Typography>
            </Box>
            <Box className="absolute bottom-[80px] left-2/4 w-1/4 h-[40px] bg-blue-900 border border-blue-500 flex items-center justify-center">
               <Typography variant="caption" className="text-blue-300 font-bold">Advanced</Typography>
            </Box>
            <Box className="absolute bottom-[120px] left-3/4 w-1/4 h-[40px] bg-red-900 border border-red-500 flex items-center justify-center">
               <Typography variant="caption" className="text-red-300 font-bold leading-tight text-center">Real-time<br/>Projects</Typography>
            </Box>
            {/* Arrow */}
            <svg className="absolute bottom-4 left-4 w-[90%] h-[150px]" style={{ zIndex: 10 }}>
               <path d="M 10 140 L 260 20" stroke="white" strokeWidth="3" fill="transparent" />
               <polygon points="260,20 245,25 255,35" fill="white" />
            </svg>
         </Box>
      </Box>
    </Box>
  </Box>
);

const SummaryBox = () => (
  <Box className="mb-12">
    <SectionHeader num="SUMMARY" title="" colorClass="text-red-400" />
    <Box className="bg-[#0f172a] border border-blue-500 p-6 rounded-xl relative">
       <Typography className="absolute -top-3 left-6 bg-[#0f172a] px-2 text-red-400 font-bold text-sm tracking-widest">SUMMARY</Typography>
       <Grid container spacing={3}>
         <Grid item xs={12} md={6}>
            <ul className="list-none space-y-2 text-gray-300 text-sm">
              <li><span className="text-blue-500 mr-2">★</span> Cloud = Remote resources over the internet.</li>
              <li><span className="text-blue-500 mr-2">★</span> IaaS, PaaS, SaaS are different service models.</li>
              <li><span className="text-blue-500 mr-2">★</span> AWS, Azure, Google Cloud are major cloud providers.</li>
            </ul>
         </Grid>
         <Grid item xs={12} md={6}>
            <ul className="list-none space-y-2 text-gray-300 text-sm">
              <li><span className="text-blue-500 mr-2">★</span> AWS has 200+ services for Compute, Storage, Database, Networking, Security, AI, DevOps and more.</li>
              <li><span className="text-blue-500 mr-2">★</span> We will learn step by step with real-time projects.</li>
            </ul>
         </Grid>
       </Grid>
    </Box>
  </Box>
);

function Lesson1() {
  return (
    <div className="lesson-container max-w-5xl mx-auto py-8 px-4 font-sans">
      <Box className="text-center mb-12">
        <Typography variant="h3" className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-orange-400">
          Cloud Computing & AWS
        </Typography>
        <Typography variant="h6" className="text-gray-400 mt-2 tracking-widest uppercase">
          — Complete Overview —
        </Typography>
      </Box>

      <WhatIsCloud />
      <CloudServiceModels />
      <MajorCloudProviders />
      <CloudDeploymentModels />
      <HowCloudWorks />
      <AWSServicesList />
      <WhyUseCloud />
      <AWSRoadmap />
      <SummaryBox />

    </div>
  );
}

export default Lesson1;
