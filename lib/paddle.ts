import { initializePaddle } from '@paddle/paddle-js';

let paddle: any = null;

export async function getPaddle() {
  if (!paddle) {
    paddle = await initializePaddle({
      token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN as string,
    });
  }
  return paddle;
}
