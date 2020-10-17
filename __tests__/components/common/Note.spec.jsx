import {
  render, screen,
} from '@testing-library/react';
import React from 'react';
import Note from '@/components/common/Note';
import '@testing-library/jest-dom/extend-expect';

describe('Note', () => {
  const note = {
    text: 'Gibberish Note',
    createdAt: Date.now(),
    updatedAt: null,
  };

  it('should render Note', () => {
    expect.hasAssertions();

    render(<Note note={note} />);

    expect(screen.getByTestId('note')).toBeInTheDocument();
  });

  it('should show should display N/A when text is empty', () => {
    expect.hasAssertions();

    render(<Note note={{ ...note, text: '' }} />);

    expect(screen.getAllByText('N/A').length).toEqual(1);
  });

  it('should show message as edited on presence of updatedAt', () => {
    expect.hasAssertions();

    render(<Note note={{ ...note, updatedAt: Date.now() }} />);

    expect(screen.getByText('(edited)')).toBeInTheDocument();
  });
});
