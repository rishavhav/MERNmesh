import { Link } from "react-router-dom"
import { Avatar, Box, Flex, Text, Image } from "@chakra-ui/react"
import { BsThreeDots } from "react-icons/bs"
import Actions from "./Actions"
import { useState } from "react"
const UserPost = ({ postImg, postTitle, likes, replies }) => {
  const [liked, setLiked] = useState(false)

  return (
    <Link to={"/markzuckerberg/post/1"}>
      <Flex gap={3} mb={4} py={5}>
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Avatar size="md" name="Mark Zuckerberg" src="/zuck-avatar.png" />
          <Box w="1px" h={"full"} bg={"gray"} my={2}></Box>
          <Box position={"relative"} w={"full"}>
            <Avatar size={"xs"} name="Rishav soam" src="https://bit.ly/dan-abramov" position={"absolute"} top={"0px"} left={"15px"} padding={"2px"} />
            <Avatar size={"xs"} name="Rishav soam" src="https://bit.ly/kent-c-dodds" position={"absolute"} bottom={"0px"} right={"-5px"} padding={"2px"} />
            <Avatar size={"xs"} name="Rishav soam" src="https://bit.ly/ryan-florence" position={"absolute"} bottom={"0px"} left={"4px"} padding={"2px"} />
          </Box>
        </Flex>

        <Flex flex={1} flexDirection={"column"} gap={2}>
          <Flex justifyContent={"space-between"} w={"full"}>
            <Flex w={"full"} alignItems={"center"}>
              <Text fontSize={"sm"} fontWeight={"bold"}>
                markzukerberg
              </Text>
              <Image src="./verified.png" w={4} h={4} ml={1} />
            </Flex>

            <Flex gap={4} alignItems={"center"}>
              <Text fontStyle={"sm"} color={"gray"}>
                1d
              </Text>
              <BsThreeDots />
            </Flex>
          </Flex>

          <Text fontSize={"small"}>{postTitle}</Text>

          {postImg && (
            <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray"}>
              <Image src={postImg} w={"full"} />
            </Box>
          )}

          <Flex gap={4} my={1}>
            <Actions />
          </Flex>

          <Flex gap={2} alignItems={"center"}>
            <Text color={"gray"} fontSize={"small"}>
              {replies} replies
            </Text>
            <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray"}></Box>
            <Text color={"gray"} fontSize={"small"}>
              {likes} likes
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  )
}

export default UserPost
