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
 is_owner: boolean;
 is_confirmed: boolean;
}

export interface Activities {
 data: string;
 activities: Activity[];
}

export interface Activity {
 id: string;
 title: string;
 occurs_at: Date | string;
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

export type NavigateTripParams = {
 tripId: string;
 userId?: string;
 isOwner?: boolean;
 isDisabled?: boolean;
};
