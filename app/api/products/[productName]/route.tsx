import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

interface Product {
  id: string | number;
  productName: string;
  img: string;
  price: number;
  quantity: number;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { name: string } }
) {
  try {
    const filePath = path.join(process.cwd(), "database", "products.json");

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { message: "Không tìm dữ liệu" },
        { status: 500 }
      );
    }

    const products: Product[] = JSON.parse(fs.readFileSync(filePath, "utf8"));

    const product = products.find(
      (product: Product) =>
        product.productName.toLowerCase() === params.name.toLowerCase()
    );

    if (product) {
      return NextResponse.json({
        message: "Product found",
        product: JSON.parse(JSON.stringify(product)), 
      });
    } else {
      return NextResponse.json(
        {
          message: "Product không tồn tại",
        },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
