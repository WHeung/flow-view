import React, { useMemo } from 'react';
import cls from 'classnames';
import _ from 'lodash';
import { LoadingOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import Step from './Step';
import { IStage, StatusKey } from './interface';
import { isDisabledStatus } from './utils';
import { StatusMap } from './constant';

interface IProp {
  stage: IStage;
}

function Stage(props: IProp): React.ReactElement | null {
  const { stage } = props;

  const disabled = useMemo(() => isDisabledStatus(stage), [stage]);

  const renderStatus = (stage: IStage) => {
    let status = stage.state ? (stage.state.toLowerCase() as StatusKey) : 'default';
    // 如果 status 为 null 则视为未运行，所有节点均禁用同样视为未运行
    if (stage.state === null) {
      status = 'not_built';
    }
    const statusItem = StatusMap[status] || StatusMap.default;
    // 暂时统一做运行状态展示
    if (status === 'running') {
      return (
        <div className="flex justify-center items-center text-white w-12 h-10 bg-blue-400">
          <div className="flex-shrink-0 rounded-full flex items-center justify-center">
            <div title="运行中" className="loading-simple flex items-center justify-center text-white">
              <LoadingOutlined />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="flex justify-center items-center text-white w-12 h-10" style={{ backgroundColor: statusItem.color }}>
        <div title={statusItem.name} className="flex-shrink-0 rounded-full w-5 h-5 flex items-center justify-center border border-white">
          {statusItem.icon}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={cls(styles.stage, 'relative w-full flex justify-center')}>
        <div className={cls(styles.stageWrapper, 'mx-6 mt-3 mb-2')}>
          <div
            className={cls(styles['stage-tag'], 'ignore-drag-scroll', 'flex rounded border shadow-md cursor-pointer', {
              [styles.disabled]: disabled,
            })}
            onClick={stage.onClick}
          >
            {stage?.renderStatus?.() || renderStatus(stage)}
            <div className={cls(styles['stage-tag-inner'], 'flex justify-center items-center text-bolded flex-grow bg-white relative px-1')}>
              <span className="max-w-[180px] truncate" title={stage.title || stage.name}>
                {stage.name}
              </span>
            </div>
          </div>
          <div className="mx-2 flex-column items-center">
            {_.map(stage?.steps, (item: IStage) => (
              <Step step={item} />
            ))}
            {_.map(stage?.children, (item: IStage) => (
              <Stage stage={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Stage;
