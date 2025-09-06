import { GoogleGenAI, Type } from "@google/genai";
import type { Recipient } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateEmailContent(prompt: string): Promise<{ subject: string; body: string } | null> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Based on the following prompt, generate a compelling email subject line and body. The body should use placeholders like {{name}} for personalization. Prompt: "${prompt}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            subject: {
              type: Type.STRING,
              description: "The subject line of the email."
            },
            body: {
              type: Type.STRING,
              description: "The body of the email, using placeholders like {{name}} where appropriate."
            }
          },
          required: ["subject", "body"]
        }
      }
    });

    const jsonString = response.text.trim();
    try {
        const content = JSON.parse(jsonString);
        return content;
    } catch(e) {
        console.error("Failed to parse JSON response from AI:", jsonString);
        throw new Error("AI returned malformed content. Please try a different prompt.");
    }
  } catch (error) {
    console.error("Error generating email content:", error);
    if (error instanceof Error && error.message.includes("malformed")) {
      throw error;
    }
    throw new Error("Failed to generate content from AI. Please check the console for details.");
  }
}


export async function personalizeEmail(recipient: Recipient, subjectTemplate: string, bodyTemplate: string): Promise<{ subject: string; body: string }> {
   try {
    const prompt = `
      Personalize the following email subject and body for the given recipient.
      - Replace all placeholders like {{name}}, {{product}}, etc., with the recipient's actual data.
      - Ensure the final output is a valid JSON object with "subject" and "body" keys.

      Recipient Data:
      ${JSON.stringify(recipient)}

      Subject Template:
      ${subjectTemplate}

      Body Template:
      ${bodyTemplate}
    `;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    subject: {
                        type: Type.STRING,
                        description: "The final, personalized email subject line."
                    },
                    body: {
                        type: Type.STRING,
                        description: "The final, personalized email body."
                    }
                },
                required: ["subject", "body"]
            }
        }
    });
    
    const jsonString = response.text.trim();
    try {
        const content = JSON.parse(jsonString);
        return content;
    } catch(e) {
        console.error(`Failed to parse personalized JSON for ${recipient.email}:`, jsonString);
        throw new Error(`AI returned malformed content for ${recipient.email}.`);
    }

  } catch (error) {
    console.error("Error personalizing email:", error);
    if (error instanceof Error && error.message.includes("malformed")) {
      throw error;
    }
    throw new Error(`Failed to personalize email for ${recipient.email}.`);
  }
}