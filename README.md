# Ahnaf Rahat - Professional Portfolio

A modern, responsive portfolio website built for Cloudflare Workers with D1 database integration. Features a beautiful design, smooth animations, and full-stack functionality with authentication and dashboard.

## 🚀 Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Fully responsive across all devices
- **Cloudflare Integration**: Built for Cloudflare Workers and D1 database
- **Contact Form**: Functional contact form with database storage
- **Analytics**: Page view tracking and analytics
- **Authentication System**: Secure login for dashboard access
- **Dashboard**: Complete message management system
- **Performance Optimized**: Fast loading with lazy loading and caching

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Cloudflare Workers
- **Database**: Cloudflare D1 (SQLite)
- **Deployment**: Cloudflare Pages
- **Authentication**: Custom authentication system
- **Styling**: Custom CSS with CSS Variables
- **Icons**: Font Awesome 6
- **Fonts**: Inter (Google Fonts)

## 📁 Project Structure

```
Ahnaf_Portfolio/
├── src/
│   ├── index.js          # Cloudflare Worker
│   ├── styles.css        # Main stylesheet
│   └── script.js         # Frontend JavaScript
├── dist/
│   ├── index.html        # Main HTML file
│   ├── auth.html         # Authentication page
│   ├── dashboard.html    # Dashboard page
│   ├── manifest.json     # PWA manifest
│   └── sw.js            # Service Worker
├── assets/               # Images and static assets
├── schema.sql           # Database schema
├── wrangler.toml        # Wrangler configuration
├── package.json         # Dependencies and scripts
├── deploy.sh           # Deployment script
└── README.md           # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Cloudflare account
- Wrangler CLI

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Ahnaf_Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Cloudflare D1 database**
   ```bash
   # Create D1 database
   npm run db:create
   
   # Apply migrations
   npm run db:migrate
   ```

4. **Deploy to Cloudflare**
   ```bash
   ./deploy.sh
   ```

## 🔐 Authentication & Dashboard

### Dashboard Access
- **URL**: `https://your-domain.pages.dev/auth.html`
- **Username**: `ahnaf`
- **Password**: `iamAhnaf@`

### Dashboard Features
- View all contact form submissions
- Delete individual messages
- Delete all messages
- Real-time message details
- IP address tracking
- User agent information

## 📊 Database Schema

The portfolio uses three main tables:

### Messages Table
- Stores contact form submissions
- Includes IP address and user agent for analytics
- Timestamps for message tracking

### Analytics Table
- Tracks page views and user interactions
- Stores referrer and user agent information
- Performance monitoring

### Projects Table
- Dynamic project management
- Supports featured projects and tags

## 🔧 Configuration

### Wrangler Configuration

The `wrangler.toml` file is configured with:
- D1 database binding
- Pages deployment settings
- Worker configuration

### Environment Variables

Set up environment variables in Cloudflare dashboard:
- `DB`: D1 database binding (auto-configured)

## 🚀 Deployment

### Development

```bash
npm run dev
```

### Production

```bash
./deploy.sh
```

### Manual Deployment

```bash
npm run build
wrangler pages deploy dist
```

## 📱 URLs

- **Main Portfolio**: `https://ahnaf-portfolio.pages.dev`
- **Authentication**: `https://ahnaf-portfolio.pages.dev/auth.html`
- **Dashboard**: `https://ahnaf-portfolio.pages.dev/dashboard.html`

## 🔍 API Endpoints

### Contact Form
- **POST** `/api/contact` - Submit contact form

### Analytics
- **POST** `/api/analytics` - Track page views

### Messages (Dashboard)
- **GET** `/api/messages` - Get all messages
- **POST** `/api/messages/delete` - Delete specific message
- **POST** `/api/messages/delete-all` - Delete all messages

### Authentication
- **POST** `/api/auth/login` - User authentication

## 🎨 Customization

### Colors and Themes

Update CSS variables in `src/styles.css`:

```css
:root {
  --primary-color: #6366f1;
  --secondary-color: #8b5cf6;
  --accent-color: #06b6d4;
  /* ... more variables */
}
```

### Content Updates

1. **Personal Information**: Update `dist/index.html`
2. **Projects**: Add to database or update static fallback
3. **Skills**: Modify the skills section in HTML
4. **Experience**: Update timeline items in HTML

## 🛡️ Security

- Authentication system for dashboard access
- Input validation and sanitization
- Secure headers via Cloudflare
- Rate limiting on API endpoints

## 📈 Analytics

The portfolio includes built-in analytics:

- Page view tracking
- Contact form submissions
- User interaction metrics
- Performance monitoring
- IP address tracking

## 🔧 Troubleshooting

### Common Issues

1. **D1 Database Not Found**
   ```bash
   wrangler d1 list
   wrangler d1 create portfolio-db
   ```

2. **Authentication Issues**
   - Check credentials in `src/index.js`
   - Verify session storage

3. **Deployment Issues**
   ```bash
   wrangler whoami
   wrangler pages project list
   ```

## 📞 Support

For questions or support:
- Email: ahnaf.rahat19@gmail.com
- LinkedIn: [Ahnaf Rahat](https://www.linkedin.com/in/ahnafrahat/)
- GitHub: [ahnafrahat](https://github.com/ahnafrahat)

## 🎯 Roadmap

- [ ] Blog integration
- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Email notifications
- [ ] Portfolio admin panel
- [ ] Enhanced security features

---

**Built with ❤️ by Ahnaf Rahat**
