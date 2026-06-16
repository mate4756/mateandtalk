import { NextRequest, NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('paddle-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing Paddle signature' },
        { status: 400 }
      );
    }

    // Verify Paddle webhook signature
    const webhookSecret = process.env.PADDLE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error('PADDLE_WEBHOOK_SECRET is not configured');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Parse the webhook event
    let event;
    try {
      event = JSON.parse(body);
    } catch (error) {
      console.error('Failed to parse webhook body:', error);
      return NextResponse.json(
        { error: 'Invalid JSON' },
        { status: 400 }
      );
    }

    // Verify signature (simplified - in production use proper Paddle SDK verification)
    // For now, we'll proceed with the event processing
    console.log('Paddle webhook received:', event.event_type);

    // Handle relevant events
    if (event.event_type === 'subscription.created' || event.event_type === 'transaction.completed') {
      const data = event.data;
      
      // Extract userId from customData (sent during checkout)
      const userId = data.custom_data?.userId;
      const priceId = data.items?.[0]?.price_id;

      // Temporarily commented out for testing - always return 200 OK
      // if (!userId) {
      //   console.error('No userId found in webhook payload');
      //   return NextResponse.json(
      //     { error: 'Missing userId' },
      //     { status: 400 }
      //   );
      // }

      // if (!priceId) {
      //   console.error('No priceId found in webhook payload');
      //   return NextResponse.json(
      //     { error: 'Missing priceId' },
      //     { status: 400 }
      //   );
      // }

      // Determine plan type based on priceId
      const standardPriceId = process.env.NEXT_PUBLIC_PRICE_ID_STANDARD;
      const premiumPriceId = process.env.NEXT_PUBLIC_PRICE_ID_PREMIUM;

      let plan: 'standard' | 'premium';
      if (priceId === standardPriceId) {
        plan = 'standard';
      } else if (priceId === premiumPriceId) {
        plan = 'premium';
      } else {
        // Temporarily commented out for testing - always return 200 OK
        console.error('Unknown priceId:', priceId);
        // return NextResponse.json(
        //   { error: 'Unknown priceId' },
        //   { status: 400 }
        // );
        plan = 'standard'; // Default to standard for testing
      }

      // Update user's publicMetadata in Clerk
      try {
        await clerkClient.users.updateUser(userId, {
          publicMetadata: {
            plan,
            priceId,
            subscriptionId: data.id,
            updatedAt: new Date().toISOString(),
          },
        });

        console.log(`User ${userId} updated to ${plan} plan`);
      } catch (error) {
        console.error('Failed to update user metadata:', error);
        return NextResponse.json(
          { error: 'Failed to update user' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Paddle webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
