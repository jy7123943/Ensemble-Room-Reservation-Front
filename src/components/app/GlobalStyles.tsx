import { Global, css } from "@emotion/react";
import { colors } from "@toss/tds-colors";

export function GlobalStyles() {
  return (
    <Global
      styles={css({
        ":root": {
          color: colors.grey900,
          background:
            `radial-gradient(circle at top, rgba(49, 130, 246, 0.16), transparent 28%), linear-gradient(180deg, ${colors.grey50} 0%, ${colors.blue50} 100%)`,
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
