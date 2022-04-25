
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

export const validation={
  Tittle:"Tittle is Required"
}
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
 
