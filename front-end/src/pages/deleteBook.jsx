import React from 'react';
import { useState } from 'react';
import Backbutton from '../component/backbutton';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../component/spinner';
import { useSnackbar } from 'notistack';

const deleteBook = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book deleted successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((err) => {
        setLoading(false);
        // alert(err.message);
        enqueueSnackbar(err.message, { variant: 'error' });
      });
  };
  return (
    <div className="p-4">
      <Backbutton />
      <h1 className="text-3xl my-4"> Delete Book</h1>
      {loading ? <Spinner /> : ''}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto ">
        <h3 className="text-2xl">Are you sure you want to delete this book?</h3>
        <button className="p-4 bg-red-600 text-white m-8 " onClick={handleDeleteBook}>
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};

export default deleteBook;
