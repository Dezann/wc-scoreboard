import { render, screen, fireEvent } from "@testing-library/react";
import Summary from "./Summary";

describe("Summary", () => {
    it("should render a button", () => {
        render(<Summary />);
        const button = screen.getByRole("button", { name: "Get summary" });
        expect(button).toBeInTheDocument();
    });

    it("should open the dialog when the button is clicked", () => {
        render(<Summary />);
        const button = screen.getByRole("button", { name: "Get summary" });
        fireEvent.click(button);
        const dialog = screen.getByRole("dialog");
        expect(dialog).toBeInTheDocument();
    });
});
