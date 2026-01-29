/**
 * Converts a time string in format "1.10" (minutes.seconds) to milliseconds
 * @param timeString - Time string in format like "1.10" (1 minute 10 seconds), "2.30" (2 minutes 30 seconds), "0.45" (45 seconds), "3.0" (3 minutes)
 * @returns Time in milliseconds
 * @example
 * convertTimeToMs("1.10") => 70000 (1 minute + 10 seconds = 70000ms)
 * convertTimeToMs("2.30") => 150000 (2 minutes + 30 seconds = 150000ms)
 * convertTimeToMs("0.45") => 45000 (45 seconds = 45000ms)
 * convertTimeToMs("3.0") => 180000 (3 minutes = 180000ms)
 */
export function convertTimeToMs(timeString: string): number {
    // Remove any whitespace
    const cleaned = timeString.trim();

    // Split by dot to get minutes and seconds
    const parts = cleaned.split('.');

    // Parse minutes (part before dot)
    const minutes = parts.length > 0 ? parseInt(parts[0], 10) || 0 : 0;

    // Parse seconds (part after dot)
    const seconds = parts.length > 1 ? parseInt(parts[1], 10) || 0 : 0;

    // Convert to milliseconds
    // 1 minute = 60 seconds = 60000 milliseconds
    // 1 second = 1000 milliseconds
    const totalMs = (minutes * 60 * 1000) + (seconds * 1000);

    return totalMs;
}
export const song1 = {
    id: 1,
    name: "അൻപുടയോനേ നിൻ വാതിൽ",
    lyrics: [
        {
            "startTimeinMs": 6000,
            "text": "അൻപുടയോനേ നിൻ വാതിൽ"
        },
        {
            "startTimeinMs": 17000,
            "text": "ഹാലേലുയ്യാ ഉ ഹാലേലുയ്യാ"
        },
        {
            "startTimeinMs": 27000,
            "text": "മുട്ടുന്നു ദാസർ നാദം"
        },
        {
            "startTimeinMs": 38000,
            "text": "ബാറെക്മോർ കുറിയേലായിസ്സോൻ"
        },
        {
            "startTimeinMs": 54000,
            "text": "ആവശ്യത്താൽ യാചിക്കും"
        },
        {
            "startTimeinMs": convertTimeToMs("1.07"), // TODO: Replace with actual time in format "minutes.seconds" (e.g., "1.10")
            "text": "ഹാലേലുയ്യാ ഉ ഹാലേലുയ്യാ"
        },
        {
            "startTimeinMs": convertTimeToMs("1.16"),
            "text": "അടിയാരെ തള്ളീടല്ലേ"
        },
        {
            "startTimeinMs": convertTimeToMs("1.27"),
            "text": "ബാറെക്മോർ കുറിയേലായിസ്സോൻ"
        },
        {
            "startTimeinMs": convertTimeToMs("1.45"),
            "text": "അലിവോട് ശിക്ഷിച്ചടിയാരെ"
        },
        {
            "startTimeinMs": convertTimeToMs("1.55"),
            "text": "ഹാലേലുയ്യാ ഉ ഹാലേലുയ്യാ"
        },
        {
            "startTimeinMs": convertTimeToMs("2.06"),
            "text": "അരിശം നീക്കി കാക്കണമേ"
        },
        {
            "startTimeinMs": convertTimeToMs("2.16"),
            "text": "ബാറെക്മോർ കുറിയേലായിസ്സോൻ"
        },
        {
            "startTimeinMs": convertTimeToMs("2.34"),
            "text": "വാതിൽ തുറന്നീ പ്രാർത്ഥനയിൻ"
        },
        {
            "startTimeinMs": convertTimeToMs("2.44"),
            "text": "ഹാലേലുയ്യാ ഉ ഹാലേലുയ്യാ"
        },
        {
            "startTimeinMs": convertTimeToMs("2.55"),
            "text": "നാദം കേട്ടേകീടണമെ"
        },
        {
            "startTimeinMs": convertTimeToMs("3.04"),
            "text": "ബാറെക്മോർ കുറിയേലായിസ്സോൻ"
        },

    ]
};
console.log(song1)

const lyrics = `അൻപുടയോനേ നിൻ വാതിൽ
ഹാലേലുയ്യാ ഉ ഹാലേലുയ്യാ
മുട്ടുന്നു ദാസർ നാദം
ബാറെക്മോർ കുറിയേലായിസ്സോൻ

ആവശ്യത്താൽ യാചിക്കും
ഹാലേലുയ്യാ ഉ ഹാലേലുയ്യാ
അടിയാരെ തള്ളീടല്ലേ
ബാറെക്മോർ കുറിയേലായിസ്സോൻ

അലിവോട് ശിക്ഷിച്ചടിയാരെ
ഹാലേലുയ്യാ ഉ ഹാലേലുയ്യാ
അരിശം നീക്കി കാക്കണമേ
ബാറെക്മോർ കുറിയേലായിസ്സോൻ

വാതിൽ തുറന്നീ പ്രാർത്ഥനയിൻ
ഹാലേലുയ്യാ ഉ ഹാലേലുയ്യാ
നാദം കേട്ടേകീടണമെ
ബാറെക്മോർ കുറിയേലായിസ്സോൻ

നിന്നെ വിളിക്കുന്നേ നാഥാ
ഹാലേലുയ്യാ ഉ ഹാലേലുയ്യാ
നിന്നുതവിക്കായ് ബലഹീനർ
ബാറെക്മോർ കുറിയേലായിസ്സോൻ

നല്ലവനെ കാരുണ്യത്താൽ
ഹാലേലുയ്യാ ഉ ഹാലേലുയ്യാ
നൽകണമേ യാചിപ്പുകളെ
ബാറെക്മോർ കുറിയേലായിസ്സോൻ

കർത്താവേ കാരുണ്യത്താൽ
ഹാലേലുയ്യാ ഉ ഹാലേലുയ്യാ
കനിവടിയാരിൽ ചെയ്യണമേ
ബാറെക്മോർ കുറിയേലായിസ്സോൻ

നന്മ നിറഞ്ഞോനേയെൻ്റെ
ഹാലേലുയ്യാ ഉ ഹാലേലുയ്യാ
തിന്മകളെ നീയോർക്കരുതേ
ബാറെക്മോർ കുറിയേലായിസ്സോൻ`;

/**
 * Breaks a lyrics string into an array of lines
 * @param lyricsString - The lyrics string to break into lines
 * @param includeEmptyLines - Whether to include empty lines in the result (default: false)
 * @returns An array of lyric lines
 */
export function breakLyricsIntoLines(lyricsString: string, includeEmptyLines: boolean = false): string[] {
    // Split by newline characters (handles both \n and \r\n)
    const lines = lyricsString.split(/\r?\n/);

    // Filter out empty lines if includeEmptyLines is false
    if (!includeEmptyLines) {
        return lines.filter(line => line.trim().length > 0);
    }

    return lines;
}

// Example usage: break the lyrics into an array
export const lyricsArray = breakLyricsIntoLines(lyrics).map((line) => {
    return {
        startTimeinMs: 0,
        text: line
    }
});
console.log(lyricsArray);