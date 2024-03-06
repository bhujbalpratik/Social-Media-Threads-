import {
  Divider,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import { useState } from "react"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({})
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch("/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (data.success == false) {
        toast.error(data.message, {
          duration: 3000,
          style: {
            background: "#333",
            borderRadius: "10px",
            color: "#fff",
          },
        })
        return
      }
      if (data) {
        toast.success(data.message, {
          duration: 3000,
          icon: "",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        })
      }
    } catch (error) {
      console.log(error)
      toast.error(error, {
        duration: 3000,
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      })
    }
  }
  return (
    <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
      <Stack align={"center"}>
        <Heading fontSize={"4xl"} textAlign={"center"}>
          Sign up
        </Heading>
      </Stack>
      <Box
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.dark")}
        boxShadow={"lg"}
        p={8}
      >
        <Stack spacing={4}>
          <form onSubmit={submitHandler}>
            <FormControl id="name" isRequired>
              <FormLabel>Your Name</FormLabel>
              <Input type="text" onChange={handleChange} name="name" />
            </FormControl>
            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input type="text" onChange={handleChange} name="username" />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" onChange={handleChange} name="email" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  onChange={handleChange}
                  name="password"
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={4} pt={2}>
              <Button
                loadingText="Submitting"
                type="submit"
                size="lg"
                bg={useColorModeValue("gray.600", "gray.700")}
                color={"white"}
                fontSize={"md"}
                _hover={{
                  bg: useColorModeValue("gray.700", "gray.800"),
                }}
              >
                SIGN UP
              </Button>
              <Divider />
              <Button
                loadingText="Submitting"
                size="lg"
                bg={useColorModeValue("red.600", "red.700")}
                color={"white"}
                fontSize={"md"}
                _hover={{
                  bg: useColorModeValue("red.700", "red.800"),
                }}
              >
                CONTINUE WITH GOOGLE
              </Button>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={useColorModeValue("blue.600", "blue.700")}
                color={"white"}
                fontSize={"md"}
                _hover={{
                  bg: useColorModeValue("blue.700", "blue.800"),
                }}
              >
                CONTINUE WITH FACEBOOK
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already have an account?{" "}
                <Button variant={"link"} colorScheme={"blue"}>
                  <Link to={"/login"}>Log in</Link>
                </Button>
              </Text>
            </Stack>
          </form>
        </Stack>
      </Box>
    </Stack>
  )
}
