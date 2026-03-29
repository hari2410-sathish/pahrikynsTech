export const gitData = {
  "git-intro": {
    num: 1,
    title: { en: "Introduction to Git & GitHub", ta: "ஜிட் மற்றும் கிட்ஹப் அறிமுகம்" },
    description: { en: "The foundations of version control systems.", ta: "பதிப்பு கட்டுப்பாட்டு அமைப்புகளின் அடிப்படை." },
    longDescription: {
      en: "Git is a distributed version control system that tracks changes in any set of computer files. GitHub is a provider of Internet hosting for software development and version control using Git.",
      ta: "ஜிட் (Git) என்பது கோப்புகளில் ஏற்படும் மாற்றங்களைக் கண்காணிக்க உதவும் ஒரு மென்பொருள். கிட்ஹப் (GitHub) என்பது ஜிட்டைக் கொண்டு உங்கள் கோப்புகளை இணையத்தில் சேமிக்க உதவும் ஒரு தளமாகும்."
    },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng",
    codeExample: { language: "bash", title: "Check Git Version", content: "git --version" }
  },
  "git-install": {
    num: 2,
    title: { en: "Git Installation & Config", ta: "ஜிட் நிறுவுதல் மற்றும் அமைத்தல்" },
    description: { en: "Setting up Git on Windows, Linux, and Mac.", ta: "விண்டோஸ் மற்றும் லினக்ஸ் கணினிகளில் ஜிட்டினை நிறுவுதல்." },
    longDescription: {
      en: "Learn how to install Git and configure your identity using 'git config' commands for name and email.",
      ta: "ஜிட்டினை நிறுவிய பின், உங்கள் பெயர் மற்றும் மின்னஞ்சலை ஜிட்டிற்குள் பதிவு செய்யும் முறையை இதில் காண்போம்."
    },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng",
    codeExample: { language: "bash", title: "Git Config", content: "git config --global user.name \"Your Name\"\ngit config --global user.email \"you@example.com\"" }
  },
  "git-workflow": {
    num: 3,
    title: { en: "Git Basic Workflow", ta: "ஜிட் அடிப்படை வேலைமுறை" },
    description: { en: "Add, Commit, and Status explained.", ta: "கோப்புகளைச் சேர்த்தல் மற்றும் சேமித்தல்." },
    longDescription: {
      en: "The standard workflow involves three stages: Working Directory, Staging Area, and Local Repository. Learn git add, git commit, and git status.",
      ta: "ஜிட்டின் மூன்று நிலைகள்: உங்கள் கணினி, ஸ்டேஜிங் பகுதி மற்றும் லோக்கல் ரெபாசிட்டரி. ஃபைல்களை எப்படி ஸ்டேஜ் செய்து கமிட் செய்வது எனப் பார்ப்போம்."
    },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng",
    codeExample: { language: "bash", title: "Workflow Commands", content: "git add file.txt\ngit status\ngit commit -m \"My first commit\"" }
  },
  "git-branching": {
    num: 4,
    title: { en: "Git Branching Basics", ta: "கிளைகள் (Branching) உருவாக்கம்" },
    description: { en: "Isolation features for parallel development.", ta: "ஒரே நேரத்தில் பல வேலைகளைச் செய்ய கிளைகளைப் பயன்படுத்துதல்." },
    longDescription: {
      en: "Branches allow you to work on new features without affecting the main code. Learn git branch, git checkout, and git switch.",
      ta: "மெயின் கோப்பை எவ்வித மாற்றமும் செய்யாமல் புதிய வேலைகளைச் செய்ய தனித்தனி கிளைகளை (Branches) ஜிட்டிற்குள் உருவாக்கலாம்."
    },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng",
    codeExample: { language: "bash", title: "Branching", content: "git branch feature-login\ngit checkout feature-login" }
  },
  "git-merging": {
    num: 5,
    title: { en: "Merging and Fast-Forward", ta: "மெர்ஜிங் (Merging) முறைகள்" },
    description: { en: "Combining changes from different branches.", ta: "பிரிந்த கிளைகளை மீண்டும் ஒன்று சேர்த்தல்." },
    longDescription: {
      en: "Merging is the process of putting the code back together. Learn about Fast-forward merges and 3-way merges.",
      ta: "புதிய வேலையை முடித்த பின், அந்தக் கிளையில் உள்ள கோப்புகளை மெயின் கிளையுடன் இணைப்பது எப்படி எனப் பார்ப்போம்."
    },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng",
    codeExample: { language: "bash", title: "Merge Move", content: "git checkout main\ngit merge feature-login" }
  },
  "git-remotes": {
    num: 6,
    title: { en: "Working with Remotes (Push/Pull)", ta: "ரிமோட் ரெபாசிட்டரி (GitHub)" },
    description: { en: "Connecting local code to GitHub.", ta: "உங்கள் குறியீட்டை கிட்ஹப்பில் பதிவேற்றுதல்." },
    longDescription: {
      en: "Connect your local repository to a remote server like GitHub using git remote, git push, and git pull.",
      ta: "உங்கள் கம்ப்யூட்டரில் உள்ள கோப்புகளை கிட்ஹப்பில் பதிவேற்றவும் (Push), அங்கிருந்து பதிவிறக்கவும் (Pull) கற்றுக்கொள்ளுங்கள்."
    },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng",
    codeExample: { language: "bash", title: "Remote Setup", content: "git remote add origin https://github.com/user/repo.git\ngit push -u origin main" }
  },
  "git-conflicts": {
    num: 7,
    title: { en: "Conflict Resolution", ta: "முரண்பாடுகளைச் சரி செய்தல்" },
    description: { en: "Handling code clashes between developers.", ta: "ஒரே வரியில் வேறு வேறு மாற்றங்கள் வரும்போது ஏற்படும் சிக்கல்." },
    longDescription: {
      en: "When two developers change the same line of code, a merge conflict occurs. Learn how to identify and resolve these issues.",
      ta: "ஒரே கோப்பில் இருவர் மாற்றங்களைச் செய்யும்போது ஏற்படும் சிக்கல்களை (Conflicts) எப்படி அடையாளம் கண்டு சரி செய்வது எனப் பார்ப்போம்."
    },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng",
    codeExample: { language: "text", title: "Conflict Markers", content: "<<<<<<< HEAD\nMy code\n=======\nTheir code\n>>>>>>> feature-x" }
  },
  "git-undoing": {
    num: 8,
    title: { en: "Undoing Changes", ta: "மாற்றங்களைத் திரும்பப் பெறுதல்" },
    description: { en: "Reset, Checkout, and Revert.", ta: "தவறுதலாகச் செய்த மாற்றங்களை நீக்குதல்." },
    longDescription: {
      en: "Git provides several ways to undo changes at different stages (working directory, staging, committed).",
      ta: "தவறுதலாக ஒரு வேலையைச் செய்துவிட்டால், லோக்கல் அல்லது கமிட் செய்த மாற்றங்களை எப்படித் திரும்பப் பெறுவது எனப் பார்ப்போம்."
    },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng",
    codeExample: { language: "bash", title: "Reset & Revert", content: "git reset --soft HEAD~1\ngit revert [commit_id]" }
  },
  "git-stash": {
    num: 9,
    title: { en: "Git Stash", ta: "ஜிட் ஸ்டாஷ் (Stash)" },
    description: { en: "Temporarily shelving uncommitted work.", ta: "பாதி முடித்த வேலையைத் தற்காலிகமாக மறைத்து வைத்தல்." },
    longDescription: {
      en: "Stashing allows you to save changes that are not ready to be committed so you can switch branches and work on something else.",
      ta: "ஒரு கிளையில் பாதி வேலை செய்திருக்கும் போது, அவசரமாக வேறு கிளைக்குச் செல்ல வேண்டியிருந்தால் அந்த மாற்றங்களைத் தற்காலிகமாகச் சேமிக்க ஸ்டாஷ் உதவும்."
    },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng",
    codeExample: { language: "bash", title: "Stash Moves", content: "git stash\ngit stash list\ngit stash pop" }
  },
  "git-ignore": {
    num: 10,
    title: { en: "Using .gitignore", ta: ".gitignore பயன்படுத்துதல்" },
    description: { en: "Excluding files from version control.", ta: "தேவையற்ற கோப்புகளை ஜிட்டிற்குள் வராமல் தடுத்தல்." },
    longDescription: {
      en: "The .gitignore file tells Git which files or directories to ignore. Useful for node_modules, log files, and secret keys.",
      ta: "பாஸ்வேர்டுகள் (Settings) மற்றும் தேவையற்ற கோப்புகள் ஜிட்டிற்குள் சென்று கிட்ஹப்பிற்குப் போகாமல் இருக்க .gitignore பயன்படுகிறது."
    },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng",
    codeExample: { language: "text", title: ".gitignore example", content: "node_modules/\n.env\n*.log" }
  },
  "git-reset-types": {
    num: 11,
    title: { en: "Git Resets: Soft, Mixed, Hard", ta: "ஜிட் ரீசெட் (Reset) வகைகள்" },
    description: { en: "The three types of reset and their usage.", ta: "பாதிப்பை ஏற்படுத்தும் மற்றும் ஏற்படுத்தாத ரீசெட்கள்." },
    longDescription: { en: "Learn how soft, mixed, and hard resets impact your staging area and working directory.", ta: "சாஃப்ட், மிக்ஸ்ட் மற்றும் ஹார்ட் ரீசெட்கள் ஜிட்டின் எந்தப் பகுதியில் வேலை செய்யும் எனப் பார்ப்போம்." },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng",
    codeExample: { language: "bash", title: "Hard Reset", content: "git reset --hard HEAD~1" }
  },
  "git-rebase": {
    num: 12,
    title: { en: "Git Rebase vs Merge", ta: "ஜிட் ரீபேஸ் (Rebase) vs மெர்ஜ்" },
    description: { en: "Keeping your history clean with rebase.", ta: "சுத்தமான ஹிஸ்டரியை (History) உருவாக்க ரீபேஸ்." },
    longDescription: { en: "Rebase allows you to rewrite branch history by applying commits on top of another base tip.", ta: "மெர்ஜை விட ஹிஸ்டரியைச் சுத்தமாக வைத்திருக்க ரீபேஸ் உதவும். இது மெயின் கிளையிலிருந்து மாற்றங்களைக் கொண்டு வரவும் உதவும்." },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng"
  },
  "git-cherry-pick": {
    num: 13,
    title: { en: "Git Cherry-pick", ta: "ஜிட் செர்ரி-பிக் (Cherry-pick)" },
    description: { en: "Appling specific commits to your branch.", ta: "சிறப்பித்த மாற்றங்களை மட்டும் கிளையிலிருந்து எடுத்தல்." },
    longDescription: { en: "Cherry-pick allows you to select a specific commit from one branch and apply it to another.", ta: "புதிய கிளையில் செய்த ஒரு கமிட்டை மட்டும் எடுத்து மெயின் கிளைக்குக் கொண்டு வர செர்ரி-பிக் உதவும்." },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng",
    codeExample: { language: "bash", title: "Cherry Pick", content: "git cherry-pick [commit_id]" }
  },
  "git-reflog": {
    num: 14,
    title: { en: "Git Reflog (Safety Net)", ta: "ஜிட் ரெஃலாக் (Reflog)" },
    description: { en: "Recovering lost commits and branches.", ta: "தொலைந்து போன கமிட்களைத் திரும்பப் பெறுதல்." },
    longDescription: { en: "Reflog records every movement of HEAD. Use this to recover from 'hard reset' or deleted branches.", ta: "ஜிட்டிற்குள் நீங்கள் செய்யும் ஒவ்வொரு அசைவும் ரெஃலாக்கில் பதிவாகும். ஹார்ட் ரீசெட் செய்து தவறுகளைச் செய்தாலும் இதற்குள் சென்று மீட்கலாம்." },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng",
    codeExample: { language: "bash", title: "Show Reflog", content: "git reflog" }
  },
  "git-tags": {
    num: 15,
    title: { en: "Git Tags & Releases", ta: "ஜிட் டேக்ஸ் (Tags)" },
    description: { en: "Marking specific points in history as releases.", ta: "முக்கியமான கமிட்களைப் பெயரிட்டுச் சேமித்தல்." },
    longDescription: { en: "Tags are used to label specific release versions (v1.0, v2.0) of your software.", ta: "மென்பொருளின் ஒவ்வொரு பெரிய வெர்ஷனை (v1.0, v2.0) மார்க் செய்ய டேக்ஸ் (Tags) பயன்படும்." },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng",
    codeExample: { language: "bash", title: "Tagging", content: "git tag -a v1.0 -m \"First release\"\ngit push origin v1.0" }
  },
  "git-fetch-pull": {
    num: 16,
    title: { en: "Fetch vs Pull", ta: "ஃபெட்ச் (Fetch) vs புல் (Pull)" },
    description: { en: "Difference between getting and merging remote changes.", ta: "கிட்ஹப்பிலிருந்து தகவல்களை எடுக்க இரு வழிகள்." },
    longDescription: { en: "Fetch gets remote metadata. Pull gets metadata AND merges it into your local branch.", ta: "ஃபெட்ச் (Fetch) என்பது கிட்ஹப்பிலுள்ள பெயர்களை மட்டும் வாசிக்கும். புல் (Pull) என்பது தகவல்களை எடுத்து உடனேயே மெர்ஜ் (Merge) செய்யும்." },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng"
  },
  "git-best-practices": {
    num: 17,
    title: { en: "Git Best Practices", ta: "ஜிட் சிறந்த வழிமுறைகள்" },
    description: { en: "Writing good commit messages and small PRs.", ta: "ஜிட்டினைச் சரியாகப் பயன்படுத்தும் பழக்கங்கள்." },
    longDescription: { en: "Small commits, clear messages, pull early and often, and use feature branches.", ta: "குறுகிய கமிட்கள், தெளிவான மெசேஜ்கள் மற்றும் அவசரமாகத் தகவல்களைப் பரிமாறிக் கொள்வது எனச் சிறந்த வழிமுறைகளைப் பார்ப்போம்." },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng"
  },
  "git-submodules": {
    num: 18,
    title: { en: "Git Submodules", ta: "ஜிட் சப்-மாடியூல்ஸ் (Submodules)" },
    description: { en: "Repositories within repositories.", ta: "புராஜெக்டிற்குள் மற்றொரு புராஜெக்டைச் சேர்த்தல்." },
    longDescription: { en: "Allows you to keep another Git repository as a subdirectory of your repository.", ta: "மற்றொரு கிட் புராஜெக்டை உங்கள் புராஜெக்டிற்குள் ஒரு பகுதியாக வைத்திருக்க இது உதவும்." },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng",
    codeExample: { language: "bash", title: "Add Submodule", content: "git submodule add https://github.com/user/lib.git" }
  },
  "github-prs": {
    num: 19,
    title: { en: "Pull Requests & Review", ta: "புல் ரிக்வெஸ்ட் மற்றும் ரிவியூ" },
    description: { en: "Collaborating with teams on GitHub.", ta: "மற்றவர்களுடன் டீமாக வேலை செய்யும் முறை." },
    longDescription: { en: "Opening a Pull Request (PR) is how you propose changes on GitHub and start a code review.", ta: "கிட்ஹப்பில் ஒரு வேலையை முடித்த பின் டீம் லீடரிடம் அனுமதி கேட்க புல் ரிக்வெஸ்ட் (Pull Request) உதவும்." },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng"
  },
  "git-bisect": {
    num: 20,
    title: { en: "Git Bisect (Debugging)", ta: "ஜிட் பைசெக்ட் (Bisect)" },
    description: { en: "Finding which commit introduced a bug.", ta: "எந்த மாற்றத்தால் சாப்ட்வேர் பழுதானது எனக் கண்டுபிடித்தல்." },
    longDescription: { en: "Git bisect uses binary search to find the commit that introduced a bug into project history.", ta: "பைனரி சர்ச் மூலம் பழைய கமிட்களில் ஆய்வு செய்து எந்தக் கமிட்டில் தவறு நடந்தது எனக் கண்டுபிடிக்கும்." },
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng",
    codeExample: { language: "bash", title: "Bisect Start", content: "git bisect start\ngit bisect bad\ngit bisect good [commit_id]" }
  }
};
