import { Fandom } from "./fandom";
import { User } from "./user";

export interface Fanfic{
    id: number;
    fanfic_name : string;
    fanfic : string;
    creation_date : Date;
    count_likes : number;
    user_username : string;
    description : string;
    link_photo : String;
    user : User;
    fandom: Fandom;
}