import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import CommentsList from './CommentsList';

const Comments = () => {
    const [isAddingComment, setIsAddingComment] = useState(false);
    const params = useParams();

    const { quoteId } = params;

    // to make it simpler, we are not getting the error property
    const {
        sendRequest,
        status,
        data: loadedComments,
    } = useHttp(getAllComments);

    useEffect(() => {
        sendRequest(quoteId);
    }, [quoteId, sendRequest]);

    const startAddCommentHandler = () => {
        setIsAddingComment(true);
    };

    /* 
        This functions needed useCallback because it was transmited as props
        in NewCommentForm component and, there, it is inside useEffect, so since functions are
        objects and objects are never exactly the same, when comparing the previous version
        of it with the current, it will make the component re-evaluate and would create a loop 
    */
    const addedCommentHandler = useCallback(() => {
        sendRequest(quoteId);
    }, [sendRequest, quoteId]);

    let comments;

    if (status === 'pending') {
        comments = (
            <div className="centered">
                <LoadingSpinner />
            </div>
        );
    }

    if (status === 'completed' && loadedComments && loadedComments.length > 0) {
        comments = <CommentsList comments={loadedComments} />;
    }

    if (
        status === 'completed' &&
        (!loadedComments || loadedComments.length === 0)
    ) {
        comments = <p className="centered">No comments added yet.</p>;
    }

    return (
        <section className={classes.comments}>
            <h2>User Comments</h2>
            {!isAddingComment && (
                <button className="btn" onClick={startAddCommentHandler}>
                    Add a Comment
                </button>
            )}
            {isAddingComment && (
                <NewCommentForm
                    quoteId={quoteId}
                    onAddedComment={addedCommentHandler}
                />
            )}
            {comments}
        </section>
    );
};

export default Comments;
