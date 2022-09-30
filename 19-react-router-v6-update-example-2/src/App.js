import { Route, Navigate, Routes } from 'react-router-dom';

import Welcome from './pages/Welcome';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import MainHeader from './components/MainHeader';

function App() {
    return (
        <div>
            <MainHeader />
            <main>
                <Routes>
                    {/* 
                        replace attribute can be added in Navigate to make it work as a 
                        real redirection and not to simply push that location
                    */}
                    <Route path="/" element={<Navigate replace to="/welcome" />} />
                    {/* 
                        Routes that are going to have nested routes need to have the asterisk symbol 
                    */}
                    <Route path="/welcome/*" element={<Welcome />} />
                    {/* Second new approach for nested routes */}
                    <Route path="/welcome-2/*" element={<Welcome />}>
                        <Route path="new-user" element={<p>Welcome, new user! 2</p>} />
                    </Route>
                    <Route path="/products" element={<Products />} />
                    <Route
                        path="/products/:productId"
                        element={<ProductDetail />}
                    />
                </Routes>
            </main>
        </div>
    );
}

export default App;

// our-domain.com/welcome => Welcome Component
// our-domain.com/products => Products Component
// our-domain.com/product-detail/a-book
