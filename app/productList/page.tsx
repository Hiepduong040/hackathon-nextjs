
import React from "react";
import axios from "axios";
import ConfirmationModal from "../confirmationModal/ConfirmationModal";

interface Product {
  id: number;
  productName: string;
  img: string;
  price: number;
  quantity: number;
}

interface ProductListProps {
  products: Product[];
  onProductsUpdated: () => void;
}

export default function ProductList({
  products,
  onProductsUpdated,
}: ProductListProps) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [productToDelete, setProductToDelete] = React.useState<number | null>(
    null
  );

  const handleDelete = (id: number) => {
    setProductToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (productToDelete === null) return;

    try {
      await axios.delete(
        `http://localhost:3000/api/products/${productToDelete}`
      );
      onProductsUpdated(); // Làm mới danh sách sản phẩm
      setIsModalOpen(false);
    } catch (error) {
      console.error("Có lỗi xảy ra khi xóa sản phẩm: ", error);
    }
  };

  return (
    <div className="bg-gray-100 p-8">
      <div className="flex gap-10 ml-20 container mx-auto">
        <table className="min-w-5/6 bg-white shadow-md rounded-lg overflow-hidden mb-8">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">STT</th>
              <th className="py-3 px-6 text-left">Tên sản phẩm</th>
              <th className="py-3 px-6 text-center">Hình ảnh</th>
              <th className="py-3 px-6 text-center">Giá</th>
              <th className="py-3 px-6 text-center">Số lượng</th>
              <th className="py-3 px-6 text-center">Chức năng</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {products.map((product, index) => (
              <tr
                key={product.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">{index + 1}</td>
                <td className="py-3 px-6 text-left">{product.productName}</td>
                <td className="py-3 px-6 text-center">
                  <img
                    src={product.img}
                    alt={product.productName}
                    className="w-12 h-12 object-cover"
                  />
                </td>
                <td className="py-3 px-6 text-center">${product.price}</td>
                <td className="py-3 px-6 text-center">{product.quantity}</td>
                <td className="py-3 px-6 text-center">
                  <button className="bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 text-white font-semibold py-2 px-4 ml-2 border border-red-600 rounded shadow"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={confirmDelete}
        />
      </div>
    </div>
  );
}
