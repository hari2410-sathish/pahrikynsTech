export const databaseData = {
  "db-intro": {
    num: 1,
    title: { en: "Introduction to Databases", ta: "தரவுத்தள அறிமுகம்" },
    description: { en: "The foundation of data storage and management.", ta: "தரவு சேமிப்பு மற்றும் நிர்வாகத்தின் அடிப்படை." },
    longDescription: {
      en: "A database is an organized collection of structured information, or data, typically stored electronically in a computer system. There are two main types: Relational (SQL) and Non-Relational (NoSQL).",
      ta: "தரவுத்தளம் (Database) என்பது தகவல்களை முறையாகச் சேமித்து வைக்கும் ஒரு இடமாகும். இதில் எஸ்கியூஎல் (SQL) மற்றும் நோ-சீக்வல் (NoSQL) என இரண்டு முக்கிய வகைகள் உள்ளன."
    },
    videoUrl: "https://www.youtube.com/embed/HXV3zeQKqGY",
    codeExample: { language: "sql", title: "Show Databases", content: "SHOW DATABASES;\nCREATE DATABASE my_app;" }
  },
  "sql-basics": {
    num: 2,
    title: { en: "SQL Fundamental Queries", ta: "அடிப்படை எஸ்கியூஎல் (SQL)" },
    description: { en: "Learn structured query language basics.", ta: "டேட்டாபேஸுடன் பேச உதவும் மொழியைக் கற்றுக்கொள்ளுங்கள்." },
    longDescription: {
      en: "SQL (Structured Query Language) is used to communicate with databases. Main operations include SELECT, INSERT, UPDATE, and DELETE (CRUD).",
      ta: "SQL என்பது டேட்டாபேஸ்களில் தகவல்களைச் சேர்க்க, திருத்த மற்றும் எடுக்க உதவும் ஒரு மொழியாகும். இதுவே டேட்டாபேஸ் நிர்வாகத்தின் இதயம்."
    },
    videoUrl: "https://www.youtube.com/embed/HXV3zeQKqGY",
    codeExample: { language: "sql", title: "CRUD Operations", content: "INSERT INTO users (name, email) VALUES ('Hari', 'hari@example.com');\nSELECT * FROM users WHERE id = 1;" }
  },
  "relational-design": {
    num: 3,
    title: { en: "Relational Design & Schema", ta: "தொடர்பு வடிவமைப்பு மற்றும் ஸ்கீமா" },
    description: { en: "How tables, columns, and rows work together.", ta: "டேபிள்கள் மற்றும் தரவுகள் எப்படி ஒன்றுடன் ஒன்று இணைகின்றன." },
    longDescription: {
      en: "In a relational database, data is organized into tables. Each table has a primary key that uniquely identifies each row and foreign keys that create relationships between tables.",
      ta: "தொடர்பு தரவுத்தளத்தில் (Relational DB) தரவுகள் அட்டவணைகளாகப் பிரிக்கப்படுகின்றன. பிரைமரி கீ (Primary Key) மற்றும் ஃபாரின் கீ (Foreign Key) மூலம் இவை இணைக்கப்படும்."
    },
    videoUrl: "https://www.youtube.com/embed/HXV3zeQKqGY",
    codeExample: { language: "sql", title: "Create Table Schema", content: "CREATE TABLE orders (\n  order_id INT PRIMARY KEY,\n  user_id INT,\n  FOREIGN KEY (user_id) REFERENCES users(id)\n);" }
  },
  "filtering-sorting": {
    num: 4,
    title: { en: "Filtering & Sorting Data", ta: "தரவை வடிகட்டுதல் மற்றும் வரிசைப்படுத்துதல்" },
    description: { en: "Getting exactly the data you need.", ta: "உங்களுக்குத் தேவையான தரவை மட்டும் பிரித்தெடுத்தல்." },
    longDescription: {
      en: "Use the WHERE clause to filter data based on conditions and ORDER BY to sort the resulting data in ascending or descending order.",
      ta: "WHERE என்ற நிபந்தனையைப் பயன்படுத்தி குறிப்பிட்ட தரவை மட்டும் எடுக்கலாம். ORDER BY மூலம் தகவல்களை அகர வரிசைப்படி அடுக்கலாம்."
    },
    videoUrl: "https://www.youtube.com/embed/HXV3zeQKqGY",
    codeExample: { language: "sql", title: "Filter and Sort", content: "SELECT * FROM products\nWHERE price > 100\nORDER BY price DESC;" }
  },
  "joins-mastery": {
    num: 5,
    title: { en: "Mastering Joins", ta: "ஜாயின் (Joins) மாஸ்டரி" },
    description: { en: "Combine data from different tables.", ta: "பல அட்டவணைகளில் உள்ள தரவுகளை இணைத்தல்." },
    longDescription: {
      en: "Joins are used to combine rows from two or more tables based on a related column. Types: INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL OUTER JOIN.",
      ta: "ஜாயின்கள் (Joins) மூலம் இரண்டுக்கும் மேற்பட்ட அட்டவணைகளில் இருக்கும் தகவல்களை ஒரே இடத்தில் இணைத்துக் காட்ட முடியும்."
    },
    videoUrl: "https://www.youtube.com/embed/HXV3zeQKqGY",
    codeExample: { language: "sql", title: "Inner Join Example", content: "SELECT users.name, orders.amount\nFROM users\nINNER JOIN orders ON users.id = orders.user_id;" }
  },
  "aggregations": {
    num: 6,
    title: { en: "Aggregate Functions", ta: "திரட்டல் செயல்பாடுகள் (Aggregations)" },
    description: { en: "Calculate totals, averages, and counts.", ta: "மொத்தம், சராசரி மற்றும் எண்ணிக்கையைக் கணக்கிடுதல்." },
    longDescription: {
      en: "Aggregate functions allow you to perform calculations on a set of values to return a single value. Common ones: COUNT, SUM, AVG, MIN, MAX.",
      ta: "திரட்டல் செயல்பாடுகள் (Aggregations) மூலம் தரவுகளின் மொத்த எண்ணிக்கை அல்லது சராசரியை எளிதாகக் கணக்கிடலாம்."
    },
    videoUrl: "https://www.youtube.com/embed/HXV3zeQKqGY",
    codeExample: { language: "sql", title: "Aggregation Query", content: "SELECT category, COUNT(*), AVG(price)\nFROM products\nGROUP BY category;" }
  },
  "acid-properties": {
    num: 7,
    title: { en: "ACID Properties", ta: "ACID பண்புகள்" },
    description: { en: "The pillars of database reliability.", ta: "டேட்டாபேஸ் நம்பகத்தன்மையின் நான்கு தூண்கள்." },
    longDescription: {
      en: "ACID stands for Atomicity, Consistency, Isolation, and Durability. These properties ensure that database transactions are processed reliably.",
      ta: "ACID என்பது தரவுத்தளப் பரிவர்த்தனைகள் (Transactions) பாதுகாப்பாகவும் பிழையில்லாமலும் நடப்பதை உறுதி செய்யும் விதிகளின் தொகுப்பாகும்."
    },
    videoUrl: "https://www.youtube.com/embed/HXV3zeQKqGY",
    codeExample: { language: "sql", title: "Transaction Example", content: "START TRANSACTION;\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\nCOMMIT;" }
  },
  "indexing": {
    num: 8,
    title: { en: "Indexing & Performance", ta: "இண்டெக்சிங் மற்றும் வேகம்" },
    description: { en: "Make your queries run 100x faster.", ta: "வினவல்களை 100 மடங்கு வேகமாக மாற்றுங்கள்." },
    longDescription: {
      en: "Indexes are used to find data more quickly without scanning the entire table. However, they add overhead to write operations.",
      ta: "இண்டெக்ஸ் (Index) என்பது புத்தகத்தில் உள்ள பொருளடக்கம் போலச் செயல்படும். இது தரவுகளைத் தேடும் வேகத்தை மிக அதிகமாக மாற்றும்."
    },
    videoUrl: "https://www.youtube.com/embed/HXV3zeQKqGY",
    codeExample: { language: "sql", title: "Create Index", content: "CREATE INDEX idx_user_email ON users(email);" }
  },
  "nosql-mongodb": {
    num: 9,
    title: { en: "Introduction to NoSQL (MongoDB)", ta: "NoSQL அறிமுகம் (MongoDB)" },
    description: { en: "Flexible document-based data models.", ta: "நெகிழ்வான ஆவண அடிப்படையிலான தரவு மாதிரிகள்." },
    longDescription: {
      en: "MongoDB is a NoSQL database that stores data in JSON-like documents. It is highly scalable and great for unstructured data.",
      ta: "MongoDB என்பது ஒரு நோ-சீக்வல் (NoSQL) டேட்டாபேஸ். இது தகவல்களை ஜேசான் (JSON) போன்ற அமைப்பில் சேமித்து வைக்கும்."
    },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng",
    codeExample: { language: "javascript", title: "MongoDB Insert", content: "db.users.insertOne({ name: \"Hari\", age: 25 });" }
  },
  "db-security": {
    num: 10,
    title: { en: "Database Security & Best Practices", ta: "பாதுகாப்பு மற்றும் வழிமுறைகள்" },
    description: { en: "Protect your data from injections and unauthorized access.", ta: "தரவுகளைத் திருட்டு மற்றும் ஹேக்கிங்கிலிருந்து பாதுகாத்தல்." },
    longDescription: {
      en: "Secure your database using encryption, strong authentication, and protecting against SQL injection attacks using prepared statements.",
      ta: "தரவுத்தளத்தைப் பாதுகாப்பாக வைக்க என்கிரிப்ஷன் (Encryption) மற்றும் எஸ்க்யுஎல் இன்ஜெக்ஷன் (SQL Injection) தாக்குதல்களைத் தடுக்கும் முறைகளைக் கற்றுக் கொள்ளுங்கள்."
    },
    videoUrl: "https://www.youtube.com/embed/HXV3zeQKqGY",
    codeExample: { language: "sql", title: "Grant Permissions", content: "GRANT SELECT, INSERT ON my_db.* TO 'app_user'@'localhost';" }
  },
  "stored-procedures": {
    num: 11,
    title: { en: "Stored Procedures", ta: "ஸ்டோர்டு ப்ரொசீஜர்ஸ்" },
    description: { en: "Package your SQL logic into functions.", ta: "எஸ்க்யுஎல் லஜிக்-ஐ ஃபங்ஷன்களாக மாற்றுதல்." },
    longDescription: { en: "Groups of SQL statements that can be saved and reused repeatedly in a database.", ta: "திரும்பத் திரும்பப் பயன்படுத்த வேண்டிய வினவல்களை முன்கூட்டியே சேமித்து வைப்பது." },
    videoUrl: "https://www.youtube.com/embed/HXV3zeQKqGY",
    codeExample: { language: "sql", title: "Create Procedure", content: "CREATE PROCEDURE GetUser(IN uid INT)\nBEGIN\n  SELECT * FROM users WHERE id = uid;\nEND;" }
  },
  "triggers": {
    num: 12,
    title: { en: "Database Triggers", ta: "தரவுத்தள தூண்டிகள் (Triggers)" },
    description: { en: "Automate actions on DB changes.", ta: "தேதி மாற்றங்களின் போது தானாக இயங்கும் செயல்பாடுகள்." },
    longDescription: { en: "A trigger is a set of instructions that are executed automatically in response to certain events on a particular table.", ta: "ஒரு டேபிளில் ஏதேனும் நிகழ்வு நடக்கும்போது (INSERT/UPDATE) தானாகவே ஏதேனும் வேலையைச் செய்ய இது உதவும்." },
    videoUrl: "https://www.youtube.com/embed/HXV3zeQKqGY",
    codeExample: { language: "sql", title: "After Insert Trigger", content: "CREATE TRIGGER after_user_reg\nAFTER INSERT ON users\nFOR EACH ROW\nINSERT INTO logs (msg) VALUES ('User added');" }
  },
  "replication": {
    num: 13,
    title: { en: "Replication & HA", ta: "ரிப்ளிகேஷன் மற்றும் உயர் கிடைக்கும் தன்மை" },
    description: { en: "Syncing data across multiple servers.", ta: "பல சர்வர்களில் டேட்டாவைச் சமகாலப்படுத்துதல் (Syncing)." },
    longDescription: { en: "Copying data from one database instance to another to provide redundancy and high availability.", ta: "திரும்பத் திரும்பத் தரவுகளை வேறு சர்வர்களில் சேமிப்பதன் மூலம் டேட்டாபேஸ் எப்போதும் இயங்குவதை உறுதி செய்யலாம்." },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng",
    codeExample: { language: "bash", title: "Check Slave Status", content: "mysql -e 'SHOW SLAVE STATUS\\G'" }
  },
  "sharding": {
    num: 14,
    title: { en: "Database Sharding", ta: "டேட்டாபேஸ் ஷார்டிங் (Sharding)" },
    description: { en: "Partitioning very large datasets.", ta: "மிகப்பெரிய தரவுகளைச் சிறு பகுதிகளாகப் பிரித்தல்." },
    longDescription: { en: "Splitting a database horizontally across several servers to distribute the load.", ta: "லட்சக்கணக்கான டேட்டாக்கள் வரும்போது அவற்றை வெவ்வேறு சர்வர்களில் பிரித்து வைக்கும் முறை." },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng",
    codeExample: { language: "bash", title: "Shard Key Planning", content: "// Planning shard keys for user distribution..." }
  },
  "scaling": {
    num: 15,
    title: { en: "Vertical vs Horizontal Scaling", ta: "வெர்டிகல் மற்றும் ஹாரிஸாண்டல் ஸ்கேலிங்" },
    description: { en: "Choosing the right strategy for growth.", ta: "வளர்ச்சிக்குத் தேவையான சரியான யுத்தியைத் தேர்ந்தெடுப்பது." },
    longDescription: { en: "Vertical scaling means adding more power (CPU/RAM). Horizontal scaling means adding more servers.", ta: "ஒரே கணினியின் வேகத்தை அதிகரிப்பது அல்லது பல கணினிகளைச் சேர்த்துக் கொள்வது என இருவகை ஸ்கேலிங் உண்டு." },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng"
  },
  "pg-advanced": {
    num: 16,
    title: { en: "PostgreSQL Advanced Features", ta: "PostgreSQL மேம்பட்ட அம்சங்கள்" },
    description: { en: "JSONB, Extension, and Full-Text Search.", ta: "ஜேசன்பி (JSONB) மற்றும் முழு-உரைத் தேடல் முறைகள்." },
    longDescription: { en: "PostgreSQL offers advanced object-relational features and extensible types like JSONB for flexible documents.", ta: "PostgreSQL-ல் உள்ள ஜேசான் (JSON) சப்போர்ட் மற்றும் பவர்ஃபுல் வினவல்களைப் பற்றி இதில் பார்ப்போம்." },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng",
    codeExample: { language: "sql", title: "JSONB Query", content: "SELECT data->'name' FROM my_json_table\nWHERE data @> '{\"age\": 25}';" }
  },
  "migrations": {
    num: 17,
    title: { en: "Database Migrations", ta: "டேட்டாபேஸ் மைக்ரேசன்ஸ் (Migrations)" },
    description: { en: "Managing schema changes safely.", ta: "டேபிள் மாற்றங்களை பாதுகாப்பாக நிர்வகித்தல்." },
    longDescription: { en: "Using tools like Liquibase or Prisma to version-control your database schema.", ta: "புரோகிராம் மூலமாக டேட்டாபேஸ் அமைப்பைக் (Schema) கட்டுப்படுத்த இது மிகவும் உதவும்." },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng",
    codeExample: { language: "bash", title: "Prisma Migrate", content: "npx prisma migrate dev --name init" }
  },
  "performance": {
    num: 18,
    title: { en: "Explain & Query Performance", ta: "எக்ஸ்ப்ளெய்ன் (EXPLAIN) மற்றும் வேகம்" },
    description: { en: "Analyzing slow queries for optimization.", ta: "மெதுவான வினவல்களைக் கண்டுபிடித்துச் சரி செய்தல்." },
    longDescription: { en: "Using the EXPLAIN command to see how the database execution engine plans to run a query.", ta: "EXPLAIN கமாண்ட் மூலம் எங்குப் பிழை நடக்கிறது, எங்கே வேகம் குறைகிறது என்று துல்லியமாகக் காணலாம்." },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng",
    codeExample: { language: "sql", title: "Explain Query", content: "EXPLAIN ANALYZE SELECT * FROM big_table WHERE id = 5000;" }
  },
  "cloud-db": {
    num: 19,
    title: { en: "Cloud Databases (RDS & Aurora)", ta: "கிளவுட் டேட்டாபேஸ் (RDS)" },
    description: { en: "Database services on AWS and GCP.", ta: "அஸ்யூர் மற்றும் கூகுள் கிளவுட் டேட்டாபேஸ் சேவைகள்." },
    longDescription: { en: "Fully managed database-as-a-service providers that handle scaling, patches, and backups.", ta: "கிளவுட் நிறுவனங்களே டேட்டாபேஸை நிர்வகித்துக் கொள்ளும் வசதியைக் கற்றுக்கொள்ளுங்கள்." },
    videoUrl: "https://www.youtube.com/embed/HXV3zeQKqGY"
  },
  "redis-caching": {
    num: 20,
    title: { en: "In-memory DB & Redis Caching", ta: "இன்-மெமரி மறும் ரெடிஸ் கேச்சிங்" },
    description: { en: "Ultra-fast state management and caching.", ta: "அதிவேகமாகத் தகவல்களைச் சேமிக்கும் முறை (Redis)." },
    longDescription: { en: "Redis is an open source, in-memory data structure store, used as a database, cache, and message broker.", ta: "ரெடிஸ் (Redis) என்பது மிக வேகமாகத் தகவல்களை வழங்க உதவும் ஒரு கேச்சிங் (Caching) டேட்டாபேஸ் ஆகும்." },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng",
    codeExample: { language: "bash", title: "Redis CLI", content: "SET user:1 \"Hari\"\nGET user:1" }
  }
};
