import { useEffect, useState } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useDebounce = (text:string, delay:number) => {
    const [debounce, setDebouce] = useState(text);
    
    useEffect(() => {
      const timer = setTimeout(() => {
        setDebouce(text);
      }, delay);
      return () => clearTimeout(timer);
    }, [text, delay])
    return debounce
  }