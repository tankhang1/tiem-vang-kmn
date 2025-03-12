import dayjs from "dayjs";
import "./App.css";
import { useEffect, useState } from "react";
import EditIcon from "./assets/edit.png";
import XIcon from "./assets/x.png";
import AddIcon from "./assets/add.png";
import Input from "./components/Input";
const useFullscreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return isFullscreen;
};
function App() {
  const isFullscreen = useFullscreen();
  const [isOpen, setIsOpen] = useState(false);
  const [listProducts, setListProducts] = useState([
    {
      name: "",
      income: 0,
      outcome: 0,
    },
  ]);

  useEffect(() => {
    const products = localStorage.getItem("Products");
    if (products) {
      const parsedProducts = JSON.parse(products);
      setListProducts([...parsedProducts]);
    } else {
      setListProducts([
        {
          name: "",
          income: 0,
          outcome: 0,
        },
      ]);
    }
  }, []);
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 to-yellow-300 shadow-inner py-10">
      <h1 className="text-6xl md:text-7xl font-bold text-red-400 bg-clip-text bg-gradient-to-r from-red-400 to-red-700 drop-shadow-lg">
        ✨ TIỆM VÀNG, BẠC KIM MINH NGUYÊN ✨
      </h1>
      <h4 className="text-3xl mt-2 font-semibold text-gray-800">
        Giá Vàng Bạc Hôm Nay: {dayjs().format("HH:mm:ss DD/MM/YYYY")}
      </h4>
      <h4 className="text-2xl text-gray-700 mt-1">
        ĐC: Chợ Hầm nước, Phường Phú Thạnh, TP.Tuy Hoà, tỉnh Phú Yên
      </h4>{" "}
      {/* Table */}
      <div className="w-full h-full mt-6 bg-white shadow-lg rounded-lg border border-gray-300 overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-yellow-500 text-white text-3xl uppercase w-1/3">
              <th className="border border-gray-300 px-4 py-3">
                Sản Phẩm Vàng
              </th>
              <th className="border border-gray-300 px-4 py-3 w-1/3">
                Mua Vào
              </th>
              <th className="border border-gray-300 px-4 py-3 w-1/3">Bán Ra</th>
            </tr>
          </thead>
          <tbody>
            {listProducts.map((item, index) => (
              <tr
                onClick={() => setIsOpen(true)}
                key={index}
                className="text-center border border-gray-300 text-gray-800 hover:bg-yellow-100 transition-colors text-3xl font-semibold uppercase"
              >
                <td className="border border-gray-300 px-4 py-3 text-red-600">
                  {item.name}
                </td>
                <td className="border border-gray-300 px-4 py-3">
                  {item.outcome.toLocaleString("vi")}
                </td>
                <td className="border border-gray-300 px-4 py-3">
                  {item.income.toLocaleString("vi")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Note */}
      <p className="mt-4 text-3xl text-gray-600 text-center uppercase font-semibold">
        Bảng giá chỉ mang tính chất tham khảo, giá vàng có thể thay đổi theo
        thời điểm.
      </p>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4">
            <h2 className="text-2xl text-center font-bold mb-2">
              Nhập thông tin vàng
            </h2>
            <div className="overflow-y-auto h-96">
              {listProducts.map((product, index) => (
                <div key={index} className="flex flex-row items-center gap-3">
                  <Input
                    label={"Nhập sản phẩm vàng"}
                    placeholder={"VD: Nhẫn trơn"}
                    type={"text"}
                    initialValue={product.name}
                    onChangeText={(value) => {
                      const newListProducts = listProducts.map(
                        (item, itemIndex) =>
                          itemIndex === index
                            ? { ...product, name: value }
                            : item
                      );
                      setListProducts([...newListProducts]);
                    }}
                  />
                  <Input
                    label={"Nhập giá bán ra"}
                    placeholder={"VD: 190.000.000"}
                    type={"number"}
                    initialValue={product.outcome}
                    onChangeText={(value) => {
                      const newListProducts = listProducts.map(
                        (item, itemIndex) =>
                          itemIndex === index
                            ? { ...product, outcome: +value }
                            : item
                      );
                      setListProducts([...newListProducts]);
                    }}
                  />
                  <Input
                    label={"Nhập giá mua vào"}
                    placeholder={"VD: 190.000.000"}
                    type={"number"}
                    initialValue={product.income}
                    onChangeText={(value) => {
                      const newListProducts = listProducts.map(
                        (item, itemIndex) =>
                          itemIndex === index
                            ? { ...product, income: +value }
                            : item
                      );
                      setListProducts([...newListProducts]);
                    }}
                  />
                  <button
                    onClick={() => {
                      if (listProducts.length > 1) {
                        const newListProducts = listProducts.filter(
                          (item) => item.name !== product.name
                        );
                        setListProducts([...newListProducts]);
                      }
                    }}
                  >
                    <img src={XIcon} className="object-contain" alt="Edit" />
                  </button>
                </div>
              ))}
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    if (
                      listProducts[listProducts.length - 1].name &&
                      listProducts[listProducts.length - 1].income &&
                      listProducts[listProducts.length - 1].outcome
                    ) {
                      setListProducts([
                        ...listProducts,
                        {
                          name: "",
                          income: 0,
                          outcome: 0,
                        },
                      ]);
                    }
                  }}
                >
                  <img
                    src={AddIcon}
                    className="w-10 my-2 object-contain"
                    alt="Edit"
                  />
                </button>
              </div>
            </div>
            {/* Buttons */}
            <div className="flex justify-end mt-4 space-x-2">
              <button
                className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300"
                onClick={() => setIsOpen(false)}
              >
                Huỷ
              </button>
              <button
                className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
                onClick={() => {
                  localStorage.setItem(
                    "Products",
                    JSON.stringify(listProducts)
                  );
                  setIsOpen(false);
                }}
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
