import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './Header';
import Button from './Button';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider, useDispatch, useSelector } from 'react-redux';
import Posts from './components/Posts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DataFetcher from './components/DataFetcher';
import './index.css';

const queryClient = new QueryClient();
function Home() {
  return (
    <QueryClientProvider client={queryClient}>
    <div className="container mx-auto p-6">
      <Header title="React Workshop" />
      <p className="mb-4">เรียนรู้พื้นฐานของ React ผ่านการปฏิบัติจริง</p>
      <Posts />
    </div>
  </QueryClientProvider>
  );
}
function About() {
  const handleClick = () => {
    alert('ปุ่มถูกคลิ้กแล้ว!');
  };
  return (
    <div>
    <Header title="React Workshop" />
    <p>เรียนรู้พื้นฐานของ React ผ่านการปฏิบัติจริง</p>
    <Button label="คลิกตรงนี้" onClick={handleClick} />
  </div>
  );
}
function Greeting(){
  const user = {
    name: 'John Doe',
    age: 25,
  };
  return (
    <div>
      <Header title="Greeting new User!" />
      <p>ชื่อ: {user.name}, อายุ: {user.age}</p>
      <Button label="ตกลง" onClick={() => alert('สวัสดี ' + user.name)} />
    </div>
  );
}

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },
    decrement: (state) => { state.value -= 1; }
  }
});

const store = configureStore({ reducer: { counter: counterSlice.reducer } });

function Counter() {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(counterSlice.actions.increment())}>+</button>
      <button onClick={() => dispatch(counterSlice.actions.decrement())}>-</button>
    </div>
  );
}
function Store(){
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}
function Search(){
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">React API Example</h1>
        <DataFetcher />
      </div>
    </QueryClientProvider>
  );
}

function App() {
  const [count, setCount] = useState(0)
  return (
    <Router>
      <nav> 
        <Link to="/">Home</Link> | <Link to="/about">About</Link> | <Link to="/greeting">Greeting</Link>| <Link to = "/store">Store</Link>| <Link to = "/search">Search</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/greeting" element={<Greeting />} />
        <Route path="/store" element={<Store />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  );
}

export default App
