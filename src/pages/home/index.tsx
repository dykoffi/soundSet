import React from "react";
import Message from "../../components/message";

import { RootState } from "../../features/store";
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from "../../features/counter/counterSlice";


export default function Index() {

  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()


  return (
    <div className="p-10">
      <Message title="React Starter" details="For beginners" />
      <h1 className="text-3xl font-bold">{count}</h1>
      <button className="mr-5" onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>

  );
};


