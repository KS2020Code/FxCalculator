//Importing dummy Data Files
import { crossViaTableData } from "../dummyData/CrossViaTable";
import { currencyListData } from "../dummyData/CurrencyList";
import { directRateListData } from "../dummyData/DirectRateList";

export const calculateAmount = (params) => {
	let applicableRate = getCrossViaRate(params, getApplicableCCY(params));
	let calAmount = params.amount * applicableRate;
	return { rate: applicableRate, calAmount };
};

const getDirectRate = (params) => {
	let directRate = 0;
	let directRateList = directRateListData.concat();

	directRateList.every((item) => {
		if (params.base === item.from && params.term === item.to) {
			directRate = item.rate;
			return false;
		}
		return true;
	});
	return directRate;
};

export const getPercisionAmount = (params, amountWithoutPercision) => {
	let currencyListWithPercision = currencyListData.concat();
	const currencyItem = currencyListWithPercision.filter(
		(item) => params.toCurrency === item.value
	);
	if (currencyItem.length > 0) {
		let percision = currencyItem[0].percision;
		return amountWithoutPercision.toFixed(percision);
	} else {
		return amountWithoutPercision.toFixed(2);
	}
};

const getApplicableCCY = (params) => {
	let crossViaMatrix = crossViaTableData.concat();
	let crossViaValue = "";
	let breakLoop = false;
	crossViaMatrix.every((baseItem) => {
		if (params.fromCurrency === baseItem.base) {
			var termList = baseItem.items;
			termList.every((termItem) => {
				if (params.toCurrency === termItem.term) {
					crossViaValue = termItem.crossvia;
					breakLoop = true;
					return false;
				}
				return true;
			});
		}
		if (breakLoop) {
			return false;
		}
		return true;
	});
	return crossViaValue;
};

const getCrossViaRate = (params, crossvia) => {
	let rate = 0;
	let invRate = 1;
	let curData = {};
	switch (crossvia) {
		case "1":
			rate = 1;
			break;
		case "D":
			curData = { base: params.fromCurrency, term: params.toCurrency };
			rate = getDirectRate(curData);
			break;
		case "Inv":
			curData = { base: params.toCurrency, term: params.fromCurrency };
			invRate = getDirectRate(curData);
			rate = 1 / invRate;
			break;
		case "USD":
		case "EUR":
			var baseData = {
				fromCurrency: params.fromCurrency,
				toCurrency: crossvia,
			};
			var baseCCY = getApplicableCCY(baseData);
			var baseRate = getCrossViaRate(baseData, baseCCY);
			var termData = {
				fromCurrency: crossvia,
				toCurrency: params.toCurrency,
			};
			var termCCY = getApplicableCCY(termData);
			var termRate = getCrossViaRate(termData, termCCY);
			rate = baseRate * termRate;
			break;
		default:
			break;
	}
	return rate;
};
