export const awsData = {
  "aws-intro": {
    num: 1,
    title: { en: "AWS Introduction & Infrastructure", ta: "AWS அறிமுகம் மற்றும் உள்கட்டமைப்பு" },
    description: { en: "The foundation of cloud computing and AWS global presence.", ta: "கிளவுட் கம்ப்யூட்டிங் மற்றும் AWS-ன் உலகளாவிய உள்கட்டமைப்பு பற்றிய அடிப்படை." },
    longDescription: {
      en: `
      Amazon Web Services (AWS) is a secure cloud services platform, offering compute power, database storage, content delivery and other functionality to help businesses scale and grow.
      
      ### Key Concepts:
      - **Region**: A physical location in the world where we have multiple Availability Zones.
      - **Availability Zone (AZ)**: One or more discrete data centers with redundant power, networking, and connectivity.
      - **Edge Location**: Data centers used by CloudFront to cache content.
      
      ### Why AWS?
      - **Pay-as-you-go**: Trade capital expense for variable expense.
      - **Agility**: Access technology in seconds.
      - **Scalability**: Never guess capacity again.
      `,
      ta: `
      அமேசான் வெப் சர்வீசஸ் (AWS) என்பது பாதுகாப்பான கிளவுட் சேவை தளமாகும். இது வணிகங்கள் வளரத் தேவையான கம்ப்யூட்டிங் பவர், டேட்டாபேஸ் ஸ்டோரேஜ் போன்றவற்றை வழங்குகிறது.

      ### முக்கிய கருத்துக்கள்:
      - **Region**: உலகில் உள்ள பல டேட்டா சென்டர்களின் தொகுப்பு.
      - **Availability Zone (AZ)**: ஒரு ரீஜியனுக்குள் இருக்கும் தனித்தனி டேட்டா சென்டர்கள்.
      - **Edge Location**: தகவல்களை வேகமாகப் பரிமாற உதவும் சிறிய டேட்டா சென்டர்கள்.

      ### ஏன் AWS?
      - **பயன்படுத்தியதற்கு மட்டும் பணம்**: முன்கூட்டியே அதிக பணம் முதலீடு செய்யத் தேவையில்லை.
      - **வேகம்**: சில நொடிகளில் உங்களுக்குத் தேவையான சர்வர்களை உருவாக்கலாம்.
      - **அளவிடுதல் (Scalability)**: தேவைக்கு ஏற்ப சர்வர்களின் எண்ணிக்கையை அதிகரிக்கலாம்.
      `
    },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng",
    codeExample: {
      language: "bash",
      title: "Check AWS CLI Configuration",
      content: "aws configure list\naws sts get-caller-identity"
    }
  },
  "iam": {
    num: 2,
    title: { en: "Identity & Access Management (IAM)", ta: "IAM - அனுமதி மேலாண்மை" },
    description: { en: "Managing users, groups, and permissions in AWS.", ta: "AWS-ல் பயனர்கள் மற்றும் அவர்களுக்கான அனுமதிகளை நிர்வகித்தல்." },
    longDescription: {
      en: `
      IAM allows you to manage access to AWS services and resources securely. It is a global service.
      
      ### Core Components:
      - **Users**: People within your organization.
      - **Groups**: Collection of users under one set of permissions.
      - **Roles**: Used by AWS services or external entities to perform actions.
      - **Policies**: JSON documents that define permissions.
      
      ### IAM Best Practices:
      - **Root User**: Use only for the first time; then create an IAM user with Admin rights.
      - **Least Privilege**: Give only the permissions needed for the job.
      - **MFA**: Always enable Multi-Factor Authentication.
      `,
      ta: `
      IAM என்பது AWS சேவைகள் மற்றும் வளங்களுக்கான அணுகலைப் பாதுகாப்பாக நிர்வகிக்க உதவுகிறது. இது ஒரு உலகளாவிய (Global) சேவையாகும்.

      ### முக்கியக் கூறுகள்:
      - **Users**: உங்கள் நிறுவனத்தில் உள்ள தனிப்பட்ட நபர்கள்.
      - **Groups**: பல பயனர்களுக்கு ஒரே மாதிரியான அனுமதிகளை வழங்க உதவும் தொகுப்பு.
      - **Roles**: AWS சேவைகள் அல்லது பிற அமைப்புகள் ஒரு குறிப்பிட்ட வேலையைச் செய்ய தற்காலிகமாகப் பயன்படுத்தும் அனுமதி.
      - **Policies**: யாருக்கு என்ன அனுமதி உண்டு என்பதை விளக்கும் JSON ஆவணம்.

      ### IAM சிறந்த நடைமுறைகள்:
      - **ரூட் யூசர் (Root User)**: ஒருமுறை மட்டும் பயன்படுத்திவிட்டு, பின்னர் ஐஏஎம் யூசரை உருவாக்கவும்.
      - **குறைந்தபட்ச அனுமதி**: ஒரு வேலைக்குத் தேவையான அனுமதியை மட்டும் வழங்கவும்.
      - **MFA**: கூடுதல் பாதுகாப்பிற்காக மல்டி-ஃபாக்டர் ஆதென்டிகேஷனை எப்போதும் பயன்படுத்தவும்.
      `
    },
    videoUrl: "https://www.youtube.com/embed/ZIs6ZntnZ3Q",
    codeExample: {
        language: "json",
        title: "S3 Read-Only Policy Example",
        content: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:Get*", "s3:List*"],
      "Resource": "*"
    }
  ]
}`
    }
  },
  "ec2": {
    num: 3,
    title: { en: "Amazon EC2 (Virtual Servers)", ta: "Amazon EC2 (மெய்நிகர் சர்வர்கள்)" },
    description: { en: "Compute capacity in the cloud. Launching virtual machines.", ta: "கிளவுட் கம்ப்யூட்டிங் திறன். மெய்நிகர் கணினிகளை உருவாக்குதல்." },
    longDescription: {
      en: `
      Elastic Compute Cloud (EC2) is a web service that provides secure, resizable compute capacity in the cloud.
      
      ### EC2 Instance Types:
      - **General Purpose**: Balanced compute, memory, and networking.
      - **Compute Optimized**: High-performance processors.
      - **Memory Optimized**: Fast performance for large datasets.
      - **Storage Optimized**: High read/write access to local storage.
      
      ### Purchasing Options:
      - **On-Demand**: Pay by the second with no commitment.
      - **Reserved**: Long-term commitment for up to 75% discount.
      - **Spot Instances**: Use spare capacity for up to 90% discount (can be interrupted).
      `,
      ta: `
      EC2 என்பது கிளவுடில் உங்களுக்குத் தேவையான மெய்நிகர் கணினிகளை (Virtual Machines) வழங்குகிறது.

      ### EC2 இன்ஸ்டன்ஸ் வகைகள்:
      - **General Purpose**: சமநிலையான மெமரி மற்றும் வேகம்.
      - **Compute Optimized**: அதிகப்படியான பிராசஸிங் தேவைப்படும் வேலைகளுக்கு.
      - **Memory Optimized**: பெரிய அளவிலான டேட்டாக்களைக் கையாள.
      - **Storage Optimized**: வேகமான ரீட்/ரைட் (Read/Write) தேவைப்படும் போது.

      ### கட்டண முறைகள்:
      - **On-Demand**: பயன்படுத்தும் நேரத்திற்கு மட்டும் பணம்.
      - **Reserved**: 1 அல்லது 3 ஆண்டு ஒப்பந்தம் செய்தால் 75% வரை தள்ளுபடி.
      - **Spot Instances**: மீதமுள்ள சர்வர்களைப் பயன்படுத்துவதால் 90% வரை தள்ளுபடி கிடைக்கும்.
      `
    },
    videoUrl: "https://www.youtube.com/embed/lZ3bPUKo8zc",
    codeExample: {
        language: "bash",
        title: "CLI: Launch an EC2 Instance",
        content: "aws ec2 run-instances --image-id ami-xxxxxx --count 1 --instance-type t2.micro --key-name MyKeyPair"
    }
  },
  "s3": {
    num: 4,
    title: { en: "Amazon S3 (Object Storage)", ta: "Amazon S3 (ஆப்ஜெக்ட் ஸ்டோரேஜ்)" },
    description: { en: "Storing and retrieving any amount of data from anywhere.", ta: "எந்த அளவு தரவையும் எங்கிருந்தும் சேமித்து எடுக்க உதவும் வசதி." },
    longDescription: {
      en: `
      Simple Storage Service (S3) provides object storage for unlimited data capacity.
      
      ### S3 Storage Classes:
      - **S3 Standard**: High availability for frequent access.
      - **S3 Intelligent-Tiering**: Automatic cost savings based on access patterns.
      - **S3 Standard-IA**: For data accessed less frequently but needs rapid access.
      - **S3 Glacier**: Low-cost archiving for long-term storage.
      
      ### Core Concepts:
      - **Buckets**: Containers for data. Names must be globally unique.
      - **Objects**: The actual files (up to 5TB).
      - **Versioning**: Keep multiple versions of an object in the same bucket.
      `,
      ta: `
      S3 என்பது மிகக் குறைந்த செலவில் தரவுகளைச் சேமிக்க உதவும் ஒரு ஆப்ஜெக்ட் ஸ்டோரேஜ் சேவையாகும்.

      ### S3 ஸ்டோரேஜ் வகைகள்:
      - **S3 Standard**: அடிக்கடி பயன்படுத்தும் தரவுகளுக்கு.
      - **Intelligent-Tiering**: பயன்பாட்டைப் பொறுத்து தானாகவே கட்டணத்தைக் குறைக்கும்.
      - **S3 Standard-IA**: எப்போதாவது பயன்படுத்தும் தரவுகளுக்கு.
      - **S3 Glacier**: நீண்ட காலம் சேமித்து வைக்க வேண்டிய ஆவணங்களுக்கு.

      ### முக்கியக் கூறுகள்:
      - **Buckets**: தரவுகளைச் சேமிக்கும் கொள்கலன். இதன் பெயர் உலகம் முழுவதும் தனித்துவமாக (Unique) இருக்க வேண்டும்.
      - **Objects**: நீங்கள் சேமிக்கும் கோப்புகள் (5TB வரை இருக்கலாம்).
      - **Versioning**: ஒரு கோப்பின் பல பதிப்புகளைச் சேமிக்க உதவும் வசதி.
      `
    },
    videoUrl: "https://www.youtube.com/embed/e6w9LwZJFIA",
    codeExample: {
        language: "bash",
        title: "CLI: Create Bucket & Upload File",
        content: "aws s3 mb s3://my-unique-bucket-name\naws s3 cp my-file.txt s3://my-unique-bucket-name"
    }
  },
  "vpc": {
    num: 5,
    title: { en: "Amazon VPC (Networking)", ta: "Amazon VPC (நெட்வொர்க்கிங்)" },
    description: { en: "Isolated cloud resources in a virtual private cloud.", ta: "கிளவுட் வளங்களைத் தனிப்பட்ட நெட்வொர்க்கிற்குள் நிர்வகித்தல்." },
    longDescription: {
      en: `
      VPC lets you provision a logically isolated section of the AWS Cloud.
      
      ### Networking Components:
      - **Subnets**: Range of IP addresses in your VPC.
      - **Internet Gateway (IGW)**: Connects your VPC to the internet.
      - **NAT Gateway**: Allows private subnets to access the internet.
      - **Security Groups**: Virtual firewalls for instances (Stateful).
      - **NACLs**: Security layers for subnets (Stateless).
      - **VPC Peering**: Connect two VPCs together.
      `,
      ta: `
      VPC என்பது உங்கள் தேவைக்கேற்ப ஒரு தனிப்பட்ட நெட்வொர்க்கை AWS கிளவுடில் உருவாக்க உதவுகிறது.

      ### நெட்வொர்க்கிங் பகுதிகள்:
      - **Subnets**: உங்கள் நெட்வொர்க்கிற்குள் இருக்கும் சிறிய பிரிவுகள்.
      - **Internet Gateway**: உங்கள் நெட்வொர்க்கை இன்டர்நெட்டுடன் இணைக்க உதவும் கதவு.
      - **NAT Gateway**: பிரைவேட் சப்நெட்கள் இன்டர்நெட்டை அணுக உதவும்.
      - **Security Groups**: குறிப்பிட்ட சர்வர்களுக்கான பாதுகாப்புச் சுவர்.
      - **NACLs**: முழு சப்நெட்டிற்கும் வழங்கப்படும் பாதுகாப்பு அடுக்கு.
      `
    },
    videoUrl: "https://www.youtube.com/embed/jZNVZ7kjmXo",
    codeExample: {
        language: "bash",
        title: "CLI: Create a VPC",
        content: "aws ec2 create-vpc --cidr-block 10.0.0.0/16"
    }
  },
  "rds": {
    num: 6,
    title: { en: "Amazon RDS (Relational Database)", ta: "Amazon RDS (டேட்டாபேஸ்)" },
    description: { en: "Managed relational database services (MySQL, Postgres, etc.).", ta: "நிர்வகிக்கப்படும் ரிலேஷனல் டேட்டாபேஸ் சேவைகள்." },
    longDescription: {
      en: `
      Relational Database Service (RDS) makes it easy to set up, operate, and scale a relational database.
      
      ### Supported Engines:
      - MySQL, PostgreSQL, MariaDB, Oracle, SQL Server.
      - **Amazon Aurora**: High-performance, AWS-optimized cloud database.
      
      ### Key Features:
      - **Multi-AZ Deployment**: High availability and disaster recovery.
      - **Read Replicas**: Improve performance for read-heavy workloads.
      - **Backups**: Automated daily backups and point-in-time recovery.
      `,
      ta: `
      RDS என்பது கிளவுடில் டேட்டாபேஸ்களை எளிதாக நிர்வகிக்க உதவுகிறது. பேட்ச் (Patch) மற்றும் பேக்கப் (Backup) போன்ற வேலைகளை AWS-ஏ கவனித்துக் கொள்ளும்.

      ### ஆதரவு பெறும் டேட்டாபேஸ்கள்:
      - MySQL, PostgreSQL, MariaDB, Oracle போன்றவை.
      - **Amazon Aurora**: AWS உருவாக்கிய அதிவேக கிளவுட் டேட்டாபேஸ்.

      ### முக்கிய வசதிகள்:
      - **Multi-AZ**: ஒரு டேட்டா சென்டர் பாதிக்கப்பட்டாலும் மற்றொன்றில் இருந்து இயங்கும்.
      - **Read Replicas**: டேட்டாக்களை வாசிப்பதில் ஏற்படும் வேகத்தை அதிகரிக்க உதவும்.
      - **Backups**: தானியங்கி முறையில் தினசரி பேக்கப் எடுக்கப்படும்.
      `
    },
    videoUrl: "https://www.youtube.com/embed/eS-5_1QfNV4",
    codeExample: {
        language: "bash",
        title: "CLI: Create RDS Instance",
        content: "aws rds create-db-instance --db-instance-identifier my-db --db-instance-class db.t2.micro --engine mysql"
    }
  },
  "route53": {
    num: 7,
    title: { en: "Amazon Route 53 (DNS)", ta: "Amazon Route 53 (DNS)" },
    description: { en: "Highly available and scalable Domain Name System.", ta: "இணையதளப் பெயர்களை (Domain Name) நிர்வகிக்கும் சேவை." },
    longDescription: {
      en: `
      Route 53 is a cloud DNS web service designed to route users to internet applications.
      
      ### Routing Policies:
      - **Simple**: Standard routing for a single resource.
      - **Weighted**: Split traffic based on assigned weights (e.g., 80% to v1, 20% to v2).
      - **Latency**: Route users to the AWS region with the lowest latency.
      - **Failover**: Send traffic to a secondary site if the primary is down.
      - **Geolocation**: Route users based on their physical location.
      `,
      ta: `
      Route 53 என்பது உங்கள் இணையதளப் பெயரை (எ.கா. google.com) ஐபி அட்ரஸ்ஸாக மாற்றி பயனர்களைச் சரியான சர்வருக்கு அனுப்ப உதவும்.

      ### ரூட்டிங் முறைகள்:
      - **Simple**: ஒரு பெயருக்கு ஒரு சர்வர்.
      - **Weighted**: டிராஃபிக்கை சதவிகித அடிப்படையில் பிரித்து அனுப்புதல் (எ.கா. 80/20).
      - **Latency**: பயனருக்கு மிக அருகில் உள்ள சர்வருக்கு அனுப்புதல்.
      - **Failover**: மெயின் சர்வர் செயலிழந்தால் பேக்கப் சர்வருக்கு மாற்றுதல்.
      `
    },
    videoUrl: "https://www.youtube.com/embed/itR_Wn84vY4",
    codeExample: {
        language: "bash",
        title: "CLI: List Hosted Zones",
        content: "aws route53 list-hosted-zones"
    }
  },
  "lambda": {
    num: 8,
    title: { en: "AWS Lambda (Serverless)", ta: "AWS Lambda (சர்வர்லெஸ்)" },
    description: { en: "Run code without thinking about servers.", ta: "சர்வர்கள் இல்லாமல் குறியீட்டை (Code) மட்டும் இயக்குதல்." },
    longDescription: {
      en: `
      AWS Lambda lets you run code as a background task without provisioning or managing servers.
      
      ### Key Concepts:
      - **Event Driven**: Runs in response to events (S3 upload, API call, DB change).
      - **Scaling**: Scales automatically with high precision.
      - **Cost**: Pay only for the compute time you consume (per ms).
      - **Runtime Support**: Node.js, Python, Java, Go, Ruby, .NET.
      `,
      ta: `
      AWS Lambda என்பது சர்வர்களை நிர்வகிக்கத் தேவையில்லாமல் உங்கள் புரோகிராம்களை இயக்க உதவும் ஒரு 'சர்வர்லெஸ்' சேவையாகும்.

      ### முக்கிய கருத்துக்கள்:
      - **Event Driven**: ஏதேனும் மாற்றம் நிகழும்போது (எ.கா. ஒரு ஃபைல் அப்லோட் ஆவது) தானாகவே இயங்கும்.
      - **Scaling**: எத்தனை லட்சம் பேர் அப்ளிகேஷனைப் பயன்படுத்தினாலும் தானாகவே விரிவடையும்.
      - **Cost**: குறியீடு இயங்கும் மில்லிசெகண்டிற்கு மட்டும் பணம் செலுத்தினால் போதும்.
      `
    },
    videoUrl: "https://www.youtube.com/embed/eOBqark266M",
    codeExample: {
        language: "python",
        title: "Simple Python Lambda Function",
        content: "def lambda_handler(event, context):\n    print(\"Hello from Lambda!\")\n    return {'statusCode': 200, 'body': 'Success'}"
    }
  },
  "asg": {
    num: 9,
    title: { en: "Auto Scaling & Load Balancing", ta: "ஆட்டோ ஸ்கேலிங் & லோட் பேலன்சிங்" },
    description: { en: "Automatically adjust capacity to maintain steady performance.", ta: "தேவைக்கு ஏற்ப சர்வர்களைத் தானாகவே அதிகரித்தல் அல்லது குறைத்தல்." },
    longDescription: {
      en: `
      These services ensure your application is highly available and scalable.
      
      ### ELB (Elastic Load Balancer):
      - Distributes incoming application traffic across multiple targets.
      - Types: Application (HTTP/S), Network (TCP/UDP), Classic.
      
      ### ASG (Auto Scaling Group):
      - Monitor your applications and automatically adjust capacity.
      - Maintains a target number of instances even if some fail.
      `,
      ta: `
      இந்த சேவைகள் உங்கள் அப்ளிகேஷன் எப்போதும் இயங்குவதையும் (High Availability), டிராஃபிக்கிற்கு ஏற்ப மாறுவதையும் உறுதி செய்கின்றன.

      ### ELB (Load Balancer):
      - இது வரும் டிராஃபிக்கைச் சமமாகப் பிரித்து அனைத்து சர்வர்களுக்கும் அனுப்பும்.
      
      ### ASG (Auto Scaling Group):
      - டிராஃபிக் அதிகமாகும்போது புதிய சர்வர்களை உருவாக்கும், டிராஃபிக் குறைந்தால் சர்வர்களைக் குறைக்கும்.
      `
    },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng",
    codeExample: {
        language: "bash",
        title: "CLI: Create Auto Scaling Group",
        content: "aws autoscaling create-auto-scaling-group --auto-scaling-group-name my-asg --launch-configuration-name my-lc --min-size 1 --max-size 5"
    }
  },
  "cloudwatch": {
    num: 10,
    title: { en: "Amazon CloudWatch (Monitoring)", ta: "Amazon CloudWatch (கண்காணிப்பு)" },
    description: { en: "Monitoring and observability for your AWS resources.", ta: "AWS வளங்களைக் கண்காணிக்கும் மற்றும் நிர்வகிக்கும் தளம்." },
    longDescription: {
      en: `
      CloudWatch collects monitoring and operational data in the form of logs, metrics, and events.
      
      ### Capabilities:
      - **Metrics**: Monitor CPU utilization, disk I/O, network traffic.
      - **Logs**: Centralize logs from all services and applications.
      - **Alarms**: Notify you or take automated action when a threshold is breached.
      - **Events (EventBridge)**: Respond to state changes in AWS resources.
      `,
      ta: `
      CloudWatch என்பது உங்கள் அப்ளிகேஷன்கள் மற்றும் சர்வர்கள் எப்படி இயங்குகின்றன என்பதைக் கண்காணித்துத் தகவல்களை வழங்கும்.

      ### முக்கிய வசதிகள்:
      - **Metrics**: சர்வரின் வேகம், மெமரி பயன்பாடு போன்றவற்றைக் காட்டுகிறது.
      - **Logs**: சர்வர்களில் நடக்கும் அனைத்து நிகழ்வுகளையும் ஒரே இடத்தில் சேமிக்கும்.
      - **Alarms**: ஏதேனும் பிரச்சனை என்றால் (எ.கா. CPU 90% தாண்டினால்) உங்களுக்கு மெசேஜ் அனுப்பும்.
      `
    },
    videoUrl: "https://www.youtube.com/embed/a4pY8O6vNig",
    codeExample: {
        language: "bash",
        title: "CLI: List Metrics",
        content: "aws cloudwatch list-metrics --namespace AWS/EC2"
    }
  },
  "cloudfront": {
    num: 11,
    title: { en: "Amazon CloudFront (CDN)", ta: "Amazon CloudFront (CDN)" },
    description: { en: "Fast, secure content delivery network.", ta: "வேகமான மற்றும் பாதுகாப்பான கன்டென்ட் டெலிவரி நெட்வொர்க்." },
    longDescription: {
      en: "CloudFront speeds up distribution of static and dynamic web content to users worldwide via Edge Locations.",
      ta: "உலகம் முழுவதும் உள்ள எட்ஜ் லொகேஷன்களின் (Edge Locations) மலிவான மற்றும் வேகமான முறையில் தகவல்களைப் பரிமாற உதவும்."
    },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng",
    codeExample: { language: "bash", title: "CLI: Create Distribution", content: "aws cloudfront create-distribution --origin-domain-name mybucket.s3.amazonaws.com" }
  },
  "dynamodb": {
    num: 12,
    title: { en: "Amazon DynamoDB (NoSQL)", ta: "Amazon DynamoDB (NoSQL டேட்டாபேஸ்)" },
    description: { en: "Serverless NoSQL database for any scale.", ta: "எந்த அளவில் இருந்தாலும் செயல்படக்கூடிய சர்வர்லெஸ் டேட்டாபேஸ்." },
    longDescription: {
      en: "Fully managed NoSQL database service that provides fast and predictable performance with seamless scalability.",
      ta: "மிகவும் வேகமான மற்றும் எளிதில் விரிவுபடுத்தக்கூடிய (Scalability) நோ-சீக்வல் (NoSQL) டேட்டாபேஸ் சேவையாகும்."
    },
    videoUrl: "https://www.youtube.com/embed/6eH7Oq4W1Rk",
    codeExample: { language: "bash", title: "CLI: Put Item", content: "aws dynamodb put-item --table-name MyTable --item '{\"id\": {\"S\": \"123\"}, \"name\": {\"S\": \"John\"}}'" }
  },
  "ecs": {
    num: 13,
    title: { en: "Amazon ECS (Containers)", ta: "Amazon ECS (கன்டெய்னர் சேவை)" },
    description: { en: "Highly scalable, high-performance container orchestration.", ta: "ஏராளமான கன்டெய்னர்களை எளிதாக நிர்வகிக்கும் வசதி." },
    longDescription: {
      en: "Amazon Elastic Container Service (ECS) is a fully managed container orchestration service that helps you easily deploy, manage, and scale containerized applications.",
      ta: "டாக்கர் (Docker) போன்ற கன்டெய்னர் அப்ளிகேஷன்களை கிளவுடில் எளிதாக ரன் செய்ய உதவும்."
    },
    videoUrl: "https://www.youtube.com/embed/9pZ2xmsSDdo",
    codeExample: { language: "bash", title: "CLI: List Clusters", content: "aws ecs list-clusters" }
  },
  "eks": {
    num: 14,
    title: { en: "Amazon EKS (Kubernetes)", ta: "Amazon EKS (குபெர்னெட்டீஸ்)" },
    description: { en: "Run Kubernetes on AWS without installing software.", ta: "AWS-ல் குபெர்னெட்டீஸ் (Kubernetes) கிளஸ்டர்களை இயக்குதல்." },
    longDescription: {
      en: "Amazon Elastic Kubernetes Service (EKS) gives you the flexibility to start, run, and scale Kubernetes applications in the AWS Cloud or on-premises.",
      ta: "குபெர்னெட்டீஸ் கிளஸ்டர்களை நிர்வகிக்கும் சுமையைக் குறைத்து கிளவுடில் ரன் செய்ய உதவும்."
    },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng",
    codeExample: { language: "bash", title: "CLI: Update Kubeconfig", content: "aws eks update-kubeconfig --name my-cluster" }
  },
  "cloudtrail": {
    num: 15,
    title: { en: "AWS CloudTrail (Auditing)", ta: "AWS CloudTrail (தணிக்கை - Auditing)" },
    description: { en: "Track user activity and API usage.", ta: "யார் எந்தச் செயலைச் செய்தார்கள் என்பதைக் கண்காணித்தல்." },
    longDescription: {
      en: "AWS CloudTrail is a service that enables governance, compliance, operational auditing, and risk auditing of your AWS account.",
      ta: "உங்கள் அக்கவுண்டில் யார் எந்த ஐபி அட்ரஸ்ஸிலிருந்து எந்தக் கட்டளையை ரன் செய்தார்கள் என்று பாதுகாப்பாகப் பதிவு செய்யும்."
    },
    videoUrl: "https://www.youtube.com/embed/fD3QpZRE_wY",
    codeExample: { language: "bash", title: "CLI: Describe Trails", content: "aws cloudtrail describe-trails" }
  },
  "glue": {
    num: 16,
    title: { en: "AWS Glue (Data Integration)", ta: "AWS Glue (தரவு ஒருங்கிணைப்பு)" },
    description: { en: "Simple, scalable, and serverless data integration.", ta: "தரவுகளைத் தானாகவே கண்டுபிடித்து மாற்றிக் கொடுக்க உதவும்." },
    longDescription: {
      en: "A serverless data integration service that makes it easy to discover, prepare, and combine data for analytics, machine learning, and application development.",
      ta: "டேட்டாபேஸ்களில் உள்ள தரவுகளைப் பகுப்பாய்வு செய்யத் தகுந்தவாறு மாற்ற உதவும் (ETL) சர்வர்லெஸ் சேவை."
    },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng",
    codeExample: { language: "python", title: "Glue Job Snippet", content: "import sys\nfrom awsglue.transforms import *\nargs = getResolvedOptions(sys.argv, ['JOB_NAME'])" }
  },
  "athena": {
    num: 17,
    title: { en: "Amazon Athena (SQL on S3)", ta: "Amazon Athena (S3-ல் குரி செய்தல்)" },
    description: { en: "Query data in S3 using standard SQL.", ta: "S3-ல் உள்ள கோப்புகளை எஸ்கியூஎல் (SQL) மூலம் பகுப்பாய்வு செய்தல்." },
    longDescription: {
      en: "An interactive query service that makes it easy to analyze data in Amazon S3 using standard SQL. Athena is serverless, so there is no infrastructure to manage.",
      ta: "S3-ல் நீங்கள் சேமித்து வைத்திருக்கும் டேட்டாக்களைச் சர்வர் எதுவும் இல்லாமல் SQL மூலம் பகுப்பாய்வு செய்ய உதவும்."
    },
    videoUrl: "https://www.youtube.com/embed/ZIs6ZntnZ3Q",
    codeExample: { language: "sql", title: "Athena SQL Query", content: "SELECT * FROM my_db.my_table WHERE year = '2023'" }
  },
  "step-functions": {
    num: 18,
    title: { en: "AWS Step Functions (Workflows)", ta: "AWS Step Functions (வேலைப்பாடுகள்)" },
    description: { en: "Coordinate multiple AWS services into workflows.", ta: "பல AWS சேவைகளை ஒன்றிணைத்து ஒரு சீரான வேலையாக மாற்றுதல்." },
    longDescription: {
      en: "A serverless function orchestrator that makes it easy to sequence AWS Lambda functions and multiple AWS services into business-critical applications.",
      ta: "லேம்ப்டா (Lambda) போன்ற பல சேவைகளை ஒன்றன்பின் ஒன்றாக ஒரு ஃப்ளோவில் (Flow) இணைக்க இது உதவும்."
    },
    videoUrl: "https://www.youtube.com/embed/eOBqark266M",
    codeExample: { language: "json", title: "ASL State Machine", content: "{\n  \"StartAt\": \"HelloWorld\",\n  \"States\": { \"HelloWorld\": { \"Type\": \"Pass\", \"Result\": \"Success\", \"End\": true } }\n}" }
  },
  "secrets-manager": {
    num: 19,
    title: { en: "AWS Secrets Manager", ta: "AWS சீக்ரெட் மேனேஜர்" },
    description: { en: "Rotate, manage, and retrieve secrets safely.", ta: "பாஸ்வேர்டுகள் மற்றும் சீக்ரெட்களைப் பாதுகாப்பாக நிர்வகித்தல்." },
    longDescription: {
      en: "Helps you protect secrets needed to access your applications, services, and IT resources. It enables you to easily rotate, manage, and retrieve database credentials, API keys, and other secrets throughout their lifecycle.",
      ta: "உங்கள் டேட்டாபேஸ் பாஸ்வேர்டுகள் மற்றும் ஏபிஐ கீ-களை (API keys) பாதுகாப்பாகச் சேமித்து அவ்வப்போது மாற்ற உதவும்."
    },
    videoUrl: "https://www.youtube.com/embed/itR_Wn84vY4",
    codeExample: { language: "bash", title: "CLI: Get Secret Value", content: "aws secretsmanager get-secret-value --secret-id MyDatabaseSecret" }
  },
  "waf-shield": {
    num: 20,
    title: { en: "AWS WAF & Shield (Security)", ta: "AWS WAF & Shield (பாதுகாப்பு)" },
    description: { en: "Protect your apps from web exploits and DDoS.", ta: "இணையத் தாக்குதல்கள் மற்றும் டிடாஸ் (DDoS) தாக்குதல்களிலிருந்து பாதுகாத்தல்." },
    longDescription: {
      en: "AWS WAF is a web application firewall that helps protect your web applications or APIs against common web exploits. AWS Shield provides managed DDoS protection.",
      ta: "இணையதளங்களுக்கு வரும் ஹேக்கிங் முயற்சிகள் மற்றும் அதிகப்படியான டிராஃபிக் மூலமான தாக்குதல்களைத் தடுத்துப் பாதுகாக்கும்."
    },
    videoUrl: "https://www.youtube.com/embed/jZNVZ7kjmXo",
    codeExample: { language: "bash", title: "CLI: List Web ACLs", content: "aws wafv2 list-web-acls --scope CLOUDFRONT" }
  }
};
