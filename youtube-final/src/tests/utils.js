import { MemoryRouter, Routes } from "react-router-dom";

export const withRouter = (routes, initialEntry = "/") => {
  return (
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>{routes}</Routes>
    </MemoryRouter>
  );
};
