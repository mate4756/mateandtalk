import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-05-27.dahlia',
});

export async function POST(req: NextRequest) {
  try {
    const { priceId } = await req.json();

    if (!priceId) {
      console.error('Checkout error: Price ID is missing');
      return NextResponse.json(
        { error: 'Price ID is required' },
        { status: 400 }
      );
    }

    console.log('Checkout request received for priceId:', priceId);

    // Determine payment mode based on price ID
    const standardPriceId = process.env.NEXT_PUBLIC_STRIPE_STANDARD_PRICE_ID;
    const premiumPriceId = process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID;
    
    console.log('Environment check - Standard Price ID configured:', !!standardPriceId);
    console.log('Environment check - Premium Price ID configured:', !!premiumPriceId);
    console.log('Environment check - Stripe Secret Key configured:', !!process.env.STRIPE_SECRET_KEY);
    
    const mode = priceId === standardPriceId ? 'payment' : 'subscription';
    console.log('Payment mode set to:', mode);

    const session = await stripe.checkout.sessions.create({
      mode,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/?canceled=true`,
    });

    console.log('Checkout session created successfully:', session.id);
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    
    if (error instanceof Stripe.errors.StripeError) {
      console.error('Stripe error type:', error.type);
      console.error('Stripe error message:', error.message);
      console.error('Stripe error code:', error.code);
      return NextResponse.json(
        { 
          error: error.message,
          type: error.type,
          code: error.code,
          details: 'Stripe API error occurred'
        },
        { status: 500 }
      );
    }
    
    // Handle other errors
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Non-Stripe error:', errorMessage);
    return NextResponse.json(
      { 
        error: errorMessage,
        details: 'Failed to create checkout session'
      },
      { status: 500 }
    );
  }
}
