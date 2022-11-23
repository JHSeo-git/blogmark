export interface ScrapByURLResponse {
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
