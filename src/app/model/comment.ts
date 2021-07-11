import { Fanfic } from "./fanfic";
import { User } from "./user";

export interface Comment{
    id: number;
    fanfic : Fanfic;
    creation_date : Date;
    user : User;
    text : String;
}