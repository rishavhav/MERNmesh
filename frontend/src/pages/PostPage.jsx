import { Avatar, Flex, Text, Image, Box, Divider, Button } from "@chakra-ui/react"
import { BsThreeDots } from "react-icons/bs"
import Actions from "../components/Actions"
import Comment from "../components/Comment"

const PostPage = () => {
  return (
    <>
      <Flex justifyContent={"space-evenly"}>
        <Flex w={"full"} alignItems={"center"} gap={3}>
          <Avatar src="/zuck-avatar.png" size={"md"} name="Mark Zukerberg" />
          <Flex>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              markzukerberg
            </Text>
            <Image src="/verified.png" w={4} h={4} ml={4} />
          </Flex>
        </Flex>
        <Flex gap={4} alignItems={"center"}>
          <Text fontSize={"sm"} color={"gray"}>
            1d
          </Text>
          <BsThreeDots />
        </Flex>
      </Flex>

      <Text my={3}>Lets talk about threads</Text>

      <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray"}>
        <Image src={"/post1.png"} w={"full"} />
      </Box>

      <Flex gap={3} my={3}>
        <Actions />
      </Flex>

      <Flex gap={2} alignItems={"center"}>
        <Text color={"gray"} fontSize={"small"}>
          435 replies
        </Text>
        <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray"}></Box>
        <Text color={"gray"} fontSize={"small"}>
          113 likes
        </Text>
      </Flex>
      <Divider my={4} />

      <Flex justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize={"2xl"}>👋</Text>
          <Text color={"gray"}>Get the app to like, reply and post</Text>
        </Flex>
        <Button>Get</Button>
      </Flex>

      <Divider my={4} />
      <Comment comment={"Hey this looks great!"} createdAt="2d" likes={100} username="rohan" userAvatar={"https://bit.ly/prosper-baba"} />
      <Comment comment={"Zuck ftw 😊"} createdAt="4d" likes={200} username="rishav" userAvatar={"https://bit.ly/kent-c-dodds"} />
    </>
  )
}

export default PostPage
