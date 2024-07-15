import React, { useState } from 'react'
import { ListItemSecondaryAction, Slide } from "@mui/material";

import { CiShoppingCart } from "react-icons/ci";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { FaMoneyCheckDollar } from "react-icons/fa6";
import DeleteIcon from '@mui/icons-material/Delete';
import { TransitionProps } from '@mui/material/transitions';
import Products from './Products';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});
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
export default function Cart() {
    const [open, setOpen] = useState(false);
    const [Cart, setCart] = useState<ProdObj[]>([]);
    const [Total, _setTotal] = useState(0);
    const addToCart = (product:ProdObj) => {
        console.log([...Cart, product]);
        
        setCart([...Cart, product]);
      };
    const checkOut = () => {
        if (Cart.length != 0) {
            setCart([])
            // setSnackBar(true);

            localStorage.setItem('CartData', JSON.stringify([]))
        } else {
            // setErrorSnack(true);
            return
        }

    };

    const removeFromCart = (productId: string) => {
        const updatedCart = Cart.filter((product) => product.id !== productId);
        setCart(updatedCart);
        localStorage.setItem('CartData', JSON.stringify(updatedCart))
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div className='bg-dark'>
            <Button color='secondary' onClick={handleClickOpen} variant='outlined'>Your Cart</Button>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, display: "flex", flex: 1, alignItems: 'center' }} variant="h6" component="div">
                            <CiShoppingCart size={20} className="me-2" />Your Cart
                        </Typography>
                        <Button variant="contained" sx={{ color: 'white' }} color="success" onClick={checkOut}>
                            <FaMoneyCheckDollar size={20} className="me-1" />Total: {Total} $
                        </Button>
                    </Toolbar>
                </AppBar>
                <List>
                    {Cart?.map((product, index) => (
                        <React.Fragment key={index}>
                            <ListItemButton>

                                <ListItemText primary={product.title} secondary={product.category.name} />
                                <ListItemSecondaryAction className="d-flex align-items-center">
                                    {product.price} $
                                    <Button onClick={() => removeFromCart(product.id)} className="mx-3" color="inherit">
                                        <DeleteIcon />
                                    </Button>
                                </ListItemSecondaryAction>
                            </ListItemButton>
                            <Divider />
                        </React.Fragment>
                    ))}


                </List>
            </Dialog>
            <Products addToCart={addToCart}/>
        </div>
    )
}
