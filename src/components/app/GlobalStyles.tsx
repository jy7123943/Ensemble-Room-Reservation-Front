import { Global, css } from "@emotion/react";

export function GlobalStyles() {
  return (
    <Global
      styles={css({
        ":root": {
          color: "#1f2937",
          background:
            "radial-gradient(circle at top, rgba(49, 130, 246, 0.16), transparent 28%), linear-gradient(180deg, #f3f7fb 0%, #eef3f8 100%)",
          fontFamily:
            "'Pretendard Variable', 'Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif",
        },
        "*": {
          boxSizing: "border-box",
        },
        "html, body, #root": {
          minHeight: "100%",
        },
        body: {
          margin: 0,
        },
        "button, textarea": {
          font: "inherit",
        },
        "#root": {
          display: "flex",
          justifyContent: "center",
        },
      })}
    />
  );
}
