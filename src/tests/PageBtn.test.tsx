import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PageBtn from "../components/PageBtn";

describe("PageBtn", () => {
  it("affiche l'état actif (aria-current + disabled)", () => {
    render(<PageBtn active>{3}</PageBtn>);
    const btn = screen.getByRole("button", { name: "3" });
    expect(btn).toHaveAttribute("aria-current", "page");
    expect(btn).toBeDisabled();
  });

  it("déclenche onClick quand non actif", () => {
    const onClick = vi.fn();
    render(<PageBtn onClick={onClick}>2</PageBtn>);
    fireEvent.click(screen.getByRole("button", { name: "2" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
