import { NextRequest, NextResponse } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../../../../firebase/firebase';

interface UserData {
  tierImageBase64?: string;
  lastUpdated?: string;
  imageSettings?: {
    isCard: string;
    isText: string;
    isMode: string;
    contributeCount: number;
  };
  [key: string]: any;
}

interface RouteParams {
  params: {
    userId: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  try {
    const { userId } = params;

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

interface ApiRequest extends NextApiRequest {
  query: {
    userId: string;
  };
}

interface ApiResponse extends NextApiResponse {

}

export default async function handler(req: ApiRequest, res: ApiResponse): Promise<void> {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  try {
    const { userId } = req.query;

    if (!userId || typeof userId !== 'string') {
      res.status(400).json({ message: 'User ID is required' });
      return;
    }

    const userRef = doc(firestore, 'users', userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const userData: UserData = userDoc.data() as UserData;
    const base64Image = userData.tierImageBase64;

    if (!base64Image) {
      res.status(404).json({ message: 'Tier image not found' });
      return;
    }

    const base64Data = base64Image.replace(/^data:image\/[a-z]+;base64,/, '');
    const imageBuffer = Buffer.from(base64Data, 'base64');

    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.send(imageBuffer);

  } catch (error) {
    console.error('Error serving tier image:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
