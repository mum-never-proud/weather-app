import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const MAX_CHARACTERS_ALLOWED = 140;

const CommentForm = ({ onSubmit }) => {
  const commentRef = useRef();
  const [charactersLeft, setCharactersLeft] = useState(MAX_CHARACTERS_ALLOWED);
  const [comment, setComment] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    onSubmit(comment);
  };

  useEffect(() => {
    commentRef.current.focus();
  }, []);

  useEffect(() => {
    setCharactersLeft(MAX_CHARACTERS_ALLOWED - comment.length);
  }, [comment]);

  return (
    <form className="weather-card--form mt-2" onSubmit={submitHandler}>
      <textarea
        className="form-control resize-none p-1"
        value={comment}
        rows={3}
        ref={commentRef}
        onChange={(e) => setComment(e.target.value)}
      />
      <div className="mt-1 d-flex justify-content-between">
        <div>
          <small>
            <span className="text-mute">Characters Left</span>
            {' '}
            <span className={`font-weight-bold ${charactersLeft < 0 ? 'text-danger' : ''}`}>{charactersLeft}</span>
          </small>
        </div>
        <button type="submit" className="primary" disabled={!comment || charactersLeft < 0}>Submit</button>
      </div>
    </form>
  );
};

CommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default CommentForm;
