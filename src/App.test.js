import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store/index";

describe("Negative Test : Good scenario no output text by default", () => {
	test("No succes text", () => {
		render(
			<Provider store={store}>
				<App />
			</Provider>
		);
		const outputElement = screen.queryByText("=", {
			exact: false,
		});
		expect(outputElement).toBeNull();
	});

	test("No failure text", () => {
		render(
			<Provider store={store}>
				<App />
			</Provider>
		);
		const outputElement = screen.queryByText("Unable to find rate AUD/USD", {
			exact: false,
		});
		expect(outputElement).toBeNull();
	});
});

describe("Negative Test : Render Unable to find rate", () => {
	test("for 0 in input field", () => {
		render(
			<Provider store={store}>
				<App />
			</Provider>
		);
		const inputElement = screen.getByTestId("input-amount");
		inputElement.nodeValue = 0;

		const outputElement = screen.queryByText("Unable to find rate", {
			exact: false,
		});
		expect(outputElement).toBeInTheDocument;
	});

	test("for update of 'Base' curency without data in input field", () => {
		render(
			<Provider store={store}>
				<App />
			</Provider>
		);
		fireEvent.change(screen.getByTestId("select-from"), {
			target: { value: "CAD" },
		});

		const outputElement = screen.queryByText(
			"Unable to find rate for CAD/USD",
			{
				exact: false,
			}
		);
		expect(outputElement).toBeInTheDocument;
	});

	test("for update of 'To' curency without data in input field", () => {
		render(
			<Provider store={store}>
				<App />
			</Provider>
		);
		fireEvent.change(screen.getByTestId("select-to"), {
			target: { value: "CAD" },
		});

		const outputElement = screen.queryByText(
			"Unable to find rate for AUD/CAD",
			{
				exact: false,
			}
		);
		expect(outputElement).toBeInTheDocument;
	});
});

describe("Positive Test : Render converted data", () => {
	test("for 10 in input field", () => {
		render(
			<Provider store={store}>
				<App />
			</Provider>
		);
		const inputElement = screen.getByTestId("input-amount");
		inputElement.nodeValue = 10;

		const outputElement = screen.queryByText("USD 0.8371", {
			exact: false,
		});
		expect(outputElement).toBeInTheDocument;
	});

	test("for update of 'Base' curency with 10 in input field", () => {
		render(
			<Provider store={store}>
				<App />
			</Provider>
		);

		const inputElement = screen.getByTestId("input-amount");
		inputElement.nodeValue = 10;

		fireEvent.change(screen.getByTestId("select-from"), {
			target: { value: "CAD" },
		});

		const outputElement = screen.queryByText("USD 0.8711", {
			exact: false,
		});
		expect(outputElement).toBeInTheDocument;
	});

	test("for update of 'To' curency with 10 in input field", () => {
		render(
			<Provider store={store}>
				<App />
			</Provider>
		);

		const inputElement = screen.getByTestId("input-amount");
		inputElement.nodeValue = 10;

		fireEvent.change(screen.getByTestId("select-to"), {
			target: { value: "CAD" },
		});

		const outputElement = screen.queryByText("CAD 9.61", {
			exact: false,
		});
		expect(outputElement).toBeInTheDocument;
	});
});
