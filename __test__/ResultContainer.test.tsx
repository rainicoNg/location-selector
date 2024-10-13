import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ResultContainer from "@/app/components/ResultContainer";
import { PathDetails } from "@/app/page";

describe("ResultContainer", () => {
  it("displays instruction if status is none", async () => {
    const res: PathDetails = {
      status: "none",
      message: "Sumbit your pick up and drop off locations to see the routes"
    };
    render(<ResultContainer pathDetails={res} />);

    const header = screen.getByText("Waiting for input");
    expect(header).toBeInTheDocument();
    const msg = screen.getByText(res.message);
    expect(msg).toBeInTheDocument();
  });

  it("displays loading if status is in-progress", async () => {
    const res: PathDetails = {
      status: "in-progress",
      message: "Getting path details"
    };
    render(<ResultContainer pathDetails={res} />);
    const header = screen.getByText("Waiting for result");
    expect(header).toBeInTheDocument();
    const msg = screen.getByText(res.message);
    expect(msg).toBeInTheDocument();
  });

  it("displays error if status is error", async () => {
    const res: PathDetails = {
      status: "error",
      message: "There is an error when retrieving the route. Please re-submit."
    };
    render(<ResultContainer pathDetails={res} />);
    const header = screen.getByText("Failed");
    expect(header).toBeInTheDocument();
    const msg = screen.getByText(res.message);
    expect(msg).toBeInTheDocument();
  });

  it("displays success if status is success", async () => {
    const res: PathDetails = {
      status: "success",
      message: "Path Details",
      path: [
        ["22.337232550952", "114.1727092165061"],
        ["22.34182289644873", "114.17986999386686"],
        ["22.4238794300859", "114.20667850994673"],
        ["22.341528623276442", "114.26318421376702"],
        ["22.283054785661843", "114.13628458847225"]
      ],
      totalDistance: 100,
      totalTime: 100
    };
    render(<ResultContainer pathDetails={res} />);
    const header = screen.getByText("Success!");
    expect(header).toBeInTheDocument();

    const msg = screen.getByText(res.message);
    expect(msg).toBeInTheDocument();
  });
});