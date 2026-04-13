import Groq from "groq-sdk";
import { supabase } from "../../lib/supabase";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function GET() {
  const { data: entries, error } = await supabase
    .from("entries")
    .select("content, mood, created_at")
    .order("created_at", { ascending: false })
    .limit(30);

  if (error) {
    return Response.json({ error: "Could not load entries." }, { status: 500 });
  }

  if (!entries || entries.length < 3) {
    return Response.json({
      patterns: null,
      message: "Write at least 3 entries to see patterns.",
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
        content: `You are a pattern detection agent analyzing a person's private journal.
Your job is to find meaningful recurring patterns across all entries.
Reply with a JSON object only. No explanation, no markdown, no backticks.
The JSON must have exactly these keys:
{
  "mood_pattern": "one sentence about the overall emotional trend",
  "recurring_themes": ["theme 1", "theme 2", "theme 3"],
  "positive_patterns": ["something they do well or feel good about regularly"],
  "watch_out": ["something that keeps coming up negatively or needs attention"],
  "one_honest_observation": "one direct, thoughtful observation about this person based on their entries"
}
Base everything strictly on the entries. Do not invent. Do not use emojis.`,
      },
      {
        role: "user",
        content: formattedEntries,
      },
    ],
  });

  let patterns;
  try {
    patterns = JSON.parse(completion.choices[0].message.content.trim());
  } catch {
    return Response.json(
      { error: "Could not parse patterns from AI response." },
      { status: 500 }
    );
  }

  return Response.json({ patterns });
}