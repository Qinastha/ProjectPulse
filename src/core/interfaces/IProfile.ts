import {ProfilePosition} from "../types/profilePositions.type"

export interface IProfile {
    firstName: string;
    lastName: string;
    avatar: string;
    language: string;
    position: ProfilePosition
}