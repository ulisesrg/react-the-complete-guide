import { Suspense } from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';

import Posts from '../components/Posts';
import { getSlowPosts } from '../util/api';

function DeferredBlogPostsPage() {
    const loaderData = useLoaderData();

    return (
        <>
            <h1>Our Blog Posts</h1>
            <Suspense fallback={<p>Loading...</p>}>
                <Await
                    resolve={loaderData.posts}
                    errorElement={<p>Error loading blog posts.</p>}
                >
                    {/* This is called render props */}
                    {(loadedPosts) => <Posts blogPosts={loadedPosts} />}
                </Await>
            </Suspense>
            {/* <Posts blogPosts={loaderData} /> */}
        </>
    );
}

export default DeferredBlogPostsPage;

export async function loader() {
    return defer({ posts: getSlowPosts() });

    // with await, the app will render the page until getSlowPosts() is finished
    // return defer({ posts: await getSlowPosts() });
}
