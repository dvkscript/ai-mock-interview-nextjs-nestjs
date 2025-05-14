export function extractJSONBlock(text: string): string | null {
    const match = text.match(/```json\s*([\s\S]*?)\s*```/i);
    if (match && match[1]) {
        try {
            return match[1].trim()
        } catch {
            console.warn("Found block is not valid JSON");
        }
    }
    return null;
}

export function safeParseJSON<T>(jsonStr: string): T | null {
    try {
        return JSON.parse(jsonStr);
    } catch (e) {
        console.error("JSON parse error:", e);
        return null;
    }
}