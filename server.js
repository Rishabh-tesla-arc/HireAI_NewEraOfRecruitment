import express from "express";
import cors from "cors";
import pg from "pg";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { exec } from "child_process";
import multer from "multer";
import path from "path";
import fs from "fs";
import process from "process";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), 'uploads');

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('Only PDF files are allowed'), false);
    }
    cb(null, true);
  },
  limits: {
    fileSize: 5 * 1024 * 1024 
  }
});

const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

const SECRET_KEY = process.env.JWT_SECRET || "379c20c5c229ac32d61e420e7b628cc9197d2e02015b93600b81641230a8f300645aecabac723277cef186e03ce71ff2e8eb8c01ab5be9a73d126e86566d5d52"; // Secure key from .env


app.post("/api/auth/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
      [name, email, hashedPassword]
    );

    const user = result.rows[0];
    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (result.rows.length === 0) return res.status(401).json({ message: "User not found" });

    const user = result.rows[0];
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ user: { id: user.id, name: user.name, email: user.email }, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get("/api/auth/user", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ user: decoded });
  } catch (err) {
    console.error("Token verification failed:", err.message);
    res.status(401).json({ message: "Invalid token" });
  }
});


app.post("/api/job-compatibility", upload.single('resume'), (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({ error: "Resume file is required" });
    }
    
    if (!req.body.jobDescription) {

      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: "Job description is required" });
    }

    const resumePath = req.file.path;
    const jobDescription = req.body.jobDescription;
    
    const escapedJobDescription = jobDescription.replace(/"/g, '\\"');
    

    exec(`python resumeParser.py "${resumePath}" "${escapedJobDescription}"`, (error, stdout, stderr) => {

      fs.unlinkSync(resumePath);
      
      if (error) {
        console.error(`Error: ${error.message}`);
        return res.status(500).json({ error: "Failed to analyze job compatibility" });
      }
      
      if (stderr) {
        console.error(`stderr: ${stderr}`);
      }
      
      try {
        const result = JSON.parse(stdout);
        return res.json(result);
      } catch (parseError) {
        console.error(`Parse error: ${parseError.message}`);
        console.error(`Raw output: ${stdout}`);
        return res.status(500).json({ error: "Failed to parse analysis results" });
      }
    });
  } catch (error) {
    console.error(`Exception: ${error.message}`);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// AI Assessment endpoint
app.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }
    
    // Mock AI generation 
    const mockResponses = {
      "software engineer": `1. What is your experience with object-oriented programming?
   - Look for understanding of classes, inheritance, polymorphism, encapsulation
   - Candidate should provide specific examples from previous work

2. Explain the difference between a stack and a queue
   - Stack: LIFO (Last In First Out) data structure
   - Queue: FIFO (First In First Out) data structure
   - Candidate should explain use cases for each

3. How do you approach debugging a complex issue?
   - Look for systematic approach (isolating the problem, reproducing it, etc.)
   - Candidate should mention debugging tools they're familiar with

4. Describe a situation where you had to optimize code for performance
   - Look for understanding of performance bottlenecks
   - Candidate should explain their methodology and results

5. How do you handle code reviews?
   - Look for collaborative attitude
   - Candidate should mention how they give and receive feedback

6. Explain RESTful API principles
   - Statelessness, client-server architecture, cacheability
   - Proper use of HTTP methods (GET, POST, PUT, DELETE)

7. How do you stay updated with new technologies?
   - Look for continuous learning habits
   - Candidate should mention specific resources they use

8. Describe your experience with version control systems
   - Look for Git workflow knowledge
   - Understanding of branching strategies, merge conflicts resolution

9. How would you implement error handling in a web application?
   - Look for understanding of try-catch blocks, error logging
   - Knowledge of graceful degradation and user-friendly error messages

10. Tell me about a challenging project you worked on
    - Look for problem-solving ability and technical depth
    - Candidate should explain their specific contributions and learnings`,
      
      "data scientist": `1. How would you explain the difference between supervised and unsupervised learning?
   - Supervised: Learning with labeled data, prediction-focused
   - Unsupervised: Learning without labels, pattern discovery
   
2. Explain the bias-variance tradeoff
   - Bias: Simplifying assumptions, underfitting
   - Variance: Sensitivity to training data, overfitting
   - Need to balance both for optimal model performance

3. How do you handle missing data?
   - Look for multiple approaches: imputation, deletion, dedicated missing value category
   - Understanding when each approach is appropriate

4. Describe your experience with feature engineering
   - Creating new features from existing data
   - Scaling, normalization, encoding categorical variables
   - Domain knowledge application

5. What metrics would you use to evaluate a classification model?
   - Accuracy, precision, recall, F1-score, ROC AUC
   - Understanding when each metric is appropriate (e.g., imbalanced classes)

6. How would you explain a complex model to non-technical stakeholders?
   - Focus on simplifying technical concepts
   - Use of visualizations, analogies, and business impact

7. Describe your experience with deep learning
   - Understanding of neural networks, training process
   - Experience with frameworks like TensorFlow or PyTorch

8. How do you approach A/B testing?
   - Experiment design, hypothesis formulation
   - Sample size determination, statistical significance
   - Result interpretation and decision making

9. How do you ensure your data analysis is reproducible?
   - Version control for code and data
   - Documentation, dependency management
   - Use of notebooks or reports

10. Describe a data project where your insights led to meaningful business impact
    - Problem definition, methodology, challenges overcome
    - Quantifiable business results and learnings`,
      
      "product manager": `1. How do you prioritize features in a product roadmap?
   - Framework usage (e.g., RICE, MoSCoW, Impact/Effort matrix)
   - Balancing stakeholder needs with technical constraints
   - Data-driven decision making

2. How do you gather and incorporate user feedback?
   - Multiple channels: user interviews, surveys, analytics
   - Qualitative vs. quantitative feedback handling
   - Validation and prioritization process

3. Describe your experience with agile development methodologies
   - Understanding of sprints, stand-ups, retros
   - Adapting processes to team needs
   - Balancing agility with planning

4. How do you measure product success?
   - Key performance indicators selection
   - North star metric identification
   - Balancing short and long-term metrics

5. How do you work with engineering teams?
   - Technical specification development
   - Requirement clarity and prioritization
   - Handling scope changes and technical constraints

6. Tell me about a time you had to make a difficult product decision
   - Decision-making framework
   - Stakeholder management
   - Trade-offs considered

7. How do you approach competitive analysis?
   - Research methodology
   - Feature and positioning comparison
   - Incorporating insights into product strategy

8. Describe your experience with product launches
   - Launch planning and coordination
   - Cross-functional collaboration
   - Metrics tracking and issue resolution

9. How do you handle situations where data contradicts intuition?
   - Balancing qualitative and quantitative insights
   - Further investigation approaches
   - Decision-making process

10. What's your approach to building product vision and strategy?
    - Market research and user needs identification
    - Alignment with company goals
    - Communication to stakeholders and teams`
    };
    

    let responseText = "";
    
    if (prompt.toLowerCase().includes("software engineer") || prompt.toLowerCase().includes("developer")) {
      responseText = mockResponses["software engineer"];
    } else if (prompt.toLowerCase().includes("data scientist") || prompt.toLowerCase().includes("data analyst")) {
      responseText = mockResponses["data scientist"];
    } else if (prompt.toLowerCase().includes("product manager") || prompt.toLowerCase().includes("project manager")) {
      responseText = mockResponses["product manager"];
    } else {
      // Generic response for any other job
      responseText = `1. What experience do you have that's relevant to this position?
   - Look for alignment with job requirements
   - Candidate should provide specific examples

2. How do you approach problem-solving in your work?
   - Look for structured thinking
   - Evidence of analytical approach

3. Describe a challenging project you worked on
   - Look for complexity and scope
   - Focus on personal contribution and outcomes

4. How do you handle feedback and criticism?
   - Look for growth mindset
   - Specific examples of implementing feedback

5. Tell me about a time you had to work under pressure
   - Look for stress management strategies
   - Focus on results achieved despite constraints

6. How do you prioritize your work?
   - Look for time management skills
   - Understanding of importance vs. urgency

7. Describe your experience working in a team
   - Look for collaboration skills
   - Handling of team conflicts

8. What are your greatest professional strengths?
   - Look for self-awareness
   - Alignment with job requirements

9. How do you stay updated in your field?
   - Look for continuous learning habits
   - Specific resources mentioned

10. Where do you see yourself professionally in five years?
    - Look for ambition and realistic goals
    - Alignment with company growth opportunities`;
    }
    
    // AI processing time
    setTimeout(() => {
      res.json({ text: responseText });
    }, 1000);
  } catch (error) {
    console.error("Generate endpoint error:", error);
    res.status(500).json({ error: "Failed to generate content" });
  }
});

// Use a default port or check environment variable
const DEFAULT_PORT = parseInt(process.env.PORT || "5000", 10);


function startServer(port) {
  port = parseInt(port, 10);
  
  // Checking if port is valid
  if (isNaN(port) || port < 1024 || port > 65535) {
    port = DEFAULT_PORT; // Reseting to default if invalid
    console.log(`Invalid port, using default port ${port}`);
  }
  
  const server = app.listen(port, () => {
    // Store the actual port in case it was dynamically assigned
    const actualPort = server.address().port;
    console.log(`Server running on port ${actualPort}`);
    
    // Create a simple endpoint to tell the client which port the server is using
    app.get('/api/serverinfo', (req, res) => {
      res.json({ port: actualPort });
    });
  })
    .on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        const nextPort = port + 1;
        console.log(`Port ${port} is busy, trying port ${nextPort}...`);
        startServer(nextPort);
      } else {
        console.error('Server error:', error);
      }
    });
}

// Start server with port checking
startServer(DEFAULT_PORT);

