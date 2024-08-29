import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import NavBar from "../Components/NavBar";
import ViewEditDetails from "../Components/ViewEditDetails";
import { getProductById } from '../Services/ProductsServices'

function ViewProduct() {
    const { id } = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await (getProductById())
                setProduct(res)

            } catch (error) {
                console.log(error)
            }
        }
        fetchProduct();
    }, [id]); // Dependency array ensures this only runs when `id` changes

    return (
        <>
      <NavBar />
      <ViewEditDetails item={product} type="Product"></ViewEditDetails>
        </>
  );
}

export default ViewProduct;