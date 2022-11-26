export interface FaceBookScrapQueryParams {
  id: string;
  scrape: boolean;
  access_token: string;
  fields?: 'ob_object';
}

export interface PostOpenGraphResponse {
  url: string;
  type: string;
  title: string;
  image: Image[];
  description: string;
  site_name: string;
  updated_time: string;
  application: Application;
}

interface Application {
  id: string;
  name: string;
  url: string;
}

interface Image {
  url: string;
}

export interface GetOpenGraphResponse {
  og_object?: OgObject;
  id: string;
}

export interface OgObject {
  id: string;
  description: string;
  title: string;
  type: string;
  updated_time: string;
}
