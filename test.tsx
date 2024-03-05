import React, {FC, ReactNode, useCallback, useRef} from 'react';
import {Text, View} from 'react-native';
import {
  PullToRefresh as APullToRefresh,
  PullToRefreshHeader,
} from '@sdcx/pull-to-refresh';
import LottieView from 'lottie-react-native';
import AnimationSource from './PullingLoadingAnimation.json';
import styleCreator from './styles/pullToRefresh.style';

export interface ShouldRenderProps {
  condition: boolean;
  children: ReactNode;
}

const ShouldRender: FC<ShouldRenderProps> = props => {
  return <>{props.condition === true ? props.children : null}</>;
};

const DEFAULT_HEADER_HEIGHT = 166 / 2;

const PullToRefreshNative = ({
  style,
  children,
  refreshing,
  lottieProps,
  headerHeight = DEFAULT_HEADER_HEIGHT,
  headerComponent,
  text,
  headerStyle,
  onRefresh: outOnRefresh,
}: any) => {
  const styles = styleCreator(headerHeight);
  const animationRef = useRef<LottieView>(null);

  const onRefresh = useCallback(async () => {
    animationRef.current?.play();
    await outOnRefresh?.();
    animationRef.current?.pause();
  }, [outOnRefresh]);

  return (
    <APullToRefresh
      style={style}
      header={
        <PullToRefreshHeader refreshing={refreshing} onRefresh={onRefresh}>
          <View style={[styles.headerContainer, headerStyle]}>
            <ShouldRender condition={!!headerComponent}>
              {headerComponent}
            </ShouldRender>
            <ShouldRender condition={!headerComponent}>
              <LottieView
                {...(lottieProps || {})}
                style={styles.loading}
                ref={animationRef}
                source={AnimationSource}
                autoPlay={false}
                loop
              />
              <ShouldRender condition={text}>
                <Text
                  style={styles.text}
                  numberOfLines={2}
                  ellipsizeMode="tail">
                  {text}
                </Text>
              </ShouldRender>
            </ShouldRender>
          </View>
        </PullToRefreshHeader>
      }>
      {children}
    </APullToRefresh>
  );
};
export default PullToRefreshNative;
