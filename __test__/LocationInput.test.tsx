import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import LocationInput from "@/app/components/LocationInput";

describe("LocationInput", () => {
  const deleteInputValueMock = jest.fn();
  const changeInputValueMock = jest.fn();

  it ("delete should be disabled if not deletable and is disabled", () => {
    render(
      <LocationInput 
        name="testing"
        label="Testing"
        onInputChange={changeInputValueMock}
        onLocationDelete={deleteInputValueMock}
        deletable={true}
        disabled={true}
      />
    );
    const deleteBtn = screen.getByRole("button");
    expect(deleteBtn).toBeDisabled();

    fireEvent.click(deleteBtn);
    expect(deleteInputValueMock).toHaveBeenCalledTimes(0);
  });

  it ("input should be disabled if disable", () => {
    render(
      <LocationInput 
        name="testing"
        label="Testing"
        onInputChange={changeInputValueMock}
        onLocationDelete={deleteInputValueMock}
        deletable={false}
        disabled={true}
      />
    );

    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
  });

  it ("delete should be enabled if deletable and not disabled", async () => {
    const { container } = render(
      <LocationInput 
        name="testing"
        label="Testing"
        onInputChange={changeInputValueMock}
        onLocationDelete={deleteInputValueMock}
        deletable={true}
        disabled={false}
      />
    );

    const deleteBtn = screen.getByRole("button");
    expect(deleteBtn).not.toBeDisabled();
    fireEvent.click(deleteBtn);
    expect(deleteInputValueMock).toHaveBeenCalledTimes(1);
  });

  it ("delete should be disabled if deletable and disabled", async () => {
    const { container } = render(
      <LocationInput 
        name="testing"
        label="Testing"
        onInputChange={changeInputValueMock}
        onLocationDelete={deleteInputValueMock}
        deletable={true}
        disabled={true}
      />
    );

    const deleteBtn = screen.getByRole("button");
    expect(deleteBtn).toBeDisabled();
    fireEvent.click(deleteBtn);
    expect(deleteInputValueMock).toHaveBeenCalledTimes(0);
  });

  it ("input should be enabled if not disable", () => {
    render(
      <LocationInput 
        name="testing"
        label="Testing"
        onInputChange={changeInputValueMock}
        onLocationDelete={deleteInputValueMock}
        deletable={true}
        disabled={false}
      />
    );

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });
    expect(changeInputValueMock).toHaveBeenCalledTimes(1);
  });
});