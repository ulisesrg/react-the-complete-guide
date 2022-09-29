import { useEffect } from 'react';
import { Link, Route, useRouteMatch, useParams } from 'react-router-dom';

import HighlightedQuote from '../components/quotes/HighlightedQuote';
import Comments from '../components/comments/Comments';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import useHttp from '../hooks/use-http';
import { getSingleQuote } from '../lib/api';

// const DUMMY_QUOTES = [
//     { id: 'q1', author: 'Max', text: 'Learning React is fun!' },
//     { id: 'q2', author: 'Maximilian', text: 'Learning React is great!' },
// ];

const QuoteDetail = () => {
    const params = useParams();
    const match = useRouteMatch();

    const { quoteId } = params;

    const {
        sendRequest,
        status,
        data: loadedQuote,
        error,
    } = useHttp(getSingleQuote, true);

    // const quote = DUMMY_QUOTES.find((quote) => quote.id === params.quoteId);

    useEffect(() => {
        sendRequest(quoteId);
    }, [sendRequest, quoteId]);

    if (status === 'pending') {
        return (
            <div className="centered">
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return <p className="centered focused">{error}</p>;
    }

    if (!loadedQuote.text) {
        return <p>No quote found!</p>;
    }

    return (
        <>
            <HighlightedQuote
                text={loadedQuote.text}
                author={loadedQuote.author}
            />
            {/* Next line renders the content if the url is not for comments */}
            {/* <Route path={`/quotes/${params.quoteId}`} exact>  IT CAN BE REPLACED BY:*/}
            <Route path={match.path} exact>
                <div className="centered">
                    <Link className="btn--flat" to={`${match.url}/comments`}>
                        Load Comments
                    </Link>
                </div>
            </Route>
            {/* <Route path={`/quotes/:quoteId}/comments`}></Route> */}
            {/* <Route path={`/quotes/${params.quoteId}/comments`}> */}
            {/* Those two can be replaced by: */}
            <Route path={`${match.path}/comments`}>
                <Comments />
            </Route>
        </>
    );
};

export default QuoteDetail;
