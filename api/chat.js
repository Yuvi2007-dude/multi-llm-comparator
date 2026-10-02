export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const { prompt } = request.body;

    if (!prompt || !prompt.trim()) {
      return response.status(400).json({
        error: "Prompt is required",
      });
    }

    const geminiResponse = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },

        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await geminiResponse.json();

    if (!geminiResponse.ok) {
      return response.status(geminiResponse.status).json({
        error: data?.error?.message || "Gemini API request failed",
      });
    }

    const geminiText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response received from Gemini.";

    return response.status(200).json({
      response: geminiText,
    });
  } catch (error) {
    console.error(error);

    return response.status(500).json({
      error: "Something went wrong while contacting Gemini.",
    });
  }
}