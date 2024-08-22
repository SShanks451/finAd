import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignInPage from "./components/SignInPage";
import SignUpPage from "./components/SignUpPage";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./redux/appStore";
import CustomerType from "./components/CustomerType";
import SocialHandles from "./components/SocialHandles";
import EditProfile from "./components/EditProfile";
import FlipWordsDemo from "./components/Landing";
import Feedpage from "./pages/Feedpage";
import ProtectedRoute from "./components/ProtectedRoute";
import OrganizationSignup from "./pages/OrganizationSignup";
import OrganizationProfile from "./pages/OrganizationProfile";
import JobPost from "./components/JobPost";
import JobFeedpage from "./pages/JobFeedpage";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <FlipWordsDemo />,
    },
    {
      path: "/signin",
      element: <SignInPage />,
    },
    {
      path: "/signup",
      element: <SignUpPage />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/feed",
      element: (
        <ProtectedRoute>
          <Feedpage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/customertype",
      element: <CustomerType />,
    },
    {
      path: "/socialhandles",
      element: <SocialHandles />,
    },
    {
      path: "/editprofile",
      element: <EditProfile />,
    },
    {
      path: "/organizationsignup",
      element: <OrganizationSignup />,
    },
    {
      path: "/organizationsprofile",
      element: <OrganizationProfile />,
    },
    {
      path: "/jobpost",
      element: <JobPost />,
    },
    {
      path: "/jobfeedpage",
      element: <JobFeedpage />,
    },
  ]);

  return (
    <Provider store={appStore}>
      <div className="w-[100%] min-h-screen bg-[#212121]">
        <RouterProvider router={appRouter} />
      </div>
    </Provider>
  );
}

export default App;
