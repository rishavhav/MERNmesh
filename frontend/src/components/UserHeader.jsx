import { Avatar, Box, Flex, Menu, MenuButton, Text, VStack, useToast, MenuList, MenuItem } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { BsInstagram } from "react-icons/bs"
import { CgMoreO } from "react-icons/cg"

const UserHeader = () => {
  const toast = useToast()

  const copyUrl = () => {
    const currentUrl = window.location.href
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        toast({ description: "Profile link copied!" })
      })
      .catch((err) => {
        toast({ description: "Failed to copy URL", status: "error" })
        console.error("Failed to copy URL", err)
      })
  }

  return (
    <VStack gap={4} alignItems={"start"}>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            Mark Zukerberg
          </Text>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"sm"}>markzukerberg</Text>
            <Text fontSize={"xs"} p={1} bg={"gray.700"} borderRadius={"full"} color={"gray.200"}>
              threads.net
            </Text>
          </Flex>
        </Box>
        <Box>
          <Avatar
            name="Mark Zukerberg"
            src="/zuck-avatar.png"
            size={{
              base: "md",
              md: "lg",
            }}
          />
        </Box>
      </Flex>

      <Text>Co Founder, executive chairman and CEO of Meta Platforms.</Text>
      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.100"}>3.2k followers</Text>
          <Box w={1} h={1} borderRadius={"full"} bg={"gray.100"}></Box>
          <Link>instagram.com</Link>
        </Flex>
        <Flex>
          <Box
            _hover={{
              background: "gray.700",
              borderRadius: "full",
            }}
            borderRadius={"full"}
            p={2}
          >
            <BsInstagram size={24} cursor={"pointer"} />
          </Box>
          <Box
            _hover={{
              background: "gray.700",
              borderRadius: "full",
            }}
            borderRadius={"full"}
            p={2}
          >
            <Menu>
              <MenuButton>
                <CgMoreO size={24} cursor={"pointer"} />
              </MenuButton>
              <MenuList bg={"gray.dark"}>
                <MenuItem bg={"gray.dark"} onClick={copyUrl}>
                  Copy Link
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Flex>
      </Flex>

      <Flex w={"full"}>
        <Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} pb={3} cursor={"pointer"}>
          <Text fontWeight={"bold"}> Threads</Text>
        </Flex>
        <Flex flex={1} borderBottom={"1px solid gray"} justifyContent={"center"} pb={3} color={"gray"} cursor={"pointer"}>
          <Text fontWeight={"bold"}> Replies</Text>
        </Flex>
      </Flex>
    </VStack>
  )
}

export default UserHeader
