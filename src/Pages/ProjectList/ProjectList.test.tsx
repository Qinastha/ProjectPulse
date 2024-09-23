import React from "react";
import { useViewport } from "@Qinastha/pulse_library";
import { ProjectsList } from "./ProjectsList";
import { render, screen } from "@testing-library/react";
import { getProjects } from "../../store/projectSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";

jest.mock("@Qinastha/pulse_library", () => ({
  useViewport: jest.fn(),
}));

jest.mock("@Qinastha/pulse_library", () => ({
  useViewport: jest.fn(),
}));

jest.mock("../../hooks", () => ({
  ...jest.requireActual("../../hooks"),
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(),
}));

jest.mock("../../store/projectSlice", () => ({
  ...jest.requireActual("../../store/projectSlice"),
  fetchAllProjects: jest.fn(),
  getProjects: jest.fn(),
}));

jest.mock("../../store/popUpSlice", () => ({
  ...jest.requireActual("../../store/popUpSlice"),
  setPopUpMode: jest.fn(),
  togglePopUp: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

// Mock child components
jest.mock("./CarouselProjects/CarouselProjects", () => ({
  CarouselProjects: () => (
    <div data-testid="carousel-projects">Carousel Projects Component</div>
  ),
}));

jest.mock("./GridProjects/GridProjects", () => ({
  GridProjects: () => (
    <div data-testid="grid-projects">Grid Projects Component</div>
  ),
}));

describe("ProjectsList Component", () => {
  const mockProjects = ["Project 1", "Project 2", "Project 3"];
  const mockDispatch = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();

    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);

    (useAppSelector as jest.Mock).mockImplementation(selector => {
      if (selector === getProjects) {
        return mockProjects;
      }
      return null;
    });

    (useViewport as jest.Mock).mockReturnValue({ viewportWidth: 800 });
  });

  test("renders CarouselProjects when viewportWidth < 1024", () => {
    (useViewport as jest.Mock).mockReturnValue({ viewportWidth: 800 });

    render(<ProjectsList />);

    expect(screen.getByTestId("carousel-projects")).toBeTruthy();
    expect(screen.queryByTestId("grid-projects")).not.toBeTruthy();
  });

  test("renders GridProjects when viewportWidth >= 1024", () => {
    (useViewport as jest.Mock).mockReturnValue({ viewportWidth: 1200 });

    render(<ProjectsList />);

    expect(screen.getByTestId("grid-projects")).toBeTruthy();
    expect(screen.queryByTestId("carousel-projects")).not.toBeTruthy();
  });
});
