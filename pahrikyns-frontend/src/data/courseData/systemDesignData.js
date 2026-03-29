export const systemDesignData = {
  "sd-intro": {
    num: 1,
    title: { en: "Introduction to System Design", ta: "சிஸ்டம் டிசைன் அறிமுகம்" },
    description: { en: "The process of defining the architecture and components of a complex system.", ta: "ஒரு சிக்கலான மென்பொருள் கட்டமைப்பை வடிவமைக்கும் முறை." },
    longDescription: {
      en: "System design is the process of defining the architecture, components, modules, interfaces, and data for a system to satisfy specified requirements. It's about making tradeoffs to ensure scalability, reliability, and maintainability.",
      ta: "சிஸ்டம் டிசைன் என்பது ஒரு மென்பொருளின் கட்டமைப்பு, அதன் பாகங்கள் மற்றும் அவை எப்படி ஒன்றோடொன்று வேலை செய்ய வேண்டும் என்பதைத் தீர்மானிப்பதாகும். இது ஒரு மென்பொருளை பல கோடி பேர் பயன்படுத்தும் வகையில் உருவாக்குவதைக் குறிக்கும்."
    },
    videoUrl: "https://www.youtube.com/embed/SqcXvc34668",
    codeExample: { language: "text", title: "Key Metrics", content: "Availability = Uptime / (Uptime + Downtime)\nThroughput = Requests per second" }
  },
  "scalability": {
    num: 2,
    title: { en: "Scalability: Vertical vs Horizontal", ta: "அளவிடுதல் (Scalability)" },
    description: { en: "Handling 10 users vs 10 million users.", ta: "10 யூசர்கள் முதல் 10 கோடி யூசர்கள் வரை கையாளுதல்." },
    longDescription: {
      en: "Scalability is the ability of a system to handle increased load. Vertical scaling means adding more power to an existing server. Horizontal scaling means adding more servers to the pool.",
      ta: "ஸ்கேலபிளிட்டி என்பது பயனர்களின் எண்ணிக்கை அதிகரிக்கும்போது அதற்கேற்ப கணினியின் திறனை அதிகரிப்பதாகும். ஒரே சர்வரைப் பெரிதாக்குவது (Vertical) அல்லது பல சர்வர்களைச் சேர்த்துக் கொள்வது (Horizontal) என இருவகை உண்டு."
    },
    videoUrl: "https://www.youtube.com/embed/SqcXvc34668",
    codeExample: { language: "bash", title: "Horizontal Scaling Example", content: "docker-compose up --scale web=5" }
  },
  "load-balancing": {
    num: 3,
    title: { en: "Load Balancing", ta: "பணிச்சுமை மேலாண்மை (Load Balancing)" },
    description: { en: "Distributing traffic across multiple servers.", ta: "அனைத்து சர்வர்களுக்கும் வரும் டிராஃபிக்கைச் சமமாகப் பிரித்து அனுப்புதல்." },
    longDescription: {
      en: "A load balancer acts as a traffic cop sitting in front of your servers and routing client requests across all servers capable of fulfilling those requests.",
      ta: "லோட் பேலன்சர் என்பது வரும் பயனர்களைச் சரியான மற்றும் காலியாக இருக்கும் சர்வர்களுக்குப் பிரித்து அனுப்பி பணிச்சுமையைக் குறைக்கும் ஒரு கருவியாகும்."
    },
    videoUrl: "https://www.youtube.com/embed/SqcXvc34668",
    codeExample: { language: "nginx", title: "NGINX Load Balancer Config", content: "upstream myapp {\n  server srv1.example.com;\n  server srv2.example.com;\n}\nserver {\n  location / {\n    proxy_pass http://myapp;\n  }\n}" }
  },
  "caching": {
    num: 4,
    title: { en: "Caching Strategies", ta: "கேச்சிங் (Caching) முறைகள்" },
    description: { en: "Storing data temporarily for fast access.", ta: "தகவல்களைத் தற்காலிகமாகச் சேமித்து வைத்து வேகத்தைப் பெருக்குதல்." },
    longDescription: {
      en: "Caching is the process of storing copies of data in a temporary storage location so that they can be accessed more quickly. Common layers include CDN, Web Server, and Database cache (Redis).",
      ta: "கேச்சிங் என்பது அடிக்கடி கேட்கப்படும் தகவல்களைத் தற்காலிகமாகச் சேமித்து வைப்பதைக் குறிக்கும். இதனால் டேட்டாபேஸிற்குச் செல்லும் வேலை குறைந்து இணையதளம் மிக வேகமாக இயங்கும்."
    },
    videoUrl: "https://www.youtube.com/embed/SqcXvc34668",
    codeExample: { language: "javascript", title: "Simple Cache Logic", content: "const cache = {};\nfunction getData(id) {\n  if (cache[id]) return cache[id];\n  const data = fetchDataFromDB(id);\n  cache[id] = data;\n  return data;\n}" }
  },
  "cap-theorem": {
    num: 5,
    title: { en: "The CAP Theorem", ta: "சிஏபி (CAP) தேற்றம்" },
    description: { en: "The fundamental trade-off in distributed systems.", ta: "கிளவுட் அமைப்புகளில் இருக்கும் அடிப்படை சவால்கள்." },
    longDescription: {
      en: "The CAP theorem states that it is impossible for a distributed data store to simultaneously provide more than two out of the following three guarantees: Consistency, Availability, and Partition Tolerance.",
      ta: "CAP தேற்றம் என்பது சீரான தன்மை (Consistency), எப்போதும் கிடைத்தல் (Availability), மற்றும் நெட்வொர்க் பிழைகளைத் தாங்குதல் (Partition Tolerance) ஆகிய மூன்றில் எதையாவது இரண்டைத்தான் ஒரு நேரத்தில் சிறப்பாக வழங்க முடியும் என்பதாகும்."
    },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng"
  },
  "microservices": {
    num: 6,
    title: { en: "Microservices Architecture", ta: "மைக்ரோ சர்வீசஸ் கட்டமைப்பு" },
    description: { en: "Breaking down the big monolith.", ta: "ஒரே பெரிய புராஜெக்ட்டைச் சிறு சிறு துண்டுகளாகப் பிரித்தல்." },
    longDescription: {
      en: "Microservices is an architectural style that structures an application as a collection of services that are highly maintainable, testable, and loosely coupled.",
      ta: "மைக்ரோ சர்வீசஸ் என்பது ஒரு பெரிய சாப்ட்வேரை தனித்தனி வேலைகளைச் செய்யும் சிறிய பகுதிகளாகப் பிரித்து உருவாக்குவதாகும் (எ.கா: பேமெண்ட் தனியாக, யூசர் மேனேஜ்மெண்ட் தனியாக)."
    },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng"
  },
  "consistent-hashing": {
    num: 7,
    title: { en: "Consistent Hashing", ta: "கன்சிஸ்டண்ட் ஹாஷிங்" },
    description: { en: "Mapping data to servers efficiently.", ta: "தரவுகளைச் சர்வர்களுடன் சரியாகப் பொருத்தும் முறை." },
    longDescription: {
      en: "Consistent hashing is a balancing technique that ensures minimum data movement when a server is added or removed from a group of servers.",
      ta: "ஒரு டேட்டாபேஸ் சர்வர் செயலிழந்தாலோ அல்லது புதிய சர்வர் சேர்க்கப்பட்டாலோ, தரவுகள் அதிகம் மாறாமல் இருக்க இந்த யுத்தி பயன்படுகிறது."
    },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng"
  },
  "message-queues": {
    num: 8,
    title: { en: "Message Queues & Async Work", ta: "மெசேஜ் கியூ மற்றும் அசிங்க் வேலைகள்" },
    description: { en: "Handling background tasks asynchronously.", ta: "பின்னணி வேலைகளை வரிசைப்படுத்தி நிர்வகித்தல்." },
    longDescription: {
      en: "Message queues allow different parts of a system to communicate asynchronously. This improves responsiveness by offloading heavy tasks to the background (e.g., RabbitMQ, Kafka).",
      ta: "மெசேஜ் கியூ என்பது ஒரு வேலையைச் செய்ய உடனே பதில் அளிக்காமல், அதை ஒரு வரிசையில் (Queue) வைத்துப் பிறகு செய்வது. இது இணையதளத்தின் வேகத்தை அதிகரிக்க உதவும்."
    },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng",
    codeExample: { language: "javascript", title: "Publisher Snippet", content: "channel.sendToQueue('email_queue', Buffer.from(msg));" }
  },
  "api-design": {
    num: 9,
    title: { en: "API Design & Rate Limiting", ta: "ஏபிஐ (API) மற்றும் ரேட் லிமிட்டிங்" },
    description: { en: "Guidelines for scalable API communication.", ta: "புரோகிராம்கள் தங்களுக்குள் பேசிக்கொள்ளும் முறையை வடிவமைத்தல்." },
    longDescription: {
      en: "API Design involves defining resources, HTTP methods, and response codes. Rate limiting protects your API from abuse by limiting the number of requests a user can make.",
      ta: "ஏபிஐ என்பது இரண்டு மென்பொருள்கள் பேசிக்கொள்ளும் மொழி. ரேட் லிமிட்டிங் (Rate Limiting) என்பது ஒரு நபர் ஒரு நிமிடத்திற்கு இத்தனை முறைதான் ஏபிஐ-ஐப் பயன்படுத்த முடியும் என்ற கட்டுப்பாடாகும்."
    },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng",
    codeExample: { language: "javascript", title: "Rate Limit Middleware", content: "const limiter = rateLimit({ windowMs: 15*60*1000, max: 100 });" }
  },
  "cdn": {
    num: 10,
    title: { en: "Content Delivery Networks (CDN)", ta: "கன்டென்ட் டெலிவரி நெட்வொர்க் (CDN)" },
    description: { en: "Serving static content from near-user locations.", ta: "தகவல்களைப் பயனருக்கு அருகிலுள்ள இடத்திலிருந்து வழங்கல்." },
    longDescription: {
      en: "A CDN is a geographically distributed group of servers which work together to provide fast delivery of Internet content like images, CSS, and JS files.",
      ta: "CDN என்பது உலகம் முழுவதும் உள்ள சர்வர்களின் தொகுப்பாகும். இது இணையதளத்தில் உள்ள படங்கள் மற்றும் வீடியோக்களை மிக வேகமாகப் பயனர்களுக்கு வழங்க உதவுகிறது."
    },
    videoUrl: "https://www.youtube.com/embed/SqcXvc34668"
  },
  "circuit-breaker": {
    num: 11,
    title: { en: "Circuit Breakers & Retries", ta: "சர்க்யூட் பிரேக்கர்ஸ் (Fail-Safe)" },
    description: { en: "Preventing cascading failures.", ta: "பாதிப்புகள் பரவாமல் தடுத்து சிஸ்டத்தைக் காத்தல்." },
    longDescription: { en: "Circuit breakers temporarily stop calls to a failing service to prevent it from crashing the whole system. Retries with exponential backoff help handle temporary glitches.", ta: "ஏதாவது ஒரு பகுதி செயலிழந்தால், அது மற்ற பகுதிகளையும் பாதிக்காமல் இருக்க சர்க்யூட் பிரேக்கர்ஸ் மற்றும் எக்ஸ்போனென்ஷியல் பேக்-ஆஃப் முறைகளைப் பயன்படுத்தலாம்." },
    videoUrl: "https://www.youtube.com/embed/SqcXvc34668"
  },
  "url-shortener": {
    num: 12,
    title: { en: "Design: URL Shortener", ta: "URL ஷார்டனர் வடிவமைப்பு" },
    description: { en: "TinyURL/Bitly scale system architecture.", ta: "பெரிய யூஆர்எல்-களைச் சிறியதாக மாற்றும் சிஸ்டம்." },
    longDescription: { en: "A classic system design problem that covers key-value storage, hashing, and scaling to billions of links.", ta: "மிகப்பெரிய இணையதள இணைப்புகளைச் சுருக்கி வழங்குவதும், அவற்றை மேலாண்மை செய்வதும் எப்படி என்று இதில் விரிவாகக் காண்போம்." },
    videoUrl: "https://www.youtube.com/embed/SqcXvc34668",
    codeExample: { language: "javascript", title: "Base62 Encoding", content: "const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';\nfunction encode(num) { /* encode logic */ }" }
  },
  "chat-system": {
    num: 13,
    title: { en: "Design: Real-time Chat (WhatsApp)", ta: "ரியல்-டைம் சாட் சிஸ்டம்" },
    description: { en: "Building highly available messaging systems.", ta: "வாட்ஸ்அப் (WhatsApp) போன்ற சேதிகளைப் பரிமாறும் முறை." },
    longDescription: { en: "Learn how to handle persistent connections (WebSockets), message synchronization, and offline status delivery.", ta: "லட்சக்கணக்கானோர் ஒரே நேரத்தில் சாட் செய்யும் போது வெப்சாக்கெட்ஸ் (WebSockets) மூலம் தகவல்களை உடனுக்குடன் அனுப்புவது பற்றிப் பார்ப்போம்." },
    videoUrl: "https://www.youtube.com/embed/SqcXvc34668"
  },
  "news-feed": {
    num: 14,
    title: { en: "Design: News Feed (Twitter/FB)", ta: "நியூஸ் ஃபீடு (News Feed) சிஸ்டம்" },
    description: { en: "Complex ranking and fanout architecture.", ta: "டிவிட்டர் (Twitter) ஃபீடுகளை வடிவமைத்தல்." },
    longDescription: { en: "Architecture for billions of users accessing feeds. Covers write-fanout, read-fanout, and precomputed feed models.", ta: "டிவிட்டர் அல்லது ஃபேஸ்புக் ஃபீடுகளில் தகவல்களை மிக வேகமாகப் பயனர்களுக்கு எப்படிக் காட்டுவது (Fanout Strategy) என்பதாகும்." },
    videoUrl: "https://www.youtube.com/embed/SqcXvc34668"
  },
  "video-streaming": {
    num: 15,
    title: { en: "Design: Video Streaming (Netflix/YouTube)", ta: "வீடியோ ஸ்ட்ரீமிங் சிஸ்டம்" },
    description: { en: "Delivering massive video files globally.", ta: "பெரிய வீடியோக்களைத் தடையின்றி வழங்குதல் (Netflix)." },
    longDescription: { en: "Learn about adaptive bitrate streaming, video encoding, CDN strategy, and handling multi-device playback.", ta: "நெட்பிளிக்ஸ் அல்லது யூடியூப் போன்ற சேவைகளில் வீடியோக்களைத் தரமான முறையில் பஃப்பரிங் இல்லாமல் வழங்கத் தேவையான உத்திகள்." },
    videoUrl: "https://www.youtube.com/embed/SqcXvc34668"
  },
  "file-storage": {
    num: 16,
    title: { en: "Design: File Storage (Dropbox/G-Drive)", ta: "கோப்புச் சேமிப்பு (Google Drive)" },
    description: { en: "Syncing files across multiple devices.", ta: "தரவுகளைப் பல இடங்களில் சமமாகக் காட்டும் முறை." },
    longDescription: { en: "How to handle binary chunks, data deduplication, incremental sync and versioning for file systems.", ta: "டாக்கர்களைப் பிரித்துச் சேமிப்பதன் மூலம் டேட்டா டெடுப்ளிகேஷன் (Deduplication) மற்றும் ஆஃப்லைன் சிங்க் (Sync) செய்வது எப்படி எனப் பார்ப்போம்." },
    videoUrl: "https://www.youtube.com/embed/SqcXvc34668"
  },
  "search-engine": {
    num: 17,
    title: { en: "Design: Web Search Engine", ta: "தேடல் இயந்திரம் (Search Engine)" },
    description: { en: "Crawling and indexing the entire web.", ta: "இணையத்தைத் தேடி தகவல்களைத் திரட்டுதல் (Google)." },
    longDescription: { en: "Build a system that crawls links, builds an inverted index, and results relevant pages using PageRank algorithms.", ta: "கூகுள் போலத் தகவல்களைத் தேடும் இன்வெர்டெட் இண்டெக்ஸ் (Inverted Index) மற்றும் பேஜ்ரேங்க் (PageRank) அல்கோரிதம்கள் பற்றிப் பார்ப்போம்." },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng"
  },
  "distributed-locking": {
    num: 18,
    title: { en: "Distributed Locking & Redis", ta: "டிஸ்ட்ரிபியூட்டட் லாக்கிங் (Locking)" },
    description: { en: "Ensuring concurrency across servers.", ta: "பல சர்வர்களில் ஒரே நேரத்தில் டேட்டா மாறாமல் காத்தல்." },
    longDescription: { en: "How to prevents race conditions when multiple servers update the same resource using tools like Redis (Redlock) or Zookeeper.", ta: "ஒரே தகவலைப் பல சர்வர்கள் மாற்ற முயலும்போது ஏற்படும் பிழைகளை (Race Conditions) ரெடிஸ் (Redis) மூலம் தடுப்பது எப்படி?" },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng"
  },
  "monitoring-alerting": {
    num: 19,
    title: { en: "Monitoring & Alerting", ta: "சிஸ்டம் மானிட்டரிங் மற்றும் அலர்ட்கள்" },
    description: { en: "Observability for large scale systems.", ta: "பெரிய கட்டமைப்புகளைத் தொடர்ந்து கண்காணித்தல்." },
    longDescription: { en: "Key concepts of SRE (Site Reliability Engineering). Learn about SLAs, SLOs, SLIs and error budgeting.", ta: "புரோமிதியஸ் (Prometheus) மற்றும் கிரபானா (Grafana) பயன்படுத்திச் சர்வர்களைத் துல்லியமாகக் கண்காணிப்பது எப்படி எனப் பார்ப்போம்." },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng"
  },
  "proximity-service": {
    num: 20,
    title: { en: "Design: Proximity Service (Yelp/Uber)", ta: "புராக்சிமிட்டி சர்வீஸ் (Yelp/Uber)" },
    description: { en: "Finding nearby locations using Geo-Hashing.", ta: "உங்களுக்கு அருகில் இருப்பவற்றைக் கண்டுபிடித்தல்." },
    longDescription: { en: "Designing a system that returns places like restaurants or drivers near a user using Quad-Trees or Geohashing techniques.", ta: "உபெர் அல்லது ஸ்விக்கி (Swiggy) போன்ற அப்ளிகேஷன்களில் உங்களுக்கு அருகில் உள்ள கடைகளைக் கண்டுபிடிக்க உதவும் ஜியோ-ஹாஷிங் (Geohashing) உத்திகள்." },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng"
  }
};
