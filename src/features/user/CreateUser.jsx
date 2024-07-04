import { useState } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateName } from './userSlice';
function CreateUser() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleSubmit(e) {
    e.preventDefault();
    if (username === '') return;
    dispatch(updateName(username));
    navigate('/menu');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-4 text-center"
    >
      <p>👋 Welcome! Please start by telling us your name:</p>

      <Input
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value.toUpperCase())}
      ></Input>
      {username !== '' && (
        <div>
          <Button
            color={'dark'}
            primary={true}
            onClick={handleSubmit}
            isLink={true}
          >
            Get Started &rarr;
          </Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
