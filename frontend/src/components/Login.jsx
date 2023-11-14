"use client"

import { Flex, Box, FormControl, FormLabel, Input, InputGroup, HStack, InputRightElement, Stack, Button, Heading, Text, useColorModeValue, Link } from "@chakra-ui/react"
import { useState } from "react"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"

export default function LoginCard() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={useColorModeValue("gray.50", "gray.800")}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Login
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to start Threading 👽
          </Text>
        </Stack>
        <Box
          w={{
            base: "full",
            sm: "400px",
          }}
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? "text" : "password"} />
                <InputRightElement h={"full"}>
                  <Button variant={"ghost"} onClick={() => setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"gray"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Login
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Don't have an account? <Link color={"blue.400"}>Sign up</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
