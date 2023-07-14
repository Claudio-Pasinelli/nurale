import { createAction } from '@reduxjs/toolkit';

export const sendSkipAndTake = createAction(
  'skipAndTake/sendSkipAndTake',
  function prepare(skip: number | undefined, take: number) {
    return {
      payload: {
        skip,
        take,
      },
    };
  },
);
