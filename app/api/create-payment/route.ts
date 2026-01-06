// app/api/create-payment/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Интеграция с платежной системой
    const paymentData = {
      PublicId: process.env.CLOUDPAYMENTS_PUBLIC_ID,
      Amount: body.amount,
      Currency: 'RUB',
      InvoiceId: body.orderId,
      Description: body.description,
      AccountId: body.email || 'guest',
      ReturnUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/order-success`,
      FailUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/order-failed`
    };
    
    // В реальности здесь будет вызов API платежной системы
    return NextResponse.json({
      success: true,
      paymentUrl: `https://sandbox.cloudpayments.ru/pay?data=${encodeURIComponent(JSON.stringify(paymentData))}`
    });
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Payment creation failed' },
      { status: 500 }
    );
  }
}