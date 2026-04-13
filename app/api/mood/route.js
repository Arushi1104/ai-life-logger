import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request) {
  const { content } = await request.json();

  if (!content?.trim()) {
    return Response.json({ error: "No content provided." }, { status: 400 });
  }

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    max_tokens: 10,
    messages: [
      {
        role: "system",
        content: `You detect the mood of a journal entry. 
Reply with exactly one word from this list only: happy, sad, anxious, angry, calm, motivated, tired, grateful, confused, excited.
No punctuation. No explanation. Just the single word.`,
      },
      {
        role: "user",
        content,
      },
    ],
  });

  const mood = completion.choices[0].message.content.trim().toLowerCase();

  return Response.json({ mood });
}