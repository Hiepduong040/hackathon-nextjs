// "use client";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import ProductList from "./productList/page";
// import FormProduct from "./formProduct/FormProduct";

// interface Product {
//   id: number;
//   productName: string;
//   img: string;
//   price: number;
//   quantity: number;
// }

// export default function page() {
//   const [products, setProducts] = useState<Product[]>([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/api/products")
//       .then((response) => {
//         setProducts(response.data);
//       })
//       .catch((error) => {
//         console.error("Có lỗi xảy ra khi lấy dữ liệu: ", error);
//       });
//   }, []);

//   return (
//     <div className="bg-gray-100 p-8">
//       <div className="flex gap-10 ml-8 container mx-auto">
//         <ProductList />
//       </div>
//     </div>
//   );
// }
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductList from "./productList/page";
import FormProduct from "./formProduct/FormProduct";

interface Product {
  id: number;
  productName: string;
  img: string;
  price: number;
  quantity: number;
}

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Có lỗi xảy ra khi lấy dữ liệu: ", error);
    }
  };

  return (
    <div className="bg-gray-100 p-8">
      <div className="flex gap-10 ml-8 container mx-auto">
        <ProductList products={products} onProductsUpdated={fetchProducts} />
        <FormProduct onProductAdded={fetchProducts} />
      </div>
    </div>
  );
}
