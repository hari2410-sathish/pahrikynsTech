export const scriptData = {
  "dockerfile": {
    title: { en: "Mastering Dockerfiles", ta: "டாக்கர்ஃபைல் (Dockerfile) மாஸ்டரி" },
    description: { en: "In-depth guide to writing efficient, multi-stage Dockerfiles.", ta: "திறமையான டாக்கர்ஃபைல்களை உருவாக்குவதற்கான விரிவான வழிகாட்டி." },
    longDescription: {
      en: `
      A Dockerfile is a text document that contains all the commands a user could call on the command line to assemble an image.
      
      ### Core Instructions:
      - **FROM**: Sets the Base Image for subsequent instructions.
      - **RUN**: Executes any commands in a new layer on top of the current image.
      - **CMD**: Provides defaults for an executing container.
      - **WORKDIR**: Sets the working directory for any following instructions.
      - **ENV**: Sets the environment variable.
      - **ARG**: Defines a variable that users can pass at build-time.
      
      ### Best Practices:
      - **Multi-stage builds**: Use multiple FROM statements to reduce final image size.
      - **Layer Caching**: Order instructions to leverage Docker's build cache.
      - **Security**: Don't run as root; use a non-privileged user.
      `,
      ta: `
      டாக்கர்ஃபைல் (Dockerfile) என்பது ஒரு இமேஜை (Image) உருவாக்குவதற்குத் தேவையான அனைத்து கட்டளைகளையும் கொண்ட ஒரு ஆவணம் ஆகும்.

      ### அடிப்படை கட்டளைகள்:
      - **FROM**: அடிப்படையான இமேஜை முடிவு செய்தல்.
      - **RUN**: இமேஜ் தயாரிக்கும்போது ஏதாவது மென்பொருளை நிறுவ அல்லது கமாண்ட் ரன் செய்ய.
      - **CMD**: கன்டெய்னர் இயங்கும்போது செய்ய வேண்டிய முக்கியமான வேலை.
      - **WORKDIR**: வேலை செய்ய வேண்டிய ஃபோல்டரை முடிவு செய்தல்.
      - **ENV**: என்விரான்மென்ட் வேரியபிள்களை அமைத்தல்.

      ### சிறந்த வழிமுறைகள்:
      - **மல்டி-ஸ்டேஜ் பில்ட்**: இமேஜின் அளவைக் குறைக்கப் பல நிலைகளில் உருவாக்குதல்.
      - **லேயர் கேச்சிங்**: வேலையை வேகப்படுத்த சரியான வரிசையில் கட்டளைகளை எழுதுதல்.
      - **பாதுகாப்பு**: அட்மின் (Root) பயனர் இல்லாமல் சாதாரண பயனர் மூலம் இயக்குதல்.
      `
    },
    codeExample: {
        language: "dockerfile",
        title: "Advanced Multi-Stage Dockerfile",
        content: `
# STAGE 1: Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# STAGE 2: Production
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
        `
    }
  },
  "docker-layers": {
    title: { en: "Understanding Docker Layers", ta: "டாக்கர் லேயர்களைப் (Layers) புரிந்து கொள்ளுதல்" },
    description: { en: "How Docker builds and caches layers in your Dockerfile.", ta: "டாக்கர் லேயர்களை எவ்வாறு உருவாக்குகிறது மற்றும் கேச் செய்கிறது." },
    longDescription: {
      en: "Docker images are built with layers. Each instruction in a Dockerfile adds a new layer. Understanding this is key to building small, fast images.",
      ta: "டாக்கர் இமேஜ்கள் அடுக்குகளாக (Layers) உருவாக்கப்படுகின்றன. ஒவ்வொரு கட்டளையும் ஒரு புதிய அடுக்கைச் சேர்க்கிறது. இதை அறிவது வேகமான மற்றும் சிறிய இமேஜ்களை உருவாக்க உதவும்."
    },
    codeExample: { language: "dockerfile", title: "Layer Optimization Example", content: "COPY package*.json ./\nRUN npm install\nCOPY . ." }
  },
  "docker-ignore": {
    title: { en: "Using .dockerignore", ta: ".dockerignore பயன்படுத்துதல்" },
    description: { en: "Exclude files from your Docker build context to save space.", ta: "தேவையற்ற கோப்புகளை டாக்கர் பில்டிலிருந்து விலக்குதல்." },
    longDescription: {
      en: "The .dockerignore file works like .gitignore. It prevents unnecessary files like node_modules or .git from being sent to the Docker daemon.",
      ta: ".dockerignore கோப்பு .gitignore போலவே செயல்படுகிறது. இது தேவையற்ற கோப்புகளை டாக்கர் சிஸ்டத்திற்கு அனுப்புவதைத் தடுக்கிறது."
    },
    codeExample: { language: "text", title: ".dockerignore example", content: "node_modules\n.git\n*.log\nDEBUG.txt" }
  },
  "docker-env-vars": {
    title: { en: "Environment Variables in Docker", ta: "டாக்கரில் என்விரான்மென்ட் வேரியபிள்கள்" },
    description: { en: "Passing configuration and secrets to your containerized app.", ta: "கன்டெய்னருக்கு கன்பிகரேஷன் மற்றும் சீக்ரெட்களை அனுப்புதல்." },
    longDescription: { en: "Use ENV to set constant variables and ARG for build-time variables.", ta: "ENV மூலம் நிலையான வேரியபிள்களையும், ARG மூலம் பில்ட்-டைம் வேரியபிள்களையும் அமைக்கலாம்." },
    codeExample: { language: "dockerfile", title: "ENV & ARG Usage", content: "ARG VERSION=1.0\nENV APP_COLOR=blue" }
  },
  "docker-run-vs-cmd": {
    title: { en: "RUN vs CMD vs ENTRYPOINT", ta: "RUN vs CMD vs ENTRYPOINT" },
    description: { en: "The difference between build-time and run-time commands.", ta: "பில்ட்-டைம் மற்றும் ரன்-டைம் கட்டளைகளுக்கு இடையிலான வேறுபாடு." },
    longDescription: { en: "RUN executes during build. CMD is the default behavior. ENTRYPOINT makes the container act as an executable.", ta: "RUN பில்டின் போது இயங்கும். CMD என்பது கன்டெய்னர் ரன் ஆகும்போது இயங்கும். ENTRYPOINT கன்டெய்னரை ஒரு எக்சிகியூட்டபிள் ஆக மாற்றும்." },
    codeExample: { language: "dockerfile", title: "Entrypoint Example", content: "ENTRYPOINT [\"python3\", \"app.py\"]" }
  },
  "docker-copy-vs-add": {
    title: { en: "COPY vs ADD", ta: "COPY vs ADD" },
    description: { en: "Which instruction should you use to move files?", ta: "கோப்புகளை நகர்த்த எந்தத் தேர்வினைப் பயன்படுத்த வேண்டும்?" },
    longDescription: { en: "COPY is basic. ADD is more powerful (can handle URLs and extract tars), but COPY is generally preferred for simplicity.", ta: "COPY எளிமையானது. ADD அதிக வசதிகளைக் கொண்டது (URL மற்றும் tar கோப்புகளைக் கையாளும்), ஆனால் COPY-யே பெரும்பாலும் பரிந்துரைக்கப்படுகிறது." },
    codeExample: { language: "dockerfile", title: "Copy Files", content: "COPY ./src /app/src" }
  },
  "docker-multistage": {
    title: { en: "Multi-Stage Build patterns", ta: "மல்டி-ஸ்டேஜ் பில்ட் முறைகள்" },
    description: { en: "Shrinking your image sizes by a factor of 10.", ta: "இமேஜ் அளவை 10 மடங்கு வரை குறைக்கும் முறைகள்." },
    longDescription: { en: "Separate build tools from production artifacts using multiple FROM statements.", ta: "ஒரே டாக்கர்ஃபைலில் பில்ட் டூல்களையும், மெயின் அப்ளிகேஷனையும் பிரித்து இயக்குதல்." },
    codeExample: { language: "dockerfile", title: "React Multi-Stage", content: "FROM node AS build\n...\nFROM nginx\nCOPY --from=build ..." }
  },
  "docker-security": {
    title: { en: "Docker Security Best Practices", ta: "டாக்கர் பாதுகாப்பு வழிமுறைகள்" },
    description: { en: "Keeping your containers safe from attacks.", ta: "உங்கள் கன்டெய்னர்களைத் தாக்குதல்களிலிருந்து பாதுகாத்தல்." },
    longDescription: { en: "Never run as root. Use 'USER' to switch to a non-privileged account. Scan images for vulnerabilities.", ta: "ரூட் (Root) பயனர் மூலம் இயக்கவேண்டாம். 'USER' கட்டளையைப் பயன்படுத்தி சாதாரணப் பயனராக இயக்கவும்." },
    codeExample: { language: "dockerfile", title: "Set Non-root User", content: "RUN useradd -m myuser\nUSER myuser" }
  },
  "shell-script-basics": {
    title: { en: "Intro to Shell Scripting", ta: "ஷெல் ஸ்கிரிப்டிங் அறிமுகம்" },
    description: { en: "Automate Linux tasks with Bash.", ta: "பாஷ் (Bash) மூலம் லினக்ஸ் வேலைகளை தானியக்கமாக்குதல்." },
    longDescription: { en: "A shell script is a file containing strings of commands for a Linux shell to execute.", ta: "ஷெல் ஸ்கிரிப்ட் என்பது லினக்ஸ் சிஸ்டத்தில் இயங்கக்கூடிய பல கட்டளைகளின் தொகுப்பாகும்." },
    codeExample: { language: "bash", title: "Hello World Script", content: "#!/bin/bash\necho \"Hello, World!\"" }
  },
  "shell-variables": {
    title: { en: "Bash Variables & Loops", ta: "வேரியபிள்கள் மற்றும் லூப்கள்" },
    description: { en: "Storing data and repeating tasks in shell.", ta: "தரவுகளை சேமித்தல் மற்றும் வேலைகளை மீண்டும் மீண்டும் செய்தல்." },
    longDescription: { en: "Learn how to use variables and 'for/while' loops in Bash for automation.", ta: "வேரியபிள்கள் மற்றும் லூப்களைப் பயன்படுத்தி எப்படி வேலைகளை எளிதாக்குவது எனக் கற்றுக் கொள்ளுங்கள்." },
    codeExample: { language: "bash", title: "For Loop Example", content: "for i in {1..5}; do echo \"Count $i\"; done" }
  },
  "sh-conditionals": {
    title: { en: "Conditionals in Shell", ta: "ஷெல் ஸ்கிரிப்டில் கண்டிஷன்கள்" },
    description: { en: "If-Else logic for automation scripts.", ta: "ஸ்கிரிப்ட்களில் இஃப்-எல்ஸ் (If-Else) லாஜிக் பயன்படுத்துதல்." },
    longDescription: { en: "Decision making in Bash scripts using if statements and exit codes.", ta: "கட்டளைகளின் முடிவைப் பொறுத்து முடிவுகளை எடுப்பது எப்படி எனப் புரிந்து கொள்ளுங்கள்." },
    codeExample: { language: "bash", title: "If Statement", content: "if [ -f \"file.txt\" ]; then echo \"Exists\"; fi" }
  },
  "docker-volumes": {
    title: { en: "Docker Volumes & Persistence", ta: "டாக்கர் வால்யூம்ஸ் மற்றும் பெர்சிஸ்டன்ஸ்" },
    description: { en: "How to save data beyond a container's life.", ta: "கன்டெய்னர் அழிந்தாலும் தரவுகளை எப்படிப் பாதுகாப்பது?" },
    longDescription: { en: "Volumes are the preferred mechanism for persisting data generated by and used by Docker containers.", ta: "கன்டெய்னர்கள் மாற்றப்பட்டாலும் தரவுகள் அழியாமல் இருக்க வால்யூம்கள் (Volumes) உதவுகின்றன." },
    codeExample: { language: "bash", title: "Mount Volume", content: "docker run -v my_data:/app/data my_image" }
  },
  "docker-networks": {
    title: { en: "Docker Networking", ta: "டாக்கர் நெட்வொர்க்கிங்" },
    description: { en: "Connecting containers together.", ta: "கன்டெய்னர்களை ஒன்றோடொன்று இணைத்தல்." },
    longDescription: { en: "Bridge networks, Host networks, and Overlay networks for inter-container communication.", ta: "கன்டெய்னர்கள் தங்களுக்குள் பேசிக் கொள்ள பிரிட்ஜ் மற்றும் ஓவர்லே நெட்வொர்க்குகளைப் பயன்படுத்துதல்." },
    codeExample: { language: "bash", title: "Create Network", content: "docker network create my-net" }
  },
  "docker-compose": {
    title: { en: "Docker Compose Intro", ta: "டாக்கர் கம்போஸ் (Compose) அறிமுகம்" },
    description: { en: "Running multi-container applications.", ta: "பல கன்டெய்னர்களை ஒன்றாக இயக்குதல்." },
    longDescription: { en: "Use a yaml file to define and run multi-container Docker applications.", ta: "YAML கோப்பினைப் பயன்படுத்தி பல கன்டெய்னர்களை ஒரே நேரத்தில் நிர்வகித்தல்." },
    codeExample: { language: "yaml", title: "docker-compose.yml example", content: "services:\n  web:\n    build: .\n  db:\n    image: postgres" }
  },
  "docker-healthchecks": {
    title: { en: "Docker Healthchecks", ta: "டாக்கர் ஹெல்த்செக்ஸ் (Healthchecks)" },
    description: { en: "Automatically monitoring container status.", ta: "கன்டெய்னர் ஆரோக்கியமாக உள்ளதா எனக் கண்காணித்தல்." },
    longDescription: { en: "The HEALTHCHECK instruction tells Docker how to test a container to check that it is still working.", ta: "கன்டெய்னர் சரியாக இயங்குகிறதா என டாக்கருக்குத் தெரியப்படுத்த ஹெல்த்செக் கட்டளை உதவுகிறது." },
    codeExample: { language: "dockerfile", title: "Healthcheck Example", content: "HEALTHCHECK CMD curl --fail http://localhost:3000 || exit 1" }
  },
  "scaling-containers": {
    title: { en: "Scaling with Docker", ta: "டாக்கரில் ஸ்கேலிங் (Scaling)" },
    description: { en: "Running multiple instances of a container.", ta: "ஒரு கன்டெய்னரின் பல நகல்களை (Replicas) இயக்குதல்." },
    longDescription: { en: "Scaling services horizontally to handle more traffic using Docker Compose or Swarm.", ta: "அதிக டிராஃபிக்கைக் கையாள ஒரே சேவையை பல இடங்களில் இயக்குவது எப்படி?" },
    codeExample: { language: "bash", title: "Scale with Compose", content: "docker-compose up --scale web=3" }
  },
  "docker-registry": {
    title: { en: "Docker Registry & Hub", ta: "டாக்கர் ரெஜிஸ்ட்ரி & ஹப்" },
    description: { en: "Pushing and pulling images.", ta: "இமேஜ்களை இணையத்தில் பதிவேற்றுதல் மற்றும் பதிவிறக்குதல்." },
    longDescription: { en: "Storing your custom images on Docker Hub or Private Registries (ECR/GCR).", ta: "நீங்கள் உருவாக்கிய இமேஜ்களை பாதுகாப்பாக இணையத்தில் தேமித்து வைப்பது எப்படி?" },
    codeExample: { language: "bash", title: "Push to Hub", content: "docker push myuser/myimage:v1" }
  },
  "docker-logging": {
    title: { en: "Docker Logging Drivers", ta: "டாக்கர் லாக்கிங் (Logging)" },
    description: { en: "Monitoring app logs in containers.", ta: "கன்டெய்னரில் உள்ள அப்ளிகேஷன் லாக்குகளைக் கண்காணித்தல்." },
    longDescription: { en: "Accessing logs with 'docker logs' and configuring drivers for ELK/splunk.", ta: "லாக்குகளைச் சரிபார்ப்பது மற்றும் அவற்றை மேம்பட்ட டூல்களுக்கு அனுப்புவது எப்படி?" },
    codeExample: { language: "bash", title: "View Logs", content: "docker logs -f container_id" }
  },
  "docker-best-practices-2": {
    title: { en: "Production Hardening", ta: "புரொடக்ஷன் ஹார்டனிங் (Hardening)" },
    description: { en: "Final checks before going live.", ta: "லைவ் செல்வதற்கு முன் செய்ய வேண்டிய கடைசி கட்டச் சோதனைகள்." },
    longDescription: { en: "Read-only file systems, memory limits, and CPU constraints.", ta: "மெமரி மற்றும் சிபியு பயன்பாட்டைக் கட்டுப்படுத்துதல் மற்றும் பாதுகாப்பை அதிகரித்தல்." },
    codeExample: { language: "bash", title: "Set Limits", content: "docker run --memory=\"512m\" --cpus=\"0.5\"" }
  },
  "advanced-scripting": {
    title: { en: "Advanced Scripting Patterns", ta: "மேம்பட்ட ஸ்கிரிப்டிங் முறைகள்" },
    description: { en: "Handling signals and errors in shell.", ta: "ஷெல் ஸ்கிரிப்டில் எரர்கள் மற்றும் சிக்னல்களைக் கையாளுதல்." },
    longDescription: { en: "Trap commands, error tracing with 'set -e', and dynamic arguments.", ta: "ஸ்கிரிப்ட் பாதியில் நின்றால் அல்லது தவறுகள் நடந்தால் அதனைத் தற்காத்துக் கொள்வது எப்படி?" },
    codeExample: { language: "bash", title: "Error Handling", content: "set -e\ntrap 'echo Failed!' ERR" }
  }
};
