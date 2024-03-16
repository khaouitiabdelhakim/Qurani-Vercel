type Person = {
  fullName: string;
  email: string;
  phone: string;
  school: string;
};

export type Participation = {
  id: string;
  projectTitle: string;
  projectDescription: string;
  teamName: string;
  isQualified: boolean;
  dateParticipation:number;
  profile1: Person;
  profile2: Person;
  profile3: Person;
  profile4: Person;
  profile5: Person;
};
