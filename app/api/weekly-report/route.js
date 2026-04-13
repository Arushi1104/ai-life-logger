import Groq from "groq-sdk";
import { supabase } from "../../lib/supabase";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function GET() {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const { data: entries, error } = await supabase
    .from("entries")
    .select("content, mood, created_at")
    .gte("created_at", sevenDaysAgo.toISOString())
    .order("created_at", { ascending: true });

  if (error) {
    return Response.json({ error: "Could not load entries." }, { status: 500 });
  }

  if (!entries || entries.length === 0) {
    return Response.json({
      report: null,
      message: "No entries found from the past 7 days.",
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
      return `[${date}] [mood: ${e.mood || "unknown"}]\n${e.content}`;
    })
    .join("\n\n---\n\n");

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    max_tokens: 1024,
    messages: [
      {
        role: "system",
        content: `You are a thoughtful weekly journal summarizer.
Write a warm, honest weekly report based on the journal entries provided.
Reply with a JSON object only. No explanation, no markdown, no backticks.
The JSON must have exactly these keys:
{
  "greeting": "a short personal greeting to open the report, one sentence",
  "mood_arc": "how the person's mood evolved across the week, two to three sentences",
  "highlights": ["up to 3 meaningful moments or things that stood out this week"],
  "reflection": "one honest, thoughtful paragraph reflecting on the week as a whole",
  "going_forward": "one encouraging but grounded sentence about the week ahead"
}
Base everything strictly on the entries. Do not invent. Do not use emojis.`,
      },
      {
        role: "user",
        content: formattedEntries,
      },
    ],
  });

  let report;
  try {
    report = JSON.parse(completion.choices[0].message.content.trim());
  } catch {
    return Response.json(
      { error: "Could not parse report from AI response." },
      { status: 500 }
    );
  }

  return Response.json({ report, entryCount: entries.length });
}