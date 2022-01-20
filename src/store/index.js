import { createStore } from "redux";
import { getPercisionAmount } from "../components/Helper";

const FROM_CURENCY = "FromCurrency";
const TO_CURRENCY = "ToCurrency";
const AMOUNT = "Amount";
const FINAL_AMOUNT = "FinalAmount";
const RATE_NOT_FOUND = "RateNotFound";

const initialState = {
	fromCurrency: "AUD",
	toCurrency: "USD",
	amount: "",
	finalAmount: null,
	rateNotFound: false,
};

const convertorReducer = (state = initialState, action) => {
	if (action.type === FROM_CURENCY) {
		return {
			fromCurrency: action.value,
			toCurrency: state.toCurrency,
			amount: state.amount,
			finalAmount: state.finalAmount,
			rateNotFound: state.rateNotFound,
		};
	} else if (action.type === TO_CURRENCY) {
		return {
			fromCurrency: state.fromCurrency,
			toCurrency: action.value,
			amount: state.amount,
			finalAmount: state.finalAmount,
			rateNotFound: state.rateNotFound,
		};
	} else if (action.type === AMOUNT) {
		return {
			fromCurrency: state.fromCurrency,
			toCurrency: state.toCurrency,
			amount: action.value,
			finalAmount: state.finalAmount,
			rateNotFound: state.rateNotFound,
		};
	} else if (action.type === FINAL_AMOUNT) {
		if (!action.params) {
			return {
				fromCurrency: state.fromCurrency,
				toCurrency: state.toCurrency,
				amount: state.amount,
				finalAmount: null,
				rateNotFound: state.rateNotFound,
			};
		} else {
			let percisionAmount = getPercisionAmount(action.params, action.value);
			return {
				fromCurrency: state.fromCurrency,
				toCurrency: state.toCurrency,
				amount: state.amount,
				finalAmount: percisionAmount,
				rateNotFound: state.rateNotFound,
			};
		}
	} else if (action.type === RATE_NOT_FOUND) {
		return {
			fromCurrency: state.fromCurrency,
			toCurrency: state.toCurrency,
			amount: state.amount,
			finalAmount: state.finalAmount,
			rateNotFound: action.value,
		};
	}
	return state;
};

const store = createStore(convertorReducer);

export default store;
