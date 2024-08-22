import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Hàm để kiểm tra tên sản phẩm đã tồn tại chưa
const isProductNameDuplicate = (products: any[], newProductName: string) => {
  return products.some((product) => product.productName === newProductName);
};

export async function GET() {
  try {
    // Bước 1: Lấy ra đường dẫn của file cần đọc
    const filePath = path.join(process.cwd(), "database", "products.json");

    // Bước 2: Sử dụng fs để đọc file
    const data = fs.readFileSync(filePath, "utf8");

    // Bước 3: Ép kiểu từ dạng JSON sang TS
    const products = JSON.parse(data);

    // Trả về dữ liệu cho phía client
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ message: "Có lỗi xảy ra khi lấy dữ liệu" });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Bước 1: Lấy dữ liệu từ phía client
    const productRequest = await request.json();

    // Bước 2: Lấy ra đường dẫn của file cần ghi
    const filePath = path.join(process.cwd(), "database", "products.json");

    // Đọc file cần ghi vào
    const products = JSON.parse(fs.readFileSync(filePath, "utf8"));

    // Bước 3: Kiểm tra trùng lặp tên sản phẩm
    if (isProductNameDuplicate(products, productRequest.productName)) {
      return NextResponse.json(
        { message: "Tên sản phẩm đã tồn tại. Vui lòng chọn tên khác." },
        { status: 400 }
      );
    }

    // Thêm dữ liệu vào trong mảng
    products.push(productRequest);

    // Bước 4: Ghi file
    fs.writeFileSync(filePath, JSON.stringify(products), "utf8");

    // Trả về thành công
    return NextResponse.json({ message: "Ghi file thành công" });
  } catch (error) {
    return NextResponse.json({ message: "Ghi file thất bại" }, { status: 500 });
  }
}
