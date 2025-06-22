# 🤖💬 Gemini AI Chatbot Mental Health Chatbot

## 👋 Introduction 
Selamat datang di Mental Health Chatbot – sebuah platform curhat dan konseling digital yang aman, anonim, dan selalu siap mendengarkan.
Kami memahami bahwa tidak semua orang mudah bercerita tentang apa yang dirasakan. Karena itu, chatbot kami hadir sebagai teman virtual yang penuh empati, dirancang khusus untuk mendengarkan,
memberikan motivasi, dan membantu kamu mengekspresikan perasaan tanpa takut dihakimi.

💬 Fitur utama kami:
Curhat 24/7 dengan AI yang responsif dan ramah
Kutipan motivasi harian

## ⭐ Features
- 💬 **Real-time Messaging**: Users can engage in real-time conversations with the AI chatbot, receiving instant responses to their queries.
- 🤖 **AI-powered Responses**: The chatbot utilizes Google's Generative AI technology to generate intelligent responses based on user input.
- 🌐 **Multi-platform Compatibility**: The application is compatible across various platforms, including web browsers and mobile devices.

## 🖼️ Preview
### Landing page
<img src="landing_page.png" width="600">

### information page

### Messaging page
<img src="messaging_page.png" width="600">

## 🚀 Getting Started
1. Clone the repository: `git clone https://github.com/aldyknightly/Finalproject.git`
2. Navigate to the frontend directory: `cd client`
3. Navigate to the backend directory: `cd server`
4. Create an .env file with *your* Gemini API information in backend cd server:
    ```
    clientID={your clientID}
    clientSecret={your clientSecret}
    secret={your secret}
    PORT=8420
    geminiKey={your geminiKey}
    ```
5. Install backend dependencies: `npm install`
6. Run the backend: `node server`
7. Navigate to the frontend directory (in a new terminal): `cd app`
8. Install frontend dependencies: `npm install`
9. Run the frontend: `npm run dev`
10. The app is now live at http://localhost:5173!

## 🗂️ File Structure
```
mental-health-chatbot/
├── client/
│   ├── node_modules/
│   ├── public/
│   │   └── vite.svg
│   ├── src/
│   │   ├── assets/
│   │   │   └── react.svg
│   │   ├── components/
│   │   │   ├── ChatBox.css
│   │   │   └── ChatBox.jsx
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   └── vite.config.js
├── server/
│   ├── controllers/
│   │   └── chatController.js
│   ├── node_modules/
│   ├── routes/
│   │   └── chatRoutes.js
│   ├── uploads/
│   │   ├── 5f838b6739615e171dde5c859e77773a
│   │   └── 41a7d0166e0b7f7978dc7c649a751171
│   ├── .env
│   ├── app.js
│   ├── package-lock.json
│   └── package.json
```

<br>
<hr style="border: 5px solid black">
<br>

# 🧪 Testing
## Unit Tests — Using Jest
To run Jest tests locally:
1. Navigate to the frotnend directory: `cd client`
2. Navigate to the backend directory 'cd server'
2. Install frontend dependencies: `npm install`
3. Install backend dependencies: `npm install`
4. Run the tests: 'npm run dev' to client
5. Run the tests: `node app.js` to server
6. You should now see test coverage in your terminal.
