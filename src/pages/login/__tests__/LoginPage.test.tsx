import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import LoginPage from "../LoginPage"

import jest from 'jest-mock';
import LoginForm from "../_components/LoginForm";

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
describe("Login page", () => {

  it("should render login page", () => {
    render(<LoginPage />)
    render(<LoginForm />)
/*     expect(screen.getByText('Sign in')).toBeInTheDocument();
 */    expect(screen.getByPlaceholderText('john@example.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('*********')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Log in' })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: 'Remember me' })).toBeInTheDocument();
    expect(screen.getByText('Forgot password')).toBeInTheDocument();
  })
})