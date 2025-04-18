# TerraNumerIA — Educational AI Text Generation Demo

**A pedagogical web application developed during our 4th year at Polytech Nice Sophia, as part of the Algorithmique 2
course, within the [Terra Numerica](https://terra-numerica.org/) project.**

## 📚 About the Project

**TerraNumerIA** is an interactive educational platform designed to demystify how generative AI models like ChatGPT
function. This tool allows middle and high school students to explore the inner workings of text generation through
experimentation and demonstration.

> 🤖 **AI isn't intelligent.**

> It doesn't think — it calculates probabilities. This project helps make that idea concrete.

## 🌍 Context

This project was developed as part of the **Algorithmique 2 course** during our 4th year at **Polytech Nice Sophia**. It
was created with the objective of explaining how generative AI works to a wide audience — from middle school students to
university graduates.

We built the application **at the TerraNumerica office** in Sophia Antipolis, and it is now used as part of *
*interactive educational workshops** to help the public understand the principles behind text-generating AIs like
ChatGPT.

> The key aim: **make the invisible mechanisms of AI visible, understandable, and accessible** to everyone.

### 🧩 About Terra Numerica

**[Terra Numerica](https://terra-numerica.org/)** is a national project initiated by the **CNRS**, **Inria**, and *
*Université Côte d’Azur**. Its goal is to provide all citizens with access to high-quality digital culture experiences.

The project brings together a wide range of partners — including the French Ministry of Education — and offers *
*interactive, hands-on digital science activities**. These include:

- The **Terra Numerica @Sophia** totem space
- A network of **partner spaces** throughout the South of France
- Online and on-site **learning resources** and **events**

Through playful and engaging approaches, Terra Numerica promotes:

- Digital literacy for all audiences
- Scientific curiosity and critical thinking
- Understanding of the societal, ethical, and technical dimensions of digital technologies

> Over **120,000 people** have already participated in Terra Numerica’s activities across France.

## 💻 Hardware Requirements

To ensure optimal performance of TerraNumerIA, please verify that your system meets the following hardware requirements:

**Backend:**

- A computer running Python 3.11 or 3.12 (Higher versions are currently not supported, for package `sentencepiece`).;
- At least 16 GB of RAM;
- A recent multi-core CPU for handling backend processes, especially if multiple sessions or streaming responses are
  used.

**CUDA Acceleration (Optional):**

For enhanced performance using NVIDIA's CUDA technology, the following additional requirements apply:

- **GPU:** An NVIDIA CUDA-capable GPU with Compute Capability 3.0 or higher is required.

- _Minimum Recommendation:_ NVIDIA GeForce GTX 1060 or equivalent.

- _Optimal Recommendation:_ NVIDIA GeForce RTX 3060 or higher for improved performance.

- **CUDA Toolkit:** Installation of the appropriate CUDA Toolkit version compatible with your GPU.

- **Driver Compatibility:** Ensure that your NVIDIA drivers are up to date and compatible with the installed CUDA
  Toolkit version.

These specifications will help ensure that TerraNumerIA operates effectively, with or without CUDA acceleration.

## 🚀 Getting Started

### ✅ Summary of Options

- **[Option 1](#-1-docker-compose-zero-setup-deployment):** Use **Docker Compose** to pull the images and run the app with minimal setup.
- **[Option 2](#-2-dev-mode):** Run in **development mode** by installing dependencies and running the app locally.
- **[Option 3](#-3-clone-the-repository-and-use-docker-compose-locally):** Clone the repository, configure your `.env` file, and use Docker Compose locally.


### 🐳 1. Docker Compose (zero-setup deployment)

No need to clone the repo — just copy this Docker Compose config and you're ready to go.

#### 🧪 Step 1: Create `.env` file

Before all, you need to get yourself a [HuggingFace](https://huggingface.co/) token.

```env
HF_TOKEN=your_huggingface_token
CACHE_DIR=/optional/cache/dir  # Optional
```

#### 🐳 Step 2: docker-compose.yml

```yaml
services:
  backend:
    image: baptistelacroix/terranumeria-backend:latest
    environment:
      - HF_TOKEN=${HF_TOKEN}
      - CACHE_DIR=${CACHE_DIR} # Optional
    ports:
      - "5000:5000"
    deploy:
      resources:
        reservations:
          devices:
            - capabilities: [ gpu ]  # Remove this line if not using GPU

  frontend:
    image: baptistelacroix/terranumeria-frontend:latest
    ports:
      - "3000:80"
    depends_on:
      - backend
```

#### ▶️ Step 3: Run it

```bash
docker compose up -d
```

Open the app at: [http://localhost:3000](http://localhost:3000)
### 🧪 2. Dev mode
#### 🔧 Frontend

You can run the frontend in two ways:

- **Development mode** (with hot reload):
  ```bash
  cd frontend/
  npm install
  npm run dev
  ```

- **Static build mode**:
  After building the project with:
  ```bash
  cd frontend/
  npm run build
  ```
  You can serve the static files using a simple static file server like [serve](https://www.npmjs.com/package/serve).
  Run the following to serve the `dist` folder:
  ```bash
  serve ./dist
  ```

This will start a local server.

#### 🐍 Backend

Before launching the backend server, make sure to install dependencies and provide the required credentials as
command-line arguments.

```bash
cd backend/
pip install -r requirements.txt
python -u -m main <HF_TOKEN> <CACHE_DIR>
```

Where:

- `<HF_TOKEN>`: Your **Hugging Face API token**.
- `<CACHE_DIR>`: The directory path where cached models and data will be stored.

You can obtain your Hugging Face token by creating a free account at [huggingface.co](https://huggingface.co/) and
generating one from your account settings.

This setup ensures secure and local model loading. Once launched, your Flask API server will run locally. Make sure your
frontend (dev or built version) is configured to call the backend, usually at:

```
http://localhost:5000
```

### 🔄 3. Clone the Repository and Use Docker Compose Locally

If you'd like to clone the repository and use the provided Docker Compose configuration, follow these steps:

#### 🧪 Step 1: Clone the Repository

```bash
git clone https://github.com/BaptisteLacroix/pns-algo2-terranumeria.git
cd pns-algo2-terranumeria/
```

#### 🧩 Step 2: Create `.env` file

In the root of the project, create a `.env` file with your credentials:

```env
HF_TOKEN=your_huggingface_token
CACHE_DIR=/optional/cache/dir  # Optional
```

#### 🐳 Step 3: Run Docker Compose

Now, inside the cloned repository, use the Docker Compose file provided:

```bash
docker compose up -d
```

This will pull the necessary Docker images from Docker Hub and start both the frontend and backend services locally.

You can access the application at: [http://localhost:3000](http://localhost:3000)


## 🎓 Educational Goal and Objectives

TerraNumerIA is designed to **demystify how generative AI works**, specifically focusing on Large Language Models (LLMs)
like ChatGPT. Through playful human-led experiments and a custom AI demo, students learn that:

- Generative AIs **do not think**.
- They generate words based on **mathematical probabilities**.
- Meaningful text can emerge without understanding.

> 🧠 “It’s not intelligence, it’s math.”

This project is presented in workshops for middle and high school students across France as part of the **"L’(in)
intelligence des IA génératives"** activity. The workshop aims to:

- Simplify and explain how large language models (LLMs) generate text.
- Highlight the probabilistic nature of generative AI.
- Compare human and machine language generation.
- Foster critical thinking about AI's role and limitations.

## 🧪 Workshop Flow

### ✍️ Human Experimentation

1. **Word-by-word sentence building** with limited context.
2. Gradual reveal of more context to show its influence on coherence.
3. Group reflection on how humans — and AIs — construct meaning without full understanding.

### 💻 AI Demonstration

Participants then interact with our custom fine-tuned model via a friendly web UI. They can:

- Enter prompts.
- Observe how text is generated word-by-word.
- Discuss differences between AI-generated and human-generated sentences.

## 🧩 Application Structure

### 🌐 Frontend — React + TypeScript + HeroUI + Vite + TailwindCSS

A clean, simple web UI that interacts with the backend for live generation.

#### Key Structure

```
src/
├── components/            // UI blocks: side panels, dialog box, theme
├── pages/                 // Routes: index, history, learning view
├── services/              // API calls (REST)
├── styles/                // CSS styles
├── App.tsx & main.tsx     // App bootstrap
```

#### Key Features

- 📜 Prompt input with real-time streamed text generation
- 🕓 Conversation history display
- 📚 Learning page with pedagogical explanations

### 📖 Interactive Learning Panel

The sidebar provides access to **educational content** through clearly labeled navigation.

This panel helps structure the experience and guide the user between interactive AI demos and theoretical modules.

#### Included Sections

- 🏠 **Home**  
  Clicking the logo resets the conversation and redirects to the main page.

- 📜 **Historique des conversations**  
  View previously generated conversations.

- 📘 **Documentation Links**  
  Each item links to an interactive explanation:
    - **L'entraînement** – How the AI learns from data.
    - **Les biais** – Why and how biases appear.
    - **La véracité** – When and why the model "hallucinates" facts.
    - **Les mathématiques** – The underlying probability-driven logic.
    - **L'espace vectoriel** – Vector spaces and word embeddings.

### 🧠 Backend — Flask API + Custom Model

Our backend wraps a fine-tuned generative model (e.g., based on Mistral) and exposes several endpoints.

#### Main Components

- `main.py`: Flask server + CORS + route definitions
- `model.py`: Generation logic, profile switching, memory handling
- `conversation_manager.py`: Load/save/delete user sessions
- `profiles/`: Different generation behavior presets
- `conversations/`: Session save files (JSON)
- `requirements.txt`: Python dependencies

## 📡 API Overview

All endpoints return JSON unless streaming.

### 🔄 `/responses`

Generate text in streaming mode from a given prompt.

- **POST**
- Payload: `{ prompt, model?, temperature?, conversation_id?, profile_id? }`
- Returns: `text/event-stream`

### 💬 `/conversations`

Get or delete conversation history.

- **GET** `/conversations` → list all
- **GET** `/conversations/<id>` → specific one
- **DELETE** `/conversations/<id>` → delete one

### 🧽 `/reset-memory`

Reset model memory for a new session. Optionally change profile.

- **POST**
- Payload: `{ profile_id? }`

### 👤 `/profiles`

Manage generation profiles.

- **GET** `/profiles` → list all
- **GET** `/profiles/current` → current active one
- **POST** `/profiles/change`  
  Payload: `{ profile_id }`

### ❤️ `/health`

Health check endpoint

- **GET** → `{ status: "ok" }`

## 📢 Disclaimer

This tool is intended **only for educational purposes**. It does not produce reliable or accurate information and must
not be used in critical or production contexts.

> The model does **not think** or **understand** — it generates text based on probabilities. Just math, not magic.

## Team Members

- [Baptiste LACROIX](https://github.com/BaptisteLacroix)
- [Antoine FADDA RODRIGUEZ](https://github.com/Antoine-FdRg)
- [Océan RAZAFIARISON](https://github.com/Fascinax)

## License

This project is licensed under the MIT License.
It uses
a [fine-tuned version](https://huggingface.co/Faradaylab/ARIA-7B-V3-mistral-french) [by Faradaylab](https://huggingface.co/Faradaylab)
of the [Mistral 7B Instruct](https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.1) model, which is released under
the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0).
Please refer to the original model license for usage and redistribution terms.
