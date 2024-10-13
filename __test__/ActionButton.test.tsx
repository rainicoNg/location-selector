import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import ActionButton from "@/app/components/ActionButton";

describe("ActionButton", () => {
  const onClickMock = jest.fn();

  it("disables when props.disabled", () => {
    render(<ActionButton disabled={true} onClick={onClickMock} label={""} data-testid="action-button" />);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("fire on click when clicked", () => {
    render(<ActionButton disabled={false} onClick={onClickMock} label={""} data-testid="action-button" />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});