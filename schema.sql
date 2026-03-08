-- Create messages table for contact form submissions
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    ip_address TEXT,
    user_agent TEXT
);

-- Create analytics table for page views
CREATE TABLE IF NOT EXISTS analytics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    page TEXT NOT NULL,
    ip_address TEXT,
    user_agent TEXT,
    referrer TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create projects table for dynamic project management
CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    tags TEXT,
    project_url TEXT,
    github_url TEXT,
    featured BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample projects
INSERT INTO projects (title, description, image_url, tags, project_url, github_url, featured) VALUES
('Seekr AI', 'AI-based solution for visually impaired people using ultralytics Yolov8 Model and Vision framework.', '/assets/seekr_banner.png', 'iOS,AI,Vision Framework', 'https://apps.apple.com/us/app/seekr-ai/id6470461667', NULL, 1),
('Kotha', 'Social Communication and Lifestyle app with real-time audio/video calling using WebRTC and messaging using Socket.IO.', '/assets/kotha_banner.png', 'iOS,WebRTC,Socket.IO', 'https://apps.apple.com/us/app/kotha/id1188060798', NULL, 1),
('WhiteLabel Games', 'Marketing-focused Advergame development company using Construct3, CreateJS, and JavaScript frameworks.', '/assets/whitelabel_banner.png', 'Game Development,Construct3,JavaScript', 'https://playwhitelabel.com', NULL, 1),
('AuctionVilla OÜ', 'Digital Assets Marketplace in Estonia specializing in mobile application ownership trading.', '/assets/av_banner.png', 'Digital Assets,Marketplace,Product Engineering', 'https://auctionvilla.io/', NULL, 1),
('AI Website Summarizer', 'Professional Python application that extracts content from websites and generates summaries using OpenAI API or Ollama.', '/assets/ai_summary_banner.png', 'Python,Flask,OpenAI,Ollama', NULL, 'https://github.com/ahnafrahat/ai_website_summary', 0),
('Sokoni Kwetu', 'E-Commerce app built using Swift and integrated with Firebase Authentication, Firestore, and REST APIs.', '/assets/sokoni_banner.png', 'iOS,Firebase,E-Commerce', 'https://apps.apple.com/us/app/sokoni-kwetu/id1482431769', NULL, 0),
('Mackspice', 'Sustainable spice farming and production brand iOS app for rural smallholder farmers.', '/assets/mackspice_banner.png', 'iOS,E-Commerce,Sustainability', 'https://apps.apple.com/us/app/mackspice/id1590196517', NULL, 0);

