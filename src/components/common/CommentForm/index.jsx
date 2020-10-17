import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const MAX_CHARACTERS_ALLOWED = 140;

const CommentForm = ({ note, onSubmit, isSubmitted }) => {
  const commentRef = useRef();
  const [charactersLeft, setCharactersLeft] = useState(MAX_CHARACTERS_ALLOWED);
  const [comment, setComment] = useState(note);
  const submitHandler = (e) => {
    e.preventDefault();
    onSubmit(comment);
  };

  useEffect(() => {
    commentRef.current.focus();
  }, []);

  useEffect(() => {
    setComment(note);
    commentRef.current.focus();
  }, [note]);

  useEffect(() => {
    if (isSubmitted) {
      setComment({ text: '' });
      commentRef.current.focus();
    }
  }, [isSubmitted]);

  useEffect(() => {
    setCharactersLeft(MAX_CHARACTERS_ALLOWED - comment.text.length);
  }, [comment]);

  return (
    <form className="weather-card-form mt-2" onSubmit={submitHandler} data-testid="weather-card-form">
      <textarea
        className="form-control resize-none p-1"
        value={comment.text}
        rows={3}
        ref={commentRef}
        data-testid="comment"
        onChange={(e) => setComment({ ...comment, text: e.target.value })}
      />
      <div className="mt-1 d-flex justify-content-between">
        <div>
          <small>
            <span className="text-mute">Characters Left</span>
            {' '}
            <span className={`font-weight-bold ${charactersLeft < 0 ? 'text-danger' : ''}`}>{charactersLeft}</span>
          </small>
        </div>
        <button type="submit" className="primary" data-testid="note-form-submit" disabled={charactersLeft === 140 || charactersLeft < 0}>Submit</button>
      </div>
    </form>
  );
};

CommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  note: PropTypes.shape({
    text: PropTypes.string,
  }).isRequired,
  isSubmitted: PropTypes.bool.isRequired,
};

export default CommentForm;
