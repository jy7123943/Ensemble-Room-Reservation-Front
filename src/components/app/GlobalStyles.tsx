import { Global, css } from "@emotion/react";
import { colors } from "@toss/tds-colors";

export function GlobalStyles() {
  return (
    <Global
      styles={css({
        ":root": {
          color: colors.grey900,
          background: colors.white,
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
          background: colors.white,
        },
        "button, textarea": {
          font: "inherit",
        },
        "#root": {
          display: "flex",
          justifyContent: "center",
          background: colors.white,
        },
      })}
    />
  );
}
