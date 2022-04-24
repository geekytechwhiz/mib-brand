/* eslint-disable no-unused-vars */
const validation = {
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
    message: "Country of orgin is Required",
  },
};

const validateInputs = (product) => {
  let count = 0;
  const productDetailsObj = {
    ProductName: "",
    BrandName: "",
    Tittle: "",
    Description: "",
    Origin: "",
  };
  const productModelKeys = Object.keys(productDetailsObj);
  productModelKeys.forEach((x) => {
    if (product && x && !product[x]) {
      if (validation[x]) {
        validation[x].error = true;
        count += 1;
      }
    } else if (validation[x]) {
      validation[x].error = false;
    }
  });

  return count;
};
