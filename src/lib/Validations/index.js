/* eslint-disable prefer-const */
/* eslint-disable no-array-constructor */
/* eslint-disable no-debugger */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-expressions */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
export const validationOption = {
  ProductName: {
    error: false,
    message: "Product Name is  Required",
  },
  BrandName: {
    error: false,
    message: "Brand Name is Required",
  },
  Tittle: {
    error: false,
    message: "Tittle is  Required",
  },
  Description: {
    error: false,
    message: "Description is Required",
  },
  Orgin: {
    error: false,
    message: "Country of origin is Required",
  },
};

export const validation = {
  Tittle: "Tittle is Required",
};
export const validateVitalInfos = (product) => {
  let count = 0;
  const productDetailsObj = {
    ProductBrand: "",
    Tittle: "",
  };
  const productModelKeys = Object.keys(productDetailsObj);
  productModelKeys.forEach((x) => {
    if (product && x && !product[x]) {
      if (validationOption[x]) {
        validationOption[x].error = true;
        count += 1;
      }
    } else if (validationOption[x]) {
      validationOption[x].error = false;
    }
  });

  return count;
};

export function Validate(fields, inputs) {
  let errors = new Array();
  let response = {
    isValid: true,
    message: "",
  };
  if (!fields || fields.length === 0 || !inputs) {
    response = {
      isValid: false,
      message: "",
    };
  }
  fields.forEach((x) => {
    if (!inputs[x] || inputs[x] === "") {
      errors.push(x);
    }
  });
  if (errors.length > 0) {
    response = {
      isValid: false,
      message: `Required fields are ${[...errors]}`,
    };
  }
  return response;
}
