/**
 * @vitest-environment jsdom
 */
import { JSDOM } from "jsdom";
import { expect, test } from "vitest";

function stringToDataUrl(str, BlobClass) {
  return new Promise((res) => {
    const blob = new BlobClass([str], { type: "plain/text" });
    const reader = new FileReader();
    reader.onload = (e) => res(e.target.result);
    reader.readAsDataURL(blob);
  });
}

test("Fails", async () => {
  const actual = await stringToDataUrl("hello world", Blob);
  expect(actual).toEqual("data:plain/text;base64,aGVsbG8gd29ybGQ=");
});

test("Passes", async () => {
  const dom = new JSDOM();
  const actual = await stringToDataUrl("hello world", dom.window.Blob);
  expect(actual).toEqual("data:plain/text;base64,aGVsbG8gd29ybGQ=");
});
