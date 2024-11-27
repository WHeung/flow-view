import _ from 'lodash';
import { IStage } from './interface';

export const isDisabledStatus = (stage: IStage) => _.includes(['queued', 'not_built', 'skipped'], _.toLower(stage.state));

export function durationFormat(t: string | number): string {
  let numLeft = Number(t);
  if (isNaN(numLeft)) {
    return '';
  }
  // const hour = Math.floor(numLeft / 3600)
  // numLeft %= 3600
  const minute = Math.floor(numLeft / 60);
  numLeft %= 60;
  const second = Math.floor(numLeft);
  return `${minute}m:${second}s`;
}
