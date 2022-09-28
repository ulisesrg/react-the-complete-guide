import { Route, useParams } from 'react-router-dom';

import Comments from '../components/comments/Comments';

const QuoteDetail = () => {
    const params = useParams();

    return (
        <>
            <h1>Quote Detail Page</h1>
            <p>{params.quoteId}</p>
            {/* Next one is also valid */}
            {/* <Route path={`/quotes/:quoteId}/comments`}></Route> */}
            <Route path={`/quotes/${params.quoteId}/comments`}>
                <Comments />
            </Route>
        </>
    );
};

export default QuoteDetail;
