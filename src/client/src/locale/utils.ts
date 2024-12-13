function variabilize(text: string, variables: Record<string, string | number>) {
    let variabilizedText = text;
    for (const [key, value] of Object.entries(variables)) {
        const REGEX = new RegExp(`{{${key}}}`, 'g');
        variabilizedText = variabilizedText.replace(REGEX, `${value}`);
    }
    return variabilizedText;
}
export { variabilize };
