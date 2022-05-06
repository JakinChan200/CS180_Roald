export interface Video {
  video_id: string;
  title: string;
  pub_date: string;
  pub_time: string;
  pub_to_trend: string;
  views_to_likes: string;
  trending_date: string;
  channel_title: string;
  category_id: string;
  publish_time: string;
  views: string;
  likes: string;
  dislikes: string;
  comment_count: string;
  trend_date: string;
}

export const defaultVideo = {
  video_id: "",
  title: "",
  pub_date: "",
  pub_time: "",
  pub_to_trend: "",
  views_to_likes: "",
  trending_date: "",
  channel_title: "",
  category_id: "",
  publish_time: "",
  views: "",
  likes: "",
  dislikes: "",
  comment_count: "",
  trend_date: "",
}