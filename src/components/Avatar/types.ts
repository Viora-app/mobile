export interface AvatarProps {
  style?: object;
  id?: string;
  data:
    | {
        url: string;
      }
    | null
    | undefined;
}

export interface FileEvent {
  uri: string;
  name: string;
  type: string;
}
