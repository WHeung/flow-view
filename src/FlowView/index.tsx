import React, { useMemo } from 'react';
import _ from 'lodash';
import { CloseOutlined, DoubleRightOutlined, MinusOutlined, SendOutlined, StarOutlined } from '@ant-design/icons';
import cls from 'classnames';
import styles from './index.module.scss';
import Column from './Column';
import ScaleContainer from '../ScaleContainer';
import { IStage, StatusKey } from './interface';

interface IProp {
  flow: IStage[];
  status: StatusKey;
}

export default function FlowView(props: IProp) {
  const { flow, status } = props;

  const renderNode = ({
    tagClassNames = '',
    btnClassNames,
    iconClassNames,
    title,
    icon,
  }: {
    tagClassNames: string;
    btnClassNames: string;
    iconClassNames: string;
    title: string;
  }) => (
    <div className={cls(styles.stageTag, styles.end, 'flex rounded border shadow-md cursor-pointer', tagClassNames)} title={title}>
      <div className={cls('flex justify-center items-center h-10', btnClassNames)}>{icon || <i className={cls(iconClassNames)} />}</div>
    </div>
  );

  const renderEndTag = useMemo(() => {
    switch (status && status.toLowerCase()) {
      case 'success':
      case 'completedsuccess':
        return renderNode({
          btnClassNames: 'text-white bg-[#09d174] w-12',
          title: '结束',
          icon: <StarOutlined />,
        });
      case 'failed':
      case 'completederror':
      case 'failure':
        return renderNode({
          btnClassNames: 'text-white bg-[#ff4747] w-12',
          title: '失败',
          icon: <CloseOutlined />,
        });
      case 'canceled':
      case 'aborted':
        return renderNode({
          btnClassNames: 'text-white bg-[#b5b8bd] w-12',
          title: '取消',
          icon: <MinusOutlined />,
        });
      case 'skipped':
        return renderNode({
          btnClassNames: 'text-white bg-[#b5b8bd] w-12',
          title: '取消',
          icon: <DoubleRightOutlined />,
        });
      default:
        return renderNode({ tagClassNames: 'w-20', btnClassNames: 'text-bolded flex-grow bg-white relative', iconClassNames: styles['loading-hint'], title: '' });
    }
  }, [status]);

  return (
    <>
      <ScaleContainer className={cls('w-full', styles.scale)}>
        <div className={cls('flex')}>
          <div className={cls('flex-shrink-0 flex flex-col pl-12 pr-2 pt-14', styles.column)}>
            <div className={cls(styles.stageWrapper, 'mx-4 mt-1 mb-2')}>
              <div className={cls(styles.stageTag, styles.start, 'flex rounded border shadow-md cursor-pointer')} title="开始">
                <div className="flex justify-center items-center text-white bg-[#09d174] w-12 h-10">
                  <SendOutlined style={{ fontSize: '18px' }} />
                </div>
              </div>
            </div>
          </div>
          {_.map(flow, (item: IStage) => (
            <Column column={item} />
          ))}
          <div className={cls('flex-shrink-0 flex flex-col pl-2 pr-12 pt-14', styles.column)}>
            <div className={cls(styles.stageWrapper, 'mx-4 mt-1 mb-2')}>{renderEndTag}</div>
          </div>
        </div>
      </ScaleContainer>
    </>
  );
}
