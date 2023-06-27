export interface ParamsUrl {
    url: string;
    params?: {
      [key: string]: string | string[] | number[] | number | boolean | null | undefined | any;
    };
    body?: {
      [key: string]: string | string[] | number[] | number | boolean | null | undefined | any;
    };
  }