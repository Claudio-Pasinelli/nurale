interface QueryString {
    [key: string]: string | string[] | number[] | number | boolean | null | undefined;
  }
  export const queryString = (params: QueryString = {}): string => {
    // get array of key value pairs ([[k1, v1], [k2, v2]])
    const qs = Object.entries(params)
      // filter pairs with undefined value
      .filter((pair): boolean => pair[1] !== undefined)
      // encode keys and values, remove the value if it is null, but leave the key
      .map((pair): string =>
        pair
          .filter((i): boolean => i !== null)
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          .map(encodeURIComponent)
          .join('=')
      )
      .join('&');
  
    return qs && `?${qs}`;
  };