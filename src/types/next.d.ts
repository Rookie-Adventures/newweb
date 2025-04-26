// 为Next.js的模块声明类型
declare module 'next/link';
declare module 'next/image';
declare module 'next/font/google';
declare module 'next' {
  export type Metadata = {
    title?: string;
    description?: string;
    keywords?: string;
  };
}

// React命名空间声明
declare namespace React {
  export type ReactNode =
    | React.ReactElement<unknown>
    | string
    | number
    | boolean
    | null
    | undefined
    | React.ReactNodeArray;

  export type ReactNodeArray = Array<ReactNode>;

  export interface ReactElement<P = unknown> {
    type: string | React.FC<P>;
    props: P;
  }

  export type FC<P = unknown> = (props: P) => ReactElement<P> | null;

  export type FormEvent<T extends Element = Element> = React.BaseSyntheticEvent<Event, T, T>;

  export type ChangeEvent<T extends Element = Element> = React.BaseSyntheticEvent<Event, T, T>;

  export interface BaseSyntheticEvent<
    E extends Event = Event,
    C extends Element = Element,
    T extends Element = Element,
  > {
    nativeEvent: E;
    currentTarget: C;
    target: T;
    bubbles: boolean;
    cancelable: boolean;
    defaultPrevented: boolean;
    eventPhase: number;
    isTrusted: boolean;
    preventDefault(): void;
    stopPropagation(): void;
    timeStamp: number;
    type: string;
  }
}

// JSX元素类型声明
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: unknown;
  }
}
