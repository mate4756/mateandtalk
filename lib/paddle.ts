import { initializePaddle } from '@paddle/paddle-js';

let paddle: any = null;

export async function getPaddle() {
  if (!paddle) {
    // Detect environment: development/preview → sandbox, production → production
    const isDevelopment = process.env.NODE_ENV === 'development';
    const isPreview = typeof window !== 'undefined' && (
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1'
    );
    const environment = (isDevelopment || isPreview) ? 'sandbox' : 'production';
    
    // Use appropriate token based on environment
    const token = environment === 'sandbox' 
      ? (process.env.NEXT_PUBLIC_PADDLE_SANDBOX_CLIENT_TOKEN || process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN) as string
      : process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN as string;
    
    paddle = await initializePaddle({
      environment,
      token,
    });
  }
  return paddle;
}