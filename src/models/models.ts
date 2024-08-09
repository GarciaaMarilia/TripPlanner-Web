export interface Trip {
 id: string;
 id_user: number;
 destination: string;
 starts_at: Date;
 ends_at?: Date;
 is_confirmed: boolean;
 created_at: Date;
 participants: Participant[];
 activities: Activity[];
 linkies: Link[];
 user: User;
}

export interface Participant {}

export interface Activity {}

export interface Link {}

export interface User {}
