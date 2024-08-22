import React, { useState } from "react";
import axios from "axios";

interface FormProductProps {
  onProductAdded: () => void;
}

export default function FormProduct({ onProductAdded }: FormProductProps) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [error, setError] = useState(""); // Thêm trạng thái để lưu thông báo lỗi
  const [isLoading, setIsLoading] = useState(false); // Thêm trạng thái để quản lý quá trình gửi dữ liệu

  // Hàm tạo id ngẫu nhiên
  const generateId = () => Math.floor(Math.random() * 1000000);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Kiểm tra tính hợp lệ của dữ liệu
    if (!name || !image || price <= 0 || quantity <= 0) {
      setError("Giá và số lượng phải lớn hơn 0.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      await axios.post("http://localhost:3000/api/products", {
        id: generateId(), // Thêm id ngẫu nhiên
        productName: name,
        img: image,
        price,
        quantity,
      });

      // Clear form
      setName("");
      setImage("");
      setPrice(0);
      setQuantity(0);

      onProductAdded(); // Gọi hàm để làm mới danh sách sản phẩm
    } catch (error) {
      console.error("Có lỗi xảy ra khi thêm sản phẩm: ", error);
      setError("Tên sản phẩm đã tồn tại!!!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Thêm mới sản phẩm</h3>
      <form onSubmit={handleSubmit}>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tên
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Hình ảnh
            </label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Giá
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Số lượng
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <button
          type="submit"
          className={`w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-blue-600 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Đang thêm..." : "Thêm"}
        </button>
      </form>
    </div>
  );
}
