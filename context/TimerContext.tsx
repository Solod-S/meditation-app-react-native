import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface TimerContextType {
  duration: number;
  totalDuration: number;
  setDuration: Dispatch<SetStateAction<number>>;
  setTotalDuration: Dispatch<SetStateAction<number>>;
}

export const TimerContext = createContext<TimerContextType>({
  duration: 60,
  totalDuration: 60,
  setDuration: () => {},
  setTotalDuration: () => {},
});

interface TimerProviderProps {
  children: ReactNode;
}

const TimerProvider = ({ children }: TimerProviderProps) => {
  const [duration, setDuration] = useState(60);
  const [totalDuration, setTotalDuration] = useState(60);

  return (
    <TimerContext.Provider
      value={{ duration, setDuration, totalDuration, setTotalDuration }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export default TimerProvider;
