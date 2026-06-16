import { initializePaddle } from '@paddle/paddle-js';

let paddle: any = null;

export async function getPaddle(userId?: string) {
  if (!paddle) {
    const paddleConfig: any = {
      environment: 'production',
      token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN as string,
    };

    if (userId) {
      paddleConfig.pwCustomer = { id: userId };
    }

    paddle = await initializePaddle(paddleConfig);
  }
  return paddle;
}