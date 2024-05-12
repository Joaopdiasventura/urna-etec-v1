export interface Course {
  name: string;
  concluded: boolean;
}

export interface Union {
  name: string;
}

export interface Representant {
  name: string;
  course: string;
}

export interface Vote {
  representant: string;
  union: string;
}
