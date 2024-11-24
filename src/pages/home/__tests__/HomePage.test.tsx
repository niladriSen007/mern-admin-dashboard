import { render, screen } from "@testing-library/react"
import HomePage from "../HomePage"

describe("Home page", () => {
  it("should render home page", () => {
    render(<HomePage />)
    expect(screen.getByText(/Home page/)).toBeInTheDocument()
  })
})