
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

    interface Product {
    id: string;
    productName: string;
    img: string;
    price: number;
    quantity: number;
    }


export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const filePath = path.join(process.cwd(), "database", "products.json");
    const products = JSON.parse(fs.readFileSync(filePath, "utf8"));
    
    let find = products.find((item:any)=>{
        return item.id == +params.id
    })
    return NextResponse.json(find);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const filePath = path.join(process.cwd(), "database", "products.json");

    const products = JSON.parse(fs.readFileSync(filePath, "utf8"));

    const findIndex = products.findIndex((product: any) => product.id === +params.id);
    console.log(findIndex);
    
    if (findIndex !== -1) {
        // sửa để thêm các trường hứng thông tin từ ô input 
        products[findIndex].productName = "occho";
        products[findIndex].img="https://toigingiuvedep.vn/wp-content/uploads/2022/01/hinh-anh-qua-oc-cho.jpg"
        products[findIndex].price=50
        products[findIndex].quantity=5
    } else {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    fs.writeFileSync(filePath, JSON.stringify(products, null, 2), "utf8");

    // Bước 5: Trả về message cho client
    return NextResponse.json({ message: "Product updated successfully" });
}
   

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const filePath = path.join(process.cwd(), "database", "products.json");
    const products: Product[] = JSON.parse(fs.readFileSync(filePath, "utf8"));

    const productIndex = products.findIndex((product: Product) => String(product.id) === params.id);

    if (productIndex !== -1) {
        const deletedProduct = products.splice(productIndex, 1)[0];

        fs.writeFileSync(filePath, JSON.stringify(products, null, 2), "utf8");

        return NextResponse.json({
            message: "Xóa product thành công",
            product: deletedProduct,
        });
    } else {
        return NextResponse.json({
            message: "Product không tồn tại",
        }, { status: 404 });
    }
}




















