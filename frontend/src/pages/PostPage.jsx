import { Avatar, Box, Divider, Flex, Image, Text } from "@chakra-ui/react"
import { BsThreeDots } from "react-icons/bs"
import Actions from "../components/Actions"
import { useState } from "react"
import Comment from "../components/Comment"
const PostPage = () => {
  const [liked, setLiked] = useState(false)
  return (
    <>
      <Flex>
        <Flex w={"full"} gap={3} alignItems={"center"}>
          <Avatar src="/zuck-avatar.png" size={"md"} name="Mark Zuckerberg" />
          <Flex>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              markzuckerberg
            </Text>
            <Image src="/verified.png" w={4} h={4} ml={4} />
          </Flex>
        </Flex>
        <Flex gap={4} alignItems={"center"}>
          <Text fontSize={"sm"} color={"gray.light"}>
            1d
          </Text>
          <BsThreeDots />
        </Flex>
      </Flex>
      <Text my={3}>Let&apos;s talk about threads</Text>
      <Box
        borderRadius={6}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"gray.light"}
      >
        <Image src={"/post1.png"} w={"full"} />
      </Box>
      <Flex gap={3} my={3}>
        <Actions liked={liked} setLiked={setLiked} />
      </Flex>

      <Flex gap={2} alignItems={"center"}>
        <Text color={"gray.light"} fontSize={"sm"}>
          123 replies
        </Text>
        <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
        <Text color={"gray.light"} fontSize={"sm"}>
          {456 + (liked ? 1 : 0)} likes
        </Text>
      </Flex>
      <Divider my={4} />
      <Comment
        comment={"Looks really good"}
        createdAt={"1d"}
        likes={50}
        username={"johndoe"}
        userAvatar={"https://bit.ly/prosper-baba"}
      />
      <Comment
        comment={"Nice Dress!"}
        createdAt={"2d"}
        likes={43}
        username={"rahulChavan"}
        userAvatar={"https://bit.ly/sage-adebayo"}
      />
      <Comment
        comment={"Handsome boy"}
        createdAt={"3d"}
        likes={22}
        username={"bhushanDudhal"}
        userAvatar={"https://bit.ly/dan-abramov"}
      />
      <Comment
        comment={"Hey you are amazing!"}
        createdAt={"3d"}
        likes={300}
        username={"prashantBhoite"}
        userAvatar={"https://bit.ly/prosper-baba"}
      />
    </>
  )
}
export default PostPage
