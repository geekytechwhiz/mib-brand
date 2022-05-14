/* eslint-disable import/prefer-default-export */
export const RESOURCE = 'inventory';
export const ORIGIN = 'brand';
export const UPLOADED_PATH =
  'https://mibuploaddev.s3.ap-south-1.amazonaws.com/inbound/inbound/inventory/brand/';

export const NOT_FOUND_STATUS_CODE = 404;
export const UNAUTHORIZED_STATUS_CODE = 401;
export const INTERNAL_SERVER_ERROR = 500;
export const NOT_FOUND_ERROR_MSG = 'Given Email id not found in our system';
export const UNAUTHORIZED_ERROR_MSG = 'Incorrect email or password';
export const INTERNAL_SERVER_ERROR_MSG =
  'Something happened in our backend system. Please contact our support team';

export const PRODUCT_TYPES = ['EXCLUSIVE', 'COMBO'];
export const REQUIRED_FIELDS_CATEGORY = ['Category', 'ProductCategory'];
export const REQUIRED_FIELDS_VITAL_INFO = [
  'ProductBrand',
  'Tittle',
  'Manufacturer',
  'NumberOfItems',
  'UnitCount',
  'UnitType',
];

export const REQUIRED_FIELDS_OFFER = [
  'YourPrice',
  'Quantity',
  'MRP',
  'SellingPrice',
  'CountryOfOrigin',
];
export const REQUIRED_FIELDS_DESCRIPTION = ['ProductDescription'];
export const REQUIRED_FIELDS_MEDIAS = ['ImageLinks'];

export const ALL_REQUIRED_FIELDS = [
  'Category',
  'ProductCategory',
  'ProductDescription',
  'ProductBrand',
  'Tittle',
  'Manufacturer',
  'NumberOfItems',
  'UnitCount',
  'UnitType',
  'MRP',
  'SellingPrice',
  'CountryOfOrigin',
];

export const SIGN_UP_REQUIRED_FIELDS = [
  'Name',
  'Mobile',
  'EmailId',
  'Password',
];

export const MORE_DETAILS_REQUIRED_FIELDS = ['BuddyMargin', 'LoyaltyPoint'];
