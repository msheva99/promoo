import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const key_kuota = "kuota_1001bites";
  const ip = request.headers.get('x-nf-client-connection-ip') || request.headers.get('x-forwarded-for') || "127.0.0.1";
  const key_user = `user_claimed_1001:${ip}`;

  try {
    const total_kuota = 20;
    const hasClaimed = await redis.get(key_user);
    let currentCount = (await redis.get<number>(key_kuota)) || 0;

    // Jika sudah pernah klaim, beri tahu sisa kuota saat ini
    if (hasClaimed) {
      return NextResponse.json({ 
        success: false, 
        already: true, 
        remaining: Math.max(0, total_kuota - currentCount) 
      });
    }

    // Jika kuota masih ada, tambahkan klaim
    if (currentCount < total_kuota) {
      await redis.set(key_user, true, { ex: 86400 });
      const newCount = await redis.incr(key_kuota);
      return NextResponse.json({ 
        success: true, 
        remaining: total_kuota - newCount 
      });
    }

    // Jika habis
    return NextResponse.json({ success: false, remaining: 0 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "DB Error" }, { status: 500 });
  }
}