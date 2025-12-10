import { NextResponse } from 'next/server';

export async function GET(request, context) {
  const params = await context.params;
  const pincode = params?.pincode || '';

  if (!/^\d{6}$/.test(pincode)) {
    return NextResponse.json({ error: 'Invalid pincode format' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Pincode API error' }, { status: response.status });
    }

    const data = await response.json();
    
    if (data && data[0] && data[0].Status === 'Success' && data[0].PostOffice && data[0].PostOffice.length > 0) {
      const postOffice = data[0].PostOffice[0];
      return NextResponse.json({
        success: true,
        pincode: postOffice.Pincode,
        taluk: postOffice.Block || postOffice.Name || '',
        district: postOffice.District || '',
        state: postOffice.State || '',
        postOfficeName: postOffice.Name || '',
        region: postOffice.Region || ''
      });
    }
    
    return NextResponse.json({ error: 'No data found for pincode' }, { status: 404 });
  } catch (error) {
    console.error('Pincode fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch pincode data' }, { status: 500 });
  }
}
