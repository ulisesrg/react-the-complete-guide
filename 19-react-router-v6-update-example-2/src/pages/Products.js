import { Link, useNavigate } from 'react-router-dom';

const Products = () => {
    /* 
        For programmatic navigation, in v6 we use useNavigate instead of useHistory:

        const navigate = useNavigate();
        navigate('/welcome') to welcome
        navigate('/welcome', { replace: true }) to redirect to welcome
        navigate(-1) to previous page
        navigate(-2) to previous previous page
        navigate(1) to next page
    */


    return (
        <section>
            <h1>The Products Page</h1>
            <ul>
                <li>
                    <Link to="/products/p1">A Book</Link>
                </li>
                <li>
                    <Link to="/products/p2">A Carpet</Link>
                </li>
                <li>
                    <Link to="/products/p3">An Online Course</Link>
                </li>
            </ul>
        </section>
    );
};

export default Products;
