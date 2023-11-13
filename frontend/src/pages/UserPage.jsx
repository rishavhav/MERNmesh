import UserHeader from "../components/UserHeader"
import UserPost from "../components/UserPost"

const UserPage = () => {
  return (
    <>
      <UserHeader />
      <UserPost likes={1200} replies={481} postImg="/post1.png/" postTitle="Lets talk about threads" />
      <UserPost likes={432} replies={67} postImg="/post2.png/" postTitle="Nice tutorial" />
      <UserPost likes={8756} replies={65} postImg="/post3.png/" postTitle="Nice guy" />
      <UserPost likes={1244} replies={900} postTitle="This is my firstthrad" />
    </>
  )
}

export default UserPage
