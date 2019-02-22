export interface Res<T = any> {
  success: boolean;
  result: T;
  msg: string;
}

export interface Result {
  personNum: number;
  image: string;
}
