import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { uiActions } from './store/ui-slice';
import { fetchCartData, sendCartData } from './store/cart-actions';

let isInitial = true;

function App() {
    const dispatch = useDispatch();
    const showCart = useSelector((state) => state.ui.cartIsVisible);
    const cart = useSelector((state) => state.cart);
    const notification = useSelector((state) => state.ui.notification);

    useEffect(() => {
        dispatch(fetchCartData());
    }, [dispatch]);

    useEffect(() => {
        // Option 1 to use async functions with redux is doing it inside a component with useEffect
        /* const sendCartData = async () => {
            dispatch(
                uiActions.showNotification({
                    status: 'pending',
                    title: 'Sending...',
                    message: 'Sending cart data!',
                })
            );

            const response = await fetch(
                'https://react-complete-guide-htt-c56f1-default-rtdb.firebaseio.com/cart.json',
                {
                    method: 'PUT',
                    body: JSON.stringify(cart),
                }
            );

            if (!response.ok) {
                throw new Error('Sending cart data failed.');
            }

            dispatch(
                uiActions.showNotification({
                    status: 'success',
                    title: 'Success!',
                    message: 'Sent cart data successfully!',
                })
            );
        };

        if (isInitial) {
            isInitial = false;
            return;
        }

        sendCartData().catch((error) => {
            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'Sending cart data failed!',
                })
            );
        }); */

        // Option 2 to use async functions with redux is doing it with action creators / thunks
        if (isInitial) {
            isInitial = false;
            return;
        }

        /* 
            normally we used to dispatch action creators (functions that return an action 
            object -the ones that have a type property-), but redux toolkit also can 
            dispatch functions that return another function which eventually returns
            the action (that last function one will be executed by redux toolkit automatically 
            providing the 'dispatch' argument)
        */
        dispatch(sendCartData(cart));
    }, [cart, dispatch]);

    return (
        <>
            {notification && (
                <Notification
                    status={notification.status}
                    title={notification.title}
                    message={notification.message}
                />
            )}
            <Layout>
                {showCart && <Cart />}
                <Products />
            </Layout>
        </>
    );
}

export default App;
