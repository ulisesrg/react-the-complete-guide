import { Link, Outlet, Route, Routes } from 'react-router-dom';

const Welcome = () => {
    return (
        <section>
            <h1>The Welcome Page</h1>
            <Link to="new-user">New User</Link>
            <Routes>
                {/* Nested routes and links inside routes now are relative in v6 */}
                <Route path="new-user" element={<p>Welcome, new user!</p>} />
            </Routes>
            {/* Second new approach for nested routes */}
            <Outlet />
        </section>
    );
};

export default Welcome;
