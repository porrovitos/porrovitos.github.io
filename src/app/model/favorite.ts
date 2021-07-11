import { Fanfic } from "./fanfic";
import { User } from "./user";

export interface Favorite{
    id: number;
    fanfic : Fanfic;
    user : User;
}