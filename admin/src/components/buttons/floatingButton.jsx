import { Button } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";

export default function (props) {
    return <Button position="fixed" bottom="10" right="10" width="50" height="50" rounded="full" {...props}>
        <FiPlus />
    </Button>
}
