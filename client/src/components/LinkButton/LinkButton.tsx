import { Button } from '@chakra-ui/button';
import { ButtonProps } from '@chakra-ui/button';
import * as React from 'react';
import {
  Link as ReactRouterLink,
  LinkProps as RouterLinkProps
} from 'react-router-dom';

type ButtonLinkProps = ButtonProps & RouterLinkProps;


export const ButtonLink: React.FC<ButtonLinkProps> = React.forwardRef(
  (props: ButtonLinkProps, ref: React.Ref<any>) => {
    return <Button ref={ref} as={ReactRouterLink} {...props} />;
  }
);