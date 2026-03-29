export const gcpData = {
  "gcp-intro": {
    num: 1,
    title: { en: "Google Cloud Introduction", ta: "கூகுள் கிளவுட் அறிமுகம்" },
    description: { en: "The fundamentals of Google's global infrastructure.", ta: "கூகுளின் உலகளாவிய கட்டமைப்பு மற்றும் அதன் அடிப்படை வசதிகள்." },
    longDescription: {
      en: "Google Cloud Platform (GCP) provides highly scalable and reliable infrastructure for building and deploying applications. Learn about Regions, Zones, and the Google Global Network.",
      ta: "கூகுள் கிளவுட் பிளாட்பார்ம் (GCP) என்பது மிகவும் பாதுகாப்பான மற்றும் வேகமான கிளவுட் சேவையாகும். இதில் ரீஜியன்கள் (Regions) மற்றும் ஜோன்கள் (Zones) பற்றி விரிவாகக் காண்போம்."
    },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng",
    codeExample: { language: "bash", title: "Check SDK Version", content: "gcloud version" }
  },
  "projects-billing": {
    num: 2,
    title: { en: "Projects & Resource Hierarchy", ta: "புராஜெக்ட்ஸ் மற்றும் பில்லிங்" },
    description: { en: "Managing resources within project containers.", ta: "கிளவுட் வளங்களை புராஜெக்ட்கள் மூலம் நிர்வகித்தல்." },
    longDescription: {
      en: "Every resource in GCP belongs to a project. Projects are the basis for enabling services, billing, and managing permissions.",
      ta: "GCP-ல் உள்ள ஒவ்வொரு வசதியும் ஒரு புராஜெக்டிற்குள் (Project) தான் இருக்கும். இதன் மூலமே பில்லிங் மற்றும் அனுமதி மேலாண்மை செய்யப்படுகிறது."
    },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng",
    codeExample: { language: "bash", title: "Create a Project", content: "gcloud projects create [PROJECT_ID]" }
  },
  "cloud-shell": {
    num: 3,
    title: { en: "Cloud Shell & SDK", ta: "கிளவுட் ஷெல் மற்றும் எஸ்டிகே (SDK)" },
    description: { en: "Command-line tools for managing GCP.", ta: "GCP-ஐ நிர்வகிக்க உதவும் கட்டளை வரி கருவிகள்." },
    longDescription: {
      en: "Cloud Shell is an in-browser terminal for managing GCP resources. The Google Cloud SDK provides the gcloud CLI tool.",
      ta: "பிரவுசரிலேயே உபயோகிக்கக்கூடிய ஒரு டெர்மினல் தான் கிளவுட் ஷெல். எஸ்டிகே (SDK) மூலம் உங்கள் கம்ப்யூட்டரிலிருந்தே கிளவுடை நிர்வகிக்கலாம்."
    },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng",
    codeExample: { language: "bash", title: "Auth Login", content: "gcloud auth login" }
  },
  "vpc": {
    num: 4,
    title: { en: "GCP VPC Networking", ta: "GCP விபிசி (VPC) நெட்வொர்க்கிங்" },
    description: { en: "Global private networks for GCP resources.", ta: "GCP வளங்களுக்கிடையேயான உலகளாவிய நெட்வொர்க்கிங்." },
    longDescription: {
      en: "Virtual Private Cloud (VPC) allows you to create isolated private networks. GCP VPCs are global, meaning subnets can span multiple regions.",
      ta: "VPC என்பது உங்கள் அப்ளிகேஷன்களுக்கான ஒரு தனிப்பட்ட நெட்வொர்க். GCP-ன் விபிசி உலகளாவிய ரீதியில் செயல்படும் திறன் கொண்டது."
    },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng",
    codeExample: { language: "bash", title: "Create VPC", content: "gcloud compute networks create my-vpc --subnet-mode=custom" }
  },
  "compute-engine": {
    num: 5,
    title: { en: "Compute Engine (VMs)", ta: "கம்ப்யூட் என்ஜின் (VMs)" },
    description: { en: "Scalable virtual machines running on Google's infra.", ta: "கூகுளின் உள்கட்டமைப்பில் இயங்கும் மெய்நிகர் கணினிகள்." },
    longDescription: {
      en: "Compute Engine allows you to create and run Virtual Machines (VMs) on Google infrastructure. It offers various machine types for different workloads.",
      ta: "மெய்நிகர் கணினிகளை (VM) எளிதாக உருவாக்கி இயக்க கம்ப்யூட் என்ஜின் உதவுகிறது. உங்கள் தேவைக்கு ஏற்ப ராம் (RAM) மற்றும் வேரிபிள்களைத் தேர்வு செய்யலாம்."
    },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng",
    codeExample: { language: "bash", title: "Create VM", content: "gcloud compute instances create my-vm --zone=us-central1-a" }
  },
  "cloud-storage": {
    num: 6,
    title: { en: "Cloud Storage (GCS)", ta: "கிளவுட் ஸ்டோரேஜ் (GCS)" },
    description: { en: "Global, secure object storage.", ta: "உலகளாவிய மற்றும் பாதுகாப்பான ஆப்ஜெக்ட் ஸ்டோரேஜ்." },
    longDescription: {
      en: "Google Cloud Storage is for storing large amounts of unstructured data. Use buckets to organize your data.",
      ta: "பெரிய அளவிலான கோப்புகள், படங்கள் மற்றும் வீடியோக்களைச் சேமிக்க கிளவுட் ஸ்டோரேஜ் உதவுகிறது. இது ஆப்ஜெக்ட் ஸ்டோரேஜ் (Object Storage) வகையைச் சார்ந்தது."
    },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng",
    codeExample: { language: "bash", title: "Create Bucket", content: "gsutil mb gs://my-bucket-name" }
  },
  "cloud-sql": {
    num: 7,
    title: { en: "Cloud SQL", ta: "கிளவுட் எஸ்க்யுஎல் (Cloud SQL)" },
    description: { en: "Managed MySQL, PostgreSQL, and SQL Server.", ta: "நிர்வகிக்கப்பட்ட எஸ்க்யுஎல் டேட்டாபேஸ் சேவைகள்." },
    longDescription: {
      en: "Cloud SQL is a fully managed database service for setting up, maintaining, and managing relational databases.",
      ta: "MySQL அல்லது PostgreSQL போன்ற டேட்டாபேஸ்களை கிளவுடில் எளிதாக நிர்வகிக்க இது உதவும். பேக்கப் மற்றும் அப்டேட்கள் தானாகவே நடக்கும்."
    },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng",
    codeExample: { language: "bash", title: "List Instances", content: "gcloud sql instances list" }
  },
  "bigquery": {
    num: 8,
    title: { en: "BigQuery (Data Warehouse)", ta: "பிக்-குவரி (BigQuery)" },
    description: { en: "Serverless enterprise data warehouse.", ta: "பெரிய அளவிலான தரவுகளைப் பகுப்பாய்வு செய்யும் தளம்." },
    longDescription: {
      en: "BigQuery is a serverless, highly scalable, and cost-effective multicloud data warehouse designed for business agility.",
      ta: "டெராபைட் மற்றும் பெட்டாபைட் அளவிலான டேட்டாக்களை மிகக் குறுகிய காலத்தில் SQL மூலம் பகுப்பாய்வு செய்ய இது உதவும்."
    },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng",
    codeExample: { language: "sql", title: "Select Query", content: "SELECT name FROM `my_project.my_dataset.my_table` LIMIT 10" }
  },
  "app-engine": {
    num: 9,
    title: { en: "App Engine (PaaS)", ta: "ஆப் என்ஜின் (App Engine)" },
    description: { en: "Fully managed platform for building web apps.", ta: "வலைதளங்களை உருவாக்க மற்றும் இயக்க உதவும் தளம்." },
    longDescription: {
      en: "App Engine is a serverless platform for developing and hosting web applications in Google-managed data centers.",
      ta: "வெப் அப்ளிகேஷன்களை சர்வர் கவலைகள் இல்லாமல் ரன் செய்ய ஆப் என்ஜின் (PaaS) பயன்படுகிறது."
    },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng",
    codeExample: { language: "bash", title: "Deploy App", content: "gcloud app deploy" }
  },
  "cloud-run": {
    num: 10,
    title: { en: "Cloud Run (Serverless Containers)", ta: "கிளவுட் ரன் (Cloud Run)" },
    description: { en: "Run request-driven containers serverless-ly.", ta: "கன்டெய்னர்களை சர்வர்லெஸ் முறையில் இயக்குதல்." },
    longDescription: {
      en: "Cloud Run scale automatically from zero to N instances, depending on traffic. You only pay for the resources used during request processing.",
      ta: "கன்டெய்னர்களை (Containers) நேரடியாக சர்வர்லெஸ் முறையில் இயக்க இது உதவும். டிராஃபிக் இல்லாதபோது சர்வர் ரன் ஆகாது, கட்டணமும் இருக்காது."
    },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng",
    codeExample: { language: "bash", title: "Deploy Container", content: "gcloud run deploy --image gcr.io/[PROJECT_ID]/[IMG]" }
  },
  "gke": {
    num: 11,
    title: { en: "Google Kubernetes Engine (GKE)", ta: "கூகுள் குபெர்னெட்டீஸ் என்ஜின் (GKE)" },
    description: { en: "Managed Kubernetes service on Google Cloud.", ta: "குபெர்னெட்டீஸ் (Kubernetes) கிளஸ்டர்களைத் தானாக நிர்வகிக்கும் முறை." },
    longDescription: {
        en: "GKE is a simple way to deploy and manage containerized applications at scale using Kubernetes orchestration.",
        ta: "குபெர்னெட்டீஸ் (Kubernetes) அடிப்படையிலான கன்டெய்னர் அப்ளிகேஷன்களைத் திறமையாக இயக்குகிறது."
    },
    videoUrl: "https://www.youtube.com/embed/9pZ2xmsSDdo",
    codeExample: { language: "bash", title: "Create Cluster", content: "gcloud container clusters create [CLUSTER_NAME]" }
  },
  "iam": {
    num: 12,
    title: { en: "GCP Identity & Access Management (IAM)", ta: "GCP ஐஏஎம் (IAM)" },
    description: { en: "Fine-grained access control for GCP resources.", ta: "யார் எதை எப்போது செய்ய வேண்டும் என அனுமதி வழங்கும் முறை." },
    longDescription: {
        en: "GCP IAM lets you control access to specific cloud resources based on user identity or service account.",
        ta: "ஐஏஎம் (IAM) என்பது பயனர்களுக்கு மெல்லிய மற்றும் விரிவான அக்சஸ் கண்ட்ரோல் செய்ய உதவுகிறது."
    },
    videoUrl: "https://www.youtube.com/embed/ZIs6ZntnZ3Q",
    codeExample: { language: "bash", title: "Add IAM Policy", content: "gcloud projects add-iam-policy-binding [PROJ] --member=user:foo@gmail.com --role=roles/editor" }
  },
  "pub-sub": {
    num: 13,
    title: { en: "Cloud Pub/Sub", ta: "கிளவுட் பப்/சப் (Pub/Sub)" },
    description: { en: "Asynchronous messaging for event-driven systems.", ta: "நிகழ்வுகள் மூலம் தொடர்பு கொள்ளும் அсин்க்ரோனஸ் மெசேஜிங்." },
    longDescription: {
        en: "A fully managed messaging service to simplify event-driven computing and stream processing.",
        ta: "அப்ளிகேஷன்களுக்கிடையே செய்திகளைப் பரிமாறிக் கொள்ள உதவும் மெசேஜிங் சர்வீஸ்."
    },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng",
    codeExample: { language: "bash", title: "Create Topic", content: "gcloud pubsub topics create my-topic" }
  },
  "cloud-spanner": {
    num: 14,
    title: { en: "Cloud Spanner", ta: "கிளவுட் ஸ்பேனர் (Cloud Spanner)" },
    description: { en: "Globally distributed, ACID-compliant database.", ta: "உலகளாவிய ரீதியில் சேமிக்கப்படும் எஸ்க்யுஎல் டேட்டாபேஸ்." },
    longDescription: {
        en: "Relational database service that scales horizontally while maintaining high reliability and strong consistency.",
        ta: "மிகப்பெரிய டேட்டாக்களை உலகம் முழுவதும் ஒரே தன்மையுடன் சேமித்து நிர்வகிக்க ஸ்பேனர் உதவும்."
    },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng",
    codeExample: { language: "bash", title: "List Instances", content: "gcloud spanner instances list" }
  },
  "functions": {
    num: 15,
    title: { en: "Cloud Functions", ta: "கிளவுட் ஃபங்க்ஷன்ஸ் (Functions)" },
    description: { en: "Small, single-purpose cloud functions.", ta: "எளிமையான ஒருகுறிக்கோள் கொண்ட மிகச்சிறிய அப்ளிகேஷன்கள்." },
    longDescription: {
        en: "Event-driven serverless functions to automate backend logic and integrate systems.",
        ta: "குறிப்பிட்ட செயல்கள் நடக்கும்போது மட்டும் இயங்கும் சர்வர்லெஸ் லேம்டா போன்ற சேவை."
    },
    videoUrl: "https://www.youtube.com/embed/eOBqark266M",
    codeExample: { language: "js", title: "Simple Function", content: "exports.hello = (req, res) => { res.send('Hello World'); };" }
  },
  "logging": {
    num: 16,
    title: { en: "Cloud Logging", ta: "கிளவுட் லாகிங் (Cloud Logging)" },
    description: { en: "Centralized logging and analysis tool.", ta: "பதிவுகளை ஓரிடத்தில் சேமித்து ஆராயும் வசதி." },
    longDescription: {
        en: "Store and search for log information across all GCP services in real time.",
        ta: "அனைத்துச் சர்வர்களில் நடக்கும் பிழைகளை ஒரே இடத்தில் காண இது மிகவும் உதவியாக இருக்கும்."
    },
    videoUrl: "https://www.youtube.com/embed/a4pY8O6vNig",
    codeExample: { language: "bash", title: "Read Logs", content: "gcloud logging read \"resource.type=gce_instance\"" }
  },
  "monitoring": {
    num: 17,
    title: { en: "Cloud Monitoring", ta: "கிளவுட் மானிட்டரிங் (Monitoring)" },
    description: { en: "Performance monitoring and dash boarding.", ta: "வேகம் மற்றும் பயன்பாட்டைக் கண்காணித்து எச்சரிக்கை செய்தல்." },
    longDescription: {
        en: "Collect metrics, events, and metadata from GCP to understand infrastructure and application performance.",
        ta: "கிளவுட் வளங்களின் செயல்பாடு, லோட் ஆகியவற்றைக் கண்காணிக்க ஸ்பேக் போன்ற டேஷ்போர்டுகளை இது வழங்கும்."
    },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng",
    codeExample: { language: "bash", title: "List Dashboards", content: "gcloud monitoring dashboards list" }
  },
  "deployment-mgr": {
    num: 18,
    title: { en: "Deployment Manager", ta: "டிப்ளாய்மென்ட் மேனேஜர்" },
    description: { en: "Infrastructure as Code for GCP.", ta: "GCP உள்கட்டமைப்பை ஆட்டோமேஷன் செய்ய உதவும் கோப்புகள்." },
    longDescription: {
        en: "Create and manage cloud resources using YAML templates. Similar to CloudFormation or Terraform.",
        ta: "YAML கோப்புகள் மூலமாக புராஜெக்ட் தேவைகளைத் தானாகவே பில்ட் (Build) செய்ய Deployment Manager உதவும்."
    },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng",
    codeExample: { language: "yaml", title: "Config Example", content: "resources:\n- name: my-vm\n  type: compute.v1.instance" }
  },
  "cloud-armor": {
    num: 19,
    title: { en: "Cloud Armor", ta: "கிளவுட் ஆர்மர் (Cloud Armor)" },
    description: { en: "DDoS protection and WAF for Google Cloud.", ta: "பாதுகாப்புச் சுவர் - டிடாஸ் தாக்குதல்களைத் தடுக்க உதவும்." },
    longDescription: {
        en: "Protect your services from denial of service and web attacks using Google's global infra.",
        ta: "கிளவுட் ஆர்மர் என்ற பாதுகாப்பு வசதி அதிகப்படியான ஹேக்கிங் முயற்சிகளைத் தடுத்து நிறுத்தும்."
    },
    videoUrl: "https://www.youtube.com/embed/jZNVZ7kjmXo",
    codeExample: { language: "bash", title: "Create Policy", content: "gcloud compute security-policies create [NAME]" }
  },
  "iap": {
    num: 20,
    title: { en: "Identity-Aware Proxy (IAP)", ta: "ஐஏபி (IAP) செக்யூரிட்டி" },
    description: { en: "Control access to applications without VPNs.", ta: "VPN இல்லாமலே அப்ளிகேஷன் அக்சஸ் செய்யும் முறை." },
    longDescription: {
        en: "Identity-Aware Proxy lets you use identity and context to guard access to your VMs, HTTPS apps, and APIs.",
        ta: "யூசர் யார் என்று சோதிப்பதன் மூலம் கூகுள் யூசர்களுக்கு நேரடியாக பிரைவேட் விஎம்களைத் திறக்க உதவும்."
    },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng",
    codeExample: { language: "bash", title: "Enable IAP", content: "gcloud iap web enable --resource-type=backend-services" }
  }
};
