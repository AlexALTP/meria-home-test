import {Usertype} from '@app/Types/UserType';

export type ProjectType = {
  id: number;
  name: string;
  description: string;
  picture: string;
  ownersList: Usertype[];
}
