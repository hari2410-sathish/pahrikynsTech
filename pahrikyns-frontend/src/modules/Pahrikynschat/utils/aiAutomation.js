/**
 * High-Precision Expert AI Knowledge Base
 * Provides the 'Best Answer' for technical and career inquiries.
 */

const AI_EXPERT_KNOWLEDGE = {
  git: {
    patterns: ["git", "github", "commit", "push", "pull", "merge", "conflict"],
    bestAnswer: `
### 🐙 The Best Answer: Professional Git Workflow
To manage your code professionally, follow this industry-standard process:

1. **Isolation**: Always create a new branch for new work.
   \`git checkout -b feature/user-profile\`
2. **Atomic Commits**: Save small, logical chunks of work.
   \`git commit -m \"feat: add email validation to profile\"\`
3. **Collaboration**: Always pull before you push.
   \`git pull origin main --rebase\`
4. **Resolution**: If a merge conflict occurs, use VS Code's 'Merge Editor' to pick the best code.

**💡 Pro Tip**: Use \`git status\` constantly to see where your files are in the lifecycle.
    `
  },
  devops: {
    patterns: ["devops", "docker", "kubernetes", "jenkins", "cicd", "pipeline"],
    bestAnswer: `
### 🛠️ The Best Answer: Path to DevOps Mastery
DevOps is about **Automation (CI)** and **Deployment (CD)**. Here is your roadmap:

* **Containerization (Docker)**: Learn to package your apps so they run everywhere.
* **Orchestration (K8s)**: Manage hundreds of containers automatically.
* **Automation (Jenkins/GitHub Actions)**: Every time you push code, it should test and deploy itself.

**🎯 Next Challenge**: Try our 'Zero-Downtime Deployment' lab in the **Pahrikyns Lab Portal**.
    `
  },
  placement: {
    patterns: ["placement", "job", "interview", "hiring", "resume"],
    bestAnswer: `
### 🎓 The Best Answer: Landing Your Dream Tech Job
Our students have a **95% placement rate** because they follow this process:

1. **The Portfolio**: Build 3 real-world projects (not tutorials!) on GitHub.
2. **The Tech Stack**: Master one Full-Stack path (MERN or Python/Django).
3. **The Interview**: Practice LeetCode/DSA daily + conduct mock interviews in our 'Career Hub'.
4. **The Network**: We connect you directly with our 100+ hiring partners.

**🚀 Opportunity**: Check the 'Jobs' tab in your dashboard for new openings today!
    `
  },
  react: {
    patterns: ["react", "frontend", "hooks", "component", "state"],
    bestAnswer: `
### ⚛️ The Best Answer: Modern React Standards
When building at Pahrikyns, we follow 'Component-Driven Development':

* **Hooks Over Classes**: Always use \`useState\` and \`useEffect\`.
* **State Management**: Use React Context (like this Chat system!) for global state.
* **Styling**: Use Material UI or Tailwind for rapid, responsive design.

**Example Code:**
\`\`\`javascript
const [user, setUser] = useState(null);
useEffect(() => {
  // Global Auth Check
}, []);
\`\`\`
    `
  }
};

/**
 * Simulates an expert AI processing cycle.
 * @param {string} userMessage - The query from the user.
 * @returns {string} - The 'Best Answer' formatted for display.
 */
export const getAiResponse = async (userMessage) => {
  const msg = userMessage.toLowerCase();
  let foundCategory = null;

  for (const [key, category] of Object.entries(AI_EXPERT_KNOWLEDGE)) {
    if (category.patterns.some(p => msg.includes(p))) {
      foundCategory = category;
      break;
    }
  }

  const result = foundCategory 
    ? foundCategory.bestAnswer 
    : `### 🚀 Pahrikyns Assistant
I'm here to provide the **Best Answer** for your technical needs. Please specify if you are asking about:
* **Git/DevOps**
* **Full-Stack Development**
* **Placements & Internships**

What would you like to master today?`;

  // Simulating deep reasoning process
  const processTime = Math.min(1500 + (userMessage.length * 10), 3500);
  await new Promise(resolve => setTimeout(resolve, processTime));

  return result;
};
