import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/genai";

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const result = await model.generateContent(prompt);

    res.json({
      text: result.response.text()
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Generation failed" });
  }
});

const PORT = process.env.PORT || 3000;
app.get("/api/v1/user/credits", (req, res) => {
  res.json({
    credits: 100,
    plan: "free",
    status: "active"
  });
});
app.get("/", (req, res) => {
  res.send("Snoopwerk API alive");
});

app.listen(PORT, () => {
  console.log("API running on port", PORT);
});

app.listen(PORT, () => {
  console.log("API running on port", PORT);
});
