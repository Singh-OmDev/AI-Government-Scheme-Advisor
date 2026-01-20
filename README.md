# AI Government Scheme Advisor – India

live demo https://ai-government-scheme-advisor.vercel.app/


<img width="1899" height="867" alt="image" src="https://github.com/user-attachments/assets/8eb51b1d-76c9-409b-a9ba-4a0425b6e170" />

A web application that helps Indian citizens understand which government schemes they may be eligible for, what documents are required, and how to apply.

## Features
- **AI-Powered Recommendations**: Uses  Llama 3.3  to suggest relevant schemes.
- **Simple Language**: Explains eligibility and steps in easy-to-understand English.
- **Comprehensive Form**: Captures detailed user profile for accurate suggestions.
- **Filtering**: Filter schemes by type (Central/State) and category.
- **Shareable**: Copy all recommendations to share via WhatsApp/Text

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express
- **AI**: Llama 3.3 

## How to Run

1.  **Clone/Download** the repository.
2.  **Setup API Key**:
    - Create a `.env` file in the `server` directory.
    - Add `GEMINI_API_KEY=your_api_key_here`.
3.  **Install Dependencies**:
    ```bash
    npm install
    cd client && npm install
    cd ../server && npm install
    ```
4.  **Start the App**:
    ```bash
    npm start
    ```
5.  **Open Browser**: Visit `http://localhost:5173`.

