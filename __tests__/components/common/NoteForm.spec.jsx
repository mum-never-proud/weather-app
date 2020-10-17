import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import NoteForm from '@/components/common/NoteForm';
import '@testing-library/jest-dom/extend-expect';

describe('NoteForm', () => {
  const note = {
    text: 'Gibberish Note',
    createdAt: Date.now(),
    updatedAt: null,
  };
  const onSubmit = jest.fn();
  const isSubmitted = false;

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render NoteForm', () => {
    expect.hasAssertions();

    render(<NoteForm note={note} onSubmit={onSubmit} isSubmitted={isSubmitted} />);

    expect(screen.getByTestId('weather-card-form')).toBeInTheDocument();
  });

  it('should update characters left', () => {
    expect.hasAssertions();

    render(<NoteForm note={note} onSubmit={onSubmit} isSubmitted={isSubmitted} />);

    expect(screen.getByText(`${140 - note.text.length}`)).toBeInTheDocument();
  });

  it('should call onSubmit callback', () => {
    expect.hasAssertions();

    render(<NoteForm note={note} onSubmit={onSubmit} isSubmitted={isSubmitted} />);

    fireEvent.click(screen.getByTestId('note-form-submit'));

    expect(onSubmit).toHaveBeenCalled();
  });

  it('should clear from on submit', () => {
    expect.hasAssertions();

    render(<NoteForm note={note} onSubmit={onSubmit} isSubmitted />);

    expect(screen.getByText('140')).toBeInTheDocument();
  });
});
