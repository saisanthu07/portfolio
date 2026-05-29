# Borra Sai Santhosh — Portfolio

A full-stack portfolio built with React (Vite) + Node.js/Express + MongoDB.
Contact form submissions are stored in MongoDB and trigger email notifications via Gmail.

---

## Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18 + Vite |
| Backend | Node.js + Express |
| Database | MongoDB (Atlas) |
| Email | Nodemailer + Gmail |
| Deployment | AWS S3 + CloudFront (frontend) · EC2 (backend) |

---

## Local Development

### 1. Clone and install

```bash
git clone <your-repo-url>
cd portfolio
npm install          # installs root concurrently
npm run install:all  # installs server + client deps
```

### 2. Configure environment variables

```bash
# Backend
cp server/.env.example server/.env
# Fill in MONGODB_URI, SMTP_USER, SMTP_PASS, ADMIN_KEY

# Frontend (optional for dev — Vite proxy handles /api)
cp client/.env.example client/.env
```

### 3. Run both servers concurrently

```bash
npm run dev
# Frontend: http://localhost:5173
# Backend:  http://localhost:5001
```

---

## Gmail App Password Setup (for email notifications)

1. Enable 2-Factor Authentication on your Google account
2. Go to: **myaccount.google.com/apppasswords**
3. Create an App Password for "Mail"
4. Paste it as `SMTP_PASS` in `server/.env`

> **Do not** use your regular Gmail password. App Passwords are 16-char codes specifically for this.

---

## AWS Deployment

### Frontend → S3 + CloudFront

```bash
# 1. Build
cd client
echo "VITE_BACKEND_URL=http://YOUR_EC2_IP:5001" > .env
npm run build

# 2. Upload to S3
aws s3 sync dist/ s3://chatsuu-frontend --delete

# 3. Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id YOUR_DIST_ID \
  --paths "/*"
```

### Backend → EC2

```bash
# 1. SSH into your EC2 instance
# (or use EC2 Instance Connect in the browser)

# 2. Clone your repo (or SCP the server folder)
git clone <your-repo-url> portfolio
cd portfolio/server

# 3. Install dependencies
npm install --production

# 4. Create .env
cp .env.example .env
nano .env  # Fill in your values

# 5. Start with PM2
pm2 start index.js --name portfolio-api
pm2 save
pm2 startup  # Follow the printed command to auto-start on reboot
```

### EC2 Security Group

Make sure port **5001** (or 80/443 if using Nginx) is open in your EC2 Security Group inbound rules.

### Environment Variable Checklist

| Variable | Where | Value |
|----------|-------|-------|
| `MONGODB_URI` | server/.env | Your MongoDB Atlas connection string |
| `SMTP_USER` | server/.env | `saisanthoshborra@gmail.com` |
| `SMTP_PASS` | server/.env | Gmail App Password |
| `FRONTEND_URL` | server/.env | Your CloudFront URL |
| `ADMIN_KEY` | server/.env | Random secret string |
| `VITE_BACKEND_URL` | client/.env | `http://YOUR_EC2_IP:5001` |

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Server + DB health check |
| POST | `/api/contact` | Submit contact form |
| GET | `/api/contact/submissions` | View all submissions (requires `x-admin-key` header) |

### POST /api/contact

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Job Opportunity",
  "message": "Hey Santhosh, I'd love to connect..."
}
```

Response (201):
```json
{
  "success": true,
  "message": "Message received! I'll get back to you soon.",
  "id": "65f..."
}
```

---

## Project Structure

```
portfolio/
├── client/                  # React frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx       # Typewriter animation
│   │   │   ├── About.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Certifications.jsx
│   │   │   └── Contact.jsx    # Form with validation
│   │   ├── hooks/
│   │   │   └── useFadeIn.js   # Scroll animation hook
│   │   ├── App.jsx
│   │   ├── index.css          # Full design system
│   │   └── main.jsx
│   ├── .env.example
│   └── package.json
│
├── server/                  # Node.js + Express backend
│   ├── index.js             # Main server file
│   ├── .env.example
│   └── package.json
│
├── package.json             # Root — convenience scripts
└── README.md
```

~santhu🤍🤍
