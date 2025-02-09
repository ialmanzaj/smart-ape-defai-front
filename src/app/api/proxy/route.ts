// src/app/api/proxy/route.ts
import type { NextRequest } from "next/server";
import { NEXT_PUBLIC_API_URL } from "~/config";

// Use Edge runtime for better performance
export const runtime = "edge";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "text/event-stream",
            },
            body: JSON.stringify({
                input: body.input,
                conversation_id: body.conversation_id || 0,
            }),
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        return new Response(response.body, {
            headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
            },
        });
    } catch (error) {
        return new Response(
            JSON.stringify({
                event: "error",
                data: error instanceof Error ? error.message : "Unknown error",
            }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            },
        );
    }
}
