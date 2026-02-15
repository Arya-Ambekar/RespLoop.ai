import { useEffect } from "react";
import {
  connectToSocket,
  disconnectFromSocket,
} from "../src/slices/socket/socketSlice";
import { useAppDispatch } from "./store/hooks";

function App({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(connectToSocket());

    return () => {
      dispatch(disconnectFromSocket());
    };
  }, [dispatch]);

  return <>{children}</>;
}

export default App;
