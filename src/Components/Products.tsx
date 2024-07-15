import { Grid, Paper, styled } from '@mui/material';
import { CiStar } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import axios from 'axios';
import { useEffect, useState } from 'react'
import './Store.css'
interface NestedObject {
    name: string;
    slug: string;
    image: string;
    // Add other properties as needed
}
interface ProdObj {
    id: string;
    title: string;
    slug: string;
    imageCover: string;

    description: string;
    quantity: number;
    price: number;

    ratingsAverage: number;
    ratingsQuantity: number;

    brand: NestedObject
    category: NestedObject
    // Add other properties as needed
}
type AddToCart = (product: ProdObj) => void;
interface props {
    addToCart: AddToCart
}
export default function Products(props: props) {
    const {addToCart} = props

    const [Products, setProducts] = useState<ProdObj[]>([]);
    const [SearchQuerry, setSearchQuerry] = useState<string>('');
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuerry(event.target.value);
    };

    const filteredItems = SearchQuerry
        ? Products.filter(
            (item) =>
                item.title.toLowerCase().includes(SearchQuerry.toLowerCase())
        )
        : Products;
    useEffect(() => {
        const localProducts = localStorage.getItem('Products')

        if (localProducts) {
            console.log("Local storage");
            setProducts(JSON.parse(localProducts))
        } else {
            console.log("Fetching Data");

            axios.get('https://ecommerce.routemisr.com/api/v1/products')
                .then(response => {
                    console.log('Products:', response.data.data);
                    localStorage.setItem('Products', JSON.stringify(response.data.data))
                    setProducts(response.data.data)
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }

    }, [])
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#1A2027',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        height: '100%',
        color: theme.palette.text.secondary,
        position: 'relative',
    }));
    return (
        <div className="w-100 flex-grow-1 d-flex align-items-center flex-column bg-dark ">
            <div className='container'>
                <input type="text" placeholder="Search" className="w-100 my-5 form-control" onChange={handleSearchChange} />
                <Grid container rowSpacing={3} columnSpacing={3}>
                    {filteredItems?.map((product) => (
                        <Grid item xs={12} sm={6} md={3} key={product.id} className="">
                            {/* <div className=" p-3">{product.title}</div> */}
                            <Item className="p-3 BorderSettings text-light">
                                <img loading="lazy" className="ProdDisplay" src={product.imageCover} alt={product.title} />
                                <p className="mb-5">{product.title}</p>
                                <div className="ProductInfo px-3">
                                    <div className="d-flex justify-content-between">
                                        <p className="mb-1">{product.price} $</p>
                                        <p className="mb-1 d-flex align-items-center">{product.ratingsAverage}<CiStar className="me-2" /> {product.ratingsQuantity} Ratings</p>
                                    </div>
                                    <div>
                                        <button onClick={()=>addToCart(product)} className=" d-flex align-items-center btn btn-success mb-1 w-100"><CiShoppingCart className="me-3" />Add to cart</button>
                                    </div>
                                </div>
                            </Item>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>

    )
}
