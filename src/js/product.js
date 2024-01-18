import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { getParams, formatter } from "./utils.mjs";

const productId = getParams("product");
const dataSource = new ProductData("tents");

const product = new ProductDetails(dataSource, productId, formatter);
product.init();
