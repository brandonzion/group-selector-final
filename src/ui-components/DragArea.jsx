/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Flex, Text } from "@aws-amplify/ui-react";
export default function DragArea(props) {
  const { overrides, ...rest } = props;
  return (
    <Flex
      gap="10px"
      direction="column"
      width="382px"
      height="324px"
      justifyContent="center"
      alignItems="center"
      position="relative"
      borderRadius="0px 0px 24px 24px"
      padding="32px 32px 32px 32px"
      backgroundColor="rgba(247,249,251,1)"
      {...rest}
      {...getOverrideProps(overrides, "DragArea")}
    >
      <Flex
        gap="0"
        direction="column"
        height="260px"
        justifyContent="center"
        alignItems="center"
        grow="1"
        basis="260px"
        alignSelf="stretch"
        objectFit="cover"
        position="relative"
        border="2px SOLID rgba(226,230,234,1)"
        borderRadius="24px"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Wrap")}
      >
        <Text
          fontFamily="SF Pro Display"
          fontSize="14px"
          fontWeight="400"
          color="rgba(36,38,52,1)"
          lineHeight="16.40625px"
          textAlign="center"
          display="flex"
          direction="column"
          justifyContent="flex-start"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          whiteSpace="pre-wrap"
          children="Click to browse or &#x2028;drag and drop your files"
          {...getOverrideProps(
            overrides,
            "Click to browse or \u2028drag and drop your files"
          )}
        ></Text>
      </Flex>
    </Flex>
  );
}
