import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

// Initialize OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

    // Making the request to OpenAI's chat-based model
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Use the GPT-3.5 turbo model
      messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: prompt }],
      max_tokens: 150, // Limit tokens to avoid excessive text
    });

    const text = response.choices[0].message.content.trim();

    // Returning a response stream (Edge function supports streams)
    const stream = new ReadableStream({
      async start(controller) {
        controller.enqueue(new TextEncoder().encode(text));
        controller.close();
      },
    });

    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });

  } catch (error) {
    // Generic error handling
    console.error('An error occurred:', error);

    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}

