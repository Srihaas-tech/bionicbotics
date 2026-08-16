const assert = require("node:assert/strict");
const test = require("node:test");

const config = require("../tailwind.config.js");

const toRgb = (hex) => {
  const value = hex.replace("#", "");
  return [0, 2, 4].map((offset) => parseInt(value.slice(offset, offset + 2), 16));
};

const luminance = (hex) => {
  const channels = toRgb(hex).map((value) => {
    const normalized = value / 255;
    return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
};

const contrast = (foreground, background) => {
  const lighter = Math.max(luminance(foreground), luminance(background));
  const darker = Math.min(luminance(foreground), luminance(background));
  return (lighter + 0.05) / (darker + 0.05);
};

test("Tailwind exposes the approved Balanced Bionic palette", () => {
  assert.deepEqual(config.theme.extend.colors.bionic, {
    50: "#F1F7F4",
    100: "#DDEBE5",
    700: "#154733",
    900: "#092017",
    lime: "#A7D129",
  });
});

test("approved text and background combinations meet WCAG AA", () => {
  const bionic = config.theme.extend.colors.bionic;
  const pairs = [
    ["#FFFFFF", bionic[900]],
    ["#FFFFFF", bionic[700]],
    ["#1F2937", bionic[50]],
    ["#1F2937", bionic[100]],
  ];

  for (const [foreground, background] of pairs) {
    assert.ok(contrast(foreground, background) >= 4.5);
  }
});
