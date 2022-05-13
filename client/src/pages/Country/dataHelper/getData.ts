import axios from "axios";
import { BACKEND_URL } from "../../../constants/backendURL";
import { Video } from "../../../constants/types/videoTypes";

interface DataProps {
  country: string;
}

interface Response {
  data: {
    avg_comments: string;
    avg_likes: string;
    avg_dislikes: string;
    avg_views: string;
    avg_time_of_day: string;
    avg_time_to_trend: string;
    videos: Video[];
  };
}

export const getData = ({ country }: DataProps) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${BACKEND_URL}/countries/${country}`)
      .then((res: Response) => {
        res.data.videos.sort(
          (a: Video, b: Video) =>
            new Date(a.pub_date).getTime() - new Date(b.pub_date).getTime()
        );
        const {
          avg_comments,
          avg_likes,
          avg_dislikes,
          avg_views,
          avg_time_of_day,
          avg_time_to_trend,
        } = res.data;

        resolve({
          videos: res.data.videos,
          avgs: {
            avg_comments,
            avg_likes,
            avg_dislikes,
            avg_views,
            avg_time_of_day,
            avg_time_to_trend,
          },
        });
      })
      /*const averages = ((avg) => ({
          name: avg.name,
          short: avg.short,
          value: res.data[avg.short],
        }))
        .sort((a, b) => a.name.localeCompare(b.name, "en"))
        */
      .catch((e) => {
        reject(e.msg);
      });
  });
