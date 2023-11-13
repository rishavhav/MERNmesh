import { Button, HStack, Icon } from "@chakra-ui/react"
import { FaRegThumbsUp, FaRegCommentAlt, FaRetweet, FaShareSquare } from "react-icons/fa"

const Actions = () => {
  return (
    <HStack spacing={1}>
      <Button variant="ghost" size="sm">
        <Icon as={FaRegThumbsUp} />
      </Button>
      <Button variant="ghost" size="sm">
        <Icon as={FaRegCommentAlt} />
      </Button>
      <Button variant="ghost" size="sm">
        <Icon as={FaRetweet} />
      </Button>
      <Button variant="ghost" size="sm">
        <Icon as={FaShareSquare} />
      </Button>
    </HStack>
  )
}

export default Actions
