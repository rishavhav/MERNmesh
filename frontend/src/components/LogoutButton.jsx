import { Button } from "@chakra-ui/react"
import { useSetRecoilState } from "recoil"
import userAtom from "../atoms/userAtom"
import { useToast } from "@chakra-ui/react"

const LogoutButton = () => {
  const setUser = useSetRecoilState(userAtom)
  const toast = useToast()
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/users/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
      const data = await res.json()
      console.log(data)
      if (data.error) {
        toast({
          title: "An error occurred while logout.",
          description: data.error,
          status: "error",
          duration: 9000,
          isClosable: true,
        })
        return
      }

      localStorage.removeItem("user-threads")
      setUser(null)
    } catch (err) {
      toast({
        title: "An error occurred while logout.",
        description: err.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      })
    }
  }

  return (
    <Button position={"fixed"} top={"30px"} right={"30px"} size={"sm"} onClick={handleLogout}>
      Logout
    </Button>
  )
}

export default LogoutButton
