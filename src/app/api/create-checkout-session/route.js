import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { db } from '../../../../lib/db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body = await req.json();

    // 1. Find artist by name
    const artist = await db.artist.findFirst({
      where: {
        name: body.artistName,
      },
    });

    if (!artist) {
      return NextResponse.json({ error: 'Artist not found' }, { status: 404 });
    }

    // 2. Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${body.eventType} with ${body.artistName}`,
              description: `Booking with ${body.artistName}`,
            },
            unit_amount: body.amount * 100, // amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/success`,
      cancel_url: `${req.headers.get('origin')}/cancel`,
    });

    // 3. Save booking in DB
    await db.booking.create({
      data: {
        artistId: artist.id,
        userId: body.userId,
        eventType: body.eventType,
        eventDate: new Date(body.date),
        eventTime: body.time,
        guests: parseInt(body.guests),
        bookingFee: body.amount,
        location: body.location,
        stripeSessionId: session.id,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Checkout session creation failed:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
