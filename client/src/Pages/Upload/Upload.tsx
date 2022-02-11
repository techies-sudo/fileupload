import {
    Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  CloseButton,
  Flex,
  Progress,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react";
import "../../App.css";
import { uploadFile } from "../../store/auth/actions";

function Upload() {
  const [error, setError] = useState<null | string>(null);
  const [files, setFiles] = useState<FileList | null>(null);
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(0);
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    if (files) {
      const newFiles = Array.from(files);
      newFiles.forEach((file: File) => {
        data.append("data", file);
      });
     uploadFile(data)
    }
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.currentTarget.files;

    const acceptableExt: Array<string> = [
      "image/jpg",
      "image/jpeg",
      "application/x-zip-compressed",
    ];
    console.log(files);
    if (newFiles) {
      const filesArray = Array.from(newFiles);
      const validationArray = filesArray.map((item) =>
        acceptableExt.includes(item.type)
      );

      if (validationArray.includes(false)) {
        setError("Some files extension did not match");
        setDisable(true);
      } else {
        setFiles(newFiles);
        setError(null);
        setDisable(false);
      }
    }
  };
  return (
    <Flex
      minH={"100vh"}
      width={"100vw"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      {" "}
      <form onSubmit={onSubmit}>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          width={"300px"}
          height={"500px"}
          p={8}
        >
            <Flex  minH={"100%"}
      width={"100%"}
      justify={"center"}>

          <Stack>
            <label htmlFor="file" className="myLabel">
              <input
                type="file"
                id="file"
                onChange={onChange}
                accept=".zip,.rar,.7zip,.jpeg,.jpg,application/x-zip-compressed"
                multiple
                />
              <i className="fa-solid fa-cloud-arrow-up" />
              <Text fontSize={"xl"} color={"gray.700"} fontWeight={"bold"}>Click here to Add</Text>
            </label>
            <Stack spacing={6}>
              <Button
                disabled={disable}
                type="submit"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                    bg: "blue.500",
                }}
                >
                Upload
              </Button>
            </Stack>
            {loading && (
                <Stack spacing={2}>
                <Progress value={loading} />
              </Stack>
            )}
           <Stack
                pt={5}
                style={{ display: `${!error ? "none" : "block"}` }}
              >
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle mr={2}>{error}</AlertTitle>
                  <CloseButton
                    position="absolute"
                    right="8px"
                    top="8px"
                    onClick={() => setError(null)}
                  />
                </Alert>
              </Stack>
          </Stack>

            </Flex>
        </Box>
      </form>
    </Flex>
  );
}

export default Upload;
