import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import Home from "@/app/page";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />);
    const heading = screen.getByText("Location Selector");
    expect(heading).toBeInTheDocument();
  });

  it("displays correct init value for location input", () => {
    const { container } = render(<Home />);
    const locationInputs = container.querySelectorAll("div.location-input");
    for (let i = 0; i < locationInputs.length; i++) {
      const label = locationInputs[i].querySelector("label")?.textContent;
      const input = locationInputs[i].querySelector("input");
      expect(label).toBe(`Location ${i + 1} ${i === 0 ? "(Pick Up)" : i === locationInputs.length - 1 ? "(Drop Off)" : ""}`);
      expect(input).toHaveValue("");
    }
  });

  it ("location input disable and enable correctly", () => {
    const { container } = render(<Home />);
    const locationInput = container.querySelector("div.location-input");
    const deleteBtn = locationInput?.querySelector("button");
    expect(deleteBtn).toBeDisabled();

    const input = locationInput?.querySelector("input")!;

    fireEvent.change(input, { target: { value: "test" } });
    expect(deleteBtn).not.toBeDisabled();

    fireEvent.change(input, { target: { value: "   " } });
    expect(deleteBtn).not.toBeDisabled();

    fireEvent.change(input, { target: { value: "" } });
    expect(deleteBtn).toBeDisabled();
  });

  it ("clear location input when clear btn is clicked", () => {
    const { container } = render(<Home />);
    const clearBtn = container.querySelector(".action-button.clear");

    const locationInputs = container.querySelectorAll("div.location-input");
    for (let i = 0; i < locationInputs.length; i++) {
      const input = locationInputs[i].querySelector("input")!;
      fireEvent.change(input, { target: { value: "test" } });
      expect(input).toHaveValue("test");
    }
    fireEvent.click(clearBtn!);
    for (let i = 0; i < locationInputs.length; i++) {
      const input = locationInputs[i].querySelector("input")!;
      expect(input).toHaveValue("");
    }
  });

  it ("cannot submit if input is empty", () => {
    const { container } = render(<Home />);
    const submitBtn = container.querySelector(".action-button.submit");
    expect(submitBtn).toBeDisabled();
  });

  it("display info of in-progress", async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: "mockToken" });
    mockedAxios.get.mockResolvedValueOnce({ data: { status: "in progress" } });

    const { container } = render(<Home />);

    fireEvent.change(container.querySelector("input[name=location_0]")!, { target: { value: "Location A" } });
    fireEvent.change(container.querySelector("input[name=location_1]")!, { target: { value: "Location B" } });
    fireEvent.click(container.querySelector(".action-button.submit")!);

    // Wait for the state to update
    await waitFor(() => {
      expect(screen.getByText("Waiting for result")).toBeInTheDocument();
      expect(screen.getByText("Getting path details")).toBeInTheDocument();
    });
  });

  it("display info of success", async () => {
    const tokenResponse = { data: "mockToken" };
    const routeResponse = {
      data: {
        status: "success",
        total_distance: 100,
        total_time: 60,
        path: [["22.372081", "114.107877"], ["22.326442", "114.167811"]]
      }
    };

    mockedAxios.post.mockResolvedValueOnce(tokenResponse);
    mockedAxios.get.mockResolvedValueOnce(routeResponse);

    const { container } = render(<Home />);

    fireEvent.change(container.querySelector("input[name=location_0]")!, { target: { value: "Location A" } });
    fireEvent.change(container.querySelector("input[name=location_1]")!, { target: { value: "Location B" } });
    fireEvent.click(container.querySelector(".action-button.submit")!);

    await waitFor(() => {
      expect(screen.getByText("Path Details")).toBeInTheDocument();
    });
    expect(screen.getByText("Total Distance: 100")).toBeInTheDocument();
    expect(screen.getByText("Total Time: 60")).toBeInTheDocument();
  });

  it("display info of init", async () => {
    render(<Home />);

    expect(screen.getByText("Waiting for input")).toBeInTheDocument();
    expect(screen.getByText("Sumbit your pick up and drop off locations to see the routes")).toBeInTheDocument();
  });

  it("display info of failure", async () => {
    const tokenResponse = { data: "mockToken" };
    const routeResponse = {
      data: {
        status: "failure",
        error: "Location not accessible by car"
      }
    };
    mockedAxios.post.mockResolvedValueOnce(tokenResponse);
    mockedAxios.get.mockResolvedValueOnce(routeResponse);

    const { container } = render(<Home />);

    fireEvent.change(container.querySelector("input[name=location_0]")!, { target: { value: "Location A" } });
    fireEvent.change(container.querySelector("input[name=location_1]")!, { target: { value: "Location B" } });
    fireEvent.click(container.querySelector(".action-button.submit")!);

    await waitFor(() => {
      expect(screen.getByText("Failed")).toBeInTheDocument();
    });
    expect(screen.getByText("Location not accessible by car")).toBeInTheDocument();
  });

  it("display info of error", async () => {
    const tokenResponse = { data: "mockToken" };

    mockedAxios.post.mockResolvedValueOnce(tokenResponse);
    mockedAxios.get.mockRejectedValueOnce(new Error('Mock error'));

    const { container } = render(<Home />);

    fireEvent.change(container.querySelector("input[name=location_0]")!, { target: { value: "Location A" } });
    fireEvent.change(container.querySelector("input[name=location_1]")!, { target: { value: "Location B" } });
    fireEvent.click(container.querySelector(".action-button.submit")!);

    await waitFor(() => {
      expect(screen.getByText("Failed")).toBeInTheDocument();
    });
    expect(screen.getByText("There is an error when retrieving the route. Please re-submit.")).toBeInTheDocument();
  });

    it("display info of error in token", async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error('Mock error'));

    const { container } = render(<Home />);

    fireEvent.change(container.querySelector("input[name=location_0]")!, { target: { value: "Location A" } });
    fireEvent.change(container.querySelector("input[name=location_1]")!, { target: { value: "Location B" } });
    fireEvent.click(container.querySelector(".action-button.submit")!);

    await waitFor(() => {
      expect(screen.getByText("Failed")).toBeInTheDocument();
    });
    expect(screen.getByText("There is an error when retrieving the route. Please re-submit.")).toBeInTheDocument();
  });
})