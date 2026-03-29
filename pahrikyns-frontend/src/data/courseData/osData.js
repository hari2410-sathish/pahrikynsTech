export const osData = {
  "os-intro": {
    num: 1,
    title: { en: "Introduction to Operating Systems", ta: "இயக்க முறைமை (OS) அறிமுகம்" },
    description: { en: "The software that manages computer hardware and software resources.", ta: "கம்ப்யூட்டர் ஹார்டுவேர் மற்றும் மென்பொருளை நிர்வகிக்கும் தளம்." },
    longDescription: {
      en: "An Operating System (OS) acts as an intermediary between the user of a computer and the computer hardware. It manages CPU, memory, storage, and input/output devices.",
      ta: "இயக்க முறைமை (Operating System) என்பது பயனருக்கும் கம்ப்யூட்டர் ஹார்டுவேருக்கும் இடையே பாலமாகச் செயல்படும் ஒரு மென்பொருள். இது மெமரி, பிராசஸர் மற்றும் இதர கருவிகளை நிர்வகிக்கிறது."
    },
    videoUrl: "https://www.youtube.com/embed/26QPDBe-NB8",
    codeExample: { language: "bash", title: "Check OS Details", content: "uname -a\ncat /etc/os-release" }
  },
  "kernel-shell": {
    num: 2,
    title: { en: "Kernel & Shell Fundamentals", ta: "கர்னல் மற்றும் ஷெல் அடிப்படைகள்" },
    description: { en: "The core components of an operating system.", ta: "இயக்க முறைமையின் முக்கியப் பகுதிகள்." },
    longDescription: {
      en: "The Kernel is the heart of the OS that sits between the hardware and software. The Shell is the interface (CLI or GUI) used by the user to communicate with the kernel.",
      ta: "கர்னல் (Kernel) என்பது ஓஎஸ்-இன் இதயம் போன்றது. இது ஹார்டுவேருடன் நேரடியாகப் பேசும். ஷெல் (Shell) என்பது பயனர் கர்னலுடன் தொடர்பு கொள்ள உதவும் ஒரு வழியாகும்."
    },
    videoUrl: "https://www.youtube.com/embed/vBURTt9paEk",
    codeExample: { language: "bash", title: "Shell Interaction", content: "echo $SHELL\nps -p $$" }
  },
  "process-mgmt": {
    num: 3,
    title: { en: "Process Management", ta: "செயல்முறை மேலாண்மை (Process)" },
    description: { en: "How the OS handles multiple tasks at once.", ta: "கம்ப்யூட்டர் எப்படி பல வேலைகளை ஒரே நேரத்தில் செய்கிறது." },
    longDescription: {
      en: "A process is a program in execution. The OS manages process creation, execution, and termination. Concepts include PCB (Process Control Block) and Context Switching.",
      ta: "புரோகிராம் இயங்கும் போது அது ஒரு 'பிராசஸ்' (Process) என அழைக்கப்படும். ஓஎஸ் இந்த பிராசஸ்களை உருவாக்குவதையும் முடித்து வைப்பதையும் கவனித்துக் கொள்கிறது."
    },
    videoUrl: "https://www.youtube.com/embed/okGcqvEsJ9A",
    codeExample: { language: "bash", title: "Process Commands", content: "top\nps aux | grep node\nkill -9 [pid]" }
  },
  "cpu-scheduling": {
    num: 4,
    title: { en: "CPU Scheduling Algorithms", ta: "CPU திட்டமிடல் முறைகள்" },
    description: { en: "Deciding which process runs on the CPU next.", ta: "அடுத்ததாக எந்த வேலையைச் செய்வது எனத் தீர்மானித்தல்." },
    longDescription: {
      en: "CPU scheduling determines which process in the ready queue is allocated to the CPU. Algorithms include FCFS (First-Come, First-Served), Round Robin, and Priority Scheduling.",
      ta: "பல வேலைகள் வரிசையில் இருக்கும்போது, எதை முதலில் முடிப்பது என்று ஓஎஸ் தீர்மானிக்கும். இதற்கு ரவுண்ட் ராபின் (Round Robin) போன்ற பல முறைகள் பயன்படுத்தப்படுகின்றன."
    },
    videoUrl: "https://www.youtube.com/embed/okGcqvEsJ9A",
    codeExample: { language: "text", title: "Scheduling Examples", content: "Round Robin: Each process gets a fixed time slice (quantum).\nFCFS: First come first served basis." }
  },
  "memory-mgmt": {
    num: 5,
    title: { en: "Memory Management & Paging", ta: "மெமரி மேலாண்மை மற்றும் பேஜிங்" },
    description: { en: "Managing RAM and addressing processes.", ta: "கம்ப்யூட்டர் மெமரியை (RAM) திறமையாகப் பயன்படுத்துதல்." },
    longDescription: {
      en: "Memory management involves keeping track of every memory location. Paging is a technique to store and retrieve data from secondary storage for use in main memory.",
      ta: "ஓஎஸ் ஒவ்வொரு அப்ளிகேஷனுக்கும் எவ்வளவு ராம் (RAM) தேவை என்பதைத் தீர்மானிக்கிறது. பேஜிங் (Paging) மூலம் மெமரியைச் சிறு சிறு பகுதிகளாகப் பிரித்து நிர்வகிக்கும்."
    },
    videoUrl: "https://www.youtube.com/embed/vBURTt9paEk",
    codeExample: { language: "bash", title: "Check Memory Usage", content: "free -m\nvmstat 1" }
  },
  "virtual-memory": {
    num: 6,
    title: { en: "Virtual Memory & Swapping", ta: "விர்ச்சுவல் மெமரி மற்றும் ஸ்வாப்பிங்" },
    description: { en: "Using disk space as extra RAM.", ta: "ஹார்ட் டிஸ்க் இடத்தை ராம் போலப் பயன்படுத்துதல்." },
    longDescription: {
      en: "Virtual memory allows a computer to compensate for shortage of physical memory by temporarily transferring data from RAM to disk storage (swapping).",
      ta: "ராம் (RAM) முழுமையாக நிரம்பிவிடும் போது, ஹார்ட் டிஸ்கில் உள்ள ஒரு பகுதியை ராம் போலப் பயன்படுத்தி அப்ளிகேஷன்களைத் தொடர்ந்து இயங்க வைப்பதே விர்ச்சுவல் மெமரி."
    },
    videoUrl: "https://www.youtube.com/embed/vBURTt9paEk",
    codeExample: { language: "bash", title: "Swap Info", content: "swapon --show\ncat /proc/meminfo" }
  },
  "file-systems": {
    num: 7,
    title: { en: "File Systems (NTFS vs EXT4)", ta: "கோப்பு முறைமைகள் (File Systems)" },
    description: { en: "How data is organized and stored on disks.", ta: "கோப்புகள் எப்படி ஹார்டு டிஸ்கில் அடுக்கப்படுகின்றன." },
    longDescription: {
      en: "File systems manage how data is stored and retrieved. Common types include NTFS (Windows), EXT4 (Linux), and APFS (MacOS). They handle metadata, permissions, and indexing.",
      ta: "கோப்புகளைச் சேமிக்கவும் வகைப்படுத்தவும் ஓஎஸ் பயன்படுத்தும் முறை இது. விண்டோஸில் NTFS மற்றும் லினக்ஸில் EXT4 போன்ற வெவ்வேறு முறைகள் உள்ளன."
    },
    videoUrl: "https://www.youtube.com/embed/26QPDBe-NB8",
    codeExample: { language: "bash", title: "File System Utility", content: "df -Th\nlsblk" }
  },
  "permissions": {
    num: 8,
    title: { en: "Permissions & User Control", ta: "அனுமதிகள் மற்றும் பயனர் கட்டுப்பாடு" },
    description: { en: "Managing who can read, write, or execute files.", ta: "யார் எதைப் படிக்கலாம் அல்லது மாற்றி எழுதலாம் என்ற அனுமதி." },
    longDescription: {
      en: "OS security relies on file permissions. Each file has an owner and fixed permissions for users, groups, and others (Read, Write, Execute).",
      ta: "பாதுகாப்பிற்காக ஒவ்வொரு ஃபைலுக்கும் ஓஎஸ் அனுமதி வழங்கும். உதாரணமாக 755 என்பது முக்கியமான அனுமதி எண்ணாகும்."
    },
    videoUrl: "https://www.youtube.com/embed/vBURTt9paEk",
    codeExample: { language: "bash", title: "Change Permissions", content: "chmod 755 myscript.sh\nchown root:root secret.txt" }
  },
  "system-calls": {
    num: 9,
    title: { en: "System Calls & APIs", ta: "சிஸ்டம் கால்ஸ் (System Calls)" },
    description: { en: "How programs request services from the OS.", ta: "புரோகிராம்கள் எப்படி ஓஎஸ்-யிடம் உதவி கேட்கின்றன." },
    longDescription: {
      en: "A system call is a program's way to request a service from the kernel (e.g., reading a file, creating a process, or accessing the network).",
      ta: "ஒரு அப்ளிகேஷன் ஒரு ஃபைலைத் திறக்க வேண்டும் என்றால் அது ஓஎஸ்-க்கு ஒரு 'சிஸ்டம் கால்' அனுப்பும். இது கர்னலுடன் பேசும் வழியாகும்."
    },
    videoUrl: "https://www.youtube.com/embed/vBURTt9paEk",
    codeExample: { language: "c", title: "System Call Example (C)", content: "#include <unistd.h>\nwrite(1, \"Hello OS\", 8);" }
  },
  "deadlocks": {
    num: 10,
    title: { en: "Deadlocks & Starvation", ta: "டெட்லாக் (Deadlocks)" },
    description: { en: "When two processes get stuck waiting for each other.", ta: "இரண்டு வேலைகள் ஒன்றையொன்று எதிர்பார்த்து நின்று விடுதல்." },
    longDescription: {
      en: "A deadlock occurs when processes are waiting for each other to release resources, causing a permanent hang. Starvation is when a process never gets the resources it needs.",
      ta: "டெட்லாக் என்பது இரண்டு பிராசஸ்கள் ஒன்றின் வளத்தை மற்றொன்று எதிர்பார்த்துச் செயலிழந்து விடுவதாகும். இதைப் போக்குவரத்து நெரிசல் போல ஒப்பிடலாம்."
    },
    videoUrl: "https://www.youtube.com/embed/okGcqvEsJ9A"
  },
  "io-mgmt": {
    num: 11,
    title: { en: "I/O Management & Interrupts", ta: "I/O மேலாண்மை" },
    description: { en: "Managing input/output devices.", ta: "கருவிகளுடன் தகவல்களைப் பரிமாறிக் கொள்ளுதல்." },
    longDescription: { en: "I/O management involves managing user requests and hardware devices like mouse, keyboard, and printer.", ta: "மவுஸ் (Mouse), கீபோர்டு (Keyboard) போன்ற கருவிகளை ஓஎஸ் எப்படிக் கையாள்கிறது எனப் பார்ப்போம்." },
    videoUrl: "https://www.youtube.com/embed/vBURTt9paEk",
    codeExample: { language: "bash", title: "List USB Devices", content: "lsusb\nlspci" }
  },
  "linux-internals": {
    num: 12,
    title: { en: "Linux Kernel Internals", ta: "லினக்ஸ் கர்னல் அமைப்புகள்" },
    description: { en: "Architecture of the Linux kernel.", ta: "லினக்ஸ் ஓஎஸ்-இன் உள் கட்டமைப்பு." },
    longDescription: { en: "Linux uses a monolithic kernel architecture where all drivers and core services run in kernel space.", ta: "லினக்ஸ் கர்னலில் தகவல்களைச் சேமிக்கும் முறை பற்றியும், கோப்புகள் இயங்கும் விதம் பற்றியும் இதில் பார்ப்போம்." },
    videoUrl: "https://www.youtube.com/embed/vBURTt9paEk"
  },
  "windows-arch": {
    num: 13,
    title: { en: "Windows OS Architecture", ta: "விண்டோஸ் ஓஎஸ் கட்டமைப்பு" },
    description: { en: "Architecture of the Windows NT kernel.", ta: "விண்டோஸ் ஓஎஸ் எப்படி வேலை செய்கிறது." },
    longDescription: { en: "Windows NT is a micro-kernel hybrid where essential services run in kernel and user modes.", ta: "விண்டோஸ் என்டி (Windows NT) கர்னல் மற்றும் அதன் ஹைப்ரிட் கட்டமைப்பு பற்றி இதில் விரிவாகக் காண்போம்." },
    videoUrl: "https://www.youtube.com/embed/vBURTt9paEk"
  },
  "virtualization": {
    num: 14,
    title: { en: "Virtualization & Hypervisors", ta: "மெய்நிகராக்கம் (Virtualization)" },
    description: { en: "Running multiple OS layers on one machine.", ta: "ஒரே கணினியில் பல ஓஎஸ்-களை இயக்குதல்." },
    longDescription: { en: "Hypervisors allow one physical machine to run multiple virtual machines (VMs) independently.", ta: "ஹைப்பர்வைசர்கள் (Hypervisors) மூலம் ஒரே ஹார்டுவேரில் பல விர்ச்சுவல் மெஷின்களை எப்படி இயக்குவது எனப் பார்ப்போம்." },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng"
  },
  "containers-os": {
    num: 15,
    title: { en: "Containerization Concepts", ta: "கன்டெய்னர் அடிப்படைகள்" },
    description: { en: "Resource isolation using namespaces and cgroups.", ta: "ஐசோலேஷன் (Isolation) என்ற பாதுகாப்பு முறை." },
    longDescription: { en: "Containers use namespaces and control groups (cgroups) in the Linux kernel for lightweight separation.", ta: "டாக்கர் (Docker) போன்ற கன்டெய்னர்கள் ஓஎஸ்-இன் உதவியுடன் எப்படிச் சுதந்திரமாக இயங்குகின்றன எனப் பார்ப்போம்." },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng"
  },
  "distributed-os": {
    num: 16,
    title: { en: "Distributed Operating Systems", ta: "டிஸ்ட்ரிபியூட்டட் ஓஎஸ்" },
    description: { en: "Connecting multiple machines as one system.", ta: "பல கணினிகளை இணைத்து ஒரே அமைப்பாக மாற்றுதல்." },
    longDescription: { en: "A distributed OS allows multiple autonomous computers to appear as a single coherent system to the end-user.", ta: "உலகம் முழுவதும் இருக்கும் பல சர்வர்களை ஒன்றிணைத்து வேலை செய்யும் முறைகளை இதில் தெரிந்துகொள்ளுங்கள்." },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng"
  },
  "rtos": {
    num: 17,
    title: { en: "Real-time Operating Systems (RTOS)", ta: "ரியல்-டைம் ஓஎஸ் (RTOS)" },
    description: { en: "Fast and guaranteed response times.", ta: "அதிவேக மற்றும் துல்லியமாக இயங்கும் ஓஎஸ்." },
    longDescription: { en: "An RTOS is used for applications where processing must happen within strict time constraints (e.g., medical devices, robotics).", ta: "மருத்துவக் கருவிகள் மற்றும் விண்கலன்கள் போன்ற முக்கியமான வேலைகளுக்குப் பயன்படும் துல்லியமான ஓஎஸ்." },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng"
  },
  "os-security": {
    num: 18,
    title: { en: "OS Security & Hardening", ta: "ஓஎஸ் பாதுகாப்பு (Hardening)" },
    description: { en: "Securing the OS against threats.", ta: "ஓஎஸ்-ஐத் தாக்குதல்களிலிருந்து பாதுகாத்தல்." },
    longDescription: { en: "OS hardening involves disabling unused services, applying patches, and setting up strict firewall rules.", ta: "ஓஎஸ்-ஸில் உள்ள தேவையற்ற ஓட்டைகளை அடைத்து, அதைப் பாதுகாப்பாக வைக்கும் முறைகளைக் கற்றுக்கொள்ளுங்கள்." },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng"
  },
  "bootloaders": {
    num: 19,
    title: { en: "Bootloader: GRUB & UEFI", ta: "பூட்லோடர் (Bootloaders)" },
    description: { en: "How the computer starts up.", ta: "கம்ப்யூட்டர் எப்படித் தொடங்குகிறது." },
    longDescription: { en: "A bootloader is a small program that loads the OS kernel into memory during the startup process.", ta: "கம்ப்யூட்டர் ஆன் ஆனதும் ஓஎஸ்-ஐ மெமரிக்குள் ஏற்ற உதவும் பூட்லோடர் (GRUB) பற்றிப் பார்ப்போம்." },
    videoUrl: "https://www.youtube.com/embed/26QPDBe-NB8"
  },
  "troubleshooting": {
    num: 20,
    title: { en: "OS Troubleshooting", ta: "ஓஎஸ் பழுது நீக்கம் (Troubleshooting)" },
    description: { en: "Fixing common boot and kernel issues.", ta: "பொதுவான ஓஎஸ் பிழைகளைச் சரி செய்தல்." },
    longDescription: { en: "Learn how to use recovery modes, journal logs, and dmesg to fix system errors and blue screens.", ta: "ஏதாவது பிழை நடந்தால் லாக்குகளைப் (Logs) படித்து அதைச் சரி செய்யும் திறமையை வளர்த்துக் கொள்ளுங்கள்." },
    videoUrl: "https://www.youtube.com/embed/26QPDBe-NB8",
    codeExample: { language: "bash", title: "Logs for repair", content: "journalctl -p 3 -xb\ndmesg | tail -20" }
  }
};
