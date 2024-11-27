import React, { useMemo } from 'react';
import _ from 'lodash';
import styles from './index.module.scss';
import cls from 'classnames';
import Stage from './Stage';
import { IStage } from './interface';

interface IProp {
  column: IStage;
}

function Column(props: IProp): React.ReactElement | null {
  const { column } = props;

  const parallel = useMemo(() => _.some(column?.children, (stage: IStage) => stage.type === 'PARALLEL'), [column]);

  return (
    <div key={column.id} className={cls('min-w-[320px] flex-shrink-0 flex flex-col pt-14 items-center px-2', styles.column)}>
      {parallel ? (
        _.map(column?.children, (stage: IStage) => {
          if (!stage) return null;
          return <Stage stage={stage} />;
        })
      ) : (
        <Stage stage={column} />
      )}
    </div>
  );
}

export default Column;
