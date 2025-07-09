import { NextRequest, NextResponse } from 'next/server';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../../../../firebase/firebase';
import { UserData } from '@/types/api';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
): Promise<NextResponse> {
  try {
    const { userId } = await params;

    if (!userId) {
      return new NextResponse('User ID is required', { status: 400 });
    }

    const userRef = doc(firestore, 'users', userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      return new NextResponse('User not found', { status: 404 });
    }

    const userData: UserData = userDoc.data() as UserData;
    const base64Image = userData.tierImageBase64;

    if (!base64Image) {
      return new NextResponse('Tier image not found', { status: 404 });
    }

    const base64Data = base64Image.replace(/^data:image\/[a-z]+;base64,/, '');
    const imageBuffer = Buffer.from(base64Data, 'base64');

    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=3600',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Error serving tier image:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}
