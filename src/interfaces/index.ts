export interface GuessWho {
  id: number;
  name: string;
  avatar: string;
  status: number;
  type: Type[];
}

export interface Type {
  name: string;
  type: string;
}
