import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import './style.scss';

dayjs.extend(relativeTime);

const Note = ({ note }) => (
  <div className="note p-15">
    <div className="note--text">
      {note.text}
      {' '}
      { note.updatedAt && (<small><i>(edited)</i></small>) }
    </div>
    <div className="text-right">
      <small><i>{dayjs(note.createdAt).fromNow()}</i></small>
    </div>
  </div>
);

Note.propTypes = {
  note: PropTypes.shape({
    text: PropTypes.string.isRequired,
    createdAt: PropTypes.number.isRequired,
    updatedAt: PropTypes.number,
  }).isRequired,
};

export default Note;
