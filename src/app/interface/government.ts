import { Site } from "./site";

export interface Government {
  governmentId: number;
  name: string;
  image: string;
  sites?: Site[];
}
