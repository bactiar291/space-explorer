export type APOD = {
  title: string;
  explanation: string;
  url: string;
  hdurl?: string;
  media_type: "image" | "video";
  date: string;
  copyright?: string;
};

export type NEOItem = {
  id: string;
  name: string;
  diameter_m: number;
  close_approach_date: string;
  relative_velocity_km_s: number;
  miss_distance_km: number;
  hazardous: boolean;
};
