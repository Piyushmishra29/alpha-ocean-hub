import { describe, it, expect } from "vitest";
import { waLink } from "./whatsapp";
import { SITE } from "./site";

describe("waLink", () => {
  it("builds a wa.me url with the site number", () => {
    expect(waLink("hi")).toContain(`https://wa.me/${SITE.whatsappNumber}`);
  });
  it("url-encodes the message text", () => {
    const url = waLink("I'd like a lesson 🏄");
    expect(url).toContain("text=I'd%20like%20a%20lesson%20%F0%9F%8F%84");
  });
  it("has no spaces in the final url", () => {
    expect(waLink("a b c").includes(" ")).toBe(false);
  });
});
