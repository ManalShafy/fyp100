import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../screens/auth/Home";
import Register from "../../screens/auth/Register";
import Login from "../../screens/auth/Login";
import { AuthContext } from "../../context/authContext";
import HeaderMenu from "./HeaderMenu";
import About from "../../screens/About";
import Post from "../../screens/Post";
import Courses from "../../screens/Courses";
import ProjectBoard from "../../screens/ProjectBoard";
import Account from "../../screens/Account";
import RegisterMentor from "../../screens/auth/RegisterMentor";
import Mentor from "../../screens/Mentor";
import Message from "../../screens/Message";
import Chat from "../../screens/Chat";
import Myposts from "../../screens/Myposts";
import AddCourses from "../../screens/AddCourses";
import UserProfile from "../../screens/UserProfile";
import ViewCommunity from "../../screens/ViewCommunity";
import ViewMyCourses from "../../screens/ViewMyCourses";
import Network from "../../screens/Network";
import CourseDetails from "../../screens/CourseDetails";
import createChat from "../../screens/createChat";
import interviewChecklist from "../../screens/interviewChecklist";
import flashCards from "../../screens/flashCards";
import quiz from "../../screens/quiz";
import quizSplash from "../../screens/quizSplash";
import score from "../../screens/score";
import InterviewChecklistSplash from "../../screens/interviewChecklistSplash";
import JobBoard from "../../screens/JobBoard";
import EmployerLogin from "../../screens/EmployerLogin";
import ViewPostedJobs from "../../screens/ViewPostedJobs";
import AddAJob from "../../screens/AddAJob";
import JobDetailsEmployer from "../../screens/JobDetailsEmployer";
import VideoPractice from "../../screens/VideoPractice";
import JobDetailsApplicant from "../../screens/JobDetailsApplicant";
import ClientHome from "../../screens/ClientHome";
import AddGig from "../../screens/AddGig";
import ViewMyGigsClient from "../../screens/ViewMyGigsClient";
import ProjectDetailsClient from "../../screens/ProjectDetailsClient";
import ProjectDetailsBidder from "../../screens/ProjectDetailsBidder";
import ViewInprogressGigsClient from "../../screens/ViewInprogressGigsClient";
import ProjectDetailsClientPayment from "../../screens/ProjectDetailsClientPayment";
import GigPaymentScreen from "../../screens/GigPaymentScreen";
import ViewInprogressGigsFreelancer from "../../screens/ViewInprogressGigsFreelancer";
import FreelancerProfile from "../../screens/FreelancerProfile";
import ViewAppliedJobs from "../../screens/ViewAppliedJobs";
import QuizKey from "../../screens/QuizKey";
import PrepInterview from "../../screens/PrepInterview";
import PostDetails from "../../screens/PostDetails";
import JobClientHome from "../../screens/JobClientHome";
import MessagePosts from "../../screens/MessagePosts";
import CommentScreen from "../../screens/CommentScreen";
import GroupMessage from "../../screens/GroupMessage";
import CreateGroupChat from "../../screens/CreateGroupChat";
import GCPartcipants from "../../screens/GCParticpants";
import ComplaintCell from "../../screens/ComplaintCell";
import PageChatHeader from "./PageChatHeader";
import AdminComplaintCell from "../../screens/AdminComplaintCell";
import RegisterPage from "../../screens/auth/RegisterPage";
import SearchScreen from "../../screens/SearchScreen";
import UserProfileSearch from "../../screens/UserProfileSearch";

const ScreenMenu = () => {
  //global state
  const [state] = useContext(AuthContext);
  //auth condition true false
  const authenticatedUser = state?.user && state?.token;

  //   useEffect(() => {
  //     const checkAuthentication = () => {
  //       if (!state?.token) {
  //         // If the token is null, navigate to the login screen
  //         navigation.navigate('Login');
  //       }
  //     };

  //     checkAuthentication();
  //   }, [state?.token, navigation]);
  // };

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Login">
      {authenticatedUser ? (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: "Sheconnects",
              header: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="PostDetails"
            component={PostDetails}
            options={{
              title: "Sheconnects",
              header: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="Comments"
            component={CommentScreen}
            options={{
              title: "Sheconnects",
              header: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="Account"
            component={Account}
            options={{
              title: "Sheconnects",
              header: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            // MY NETWORK SCREEN
            name="About"
            component={About}
            options={{
              //comment this out when you use headerbackTitle
              title: "Sheconnects",
              // headerBackTitle: "Back",
              header: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="Post"
            component={Post}
            options={{
              title: "Sheconnects",
              header: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="Courses"
            component={Courses}
            options={{
              title: "Sheconnects",
              header: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="ProjectBoard"
            component={ProjectBoard}
            options={{
              title: "Sheconnects",
              header: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="Message"
            component={Message}
            options={{
              title: "Sheconnects",
              header: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="MessagePosts"
            component={MessagePosts}
            options={{
              title: "Sheconnects",
              header: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="Chat"
            component={Chat}
            options={({ route }) => ({
              // title: route.params.userName,
              header: () => <PageChatHeader />,
            })}
          />
          <Stack.Screen
            name="GCPartcipants"
            component={GCPartcipants}
            options={({ route }) => ({
              // title: route.params.userName,
              header: () => <HeaderMenu />,
            })}
          />
          <Stack.Screen
            name="RegisterMentor"
            component={RegisterMentor}
            options={{
              title: "Sheconnects",
              header: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="RegisterPage"
            component={RegisterPage}
            options={{
              title: "Sheconnects",
              header: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="SearchScreen"
            component={SearchScreen}
            options={{
              title: "Sheconnects",
              header: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="UserProfileSearch"
            component={UserProfileSearch}
            options={{
              title: "Sheconnects",
              header: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            // MY NETWORK SCREEN
            name="Mentor"
            component={Mentor}
            options={{
              //comment this out when you use headerbackTitle
              title: "Sheconnects",
              // headerBackTitle: "Back",
              header: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="Myposts"
            component={Myposts}
            options={{
              title: "Sheconnects",
              header: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            // MY NETWORK SCREEN
            name="AddCourse"
            component={AddCourses}
            options={{
              //comment this out when you use headerbackTitle
              title: "Sheconnects",
              // headerBackTitle: "Back",
              header: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            // MY NETWORK SCREEN
            name="UserProfile"
            component={UserProfile}
            options={{
              //comment this out when you use headerbackTitle
              title: "Sheconnects",
              // headerBackTitle: "Back",
              header: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            // MY NETWORK SCREEN
            name="ViewCommunity"
            component={ViewCommunity}
            options={{
              //comment this out when you use headerbackTitle
              title: "Sheconnects",
              // headerBackTitle: "Back",
              header: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            // MY NETWORK SCREEN
            name="ViewMyCourses"
            component={ViewMyCourses}
            options={{
              //comment this out when you use headerbackTitle
              title: "Sheconnects",
              // headerBackTitle: "Back",
              header: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            // MY NETWORK SCREEN
            name="Network"
            component={Network}
            options={{
              //comment this out when you use headerbackTitle
              title: "Sheconnects",
              // headerBackTitle: "Back",
              header: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="CourseDetails"
            component={CourseDetails}
            options={{
              title: "Sheconnects",
              header: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="CreateChat"
            component={createChat}
            options={{
              title: "Sheconnects",
              header: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="interviewChecklistSplash"
            component={InterviewChecklistSplash}
            options={{
              title: "Sheconnects",
              header: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="interviewChecklist"
            component={interviewChecklist}
            options={{
              title: "Sheconnects",
              header: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="flashcards"
            component={flashCards}
            options={{
              title: "Sheconnects",
              header: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="quiz"
            component={quiz}
            options={{
              title: "Sheconnects",
              header: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="quizSplash"
            component={quizSplash}
            options={{
              title: "Sheconnects",
              header: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="score"
            component={score}
            options={{
              title: "Sheconnects",
              header: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="QuizKey"
            component={QuizKey}
            options={{
              title: "Sheconnects",
              header: () => <HeaderMenu />,
            }}
          />

          <Stack.Screen
            name="VideoPractice"
            component={VideoPractice}
            options={{
              title: "Sheconnects",
              header: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="JobBoard"
            component={JobBoard}
            options={{
              title: "Sheconnects",
              header: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="EmployerLogin"
            component={EmployerLogin}
            options={{
              title: "Sheconnects",
              header: () => <HeaderMenu />,
            }}
          />
          {/* <Stack.Screen
            name="ViewPostedJobs"
            component={ViewPostedJobs}
            options={{
              title: "Sheconnects",
              header: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="AddAJob"
            component={AddAJob}
            options={{
              title: "Sheconnects",
              header: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="JobDetailsEmployer"
            component={JobDetailsEmployer}
            options={{
              title: "Sheconnects",
              header: () => <HeaderMenu />,
            }}
          />*/}
          <Stack.Screen
            name="JobDetailsApplicant"
            component={JobDetailsApplicant}
            options={{
              title: "Sheconnects",
              header: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="ClientHome"
            component={ClientHome}
            options={{
              title: "Sheconnects",
              header: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="AddGig"
            component={AddGig}
            options={{
              title: "Sheconnects",
              header: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="ViewMyGigsClient"
            component={ViewMyGigsClient}
            options={{
              title: "Sheconnects",
              header: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="ProjectDetailsClient"
            component={ProjectDetailsClient}
            options={{
              title: "Sheconnects",
              header: () => <HeaderMenu />,
            }}
          />

          <Stack.Screen
            name="ProjectDetailsBidder"
            component={ProjectDetailsBidder}
            options={{
              title: "Sheconnects",
              header: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="ViewInprogressGigsClient"
            component={ViewInprogressGigsClient}
            options={{
              title: "Sheconnects",
              header: () => <HeaderMenu />,
            }}
          />

          <Stack.Screen
            name="ProjectDetailsClientPayment"
            component={ProjectDetailsClientPayment}
            options={{
              title: "Sheconnects",
              header: () => <HeaderMenu />,
            }}
          />

          {/* <Stack.Screen
            name="GigPaymentScreen"
            component={GigPaymentScreen}
            options={{
              title: "Sheconnects",
              header: () => <HeaderMenu />,
            }}
          /> */}

          <Stack.Screen
            name="ViewInprogressGigsFreelancer"
            component={ViewInprogressGigsFreelancer}
            options={{
              title: "Sheconnects",
              header: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="FreelancerProfile"
            component={FreelancerProfile}
            options={{
              title: "Sheconnects",
              header: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="ViewAppliedJobs"
            component={ViewAppliedJobs}
            options={{
              title: "Sheconnects",
              header: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="PrepInterview"
            component={PrepInterview}
            options={{
              title: "Sheconnects",
              header: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="GroupMessage"
            component={GroupMessage}
            options={{
              title: "Sheconnects",
              header: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="CreateGroupChat"
            component={CreateGroupChat}
            options={{
              title: "Sheconnects",
              header: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="ComplaintCell"
            component={ComplaintCell}
            options={{
              title: "Sheconnects",
              header: () => <PageChatHeader />,
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="JobClientHome"
            component={JobClientHome}
            options={{
              title: "Sheconnects",
              header: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="ViewPostedJobs"
            component={ViewPostedJobs}
            options={{
              title: "Sheconnects",
              header: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="AddAJob"
            component={AddAJob}
            options={{
              title: "Sheconnects",
              header: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="JobDetailsEmployer"
            component={JobDetailsEmployer}
            options={{
              title: "Sheconnects",
              header: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="AdminComplaintCell"
            component={AdminComplaintCell}
            options={{
              title: "Sheconnects",
              header: () => <HeaderMenu />,
            }}
          />
          {/* added these here as well so that is if the user manvigates to other screens using footer menu when logged in as he can4
          he will simply be navigated to login screen first  */}
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: "Sheconnects",
              header: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="PostDetails"
            component={PostDetails}
            options={{
              title: "Sheconnects",
              header: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            // MY NETWORK SCREEN
            name="About"
            component={About}
            options={{
              //comment this out when you use headerbackTitle
              title: "Sheconnects",
              // headerBackTitle: "Back",
              header: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="Post"
            component={Post}
            options={{
              title: "Sheconnects",
              header: () => <HeaderMenu />,
            }}
          />
          {/* <Stack.Screen
            name="PostDetails"
            component={PostDetails}
            options={{
              title: "Sheconnects",
              header: () => <HeaderMenu />,
            }}
          /> */}
          <Stack.Screen
            name="Courses"
            component={Courses}
            options={{
              title: "Sheconnects",
              header: () => <HeaderMenu />,
            }}
          />
          {/* <Stack.Screen
            name="JobDetailsApplicant"
            component={JobDetailsApplicant}
            options={{
              title: "Sheconnects",
              header: () => <HeaderMenu />,
            }}
          /> */}
          <Stack.Screen
            name="GroupMessage"
            component={GroupMessage}
            options={{
              title: "Sheconnects",
              header: () => <HeaderMenu />,
            }}
          />
          {/* <Stack.Screen
            name="CreateChat"
            component={createChat}
            options={{
              title: "Sheconnects",
              header: () => <HeaderMenu />,
            }}
          /> */}
          <Stack.Screen
            name="CreateGroupChat"
            component={CreateGroupChat}
            options={{
              title: "Sheconnects",
              header: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="Chat"
            component={Chat}
            options={({ route }) => ({
              // title: route.params.userName,
              header: () => <PageChatHeader />,
            })}
          />
          <Stack.Screen
            name="GCPartcipants"
            component={GCPartcipants}
            options={({ route }) => ({
              // title: route.params.userName,
              header: () => <HeaderMenu />,
            })}
          />
          <Stack.Screen
            name="ComplaintCell"
            component={ComplaintCell}
            options={{
              title: "Sheconnects",
              header: () => <PageChatHeader />,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default ScreenMenu;

const styles = StyleSheet.create({});
