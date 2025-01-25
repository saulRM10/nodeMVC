// Method to format payment based off of Stripe limitations

export const formatPayment = (value: string) => {
  let sanitizedValue = value.replace(/[^0-9.]/g, ""); // removes everything that is not a number
  const decimalPosition = value.indexOf(".");
  if (decimalPosition !== -1) {
    // Ensures 1 decimal point
    const firstDecimal = sanitizedValue.slice(0, decimalPosition + 1);
    const rest = sanitizedValue.slice(decimalPosition + 1).replace(/\./g, "");
    sanitizedValue = firstDecimal + rest;

    // Ensures there are no more than two digits after the decimal point
    const beforeDecimal = sanitizedValue.slice(0, decimalPosition);
    const afterDecimal = sanitizedValue.slice(decimalPosition + 1).slice(0, 2);
    sanitizedValue = beforeDecimal + "." + afterDecimal;
  }

  // Ensure maximum of 6 digits before the decimal point
  if (sanitizedValue.indexOf(".") !== -1) {
    const beforeDecimal = sanitizedValue.split(".")[0];
    if (beforeDecimal.length > 6) {
      sanitizedValue =
        beforeDecimal.slice(0, 6) + "." + sanitizedValue.split(".")[1];
    }
  } else {
    if (sanitizedValue.length > 6) {
      sanitizedValue = sanitizedValue.slice(0, 6);
    }
  }

  return sanitizedValue;
};
