import React, { useState, useEffect, useContext } from "react";
import AddProduct from "../components/AddProduct";
import UpdateProduct from "../components/UpdateProduct";
import AuthContext from "../AuthContext";

function Inventory() {
  const [showProductModal, setShowProductModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateProduct, setUpdateProduct] = useState([]);
  const [products, setAllProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState();
  const [updatePage, setUpdatePage] = useState(true);
  

  const authContext = useContext(AuthContext);
  console.log('====================================');
  console.log(authContext);
  console.log('====================================');

  useEffect(() => {
    fetchProductsData();
  
  }, [updatePage]);


 // Fetching Data of All Products
  const fetchProductsData = async () => {
    try {
      const response = await fetch(`https://meditrack-4w9w.onrender.com/api/product/get`);
      const data = await response.json();
      setAllProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  console.log('====================================');

 

  //  Fetching Data of Search Products
  const fetchSearchData = () => {
    fetch(`https://meditrack-4w9w.onrender.com/api/product/search?find=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        setAllProducts(data);
      })
      .catch((err) => console.log(err));
  };



  // Modal for Product ADD
  const addProductModalSetting = () => {
    setShowProductModal(!showProductModal);
  };



  // Modal for Product UPDATE
  const updateProductModalSetting = (selectedProductData) => {
    console.log("Clicked: edit");
    setUpdateProduct(selectedProductData);
    setShowUpdateModal(!showUpdateModal);
  };


  // Delete item
  const deleteItem = (id) => {
    console.log("Product ID: ", id);
    //console.log(`https://meditrack-4w9w.onrender.com/api/product/delete/${id}`);
    fetch(`https://meditrack-4w9w.onrender.com/api/product/delete/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setUpdatePage(!updatePage);
      });
  };

  // Handle Page Update
  const handlePageUpdate = () => {
    setUpdatePage(!updatePage);
  };

  // Handle Search Term
  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    fetchSearchData();
  };

  return (
    <div className="col-span-12 lg:col-span-10  flex justify-center">
      <div className=" flex flex-col gap-5 w-11/12">
        

        {showProductModal && (
          <AddProduct
            addProductModalSetting={addProductModalSetting}
            handlePageUpdate={handlePageUpdate}
          />
        )}
        {showUpdateModal && (
          <UpdateProduct
            updateProductData={updateProduct}
            updateModalSetting={updateProductModalSetting}
          />
        )}

        {/* Table  */}
        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200 ">
          <div className="flex justify-between pt-5 pb-3 px-3">
            <div className="flex gap-4 justify-center items-center ">
              <span className="font-bold">Products</span>
              <div className="flex justify-center items-center px-2 border-2 rounded-md ">
                <img
                  alt="search-icon"
                  className="w-5 h-5"
                  src={require("../assets/search-icon.png")}
                />
                <input
                  className="border-none outline-none focus:border-none text-xs"
                  type="text"
                  placeholder="Search here"
                  value={searchTerm}
                  onChange={handleSearchTerm}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs  rounded right -02"
                onClick={addProductModalSetting}
              >
                {/* <Link to="/inventory/add-product">Add Product</Link> */}
                Add Product
              </button>
            </div>
          </div>
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Provider_id
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Business Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Practice Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Address1
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  City
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  State
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Zip_Code
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Telephonenumber
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Specialities-List
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Supplies-List
                </th>
                  <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Unit Price
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Quantity
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Days in store
                </th>
                < th className = "whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900" >  
                  Date Purchased
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  More
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {products.map((element) => {
                return (
                  <tr key={element._id}>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.provider_id}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.businessname}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.practicename}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.address1}
                    </td>
                   
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.city}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.state}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.zip_code}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.telephonenumber}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.specialitieslist}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.supplieslist}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.Unit_Price}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.Quantity}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.days_in_store}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.Date_Purchased}
                    </td>
                    
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      <span
                        className="text-green-700 cursor-pointer"
                        onClick={() => updateProductModalSetting(element)}
                      >
                        Edit{" "}
                      </span>
                      <span
                        className="text-red-600 px-2 cursor-pointer"
                        onClick={() => deleteItem(element._id)}
                      >
                        Delete
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Inventory;
