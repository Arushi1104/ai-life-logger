import Groq from "groq-sdk";
import { supabase } from "../../lib/supabase";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request) {
  const { question } = await request.json();

  if (!question?.trim()) {
    return Response.json({ error: "No question provided." }, { status: 400 });
  }

  const { data: entries, error } = await supabase
    .from("entries")
    .select("content, created_at")
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) {
    return Response.json({ error: "Could not load entries." }, { status: 500 });
  }

  if (!entries || entries.length === 0) {
    return Response.json({
      answer: "You have no journal entries yet. Start writing and I will be able to help you reflect on them.",
    });
  }

  const formattedEntries = entries
    .map((e) => {
      const date = new Date(e.created_at).toLocaleDateString("en-IN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return `[${date}]\n${e.content}`;
    })
    .join("\n\n---\n\n");

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    max_tokens: 1024,
    messages: [
      {
        role: "system",
        content: `You are a thoughtful journaling assistant. You have access to the user's personal journal entries.
Answer questions about their life, patterns, emotions, and experiences based only on what they have written.
Be warm, honest, and insightful. Never make things up — if the entries do not contain enough information, say so.
Do not use emojis.

Here are the user's journal entries, from most recent to oldest:

${formattedEntries}`,
      },
      {
        role: "user",
        content: question,
      },
    ],
  });

  return Response.json({ answer: completion.choices[0].message.content });
}