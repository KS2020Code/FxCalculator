import { useDispatch, useSelector } from "react-redux";
import { currencyListData } from "../dummyData/CurrencyList";
import { calculateAmount } from "./Helper";
import classes from "./Convertor.module.css";

const FROM_CURENCY = "FromCurrency";
const TO_CURRENCY = "ToCurrency";
const AMOUNT = "Amount";
const FINAL_AMOUNT = "FinalAmount";
const RATE_NOT_FOUND = "RateNotFound";

const Convertor = () => {
	var dispatch = useDispatch();

	const fromCurrency = useSelector((state) => state.fromCurrency);
	const toCurrency = useSelector((state) => state.toCurrency);
	const amount = useSelector((state) => state.amount);
	const finalAmount = useSelector((state) => state.finalAmount);
	const rateNotFound = useSelector((state) => state.rateNotFound);

	const updateAmount = (params) => {
		const { rate, calAmount } = calculateAmount(params);
		if (rate > 0 && calAmount > 0) {
			dispatch({ type: FINAL_AMOUNT, params, value: calAmount });
			dispatch({ type: RATE_NOT_FOUND, value: false });
		} else {
			dispatch({ type: FINAL_AMOUNT, value: null });
			dispatch({ type: RATE_NOT_FOUND, value: true });
		}
	};

	/**Handler Functions**/
	const onFromCurrencyChangeHandler = (event) => {
		dispatch({ type: FROM_CURENCY, value: event.target.value });
		updateAmount({ fromCurrency: event.target.value, toCurrency, amount });
	};

	const onToCurrencyChangeHandler = (event) => {
		dispatch({ type: TO_CURRENCY, value: event.target.value });
		updateAmount({ fromCurrency, toCurrency: event.target.value, amount });
	};

	const onAmountChangeHandler = (event) => {
		dispatch({ type: AMOUNT, value: +event.target.value });
		updateAmount({ fromCurrency, toCurrency, amount: +event.target.value });
	};

	return (
		<div className={classes.card}>
			<h2>FX CALCULATOR</h2>
			<div className={classes.from}>
				<label htmlFor="from">From : </label>
				<select
					data-testid="select-from"
					name="fromCurrency"
					onChange={onFromCurrencyChangeHandler}
					value={fromCurrency}
				>
					{currencyListData.map((e) => {
						return (
							<option
								data-testid="select-from-option"
								key={e.key}
								value={e.value}
							>
								{e.name}
							</option>
						);
					})}
				</select>
				<input
					data-testid="input-amount"
					type="number"
					id="from"
					min="0"
					onChange={onAmountChangeHandler}
					value={amount}
				/>
			</div>
			<div className={classes.to}>
				<label type="text" htmlFor="to">
					To :
				</label>
				<select
					data-testid="select-to"
					name="toCurrency"
					onChange={onToCurrencyChangeHandler}
					value={toCurrency}
				>
					{currencyListData.map((e) => {
						return (
							<option key={e.key} value={e.value}>
								{e.name}
							</option>
						);
					})}
				</select>
			</div>
			{!!finalAmount && (
				<div className={classes.result}>
					= {toCurrency} {finalAmount}
				</div>
			)}
			{!finalAmount && rateNotFound && (
				<div className={classes.error}>
					Unable to find rate for {fromCurrency}/{toCurrency}
				</div>
			)}
		</div>
	);
};

export default Convertor;
