export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Max-Age': '86400',
        }
      });
    }

    // Handle API routes
    if (path.startsWith('/api/')) {
      return handleAPI(request, env, url);
    }

    // Serve static files
    return handleStaticFiles(request, env, path);
  }
};

async function handleAPI(request, env, url) {
  const path = url.pathname;

  try {
    switch (path) {
      case '/api/contact':
        return await handleContactForm(request, env);
      case '/api/analytics':
        return await handleAnalytics(request, env);
      case '/api/messages':
        return await handleMessages(request, env);
      case '/api/messages/delete':
        return await handleDeleteMessage(request, env);
      case '/api/messages/delete-all':
        return await handleDeleteAllMessages(request, env);
      case '/api/auth/login':
        return await handleLogin(request, env);
      default:
        return new Response('Not Found', { 
          status: 404,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
    }
  } catch (error) {
    console.error('API Error:', error);
    return new Response('Internal Server Error', { 
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

async function handleContactForm(request, env) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { 
      status: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }

  try {
    const formData = await request.json();
    const { name, email, message } = formData;

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'Missing required fields' 
      }), {
        status: 400,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // Get client info
    const clientIP = request.headers.get('cf-connecting-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Insert into database
    const result = await env.DB.prepare(`
      INSERT INTO messages (name, email, message, ip_address, user_agent)
      VALUES (?, ?, ?, ?, ?)
    `).bind(name, email, message, clientIP, userAgent).run();

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Message sent successfully!' 
    }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      message: 'Failed to send message' 
    }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

async function handleAnalytics(request, env) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { 
      status: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }

  try {
    const { page } = await request.json();
    const clientIP = request.headers.get('cf-connecting-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const referrer = request.headers.get('referer') || '';

    await env.DB.prepare(`
      INSERT INTO analytics (page, ip_address, user_agent, referrer)
      VALUES (?, ?, ?, ?)
    `).bind(page, clientIP, userAgent, referrer).run();

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    console.error('Analytics error:', error);
    return new Response('Internal Server Error', { 
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

async function handleMessages(request, env) {
  if (request.method !== 'GET') {
    return new Response('Method Not Allowed', { 
      status: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }

  try {
    const result = await env.DB.prepare(`
      SELECT * FROM messages 
      ORDER BY created_at DESC
    `).all();

    return new Response(JSON.stringify(result.results), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    console.error('Messages error:', error);
    return new Response('Internal Server Error', { 
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

async function handleDeleteMessage(request, env) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { 
      status: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }

  try {
    const { id } = await request.json();
    
    if (!id) {
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'Missing message ID' 
      }), {
        status: 400,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    const result = await env.DB.prepare(`
      DELETE FROM messages WHERE id = ?
    `).bind(id).run();

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Message deleted successfully' 
    }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    console.error('Delete message error:', error);
    return new Response('Internal Server Error', { 
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

async function handleDeleteAllMessages(request, env) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { 
      status: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }

  try {
    const result = await env.DB.prepare(`
      DELETE FROM messages
    `).run();

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'All messages deleted successfully' 
    }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    console.error('Delete all messages error:', error);
    return new Response('Internal Server Error', { 
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

async function handleLogin(request, env) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { 
      status: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }

  try {
    const { username, password } = await request.json();
    
    // Simple authentication - in production, use proper hashing and environment variables
    const validUsername = 'ahnaf';
    const validPassword = 'iamAhnaf@'; // In production, use environment variables
    
    if (username === validUsername && password === validPassword) {
      // Generate a simple session token
      const token = btoa(`${username}:${Date.now()}`);
      
      return new Response(JSON.stringify({ 
        success: true, 
        token: token,
        message: 'Login successful' 
      }), {
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    } else {
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'Invalid credentials' 
      }), {
        status: 401,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    return new Response('Internal Server Error', { 
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

async function handleStaticFiles(request, env, path) {
  // Default to index.html for root path
  if (path === '/') {
    path = '/index.html';
  }

  // Try to get the file from the assets
  let filePath = path;
  
  // Map common paths to our assets
  if (path === '/index.html') {
    filePath = '/index.html';
  } else if (path.startsWith('/assets/')) {
    filePath = path;
  } else if (path.startsWith('/styles.css')) {
    filePath = '/styles.css';
  } else if (path.startsWith('/script.js')) {
    filePath = '/script.js';
  } else if (path.startsWith('/CV_Ahnaf_Rahat.pdf')) {
    filePath = '/CV_Ahnaf_Rahat.pdf';
  } else if (path === '/auth.html') {
    filePath = '/auth.html';
  } else if (path === '/dashboard.html') {
    filePath = '/dashboard.html';
  }

  // For now, we'll serve the files from the root directory
  // In production, you'd want to use Cloudflare's static asset handling
  return new Response('Static file handling will be implemented', {
    status: 200,
    headers: { 'Content-Type': 'text/html' }
  });
}
