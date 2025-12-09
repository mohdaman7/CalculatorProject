import { NextResponse } from 'next/server';

export async function GET(request, context) {
  // Next.js 15+ requires awaiting params
  const params = await context.params;
  const pincode = params?.pincode || '';

  if (!/^\d{6}$/.test(pincode)) {
    return NextResponse.json({ error: 'Invalid pincode format' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://dev.apiman.in/pincode/${pincode}`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Pincode API error' }, { status: response.status });
    }

    const data = await response.json();
    
    // Extract the first post office and return formatted data
    if (data.Postoffice && data.Postoffice.length > 0) {
      const postOffice = data.Postoffice[0];
      return NextResponse.json({
        success: true,
        taluk: postOffice.Taluk || '',
        district: postOffice.Districtname || '',
        state: postOffice.statename || '',
        pincode: postOffice.pincode
      });
    }
    
    return NextResponse.json({ error: 'No data found for pincode' }, { status: 404 });
  } catch (error) {
    console.error('Pincode fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch pincode data' }, { status: 500 });
  }
}
