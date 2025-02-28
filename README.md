# Intervue AI

<div align="center">

  
  <p>
    <b>AI-Powered Interview Platform for Modern Recruiting</b>
  </p>
  
  
  
  <p>
    <a href="https://github.com/yourusername/intervue-ai/issues">Report Bug</a>
    ·
    <a href="https://github.com/yourusername/intervue-ai/issues">Request Feature</a>
  </p>
</div>

## 📋 Overview

Intervue AI is a cutting-edge platform designed to streamline and enhance the hiring process using artificial intelligence. It leverages machine learning to analyze interviews, provide candidate scoring, and generate insightful feedback, helping recruiters make data-driven hiring decisions with reduced bias.

![Intervue AI Dashboard](/public/assets/dashboard-preview.png)

## ✨ Features

- **AI-Powered Interview Analysis** - Automated candidate assessment and scoring
- **Interactive Analytics Dashboard** - Visual representation of hiring metrics and trends
- **Mock Interview Simulator** - Practice interviews with AI feedback
- **Customizable Interview Templates** - Create role-specific question banks
- **Report Generation** - Detailed PDF exports of interview results
- **Secure Authentication** - JWT-based user management system
- **Subscription Management** - Tiered pricing with Stripe integration

## 🚀 Tech Stack

- **Frontend:** Next.js, TypeScript, ShadCN UI, Tailwind CSS
- **Backend:** Next.js API Routes, Drizzle ORM
- **Database:** PostgreSQL
- **AI Integration:** Google Gemini API
- **Authentication:** NextAuth.js, JWT
- **Payments:** Stripe
- **Document Generation:** JSPDF
- **Deployment:** Vercel

## 📊 Analytics & Insights

The platform provides comprehensive analytics including:

- Candidate performance metrics across different skill domains
- Interview success rates by department and position
- AI-generated improvement suggestions
- Hiring funnel visualization
- Time-to-hire optimization data

![Analytics Dashboard](/public/assets/analytics-preview.png)

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/intervue-ai.git
   cd intervue-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Fill in the required environment variables:
   ```
   DATABASE_URL=your_postgresql_db_url
   GEMINI_API_KEY=your_google_ai_api_key
   NEXTAUTH_SECRET=your_nextauth_secret
   STRIPE_SECRET_KEY=your_stripe_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   ```

4. **Run database migrations**
   ```bash
   npm run db:migrate
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

## 🌐 Usage

### For Recruiters
1. Create an account and select a subscription plan
2. Set up interview templates with custom questions
3. Schedule interviews with candidates
4. Review AI-generated insights and scoring
5. Export detailed reports for team collaboration

### For Candidates
1. Receive invitation links via email
2. Practice with mock interviews before the real session
3. Participate in structured interviews
4. Get personalized feedback based on performance

## 📈 Roadmap

- [ ] Integration with major ATS platforms
- [ ] Video interview recording and analysis
- [ ] Enhanced AI feedback with sentiment analysis
- [ ] Collaborative hiring team features
- [ ] Mobile application for on-the-go recruiting

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact



Project Link: [https://github.com/yourusername/intervue-ai](https://github.com/gauravsingh906/intervue-ai)

## 🙏 Acknowledgements

- [Google Gemini API](https://ai.google.dev/)
- [ShadCN UI](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Vercel](https://vercel.com/)
