import React, { useEffect, useRef, useState } from 'react';

const MAX_CHARACTERS_ALLOWED = 140;

const CommentForm = () => {
  const commentRef = useRef();
  const [charactersLeft, setCharactersLeft] = useState(MAX_CHARACTERS_ALLOWED);
  const [comment, setComment] = useState('');

  useEffect(() => {
    commentRef.current.focus();
  }, []);

  useEffect(() => {
    setCharactersLeft(MAX_CHARACTERS_ALLOWED - comment.length);
  }, [comment]);

  return (
    <form className="weather-card--form mt-2">
      <textarea
        className="form-control resize-none p-1"
        value={comment}
        rows={3}
        ref={commentRef}
        onChange={(e) => setComment(e.target.value)}
      />
      <div className="mt-1">
        <small>
          <span className="text-mute">Characters Left</span>
          {' '}
          <span className={`font-weight-bold ${charactersLeft < 0 ? 'text-danger' : ''}`}>{charactersLeft}</span>
        </small>
      </div>
    </form>
  );
};

export default CommentForm;
