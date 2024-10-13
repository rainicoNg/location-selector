import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import IconButton from "@/app/components/IconButton";
import { fa0 } from "@fortawesome/free-solid-svg-icons";

describe("IconButton", () => {
  const onClickMock = jest.fn();
  jest.mock("@fortawesome/react-fontawesome", () => ({
    FontAwesomeIcon: ""
  }));

  it("disables when props.disabled", () => {
    render(<IconButton disabled onClick={onClickMock} icon={fa0} />);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("fire on click when clicked", () => {
    render(<IconButton disabled ={false} onClick={onClickMock} icon={fa0} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});