import {
    Flex,
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
    Link,
    Alert,
    AlertIcon,
    AlertDescription,
    AlertTitle,
    CloseButton,
  } from "@chakra-ui/react";
  import { ChangeEvent, FormEvent, useState } from "react";
  import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
  import axios from "axios";
  
  export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<{
      title: string;
      description: string;
    } | null>(null);
    const [loading, setLoading] = useState(false)
    const [credentials, setCredentials] = useState<{
      email: string;
      password: string;
    }>({ email: "", password: "" });
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.currentTarget.value;
      setCredentials({
        ...credentials,
        [e.currentTarget.name]: value,
      });
    
    };
    const onSubmit = (e: FormEvent) => {
      e.preventDefault();
     console.log(credentials)
          axios
          .post("http://localhost:5000/login", credentials, {
          
            onUploadProgress: (e: ProgressEvent) => {
              if(Math.round((e.loaded * 100) / e.total)===100||e.loaded===0){
                  setLoading(false)
              
              }
              else{
                  setLoading(true)
              }}}
          )
          .then((res) => {
            console.log(res);
            setError(null);
            setLoading(false);
          })
          .catch((err) => {
            setError(err.message);
          });
      
    };
    return (
      <Flex
        minH={"100vh"}
        width={"100vw"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Sign up
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <form onSubmit={onSubmit}>
              <Stack spacing={4}>
                 
                <FormControl id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" onChange={onChange} value={credentials.email} name="email"/>
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      onChange={onChange}
                      name="password"
                      value={credentials.password}
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
                <Stack spacing={10} pt={2}>
                  <Button
                    type="submit"
                    loadingText="Submitting"
                    size="lg"
                    isLoading={loading}
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    Sign up
                  </Button>
                </Stack>
                <Stack
                  pt={5}
                  style={{ display: `${!error ? "none" : "visible"}` }}
                >
                  <Alert status="error">
                    <AlertIcon />
                    <AlertTitle mr={2}>{error?.title}</AlertTitle>
                    <AlertDescription>{error?.description}</AlertDescription>
                    <CloseButton
                      position="absolute"
                      right="8px"
                      top="8px"
                      onClick={() => setError(null)}
                    />
                  </Alert>
                </Stack>
                <Stack pt={3}>
                  <Text align={"center"}>
                    forgot password? <Link href="/forgotpassword" color={"blue.400"}>Click Here</Link>
                  </Text>
                </Stack>
                <Stack pt={3}>
                  <Text align={"center"}>
                    Not a member? <Link href="/register" color={"blue.400"}>Register</Link>
                  </Text>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    );
  }
  