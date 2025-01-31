import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { image, username } = body;

  if (!image || !username) {
    return new NextResponse("Invalid request", { status: 400 });
  }

  const base64Data = image.replace(/^data:image\/png;base64,/, '');
  const filePath = path.join(process.cwd(), 'public/uploads', `${username}.png`);

  fs.writeFileSync(filePath, base64Data, 'base64');

  return new NextResponse(JSON.stringify({ message: 'Image saved successfully' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
