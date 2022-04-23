import { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";

//here is where we would provide custom render behavior (context providers, etc) if used
//imports from @testing-library/react would be changed to this file
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, options);

export * from "@testing-library/react";
export { customRender as render };
