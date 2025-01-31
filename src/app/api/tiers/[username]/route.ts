import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const GET = async (req: NextRequest, { params }: { params: { username: string } }) => {
  const { username } = params;

  if (!username) {
    return new NextResponse("Invalid username", { status: 400 });
  }

  const filePath = path.join(process.cwd(), 'public/uploads', `${username}.png`);

  if (!fs.existsSync(filePath)) {
    return new NextResponse("Image not found", { status: 404 });
  }

  const imageBuffer = fs.readFileSync(filePath);

  return new NextResponse(imageBuffer, {
    status: 200,
    headers: {
      'Content-Type': 'image/png',
    },
  });
};
