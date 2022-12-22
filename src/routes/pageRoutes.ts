import AuthFactory from "../main/factory/AuthFactory";
import FeedFactory from "../main/factory/FeedFactory";

const pageRoutes = [
  {
    path: "/",
    element: AuthFactory,
  },
  {
    path: "/feed",
    element: FeedFactory,
  },
];

export default pageRoutes;
