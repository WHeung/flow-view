import React, { KeyboardEventHandler, WheelEventHandler, useMemo, useState } from 'react';
import { Slider } from 'antd';
import cls from 'classnames';
import styles from './index.module.scss';
import { IScaleContext } from './context';
import ScrollContainer from 'react-indiana-drag-scroll';

interface Props {
  onTransformChange?: (transform: string) => void;
  children: React.ReactNode;
  className?: string;
  height?: string;
}

const MIN = 0.5;
const MAX = 3;

const ScaleContainer: React.FC<Props> = ({ onTransformChange, children, className = '', height }) => {
  const [scale, setScale] = useState(1);

  const handleScaleChange = (value: number) => {
    const transform = `scale(${value})`;
    setScale(value);
    onTransformChange?.(transform);
  };

  const handleKeyDown: KeyboardEventHandler = (e) => {
    if (e.keyCode !== 187 && e.keyCode !== 189) return;
    if (!e.ctrlKey) return;
    // 计算缩放比例
    const scaleDelta = e.keyCode === 189 ? -0.1 : 0.1; // 根据滚动方向计算缩放比例变化量
    const newScale = scale + scaleDelta;
    const clampedScale = Math.min(Math.max(newScale, MIN), MAX);
    setScale(clampedScale);
  };

  const handleWheel: WheelEventHandler = (e) => {
    if (!e.ctrlKey) return;
    const scaleDelta = e.deltaY > 0 ? -0.1 : 0.1; // 根据滚动方向计算缩放比例变化量
    const newScale = scale + scaleDelta;
    const clampedScale = Math.min(Math.max(newScale, MIN), MAX);
    setScale(clampedScale);
  };

  const containerStyle = useMemo(() => {
    const originHeight = height || '100vh';
    if (scale === 1) return { width: '100%', height: `calc(${originHeight})` };
    const rate = 100 / scale;
    return {
      transform: `scale(${scale})`,
      transformOrigin: '0 0',
      width: `${rate}%`,
      height: `calc((${originHeight}) / ${scale})`,
    };
  }, [scale, height]);

  return (
    <div className={styles.wrapper} style={{ height: `calc(${height || '100vh'})` }}>
      <div className={cls({ [styles.scaling]: scale !== 1 }, styles.wrap, className)} tabIndex={0} onKeyDown={handleKeyDown} onWheel={handleWheel}>
        <div className={styles.controls}>
          <Slider vertical min={MIN} max={MAX} step={0.1} value={scale} onChange={handleScaleChange} />
        </div>
        <ScrollContainer
          className={cls('w-full h-full flex overflow-x-scroll', styles.wrapper)}
          ignoreElements='.ignore-drag-scroll'
          draggingClassName={styles.dragging}
          hideScrollbars={false}
          style={containerStyle}
        >
          <IScaleContext.Provider value={{ scaling: scale !== 1 }}>
            <div className='h-full'>{children}</div>
          </IScaleContext.Provider>
        </ScrollContainer>
      </div>
    </div>
  );
};

export default ScaleContainer;
