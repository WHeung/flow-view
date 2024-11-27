import { ReactNode } from 'react';
import { StatusMap } from './constant';

export type StatusKey = keyof typeof StatusMap;

export interface IStage {
  id: React.Key;
  name: string;
  state: StatusKey;
  type: string;
  title: string;
  totalDurationMillis: number;
  nextSibling: null;
  sequential: false;
  synthetic: false;
  steps: IStage[];
  children: IStage[];
  // 自定义
  onClick?: () => void;
  renderStatus?: () => ReactNode;
  actions?: Action[];
}

export interface IStep {
  id: React.Key;
  name: string;
  state: string;
  type: string;
  title: string;
  totalDurationMillis: number;
  pauseDurationMillis: number;
  actions?: Action[];
  onClick?: () => void;
}

export type Action = string | { icon: ''; onClick: () => void };
