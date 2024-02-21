import UserHeader from "../components/UserHeader"
import UserPost from "../components/UserPost"

const UserPage = () => {
  return (
    <>
      <UserHeader />
      <UserPost
        likes={1200}
        replies={678}
        postImg={"/post1.png"}
        postTitle={"This is sample post 1"}
      />
      <UserPost
        likes={560}
        replies={78}
        postImg={"/post2.png"}
        postTitle={"Looking sample post 2"}
      />
      <UserPost
        likes={1500}
        replies={978}
        postImg={"/post3.png"}
        postTitle={"sample post 3"}
      />
      <UserPost likes={2300} replies={1208} postTitle={"It is sample post 1"} />
    </>
  )
}
export default UserPage
