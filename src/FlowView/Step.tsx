import React from 'react';
import cls from 'classnames';
import { LoadingOutlined, StopOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import { Tooltip } from 'antd';
import { durationFormat } from './utils';
import { IStage, StatusKey } from './interface';
import { StatusMap } from './constant';
interface IProp {
  step: IStage;
}

function Step(props: IProp): React.ReactElement | null {
  const { step } = props;

  const renderStatus = (step: IStage) => {
    if (step.state === 'skipped') return null;
    let status = step.state ? (step.state.toLowerCase() as StatusKey) : 'default';
    // 如果 step_id 为 null 或者 status 为 null 则视为未运行
    if (!step.id || step.state === null) {
      status = 'notbuilt';
    }
    const statusItem = StatusMap[status] || StatusMap.default;
    // 暂时统一做运行状态展示
    if (status === 'running') {
      return (
        <div title="运行中" className="loading-simple flex items-center justify-center">
          <LoadingOutlined />
        </div>
      );
    }
    return (
      <div
        title={statusItem.name}
        className="flex-shrink-0 rounded-full w-5 h-5 flex items-center justify-center text-white"
        style={{ backgroundColor: statusItem.color }}
      >
        {statusItem.icon}
      </div>
    );
  };

  return (
    <>
      <div className={cls(styles['step-wrap'])} style={{ minWidth: '100%' }}>
        <div className={cls('flex items-center mx-3', styles.stepOuter)} title={step.title || step.name} onClick={step?.onClick}>
          <div
            className={cls('shadow-md flex pl-10 pr-12 justify-center items-center truncate', styles.step, {
              [styles.disabled]: step.state === 'skipped',
            })}
          >
            <div className="absolute left-3">{step?.renderStatus?.() || renderStatus(step)}</div>
            <span className="truncate">{step.name}</span>
            {step.state !== 'skipped' ? (
              <div className={cls('w-15 min-h-full absolute right-[2px]', styles.duration)}>
                <span className="text-xs text-gray-400 nowrap scale-[0.8] translate-y-[1px] truncate">
                  {durationFormat(step.totalDurationMillis / 1000)}
                </span>
              </div>
            ) : (
              <Tooltip title="运行时跳过该节点">
                <StopOutlined />
              </Tooltip>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Step;
