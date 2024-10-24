export interface ILoremState {
    data: { [key: string]: string };
    status: { [key: string]: 'idle' | 'loading' | 'succeeded' | 'failed' };
    error: { [key: string]: string | null };
  }