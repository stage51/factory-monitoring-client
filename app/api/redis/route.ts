import Redis from "ioredis";
import { NextRequest, NextResponse } from "next/server";

// Инициализация Redis
export const redis = new Redis({
  host: process.env.NEXT_PUBLIC_REDIS_HOST || "localhost",
  port: parseInt(process.env.NEXT_PUBLIC_REDIS_PORT || "6379", 10),
  password: process.env.NEXT_PUBLIC_REDIS_PASSWORD || undefined,
});

// Обработчик GET-запросов
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get("key");

    if (!key) {
      return NextResponse.json(
        { error: "Missing required parameter: key" },
        { status: 400 }
      );
    }

    const value = await redis.get(key);
    return NextResponse.json({ key, value: value || null });
  } catch (error) {
    console.error("Error processing GET request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Обработчик POST-запросов
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, key, value } = body;

    if (!action || !key) {
      return NextResponse.json(
        { error: "Missing required fields: action or key" },
        { status: 400 }
      );
    }

    switch (action) {
      case "set":
        if (!value) {
          return NextResponse.json(
            { error: "Missing value for 'set' action" },
            { status: 400 }
          );
        }
        await redis.set(key, value);
        return NextResponse.json({
          message: `Key '${key}' set successfully`,
        });

      case "delete":
        await redis.del(key);
        return NextResponse.json({
          message: `Key '${key}' deleted successfully`,
        });

      default:
        return NextResponse.json(
          { error: `Unsupported action: ${action}` },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Error processing POST request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
