const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.enhanceResumeText = async (req, res) => {
  try {
    const { text, type } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    // Check if user is PRO
    // Note: We use auth middleware, so req.user is available
    const prisma = require("../config/prismaClient");
    const user = req.user;
    
    const subscription = await prisma.subscription.findUnique({
      where: { userId: user.id }
    });

    if (subscription?.status !== "ACTIVE" && user.role !== "admin") {
      return res.status(403).json({ error: "PRO Subscription required for AI features." });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    let instruction = "";
    if (type === "summary") {
      instruction = "Rewrite the following professional summary for a resume. Make it highly impactful, engaging, and action-oriented. Keep it concise (3-4 sentences max). Do not add intro text.";
    } else if (type === "experience") {
      instruction = "Rewrite the following work experience description for a resume. Use strong action verbs, quantify achievements if possible, and structure it professionally. Do not add intro text.";
    } else if (type === "project") {
      instruction = "Rewrite the following project description for a resume. Focus on the technical impact, problem-solving, and clean structure. Do not add intro text.";
    } else {
      instruction = "Rewrite the following text for a professional resume to make it sound more impactful and action-oriented. Do not add intro text.";
    }

    const prompt = `${instruction}\n\nOriginal Text:\n"${text}"\n\nEnhanced Text:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let enhancedText = response.text().trim();
    
    // Remove markdown formatting if present
    enhancedText = enhancedText.replace(/\*\*/g, "").replace(/\*/g, "-");

    res.json({ enhancedText });
  } catch (err) {
    console.error("AI Enhance Error:", err);
    res.status(500).json({ error: "Failed to enhance text using AI." });
  }
};

exports.generateFullResume = async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const prisma = require("../config/prismaClient");
    const user = req.user;
    
    const subscription = await prisma.subscription.findUnique({
      where: { userId: user.id }
    });

    if (subscription?.status !== "ACTIVE" && user.role !== "admin") {
      return res.status(403).json({ error: "PRO Subscription required for AI features." });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // Use flash for speed, with JSON response type
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      }
    });

    const instruction = `
You are an expert resume writer. Generate a complete, highly professional resume based on the following user prompt.
Output strictly as a JSON object with this exact structure:
{
  "personal": { "name": "...", "title": "...", "email": "...", "phone": "...", "location": "...", "summary": "..." },
  "experience": [ { "id": 1, "role": "...", "company": "...", "start": "...", "end": "...", "description": "..." } ],
  "projects": [ { "id": 1, "title": "...", "tech": "...", "description": "...", "link": "..." } ],
  "skills": ["skill1", "skill2", "..."]
}
Make up realistic details, dates, and impactful descriptions if the user prompt lacks them.
    
User Prompt:
"${prompt}"
`;

    const result = await model.generateContent(instruction);
    const responseText = result.response.text();
    const resumeData = JSON.parse(responseText);

    res.json({ resumeData });
  } catch (err) {
    console.error("AI Generate Full Resume Error:", err);
    res.status(500).json({ error: "Failed to generate resume using AI." });
  }
};
