import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import './style.scss';

dayjs.extend(relativeTime);

const Note = ({ note, onEdit, onDelete }) => (
  <div className="note p-1" data-testid="note">
    <div className="note--actions text-right">
      <button className="button rounded primary cursor-pointer" type="button" onClick={() => onEdit(note)}>
        <AiOutlineEdit />
      </button>
      {' '}
      <button className="button rounded primary cursor-pointer" type="button" onClick={() => onDelete(note)}>
        <AiOutlineDelete />
      </button>
    </div>
    <div className="note--text" data-testid="note--text">
      {note.text || 'N/A'}
      {' '}
      { note.updatedAt && (<span className="note--edited">(edited)</span>) }
    </div>
    <div className="text-right">
      <small className="note--timestamp"><i>{dayjs(note.createdAt).fromNow()}</i></small>
    </div>
  </div>
);

Note.defaultProps = {
  onEdit: () => {},
  onDelete: () => {},
};
Note.propTypes = {
  note: PropTypes.shape({
    text: PropTypes.string.isRequired,
    createdAt: PropTypes.number.isRequired,
    updatedAt: PropTypes.number,
  }).isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default Note;
