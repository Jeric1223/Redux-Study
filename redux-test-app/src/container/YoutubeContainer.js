import React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import Youtube from "../components/Youtube";
import { setSubscribe, cansleSubscribe } from "../module/action/Youtube/index";

function YoutubeContainer() {
  const { subscribe } = useSelector(
    (state) => ({
      subscribe: state.reducerYoutube.subscribe,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  const onSetSubscribe = () => dispatch(setSubscribe());
  const onCansleSubscribe = () => dispatch(cansleSubscribe());

  return (
    <Youtube
      subscribe={subscribe}
      onCansleSubscribe={onCansleSubscribe}
      onSubscribe={onSetSubscribe}
    />
  );
}

export default YoutubeContainer;
