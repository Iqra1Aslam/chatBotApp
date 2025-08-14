 Dual-Mode ChatBot Web App (AI + Manual)

A MERN Stack ChatBot with two interaction modes:

* AI Mode – Instant replies via Hugging Face LLM.
* Manual Mode – Messages stored for human review/reply.

Includes a dark-themed UI, gender & mode selection, and seamless switching between modes.

---

## 📂 Structure

```
/client → React.js frontend  
/server → Node.js backend ([botServer](https://github.com/Iqra1Aslam/botServer))
```

---

## 🚀 Setup

Frontend

```bash
git clone https://github.com/Iqra1Aslam/chatBotApp
npm install
npm start
```

Runs at [http://localhost:3000](http://localhost:3000)

Backend

```bash
git clone https://github.com/Iqra1Aslam/botServer.git
cd botServer
npm install
npm start
```

Runs at [http://localhost:5000](http://localhost:5000)

---

## 🤖 Hugging Face Integration

1. Create account & get API key from [Hugging Face](https://huggingface.co).
2. Add to `/.env`:

   ```
   HF_API_KEY=your_key
   ```
3. Backend forwards user messages to Hugging Face API and returns responses to frontend.

---

## 🛠 Tech Stack

React.js | React Router | Node.js | Express.js | MongoDB | CSS3 | Hugging Face API | REST API | MERN Stack Deployment
