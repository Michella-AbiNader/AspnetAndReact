import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { getCategories } from '../Services/CategoryServices'
import { createProduct } from '../Services/ProductsServices'
function CreateProduct() {
    const { shopId } = useParams();
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [res, setRes] = useState()
    const [categories, setCategories] = useState()
    const [showMessage, setShowMessage] = useState(false)
    const [data, setData] = useState({
        name: "", description: "", image_url: "", price: "", quantity: "", shop_id: shopId, category_id:""
    })
    useEffect(() => {
        //fetch categories
        const fetchCategories = async () => {
            try {
                const res = await (getCategories())
                setCategories(res)
            } catch (error) {
                console.log(error)
            }
        }
        fetchCategories();
    }, [shopId])
    const handleConfirm = (e) => {
        e.preventDefault()
        setShowConfirmation(true);

    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'category') {
            setData({
                ...data,
                category_id: value, // Set category_id to the selected category's ID
            });
        } else {
            setData({
                ...data,
                [e.target.name]: e.target.value
            })
        }
    }
    const handleCancel = (e) => {
        e.preventDefault();
        setShowConfirmation(false);
    };
    const handleConfirmSave = async (e) => {
        e.preventDefault()
        try {
            let response = await createProduct(data);
            setRes(response)
        } catch (error) {
            setRes(error)
            console.log(error);
        }
        setShowMessage(true)
        setShowConfirmation(false)
        var elements = document.getElementsByClassName("product-input")
        for (let element of elements) {
            element.value = ""
        }
    }

  return (
      <>
          <form className="cr-f-container" onSubmit={handleConfirm}>
          <div className="header-Con">
              <p id="header" className="header">Create Product</p>
                  {showMessage && <p className="msg-box">{res}</p>
                  }
          </div>
          <div className="form-container">
              <div>
                  <label>Name:</label>
                  <input className="product-input" autoComplete="off" maxLength="40"
                      type="text" required
                      name="name"
                      placeholder="Product Name"
                      onChange={handleInputChange}
                  />
              </div>
              <div>
                  <label>Price: </label>
                  <input className="product-input" id="price" autoComplete="off"
                          type="number" min="1" required
                      name="price"
                      placeholder="0"
                      onChange={handleInputChange}
                  />
              </div>

              <div>
                  <label>Image Url: </label>
                  <input className="product-input" autoComplete="off"
                          type="url" required
                      name="image_url"
                      placeholder="Image Url"
                      onChange={handleInputChange}
                  />
              </div>
              <div>
                  <label>Quantity: </label>
                  <input className="product-input" id="quantity" autoComplete="off"
                          type="number" min="1" required
                      name="quantity"
                      placeholder="1"
                      onChange={handleInputChange}
                  />
              </div>

              <div>
                  <label id="lbl_desc">Description: </label>
                  <textarea className="product-input" id="description" autoComplete="off"
                          rows="4" cols="50" maxLength="100" required
                      type="text"
                      name="description"
                      placeholder="Description..."
                      onChange={handleInputChange}
                  ></textarea>
              </div>
              <div>
                  <label>Category:</label>
                      <select className="product-input" id="drpdown-input"
                          name="category"
                          required
                          onChange={handleInputChange}

                      >
                          <option value="">-- Select a category</option>
                          {categories ? (
                              categories.map((cat) => (
                                  <option value={cat.id} key={cat.id} >
                                      {cat.name}
                                  </option>
                              ))
                          ) : (
                          <option value="">No categories available</option>
                          )}
                      </select>
                  </div>
              </div>
              <button className="cr-save" type="submit">Create</button>
              {showConfirmation && (
                  <>
                      <div className="overlay"></div>
                      <div className="confirmation-box">
                          <p>Are you sure you want to save these changes?</p>
                          <button className="confirm-button" onClick={handleConfirmSave}>Yes, I am sure</button>
                          <button className="cancel-button" onClick={handleCancel}>Cancel</button>
                      </div>
                  </>
              )}
              </form>
      </>
  );
}

export default CreateProduct;