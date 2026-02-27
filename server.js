import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // serve index.html, css, js

const API_KEY = ''; // optional jika pakai API token

app.post('/chat', async (req,res) => {
    const { text } = req.body;
    if(!text) return res.json({ reply:"Kirim teks dulu!" });

    try {
        const response = await fetch(`https://api.ryzumi.net/api/ai/gemini?text=${encodeURIComponent(text)}`, {
            headers: { 'Authorization': `Bearer ${API_KEY}` } // optional
        });
        const data = await response.json();
        res.json({ reply: data.result || "AI tidak merespon" });
    } catch(err){
        console.error(err);
        res.json({ reply: "Error API" });
    }
});

app.listen(3000, () => console.log("Server running di http://localhost:3000"));