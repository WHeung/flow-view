import { createContext } from 'react';

export interface IScaleValue {
  scaling: boolean;
}

export const IScaleContext = createContext<IScaleValue>({ scaling: false });
