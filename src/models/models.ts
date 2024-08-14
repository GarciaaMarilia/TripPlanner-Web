export interface Trip {
 id: string;
 id_user: string;
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

export interface Participant {
 id: string;
 name: string | null;
 email: string;
 is_confirmed: boolean;
}

export interface Activity {
 id: string;
 title: string;
 occurs_at: Date;
 trip_id: string;
}

export interface Link {
 id: string;
 title: string;
 url: string;
 trip_id: string;
}

export interface User {
 id: string;
 email: string;
 name: string;
}
