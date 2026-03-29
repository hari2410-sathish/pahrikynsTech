export const devopsData = {
  "devops-intro": {
    num: 1,
    title: { en: "DevOps Introduction & Culture", ta: "தேவொப்ஸ் (DevOps) அறிமுகம்" },
    description: { en: "The bridge between development and operations teams.", ta: "சாப்ட்வேர் உருவாக்குபவர்கள் மற்றும் அதை நிர்வகிப்பவர்களுக்கு இடையிலான பாலம்." },
    longDescription: {
      en: "DevOps is not a tool, it's a culture and set of practices that combine software development (Dev) and IT operations (Ops). It aims to shorten the systems development life cycle and provide continuous delivery.",
      ta: "தேவொப்ஸ் (DevOps) என்பது ஒரு கருவி அல்ல, அது ஒரு கலாச்சாரம். இது புரோகிராமர்களும் (Dev) சிஸ்டம் அட்மின்களும் (Ops) இணைந்து வேலை செய்யும் முறையைக் குறிக்கும்."
    },
    videoUrl: "https://www.youtube.com/embed/9pZ2xmsSDdo",
    codeExample: { language: "text", title: "DevOps Lifecycle", content: "Plan -> Code -> Build -> Test -> Release -> Deploy -> Operate -> Monitor" }
  },
  "cicd-overview": {
    num: 2,
    title: { en: "CI/CD Pipeline Mastery", ta: "CI/CD பைப்லைன் மாஸ்டரி" },
    description: { en: "Continuous Integration and Continuous Deployment.", ta: "தொடர்ச்சியான ஒருங்கிணைப்பு மற்றும் விநியோகம்." },
    longDescription: {
      en: "CI/CD is the backbone of DevOps. Continuous Integration (CI) is the practice of merging code into a shared repository frequently. Continuous Deployment (CD) automates the delivery of code to production.",
      ta: "CI/CD என்பது தேவொப்ஸ்-இன் முதுகெலும்பு போன்றது. ஒவ்வொரு முறை கோடை மாற்றும்போதும் அது தானாகவே சோதிக்கப்பட்டு (Test) சர்வரில் ஏற்றப்படுவதை இது உறுதி செய்யும்."
    },
    videoUrl: "https://www.youtube.com/embed/9pZ2xmsSDdo",
    codeExample: { language: "yaml", title: "Simple Pipeline Step", content: "stages:\n  - build\n  - test\n  - deploy" }
  },
  "jenkins-basics": {
    num: 3,
    title: { en: "Jenkins: The Automation King", ta: "ஜென்கின்ஸ் (Jenkins) Grundlagen" },
    description: { en: "The most popular open-source automation server.", ta: "மிகவும் பிரபலமான ஓப்பன் சோர்ஸ் ஆட்டோமேஷன் சர்வர்." },
    longDescription: {
      en: "Jenkins provides hundreds of plugins to support building, deploying, and automating any project. Learn how to set up jobs, triggers, and managed slaves.",
      ta: "ஜென்கின்ஸ் என்பது பல்லாயிரக்கணக்கான பிளக்கின்களைக் கொண்ட ஒரு கருவி. இது உங்கள் புராஜெக்டைத் தானாகவே பில்ட் (Build) செய்து சர்வரில் ஏற்ற உதவும்."
    },
    videoUrl: "https://www.youtube.com/embed/9pZ2xmsSDdo",
    codeExample: { language: "bash", title: "Jenkins Run", content: "java -jar jenkins.war --httpPort=8080" }
  },
  "jenkins-pipeline": {
    num: 4,
    title: { en: "Jenkins Pipeline (Groovy)", ta: "ஜென்கின்ஸ் பைப்லைன்" },
    description: { en: "Writing pipelines as code using Groovy script.", ta: "கோட் (Code) மூலமாக பைப்லைன்களை உருவாக்குதல்." },
    longDescription: {
      en: "Instead of clicking buttons in the UI, we write 'Jenkinsfile' to define the build process. This allows your build logic to be version-controlled like normal code.",
      ta: "UI-ல் மாற்றங்கள் செய்யாமல், ஒரு கோப்பு (Jenkinsfile) மூலமாக மொத்த வேலையையும் சொல்லிக் கொடுப்பதுதான் பைப்லைன் ஆஸ் கோட் (Pipeline as Code)."
    },
    videoUrl: "https://www.youtube.com/embed/9pZ2xmsSDdo",
    codeExample: { language: "groovy", title: "Jenkinsfile Snippet", content: "pipeline {\n  agent any\n  stages {\n    stage('Build') { steps { echo 'Building...' } }\n  }\n}" }
  },
  "github-actions": {
    num: 5,
    title: { en: "GitHub Actions", ta: "கிட்ஹப் ஆக்ஷன்ஸ் (GitHub Actions)" },
    description: { en: "Automate your workflow directly in GitHub.", ta: "கிட்ஹப்பிலேயே உங்கள் வேலைகளைத் தானியங்கி செய்தல்." },
    longDescription: {
      en: "GitHub Actions makes it easy to automate all your software workflows, now with world-class CI/CD. Build, test, and deploy your code right from GitHub.",
      ta: "கிட்ஹப் ஆக்ஷன்ஸ் என்பது கிட்ஹப் தளத்திலேயே கொடுக்கப்பட்டுள்ள ஒரு வசதி. இதன் மூலம் கோட் அப்லோட் ஆனதும் அது தானாகவே சர்வர் செல்வதை உறுதி செய்யலாம்."
    },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng",
    codeExample: { language: "yaml", title: "GitHub Workflow", content: "on: [push]\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v2" }
  },
  "iac-terraform": {
    num: 6,
    title: { en: "Infrastructure as Code (Terraform)", ta: "உள்கட்டமைப்பு மற்றும் டெராஃபார்ம்" },
    description: { en: "Managing servers and cloud resources using code.", ta: "சர்வர்களைக் கோடுகள் (Code) மூலமாக நிர்வகித்தல்." },
    longDescription: {
      en: "Terraform is an open-source infrastructure as code tool that allows you to define and provide data center infrastructure using a declarative configuration language (HCL).",
      ta: "டெராஃபார்ம் (Terraform) என்பது கிளவுட் சர்வர்களைத் தானாகவே உருவாக்க உதவும் கருவி. கைமுறையாக மவுஸ் கிளிக் செய்யாமல் கோடு எழுதி ஆயிரக்கணக்கான சர்வர்களை நொடியில் உருவாக்கலாம்."
    },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng",
    codeExample: { language: "hcl", title: "Terraform Resource", content: "resource \"aws_instance\" \"my_server\" {\n  ami = \"ami-12345\"\n  instance_type = \"t2.micro\"\n}" }
  },
  "ansible-basics": {
    num: 7,
    title: { en: "Ansible Configuration Management", ta: "ஆன்சிபில் (Ansible) மேலாண்மை" },
    description: { en: "Automating software installation and server config.", ta: "சர்வர்களில் சாஃப்ட்வேர்களைத் தானாக நிறுவுதல்." },
    longDescription: {
      en: "Ansible is an agentless automation tool. It uses Playbooks written in YAML to configure servers, install software, and manage updates across hundreds of machines simultaneously.",
      ta: "ஆன்சிபில் (Ansible) என்பது பல சர்வர்களில் ஒரே நேரத்தில் வேலைகளைச் செய்ய உதவும். உதாரணமாக, 100 சர்வர்களில் ஒரே நேரத்தில் கூகுள் குரோம் இன்ஸ்டால் செய்ய இது பயன்படும்."
    },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng",
    codeExample: { language: "yaml", title: "Ansible Playbook", content: "- name: Install NGINX\n  hosts: webservers\n  tasks:\n    - apt: name=nginx state=latest" }
  },
  "monitoring-prometheus": {
    num: 8,
    title: { en: "Monitoring with Prometheus", ta: "மானிட்டரிங் (Prometheus)" },
    description: { en: "Recording real-time metrics in a time-series database.", ta: "சர்வர் செயல்பாடுகளைக் கண்காணித்தல்." },
    longDescription: {
      en: "Prometheus is an open-source system monitoring and alerting toolkit. It collects and stores its metrics as time-series data.",
      ta: "புரோமிதியஸ் (Prometheus) என்பது சர்வர் எவ்வளவு சூடாகிறது, எவ்வளவு லோட் எடுக்கிறது என்பதைக் கண்காணித்துத் தகவல்களை அளிக்கும் ஒரு கருவி."
    },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng",
    codeExample: { language: "yaml", title: "Prometheus Config", content: "scrape_configs:\n  - job_name: 'node_exporter'\n    static_configs: [{ targets: ['localhost:9100'] }]" }
  },
  "grafana-dashboards": {
    num: 9,
    title: { en: "Grafana Visualization", ta: "கிராபனா (Grafana) டேஷ்போர்டு" },
    description: { en: "The open observability platform for everyone.", ta: "தகவல்களை வரைபடங்களாகக் காட்டும் தளம்." },
    longDescription: {
      en: "Grafana allows you to query, visualize, alert on, and understand your metrics no matter where they are stored. It works perfectly with Prometheus.",
      ta: "கிராபனா (Grafana) என்பது புரோமிதியஸ் தரும் தகவல்களை அழகான சார்ட்களாகவும் (Charts) வரைபடங்களாகவும் காட்ட உதவும். இதைப் பார்த்தே சர்வர் நிலையைக் கூறிவிடலாம்."
    },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng",
    codeExample: { language: "text", title: "Dashboards", content: "CPU Usage % | Memory Usage | Disk I/O | Network Latency" }
  },
  "elk-stack": {
    num: 10,
    title: { en: "ELK Stack (Logging)", ta: "இ-எல்-கே (ELK) லாகிங்" },
    description: { en: "Elasticsearch, Logstash, and Kibana for log analysis.", ta: "பதிவுகளைச் சேமித்து ஆராய உதவும் மூன்று கருவிகள்." },
    longDescription: {
      en: "The ELK stack is used to search, analyze, and visualize log data in real time from any source and in any format.",
      ta: "ELK ஸ்டாக் என்பது சர்வர்களில் நடக்கும் ஒவ்வொரு செயலையும் பதிவாகச் (Logs) சேமித்து, அதில் ஏதாவது பிழை இருந்தால் தேடிக்கண்டுபிடிக்க உதவும்."
    },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng"
  },
  "gitlab-ci": {
    num: 11,
    title: { en: "GitLab CI Pipelines", ta: "கிட்லேப் சிஐ (GitLab CI)" },
    description: { en: "YAML based build pipelines in GitLab.", ta: "கிட்லேப்பில் தானாக இயங்கும் வேலைப்பாடுகள்." },
    longDescription: { en: "Learn how to use .gitlab-ci.yml to automate your software builds and integration tasks within GitLab.", ta: "கிட்லேப் (GitLab) தளத்தில் பைப்லைன்களை அமைப்பது எப்படி எனப் பார்ப்போம்." },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng",
    codeExample: { language: "yaml", title: "GitLab CI", content: "build-job:\n  stage: build\n  script: echo \"Building...\"" }
  },
  "sonarqube": {
    num: 12,
    title: { en: "SonarQube & Code Quality", ta: "சோனார்க்யூப் (SonarQube)" },
    description: { en: "Static code analysis for security and bugs.", ta: "பிழைகளைக் கோடை ஆராய்ந்து கண்டுபிடிக்கும் முறை." },
    longDescription: { en: "Automatically audit your code for security vulnerabilities and code smells with SonarQube dashboards.", ta: "சோனார்க்யூப் (SonarQube) மூலம் கோடில் உள்ள பிழைகளையும் பாதுகாப்பு ஓட்டைகளையும் தானாகக் கண்டறியலாம்." },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng"
  },
  "artifacts": {
    num: 13,
    title: { en: "Artifact Management (Nexus)", ta: "ஆர்ட்டிஃபாக்ட் (Nexus)" },
    description: { en: "Storing binary artifacts safely.", ta: "உருவாக்கிய அப்ளிகேஷன்களைப் பாதுகாப்பாகச் சேமித்தல்." },
    longDescription: { en: "Use Sonatype Nexus or JFrog Artifactory to manage and version your binary packages.", ta: "நெக்ஸஸ் (Nexus) என்பது உருவாக்கப்பட்ட மென்பொருளை (exe/jar/war) பாதுகாப்பாக வெர்ஷனிங் செய்து வைக்க உதவும் ஒரு கி கிடங்காகும்." },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng"
  },
  "tf-modules": {
    num: 14,
    title: { en: "Terraform Modules & State", ta: "டெராஃபார்ம் மாடியூல்ஸ் மற்றும் ஸ்டேட்" },
    description: { en: "Organizing infrastructure code for reuse.", ta: "திரும்பத் திரும்ப எழுத வேண்டிய அவசியமில்லாமல் பிரித்தல்." },
    longDescription: { en: "Advanced Terraform: organize components using modules and manage state files in cloud buckets (S3/GCS).", ta: "டெராஃபார்ம் மூலம் பிரிக்கப்பட்ட மாடியூல்கள் மற்றும் அதன் தற்போதைய நிலைகளைப் (State File) பாதுகாப்பது பற்றிப் பார்ப்போம்." },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng"
  },
  "ansible-roles": {
    num: 15,
    title: { en: "Ansible Roles & Automation", ta: "ஆன்சிபில் ரோல்ஸ் (Roles)" },
    description: { en: "Using Roles to structuralize configs.", ta: "ஆட்டோமேஷனைத் திறம்பட ஒழுங்கமைத்தல்." },
    longDescription: { en: "Break down complex playbooks into modular, reusable components using Ansible Roles and include community content from Galaxy.", ta: "ஆன்சிபில் என்பது பெரிய வேலைகளைச் சிறிய மாக்ஸூல்களாகப் பிரித்துச் செய்யும் திறன் கொண்டது." },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng"
  },
  "sre-basics": {
    num: 16,
    title: { en: "SRE (Site Reliability Engineering)", ta: "எஸ்-ஆர்-இ (SRE) அடிப்படைகள்" },
    description: { en: "The engineering approach to operations.", ta: "நிறுவனத்தை நிலைகுலையாமல் காக்கும் பொறியியல்." },
    longDescription: { en: "SRE focus on automation, monitoring, incident response and system reliability through engineering solutions.", ta: "மென்பொருள் எப்போதும் இயங்குவதை உறுதி செய்யும் எஸ்ஆரி (SRE) பற்றியும் அதன் முறைகள் பற்றியும் இதில் காண்போம்." },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng"
  },
  "devsecops": {
    num: 17,
    title: { en: "DevSecOps (Pipeline Security)", ta: "டெவ்செக்ஆப்ஸ் (DevSecOps)" },
    description: { en: "Integrating security scans into CI/CD.", ta: "பாதுகாப்பையும் ஆட்டோமேஷுடன் இணைத்தல்." },
    longDescription: { en: "Shift-left approach: scan for vulnerabilities early in the software development lifecycle.", ta: "பாதுகாப்பைத் தொடக்கம் முதலே கோடில் எப்படிக் கொண்டு வருவது என்பதுதான் டெவ்செக்ஆப்ஸ் (DevSecOps)." },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng"
  },
  "kubernetes-helm": {
    num: 18,
    title: { en: "Kubernetes with Helm", ta: "குபெர்னெட்டீஸ் மற்றும் ஹெல்ம் (Helm)" },
    description: { en: "Managing K8s applications with charts.", ta: "குபெர்னெட்டீஸ் அப்ளிகேஷன்களை எளிதாக நிர்வகித்தல்." },
    longDescription: { en: "Helm is the package manager for Kubernetes. Use Helm charts to package and deploy complex K8s apps easily.", ta: "ஹெல்ம் (Helm) என்பது குபெர்னெட்டீஸ்-க்கான பேக்கேஜ் மேனேஜர் ஆகும். இது அப்ளிகேஷன்களைத் திறமையாக மேலாண்மை செய்யும்." },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng"
  },
  "argocd-gitops": {
    num: 19,
    title: { en: "ArgoCD & GitOps", ta: "ஆர்கோ-சிடி (GitOps)" },
    description: { en: "Declarative continuous delivery for Kubernetes.", ta: "குபெர்னெட்டீஸ் வேலைப்பளுவைக் தானாகச் சரி செய்தல்." },
    longDescription: { en: "ArgoCD follows GitOps pattern where Git is the single source of truth for the desired system state.", ta: "கிட்ஹப்பில் (Git) மாற்றங்கள் வரும்போது அதை ஆட்டோமேட்டிக்காக குபெர்னெட்டீஸ் சர்வர் உணர்ந்து கொள்ள ArgoCD உதவும்." },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng"
  },
  "best-practices": {
    num: 20,
    title: { en: "DevOps Best Practices", ta: "சிறந்த தேவொப்ஸ் வழிமுறைகள்" },
    description: { en: "Scaling DevOps across large enterprises.", ta: "பெரிய நிறுவனங்களில் தேவொப்ஸ்-ஐச் செயல்படுத்தும் முறை." },
    longDescription: { en: "Zero-downtime deployments, blue-green strategy, and canary releases to minimize risks.", ta: "சர்வர் டவுன் டைம் (Downtime) இல்லாமல் வேலையைச் செய்வது எப்படி? புளூ-கிரீன் மற்றும் கேனரி ரிலீஸ் பற்றி இதில் காண்போம்." },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng"
  }
};
