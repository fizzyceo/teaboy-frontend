export function themeToCSS<CSSProperties>(theme: string) {
  if (theme.includes(",")) {
    const [theme1, theme2] = theme.split(",");
    return {
      background: `linear-gradient(to top right, ${theme1}, ${theme2})`,
    };
  } else {
    return {
      background: theme,
    };
  }
}
