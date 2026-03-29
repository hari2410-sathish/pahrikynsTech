export const azureData = {
  "azure-intro": {
    num: 1,
    title: { en: "Introduction to Microsoft Azure", ta: "மைக்ரோசாப்ட் அஸூர் (Azure) அறிமுகம்" },
    description: { en: "The foundational cloud computing platform from Microsoft.", ta: "மைக்ரோசாப்ட் வழங்கும் கிளவுட் கம்ப்யூட்டிங் தளம்." },
    longDescription: {
      en: "Microsoft Azure is a massive global cloud platform with over 200 services. It provides computing, storage, networking, and expert-level security for businesses worldwide.",
      ta: "அஸூர் (Azure) என்பது மைக்ரோசாப்ட் நிறுவனத்தின் கிளவுட் தளம். இது 200-க்கும் மேற்பட்ட சேவைகளை உலகத்தரம் வாய்ந்த பாதுகாப்போடு வழங்குகிறது."
    },
    videoUrl: "https://www.youtube.com/embed/O34hXm2M69M",
    codeExample: { language: "bash", title: "Azure CLI Version", content: "az --version" }
  },
  "azure-ad": {
    num: 2,
    title: { en: "Azure Active Directory (ID)", ta: "அஸூர் ஆக்டிவ் டைரக்டரி (Identity)" },
    description: { en: "Cloud-based identity and access management.", ta: "கிளவுட் அடிப்படையில் பயனர்களை நிர்வகிக்கும் முறை." },
    longDescription: {
      en: "Azure AD (now Microsoft Entra ID) helps your employees sign in and access internal and external resources safely.",
      ta: "அஸூர் ஏடி (Azure AD) என்பது ஒரு நிறுவனத்தின் ஊழியர்களுக்கு யூசர்நேம் மற்றும் பாஸ்வேர்ட் கொடுத்து, அவர்களின் பாதுகாப்பை உறுதி செய்யும் ஒரு தளமாகும்."
    },
    videoUrl: "https://www.youtube.com/embed/vBURTt9paEk",
    codeExample: { language: "bash", title: "Show AD Users", content: "az ad user list --output table" }
  },
  "azure-vm": {
    num: 3,
    title: { en: "Azure Virtual Machines (VM)", ta: "அஸூர் விர்ச்சுவல் மெஷின் (VM)" },
    description: { en: "On-demand scalable computing resources.", ta: "தேவைப்படும் போது தானாக விரிவடையும் கணினிகள்." },
    longDescription: {
      en: "Deploy Windows or Linux virtual machines in seconds. You only pay for what you use, and you can scale them up or down easily.",
      ta: "விண்டோஸ் அல்லது லினக்ஸ் கணினிகளைச் சில நொடிகளில் அஸூரில் உருவாக்கலாம். நீங்கள் பயன்படுத்தும் நேரத்திற்கு மட்டும் பணம் செலுத்தினால் போதும்."
    },
    videoUrl: "https://www.youtube.com/embed/okGcqvEsJ9A",
    codeExample: { language: "bash", title: "Create VM", content: "az vm create --name MyVM --resource-group MyRG --image UbuntuLTS" }
  },
  "azure-storage": {
    num: 4,
    title: { en: "Azure Blob Storage", ta: "அஸூர் பிளாப் ஸ்டோரேஜ் (Storage)" },
    description: { en: "Object storage for large amounts of unstructured data.", ta: "பெரிய அளவிலான தகவல்களைச் சேமிக்கும் முறை." },
    longDescription: {
      en: "Store photos, videos, and documents safely with Blob Storage. It is highly durable and accessible from anywhere in the world via HTTP/HTTPS.",
      ta: "புகைப்படங்கள், வீடியோக்கள் மற்றும் பெரிய ஃபைல்களை அஸூரில் சேமிக்க இது பயன்படும். இது உலகிலுள்ள எந்தப் பகுதியிலிருந்தும் இணையம் மூலம் அணுகக்கூடியது."
    },
    videoUrl: "https://www.youtube.com/embed/vBURTt9paEk",
    codeExample: { language: "bash", title: "Storage Account", content: "az storage account create --name mystore --resource-group MyRG" }
  },
  "azure-vnet": {
    num: 5,
    title: { en: "Azure Virtual Network (VNET)", ta: "அஸூர் விர்ச்சுவல் நெட்வொர்க் (VNET)" },
    description: { en: "Your own private network in the cloud.", ta: "கிளவுடில் உங்களுக்கென ஒரு தனிப்பட்ட பிணையம்." },
    longDescription: {
      en: "VNET enables Azure resources to securely communicate with each other, the internet, and on-premises networks.",
      ta: "அஸூரில் இருக்கும் சர்வர்கள் ஒன்றோடொன்று பாதுகாப்பாகப் பேசிக்கொள்ளவும், ஹேக்கர்களிடமிருந்து பாதுகாக்கவும் வி-நெட் (VNET) பயன்படுகிறது."
    },
    videoUrl: "https://www.youtube.com/embed/vBURTt9paEk",
    codeExample: { language: "bash", title: "Create VNET", content: "az network vnet create --name MyVnet --resource-group MyRG" }
  },
  "azure-sql": {
    num: 6,
    title: { en: "Azure SQL Database", ta: "அஸூர் எஸ்.க்யூ.எல் (SQL) டேட்டாபேஸ்" },
    description: { en: "Managed relational database in the cloud.", ta: "கிளவுடில் ஒரு முழுமையான டேட்டாபேஸ் சேவை." },
    longDescription: {
      en: "Azure SQL Database is a platform-as-a-service (PaaS) database engine that handles patching, backups, and monitoring without user intervention.",
      ta: "டேட்டாபேஸை நீங்களே இன்ஸ்டால் செய்யாமல், அஸூரே அதை நிர்வகிக்கும் சேவை இது. இது தானாகவே பேக்கப் (Backup) எடுத்துக்கொள்ளும்."
    },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng",
    codeExample: { language: "bash", title: "SQL List", content: "az sql db list --resource-group MyRG" }
  },
  "azure-app-service": {
    num: 7,
    title: { en: "Azure App Service (PaaS)", ta: "அஸூர் ஆப் சர்வீஸ் (App Service)" },
    description: { en: "Quickly build and deploy web apps and APIs.", ta: "வெப்சைட் மற்றும் ஏபிஐ-களை எளிதாகப் பதிவேற்றுதல்." },
    longDescription: {
      en: "App Service allows you to host web applications in many languages (.NET, Java, Node.js, Python) without managing the underlying server infrastructure.",
      ta: "சர்வரை நிர்வகிக்காமல் வெறும் கோடை மட்டும் அப்லோட் செய்து உங்கள் வெப்சைட்டை ஆன்லைனில் கொண்டு வர இது உதவும்."
    },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng",
    codeExample: { language: "bash", title: "Web App Create", content: "az webapp create --name MyApp --plan MyPlan --resource-group MyRG" }
  },
  "azure-functions": {
    num: 8,
    title: { en: "Azure Functions (Serverless)", ta: "அஸூர் ஃபங்க்ஷன்ஸ் (Serverless)" },
    description: { en: "Event-driven serverless computing.", ta: "தேவைப்படும் போது மட்டும் இயங்கும் கோட்." },
    longDescription: {
      en: "Run small pieces of code (functions) without worrying about servers. You only pay for the time the code actually runs.",
      ta: "பெரிய சர்வர்களைப் பயன்படுத்தாமல், ஒரு குறிப்பிட்ட வேலைக்காக மட்டும் சிறு கோடை இயக்க இது பயன்படும். இயங்கும் நேரத்திற்கு மட்டும் காசு."
    },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng",
    codeExample: { language: "bash", title: "Functions CLI", content: "az functionapp list --query \"[].name\"" }
  },
  "azure-aks": {
    num: 9,
    title: { en: "Azure Kubernetes Service (AKS)", ta: "அஸூர் குபெர்னெட்டீஸ் (AKS)" },
    description: { en: "Simplify container management with AKS.", ta: "கன்டெய்னர்களை எளிதாக நிர்வகிக்கும் அஸூர் சேவை." },
    longDescription: {
      en: "AKS makes it easy to deploy, manage, and scale containerized applications using Kubernetes in the cloud.",
      ta: "ஆயிரக்கணக்கான டாக்கர் (Docker) கன்டெய்னர்களைத் தானாகவே நிர்வகிக்கவும், அதை விரிவுபடுத்தவும் ஏ-கே-எஸ் (AKS) உதவுகிறது."
    },
    videoUrl: "https://www.youtube.com/embed/vBURTt9paEk",
    codeExample: { language: "bash", title: "Aks List", content: "az aks list -o table" }
  },
  "azure-monitor": {
    num: 10,
    title: { en: "Azure Monitor & Application Insights", ta: "அஸூர் மானிட்டர் (Monitoring)" },
    description: { en: "Observe and diagnose system issues.", ta: "அப்ளிகேஷன் பிரச்சனைகளைக் கண்டறிந்து கண்காணித்தல்." },
    longDescription: {
      en: "Azure Monitor collects telemetry and helps you understand how your applications are performing and proactively identifies issues.",
      ta: "உங்கள் வெப்சைட் ஸ்லோவாக இருக்கிறதா? அல்லது ஏதாவது பிழை நடக்கிறதா? என்பதை இது உடனுக்குடன் கண்டுபிடித்து அறிவிக்கும்."
    },
    videoUrl: "https://www.youtube.com/embed/vBURTt9paEk"
  },
  "azure-cosmos": {
    num: 11,
    title: { en: "Azure Cosmos DB", ta: "அஸூர் காஸ்மோஸ் டிபி (Cosmos)" },
    description: { en: "Globally distributed multi-model database.", ta: "உலகம் முழுவதும் பரவியிருக்கும் ஒரு பெரிய டேட்டாபேஸ்." },
    longDescription: { en: "Cosmos DB offers low latency and high availability across multiple Azure regions. It supports NoSQL, SQL, and MongoDB APIs.", ta: "அஸூர் காஸ்மோஸ் ஒரு நவீனமான NoSQL டிபி. இது மிக வேகமாகவும், எப்போது வேண்டுமானாலும் கிடைக்கக்கூடியதாகவும் இருக்கும்." },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng",
    codeExample: { language: "bash", title: "Cosmos DB Info", content: "az cosmosdb list --resource-group MyRG" }
  },
  "azure-keyvault": {
    num: 12,
    title: { en: "Azure Key Vault (Secrets)", ta: "அஸூர் கீ-வால்ட் (Security)" },
    description: { en: "Safeguard cryptographic keys and secrets.", ta: "ரகசியச் சொற்களைப் பாதுகாப்பாகச் சேமித்தல்." },
    longDescription: { en: "Don't hardcode passwords in your apps. Use Key Vault to store connection strings, API keys, and certificates securely.", ta: "உங்களுடைய அப்ளிகேஷன் பாஸ்வேர்டுகளை ஃபைல்களில் ஒளித்து வைக்காமல் அஸூர் கீ வால்ட் (Key Vault)-க்குள் பூட்டி வைத்துக்கொள்ளலாம்." },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng",
    codeExample: { language: "bash", title: "Show Key Vault", content: "az keyvault list" }
  },
  "azure-lb": {
    num: 13,
    title: { en: "Load Balancer & App Gateway", ta: "அஸூர் லோட் பேலன்சர்" },
    description: { en: "Distributing traffic to backend VMs.", ta: "சர்வர்களுக்கு வேலையைச் சமமாகப் பிரித்துக் கொடுத்தல்." },
    longDescription: { en: "Ensure high availability by spreading incoming requests across multiple servers using Azure Load Balancer and Application Gateway.", ta: "ஒரே சர்வரில் அதிக கூட்டம் வருவதைத் தவிர்க்க, வேலையைப் பல சர்வர்களுக்குப் பகிர்ந்து கொடுப்பதே லோட் பேலன்சர் (Load Balancer)." },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng"
  },
  "azure-logicapps": {
    num: 14,
    title: { en: "Azure Logic Apps", ta: "அஸூர் லாஜிக் ஆப்ஸ் (Logic Apps)" },
    description: { en: "Automate workflows and integrate systems.", ta: "ஆட்டோமேஷன் மற்றும் கணினிகளை இணைத்தல்." },
    longDescription: { en: "Logic Apps allow you to build automated scalable workflows, business processes, and enterprise orchestrations with zero code.", ta: "கோட் (Code) எழுதாமல் பிசினஸ் வேலைகளை லாஜிக் ஆப்ஸ் (Logic Apps) மூலம் ஆட்டோமேட் செய்யலாம். இது ஒரு பிளான் கன்டிஷன் மூலமாக வேலை செய்யும்." },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng"
  },
  "azure-devops": {
    num: 15,
    title: { en: "Azure DevOps Services", ta: "அஸூர் டெவொப்ஸ் (DevOps)" },
    description: { en: "Plan, build, and deploy apps quickly.", ta: "வேலைகளைத் திட்டமிடவும் பில்ட் செய்யவும் உதவும் தளம்." },
    longDescription: { en: "Azure DevOps provides developer services to support teams to plan work, collaborate on code development, and build applications.", ta: "கோட் எழுதுவது முதல் அதைப் பைப்லைன் மூலமாக சர்வர் கொண்டு செல்வது வரை அனைத்தையும் அஸூர் டெவொப்ஸ் (Azure DevOps) கவனித்துக் கொள்ளும்." },
    videoUrl: "https://www.youtube.com/embed/vBURTt9paEk"
  },
  "azure-policy": {
    num: 16,
    title: { en: "Azure Policy & RBAC", ta: "அஸூர் பாலிசி & அனுமதிகள்" },
    description: { en: "Enforce organizational standards and security.", ta: "கணினி பாதுகாப்பு விதிகளை உருவாக்குதல்." },
    longDescription: { en: "Use Azure Policy to audit and enforce compliance across your subscriptions. RBAC (Role-Based Access Control) assigns specific permissions to users.", ta: "யார் எதைச் செய்ய வேண்டும் (நிர்வாகி அல்லது பயனர்) என்று ஒவ்வொருவருக்கும் தனித்தனி அனுமதி வழங்குவதே ஆர்-பி-ஏ-சி (RBAC)." },
    videoUrl: "https://www.youtube.com/embed/vBURTt9paEk"
  },
  "azure-aro": {
    num: 17,
    title: { en: "Red Hat OpenShift on Azure (ARO)", ta: "அஸூர் ஓப்பன்ஷிப்ட் (ARO)" },
    description: { en: "Enterprise Kubernetes with Red Hat.", ta: "மற்றொரு பெரிய குபெர்னெட்டீஸ் தளம்." },
    longDescription: { en: "ARO provides fully managed OpenShift clusters jointly supported by Microsoft and Red Hat for enterprise workloads.", ta: "ரெட் ஹேட் ஓப்பன்ஷிப்ட் (ARO) என்பது ஒரு பெரிய மென்பொருள் தளமாகும். அஸூர் இதைக் கையாள்வதால் வேலைகளை மிக எளிதாகச் செய்யலாம்." },
    videoUrl: "https://www.youtube.com/embed/vBURTt9paEk"
  },
  "azure-sentinel": {
    num: 18,
    title: { en: "Azure Sentinel (SIEM)", ta: "அஸூர் சென்டினல் (Sentinel)" },
    description: { en: "Smart security analytics across your enterprise.", ta: "புத்திசாலித்தனமான அஸூர் பாதுகாப்பு மேலாண்மை." },
    longDescription: { en: "Azure Sentinel is a cloud-native SIEM and SOAR solution that provides security operations and response capabilities.", ta: "அஸூர் சென்டினல் ஒரு ஏஐ (AI) அடிப்படையிலான பாதுகாப்பு கருவி. உங்கள் சிஸ்டத்தில் ஏதாவது ஆபத்து இருந்தால் இது உடனே எச்சரிக்கும்." },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng"
  },
  "azure-migration": {
    num: 19,
    title: { en: "Azure Migration Services", ta: "அஸூர் மைக்ரேஷன் (Migration)" },
    description: { en: "Move your on-premises servers to Azure.", ta: "உங்கள் பழைய சர்வர்களை அஸூருக்கு மாற்றுதல்." },
    longDescription: { en: "Learn how Azure Migrate helps you move your internal servers, databases, and apps to the cloud with minimal downtime.", ta: "உங்கள் கணினியில் இருக்கும் பழைய தகவல்களைப் பாதுகாப்பாக அஸூருக்கு மாற்றுவது எப்படி என்று இதில் பார்ப்போம்." },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng"
  },
  "azure-billing": {
    num: 20,
    title: { en: "Azure Billing & Cost Management", ta: "அஸூர் பில்லிங் (Billing)" },
    description: { en: "Optimizing your cloud spending.", ta: "அஸூர் கட்டணங்களைக் குறைக்கும் வழிமுறைகள்." },
    longDescription: { en: "Understand how to set alerts, track costs by resource groups, and use Reserved Instances to save up to 72% on cloud costs.", ta: "கட்டணங்கள் அதிகமாகாமல் இருக்க அலாரங்களைச் செட் செய்வது மற்றும் தேவையில்லாத சர்வர்களை ஆஃப் செய்வது எனப் பல வழிகளைக் காண்போம்." },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng",
    codeExample: { language: "bash", title: "Show Consumed Services", content: "az consumption usage list" }
  }
};
