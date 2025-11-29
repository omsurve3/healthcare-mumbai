![WhatsApp Image 2025-11-29 at 09 59 58_31e534bd](https://github.com/user-attachments/assets/91f031b1-4850-4a91-8e18-1096d536defe)
![WhatsApp Image 2025-11-29 at 11 39 53_c71547db](https://github.com/user-attachments/assets/985a5faf-aff7-4aa7-8b38-19ee0c1318bb)
![WhatsApp Image 2025-11-29 at 11 39 10_8ef81792](https://github.com/user-attachments/assets/c2f98252-46d7-4deb-867b-e420fc697aeb)

# Predictive Hospital Management System

A full-stack AI-powered platform that predicts patient surges during festivals, pollution spikes, and epidemics. The system helps hospitals optimize staffing, resources, and patient advisory actions in advance using machine learning and agentic AI.

---

## Features

### 1. AI-Driven Surge Prediction
- Predicts OPD/IPD patient load during festivals, pollution spikes, seasonal disease periods, and epidemic outbreaks.
- Uses time-series forecasting and real-time external data (AQI, weather, public events).

### 2. Autonomous Recommendations (Agentic AI)
- Provides automated recommendations for:
  - Staff allocation
  - Resource/medicine stocking
  - ICU and emergency preparedness
  - Patient advisory messages
- Uses agent-like workflow logic.

### 3. Real-Time Dashboard
- Dynamic meters for ICU load, bed occupancy, emergency wait time, and patient load.
- Clean and animated UI built using React/Next.js, Tailwind, and Framer Motion.
- Critical alerts and system warnings.

### 4. Data Visualizations
- Pollution–patient correlation graphs.
- Festival-based surge trends.
- Predictive charts: line, bar, and area graphs.
- Heatmaps for resource usage.

### 5. Alerts & Notifications
- Automatic alerts for:
  - High ICU occupancy
  - Resource shortages
  - Predicted surges
- Optional email/SMS integrations.

---

## System Architecture

Data Sources (AQI, Weather, Festivals, Historical Patients)
│
▼
ML Prediction Engine (Python/Prophet/LSTM)
│
▼
Agentic Recommendation Layer (LangChain/OpenAI Functions)
│
▼
Backend API (Node.js + Express)
│
▼
Frontend (Next.js + React)


---

## Tech Stack

### Frontend
- Next.js 14
- React
- Tailwind CSS
- Framer Motion
- Recharts / Chart.js

### Backend
- Node.js
- Express
- Prisma or Mongoose
- JWT authentication

### AI/ML Layer
- Python (FastAPI/Flask)
- Prophet, LSTM, Random Forest
- Pandas/Numpy
- LangChain (optional)

### Database
- MongoDB or PostgreSQL
- Redis (optional)

### Deployment
- Vercel (Frontend)
- Railway/Render (Backend)
- HuggingFace/AWS Lambda (ML API)
- MongoDB Atlas

---

## Project Structure

predictive-hospital-management-system/
│
├── frontend/ # Next.js app
│ ├── app/
│ ├── components/
│ ├── hooks/
│ ├── public/
│ └── styles/
│
├── backend/ # Node.js + Express API
│ ├── src/
│ ├── routes/
│ ├── controllers/
│ ├── models/
│ └── middleware/
│
├── ml-engine/ # Python ML module
│ ├── notebooks/
│ ├── models/
│ ├── training/
│ └── api/
│
└── README.md


---

## How It Works

1. Collects real-time & historical data (weather, AQI, festivals, patient history).
2. ML model predicts upcoming surges.
3. Agent layer processes predictions and generates actions.
4. Backend exposes APIs for dashboard + alerts.
5. Frontend displays predictions, dynamic meters, graphs, and insights.

---


# Future Enhancements
- Integration with official AQI and health APIs.
- More advanced LSTM and deep-learning models.
- RL-based staffing optimization.
- Multi-hospital prediction network.
- Voice command dashboard for doctors.
  
License
MIT License.

Credits
![WhatsApp Image 2025-11-29 at 11 42 55_74a245a5](https://github.com/user-attachments/assets/1a96821a-2fbd-4870-a3af-8fff5890f448)
Developed by Team Pegasys.
